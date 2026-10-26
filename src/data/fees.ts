/**
 * The preliminary round is free; the only fee is paid by teams that reach the semifinal.
 * Keep in sync with SEMIFINAL_FEE_TEXT in back-end/src/jobs/email-scheduler.job.ts.
 */
export const SEMIFINAL_FEE_IDR = 180_000

/** 180000 -> "Rp 180.000" */
export const formatRupiah = (amount: number) =>
  `Rp ${amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`

export const SEMIFINAL_FEE_TEXT = formatRupiah(SEMIFINAL_FEE_IDR)

/** The backend keeps a registered team at PENDING_PAYMENT, but nothing is due until the semifinal. */
export const statusLabel = (code: string) =>
  code === 'PENDING_PAYMENT'
    ? 'Registered'
    : code
        .toLowerCase()
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
