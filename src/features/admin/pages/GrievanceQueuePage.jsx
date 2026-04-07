import { AdminSidebar } from '../../../components/layout/AdminSidebar'

import './GrievanceQueuePage.css'

const grievanceRows = [
  {
    title: 'Crop Damage Insurance Delay',
    sub: 'ID: ANN-2023-882 • Wheat Harvest',
    priority: 'HIGH',
    priorityClass: 'text-tertiary',
    priorityDot: 'bg-tertiary',
    status: 'Pending',
    statusClass: 'bg-error-container text-on-error-container',
    assigneeType: 'initials',
    assigneeInitials: 'AV',
    assigneeName: 'Anish Verma',
    sla: '00:45:12',
    slaClass: 'text-tertiary',
    highlighted: true,
  },
  {
    title: 'Discrepancy in Soil Analysis',
    sub: 'ID: ANN-2023-891 • Lab Results',
    priority: 'MEDIUM',
    priorityClass: 'text-secondary',
    priorityDot: 'bg-secondary',
    status: 'In Progress',
    statusClass: 'bg-secondary-container text-on-secondary-container',
    assigneeType: 'avatar',
    assigneeAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlcXH7n_O8AWVgmBbBwKjeVVT3CUnNFUur_2I3U0kUP9xuTAOnspD8RTIi2-wClfo0t7jTgTFzQMfezndsqWcvUUMNHiehfwclYNgFAnjOIfRYUvMu3omj448EcA_O74fRlfgplwbGnzyLLkI1FX9FdQLjwjHh6u1C7BnagCTCDwnG6OZxfbJbGLX5In9PF_uunQXBE4HmnKVX6Sr1ukQi50XmosoC6ZTQppe9IQoeed8tmo6ejw029ZU5jHpCUTjT9jNVbinRSTqv',
    assigneeName: 'Priya S.',
    sla: '04:22:00',
    slaClass: 'text-on-surface',
    highlighted: false,
  },
  {
    title: 'Payment Gateway Failure',
    sub: 'ID: ANN-2023-895 • Seed Purchase',
    priority: 'HIGH',
    priorityClass: 'text-tertiary',
    priorityDot: 'bg-tertiary',
    status: 'Escalated',
    statusClass: 'bg-surface-container-highest text-on-surface-variant',
    assigneeType: 'text',
    assigneeName: 'Unassigned',
    assigneeTextClass: 'italic text-on-surface-variant',
    sla: 'OVERDUE',
    slaClass: 'text-tertiary',
    highlighted: false,
  },
]

export function GrievanceQueuePage() {
  return (
    <div className="grievance-queue-page flex min-h-screen bg-surface text-on-surface" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AdminSidebar />

      <main className="flex min-h-screen flex-1 flex-col md:ml-64">
        <header className="glass-nav sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-[rgba(236,253,245,0.8)] px-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)]">
          <div className="flex items-center gap-6">
            <h2 className="authoritative-text text-lg font-bold tracking-tighter text-emerald-900">Grievance Queue</h2>
            <div className="h-6 w-px bg-outline-variant/30"></div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Search ticket, farmer ID..."
                className="cubic-ease w-64 rounded-full border-none bg-surface-container py-1.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="cubic-ease rounded-full p-2 text-on-surface-variant hover:bg-emerald-100/50">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <button type="button" className="cubic-ease rounded-full p-2 text-on-surface-variant hover:bg-emerald-100/50">
              <span className="material-symbols-outlined">language</span>
            </button>

            <div className="ml-2 flex items-center gap-3 border-l border-outline-variant/20 pl-4">
              <div className="text-right">
                <p className="authoritative-text text-xs font-bold text-on-surface">Dr. Admin</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Administrator</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgIOB1RoCfmtURcEY_2bBYTWZnXfqOGKSJJI6IEeMWJXJeiM787HJLD6XD76LRixIxeFJW-AcIJoTGnTHXzbS_NV17HxLQamcl0ZGkVW4ahc1lHf2Fal5YYRtkigtkcp9qwgXtCON5-z0A6nrswnoqWWEKOnmQCgeEG1SUJSJSE4z4iS3nzzdBrFGAgAvzS0GcEA88TN_PwNaIs6JxjNB25W8ZcDeCOmA_vFzchUtWQbMmOfO18-Njrc8GfTW_gMNCKtB8upA_aAxJ"
                alt="Administrator profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-100"
              />
            </div>
          </div>
        </header>

        <div className="flex gap-8 p-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-surface-container-highest px-4 py-2 text-sm font-semibold text-on-surface"
                >
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter
                </button>

                <button type="button" className="cubic-ease rounded-lg px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5">
                  Export CSV
                </button>
              </div>

              <div className="flex gap-8">
                <div className="text-center">
                  <p className="label-caps text-on-surface-variant">Total Open</p>
                  <p className="authoritative-text text-xl font-bold text-on-primary-fixed-variant">124</p>
                </div>

                <div className="text-center">
                  <p className="label-caps text-on-surface-variant">Critical</p>
                  <p className="authoritative-text text-xl font-bold text-tertiary">12</p>
                </div>

                <div className="text-center">
                  <p className="label-caps text-on-surface-variant">Avg. Response</p>
                  <p className="authoritative-text text-xl font-bold text-on-surface">2.4h</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="label-caps border-none px-6 py-4 text-on-surface-variant">Grievance</th>
                    <th className="label-caps border-none px-6 py-4 text-on-surface-variant">Priority</th>
                    <th className="label-caps border-none px-6 py-4 text-on-surface-variant">Status</th>
                    <th className="label-caps border-none px-6 py-4 text-on-surface-variant">Assigned To</th>
                    <th className="label-caps border-none px-6 py-4 text-right text-on-surface-variant">SLA Timer</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/10">
                  {grievanceRows.map((row) => (
                    <tr
                      key={row.title}
                      className={`cubic-ease cursor-pointer hover:bg-emerald-50/30 ${row.highlighted ? 'border-l-4 border-tertiary' : ''}`}
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="authoritative-text text-sm font-bold text-on-surface">{row.title}</span>
                          <span className="text-xs text-on-surface-variant">{row.sub}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${row.priorityClass}`}>
                          <span className={`h-2 w-2 rounded-full ${row.priorityDot}`}></span>
                          {row.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${row.statusClass}`}>
                          {row.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {row.assigneeType === 'initials' && (
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-highest text-[10px] font-bold">
                              {row.assigneeInitials}
                            </div>
                            <span className="text-xs text-on-surface">{row.assigneeName}</span>
                          </div>
                        )}

                        {row.assigneeType === 'avatar' && (
                          <div className="flex items-center gap-2">
                            <img src={row.assigneeAvatar} alt="Officer" className="h-6 w-6 rounded-full object-cover" />
                            <span className="text-xs text-on-surface">{row.assigneeName}</span>
                          </div>
                        )}

                        {row.assigneeType === 'text' && <span className={`text-xs ${row.assigneeTextClass}`}>{row.assigneeName}</span>}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <span className={`font-mono text-xs font-bold ${row.slaClass}`}>{row.sla}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="sticky top-24 max-h-[calc(100vh-8rem)] w-96 self-start overflow-y-auto rounded-2xl border-l-4 border-primary bg-surface-container-low p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="label-caps text-primary">Ticket Details</p>
                  <h3 className="authoritative-text mt-1 text-lg font-extrabold leading-tight">Crop Damage Insurance Delay</h3>
                </div>
                <button type="button" className="rounded-full p-1.5 hover:bg-surface-container-highest">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-surface-container-lowest p-3">
                  <p className="label-caps text-[0.6rem] text-on-surface-variant">Farmer</p>
                  <p className="text-sm font-bold">Ramesh Kumar</p>
                </div>

                <div className="rounded-xl bg-surface-container-lowest p-3">
                  <p className="label-caps text-[0.6rem] text-on-surface-variant">Zone</p>
                  <p className="text-sm font-bold">Punjab-04</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="label-caps text-on-surface-variant">Conversation Trail</p>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-container text-[10px] font-bold text-on-secondary-container">
                    RK
                  </div>
                  <div className="rounded-xl rounded-tl-none bg-white p-3 text-xs shadow-sm">
                    <p className="leading-relaxed text-on-surface">It's been 15 days since I submitted the inspection report. No response yet.</p>
                    <p className="mt-2 text-right text-[10px] text-on-surface-variant">10:45 AM, Oct 12</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <div className="rounded-xl rounded-tr-none bg-primary p-3 text-xs text-white shadow-sm">
                    <p className="leading-relaxed">Apologies for the delay, Ramesh. We are verifying the satellite imagery data now.</p>
                    <p className="mt-2 text-right text-[10px] text-on-primary-container">11:15 AM, Oct 12</p>
                  </div>
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-container text-[10px] font-bold text-on-primary-container">
                    AD
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3 border-t border-outline-variant/20 pt-6">
                <p className="label-caps mb-2 text-on-surface-variant">Resolution Actions</p>

                <button
                  type="button"
                  className="primary-gradient cubic-ease flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Resolve Ticket
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="cubic-ease flex items-center justify-center gap-2 rounded-lg bg-surface-container-highest px-4 py-2.5 text-sm font-bold text-on-surface hover:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    Assign
                  </button>

                  <button
                    type="button"
                    className="cubic-ease flex items-center justify-center gap-2 rounded-lg bg-surface-container-highest px-4 py-2.5 text-sm font-bold text-on-surface hover:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Status
                  </button>
                </div>

                <button
                  type="button"
                  className="cubic-ease w-full rounded-lg border border-tertiary/20 px-4 py-2.5 text-sm font-bold text-tertiary hover:bg-tertiary/5"
                >
                  Escalate to Senior Board
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <p className="label-caps text-on-surface-variant">Documents (2)</p>
                <div className="flex items-center gap-3 rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-2">
                  <span className="material-symbols-outlined text-primary">image</span>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-[10px] font-bold">field_damage_report_01.jpg</p>
                    <p className="text-[8px] text-on-surface-variant">2.4 MB • Image</p>
                  </div>
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">download</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl bg-on-surface px-6 py-3 text-white shadow-2xl">
          <span className="material-symbols-outlined text-secondary-fixed">auto_awesome</span>
          <p className="text-xs font-medium">
            New grievance reported in <span className="font-bold text-secondary-fixed">Zone-B (Haryana)</span>
          </p>
          <button type="button" className="ml-4 text-xs font-bold underline underline-offset-4">
            View
          </button>
        </div>
      </main>
    </div>
  )
}
