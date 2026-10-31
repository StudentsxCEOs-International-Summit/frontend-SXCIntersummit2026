/**
 * Thin client for the SxC backend (Express, mounted at /api).
 *
 * - Base URL comes from VITE_API_URL (see .env.example).
 * - The session lives in an httpOnly `token` cookie, so every request sends credentials.
 * - Every backend response is { success, message, data } or { success: false, message, errors }.
 */
const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api').replace(/\/$/, '')

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data?: T
  errors?: unknown
}

/** Shown when the request never reached the server (offline, DNS, server down). */
export const NETWORK_ERROR_MESSAGE =
  "We can't connect right now. Please check your internet connection and refresh the page. If it keeps happening, please contact our team."

/** Shown when the server answered with something we can't use, or failed without a readable message. */
export const SERVER_ERROR_MESSAGE =
  'Something went wrong on our side. Please refresh the page and try again. If it keeps happening, please contact our team.'

export class ApiError extends Error {
  status: number
  /** Field-level messages when the backend rejected the body, keyed by field path. */
  fieldErrors: Record<string, string>

  constructor(message: string, status: number, fieldErrors: Record<string, string> = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

/** Turns the backend's zod issue list into { 'email': 'Invalid email address', ... }. */
function toFieldErrors(errors: unknown): Record<string, string> {
  const result: Record<string, string> = {}
  if (!Array.isArray(errors)) return result

  for (const issue of errors) {
    if (issue && typeof issue === 'object' && 'message' in issue) {
      const rawPath = (issue as { path?: unknown }).path
      const key = Array.isArray(rawPath) && rawPath.length > 0 ? rawPath.join('.') : '_'
      if (!result[key]) result[key] = String((issue as { message: unknown }).message)
    }
  }
  return result
}

type UnauthorizedHandler = () => void
let unauthorizedHandler: UnauthorizedHandler | null = null

/**
 * Called when an API call (outside /auth/*) comes back 401, i.e. the session cookie is
 * missing or the JWT has expired. The auth provider uses it to sign the user out.
 * /auth/* is excluded on purpose: a 401 there is an expected "wrong credentials" answer.
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  /** Plain object -> JSON, FormData -> multipart (the browser sets the boundary). */
  body?: unknown
  /** Sends `Authorization: Bearer <token>` (used for the password-reset token). */
  bearer?: string
  signal?: AbortSignal
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, bearer, signal } = options
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json'
  if (bearer) headers.Authorization = `Bearer ${bearer}`

  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0)
  }

  let payload: ApiEnvelope<T> | null = null
  try {
    payload = (await response.json()) as ApiEnvelope<T>
  } catch {
    // A gateway or proxy error page (502/503/504) is not JSON: treat it as the server being unavailable.
    throw new ApiError(
      response.status >= 500 ? SERVER_ERROR_MESSAGE : 'The server returned an unexpected response.',
      response.status,
    )
  }

  if (response.status === 401 && !path.startsWith('/auth/')) {
    unauthorizedHandler?.()
  }

  if (!response.ok || !payload.success) {
    let message = payload.message || (response.status >= 500 ? SERVER_ERROR_MESSAGE : 'Something went wrong.')

    // A server-side failure comes with a request id: show a short reference so the team can find the exact
    // log line when someone reports the problem, and keep the technical detail in the console.
    if (response.status >= 500) {
      const info = payload.errors as { reqId?: unknown; detail?: unknown } | undefined
      if (typeof info?.reqId === 'string' && info.reqId !== 'unknown') {
        message += ` (Ref: ${info.reqId.slice(0, 8)})`
      }
      console.error('[API]', method, path, response.status, payload.errors ?? payload.message)
    }

    throw new ApiError(message, response.status, toFieldErrors(payload.errors))
  }

  return payload.data as T
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PATCH', body }),
}

export { BASE_URL as API_BASE_URL }
