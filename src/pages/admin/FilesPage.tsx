import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, ExternalLink, Search } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { adminService, fileLink, isPendingFile, submissionLabel } from '@/services/admin'
import {
  Badge,
  Btn,
  Empty,
  ErrorBox,
  PageHeading,
  Spinner,
  card,
  downloadCsv,
  formatDate,
  inputClass,
  useLoad,
} from '@/components/admin/ui'

const size = (bytes: number | null) =>
  bytes === null ? '-' : bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

export default function FilesPage() {
  usePageTitle('Files & Links')
  const { state, reload } = useLoad(adminService.teams)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('ALL')

  const rows = useMemo(
    () =>
      state.kind === 'ready'
        ? state.data.flatMap((team) =>
            team.submissionTeam.flatMap((s) =>
              s.Files.map((file) => ({
                key: file.id,
                teamId: team.id,
                team: team.name,
                code: team.code,
                label: submissionLabel(s),
                submittedAt: s.submittedAt,
                size: file.fileSize,
                link: fileLink(file),
                processing: isPendingFile(file),
              })),
            ),
          )
        : [],
    [state],
  )

  const labels = useMemo(() => [...new Set(rows.map((r) => r.label))].sort(), [rows])
  const processing = rows.filter((r) => r.processing).length

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      if (kind === 'PROCESSING') return r.processing && (!q || `${r.team} ${r.code}`.toLowerCase().includes(q))
      if (kind !== 'ALL' && r.label !== kind) return false
      return !q || `${r.team} ${r.code}`.toLowerCase().includes(q)
    })
  }, [rows, query, kind])

  const exportCsv = () =>
    downloadCsv('files-and-links.csv', [
      ['Team code', 'Team', 'File', 'Submitted at', 'Size', 'Link'],
      ...visible.map((r) => [r.code, r.team, r.label, formatDate(r.submittedAt), size(r.size), r.link ?? (r.processing ? 'processing' : '')]),
    ])

  return (
    <>
      <PageHeading
        title="Files & Links"
        hint={state.kind === 'ready' ? `${visible.length} files, ${processing} still processing` : undefined}
        actions={
          <>
            <Btn kind="ghost" onClick={reload}>Refresh</Btn>
            <Btn kind="ghost" onClick={exportCsv} disabled={visible.length === 0}>
              <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
            </Btn>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input type="search" aria-label="Search files" placeholder="Search by team name or code" className={`${inputClass} pl-9`} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select aria-label="Filter files" className={`${inputClass} w-auto`} value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="ALL">All files</option>
          <option value="PROCESSING">Still processing</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {state.kind === 'loading' && <Spinner />}
      {state.kind === 'error' && <ErrorBox message={state.message} onRetry={reload} />}

      {state.kind === 'ready' && (
        <div className={`${card} overflow-x-auto`}>
          {visible.length === 0 ? (
            <Empty>No files match your filters.</Empty>
          ) : (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#E8EEF6] bg-[#F7FAFD] text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Team</th>
                  <th className="px-4 py-3 font-semibold">File</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EEF6]">
                {visible.map((r) => (
                  <tr key={r.key}>
                    <td className="px-4 py-3">
                      <Link to={`/admin/teams?team=${r.teamId}`} className="font-semibold text-[#0262F4] hover:underline">
                        {r.team}
                      </Link>
                      <span className="block text-xs text-slate-500">{r.code}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-800">{r.label}</td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500">{formatDate(r.submittedAt)}</td>
                    <td className="px-4 py-3 text-slate-600">{size(r.size)}</td>
                    <td className="px-4 py-3">
                      {r.processing ? (
                        <Badge tone="amber">Processing</Badge>
                      ) : r.link ? (
                        <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#0262F4] hover:underline">
                          Open in Drive <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <Badge>No link</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  )
}
