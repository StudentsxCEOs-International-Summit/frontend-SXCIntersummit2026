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
    throw new ApiError('Cannot reach the server. Please check your connection and try again.', 0)
  }

  let payload: ApiEnvelope<T> | null = null
  try {
    payload = (await response.json()) as ApiEnvelope<T>
  } catch {
    throw new ApiError('The server returned an unexpected response.', response.status)
  }

  if (response.status === 401 && !path.startsWith('/auth/')) {
    unauthorizedHandler?.()
  }

  if (!response.ok || !payload.success) {
    throw new ApiError(
      payload.message || 'Something went wrong.',
      response.status,
      toFieldErrors(payload.errors),
    )
  }

  return payload.data as T
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
}

export { BASE_URL as API_BASE_URL }
