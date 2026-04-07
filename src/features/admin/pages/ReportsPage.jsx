import { AdminSidebar } from '../../../components/layout/AdminSidebar'

import './ReportsPage.css'

const trendBars = [
  { month: 'JAN', height: 'h-24', active: false },
  { month: 'FEB', height: 'h-32', active: false },
  { month: 'MAR', height: 'h-40', active: false },
  { month: 'APR', height: 'h-56', active: true },
  { month: 'MAY', height: 'h-48', active: false },
  { month: 'JUN', height: 'h-36', active: false },
]

export function ReportsPage() {
  return (
    <div className="reports-page bg-surface text-on-surface">
      <AdminSidebar />

      <main className="min-h-screen md:ml-64">
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-[rgba(236,253,245,0.8)] px-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-zinc-400">search</span>
              <input
                type="text"
                className="w-64 rounded-xl border-none bg-surface-container py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary"
                placeholder="Search data points..."
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-zinc-600">
              <button type="button" className="rounded-lg p-2 transition-colors hover:bg-emerald-100/50">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button type="button" className="rounded-lg p-2 transition-colors hover:bg-emerald-100/50">
                <span className="material-symbols-outlined">language</span>
              </button>
            </div>

            <div className="h-8 w-px bg-emerald-200/50"></div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold tracking-tight text-emerald-900">Administrator</p>
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-zinc-500">System Admin</p>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-xl bg-emerald-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqdpHKSO4fbGWZLj6zbrZ_H9pOQK_7KjiTLbjJ-Mne7ItR8dfNteP2uRx1NQosbrTnxK4DwLr4-CnMWeosC74Ll7MkBlBN9alJIVdKqIuZlT51WjzODabV2EWn_HSqPB3kQPp36OAPlpO02MfiVl1JWGvSWzBn9aVdPmE8BNNO6iddkny-y66d9parodMW-gM7yfRQX4hmFmdvdaKMfDxkPZlA4r749V0c91EEKo7X23t5jNmFuXbkC-o2xMLhqJml08y5iGcttWCu"
                  alt="Administrator profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-8">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-on-surface">Analytics &amp; Performance</h2>
              <p className="max-w-lg text-on-surface-variant">
                Comprehensive insights into crop yield claims, grievance resolution timelines, and regional agricultural health.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl bg-surface-container-low p-1.5">
                <button type="button" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                  Last 30 Days
                </button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary">
                  Quarterly
                </button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary">
                  Yearly
                </button>
              </div>
              <button type="button" className="flex items-center gap-2 rounded-xl bg-surface-container-highest p-2.5 text-on-surface transition-colors hover:bg-surface-variant">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
              </button>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-6 transition-all md:col-span-1">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary"></div>
              <div>
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Total Claims Settled</p>
                <h3 className="text-4xl font-extrabold tracking-tighter text-on-surface">₹482.4M</h3>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-secondary-container px-2 py-0.5 text-[0.75rem] font-bold text-on-secondary-container">
                  <span className="material-symbols-outlined text-xs reports-fill-icon">trending_up</span>
                  +12.4%
                </div>
                <span className="text-[0.75rem] text-on-surface-variant">vs last month</span>
              </div>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-6 md:col-span-1">
              <div>
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Active Grievances</p>
                <h3 className="text-4xl font-extrabold tracking-tighter text-on-surface">1,204</h3>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-tertiary-container px-2 py-0.5 text-[0.75rem] font-bold text-on-tertiary-container">
                  <span className="material-symbols-outlined text-xs reports-fill-icon">trending_down</span>
                  -4.2%
                </div>
                <span className="text-[0.75rem] text-on-surface-variant">resolution speed up</span>
              </div>
            </div>

            <div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-6 md:col-span-2">
              <div className="z-10">
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Primary Affected Crop</p>
                <h3 className="mb-2 text-3xl font-extrabold tracking-tight text-on-surface">Wheat (Kharif)</h3>
                <p className="text-sm text-on-surface-variant">Concentrated in North-Western region</p>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
                <span className="material-symbols-outlined text-5xl text-emerald-700">potted_plant</span>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-0 opacity-5">
                <span className="material-symbols-outlined text-[10rem]">grass</span>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-xl bg-surface-container-lowest p-8 lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h4 className="text-lg font-bold tracking-tight text-on-surface">Claims Volume Trend</h4>
                <div className="flex gap-2">
                  <button type="button" className="rounded-lg p-1.5 transition-colors hover:bg-surface-container">
                    <span className="material-symbols-outlined text-base">download</span>
                  </button>
                  <button type="button" className="rounded-lg p-1.5 transition-colors hover:bg-surface-container">
                    <span className="material-symbols-outlined text-base">more_horiz</span>
                  </button>
                </div>
              </div>

              <div className="mb-8 flex h-64 items-end justify-between gap-3 rounded-xl bg-surface-container p-6">
                {trendBars.map((bar) => (
                  <div key={bar.month} className="flex w-full flex-col items-center gap-3">
                    <div className={`${bar.height} w-full rounded-t-lg ${bar.active ? 'bg-primary' : 'bg-surface-container-highest'} transition-colors`}></div>
                    <span className={`text-[0.6875rem] font-bold ${bar.active ? 'text-primary' : 'text-on-surface-variant'}`}>{bar.month}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Avg. Processing Time</p>
                  <p className="mt-2 text-xl font-black text-on-surface">4.2 Days</p>
                </div>
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Approval Rate</p>
                  <p className="mt-2 text-xl font-black text-secondary">82.7%</p>
                </div>
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Fraud Flags</p>
                  <p className="mt-2 text-xl font-black text-tertiary">3.4%</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface-container-lowest p-8">
              <h4 className="mb-6 text-lg font-bold tracking-tight text-on-surface">Operational Snapshot</h4>
              <div className="space-y-4">
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Today</p>
                  <p className="mt-1 text-2xl font-black text-on-surface">218 Claims</p>
                </div>
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Pending Verification</p>
                  <p className="mt-1 text-2xl font-black text-tertiary">67</p>
                </div>
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Resolved Grievances</p>
                  <p className="mt-1 text-2xl font-black text-secondary">149</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold tracking-tight text-on-surface">Regional Distribution</h4>
                  <p className="text-sm text-on-surface-variant">Active claim heat map across major states</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-secondary"></div>
                  <span className="text-[0.7rem] font-bold text-on-secondary-container">LIVE DATA</span>
                </div>
              </div>

              <div className="group relative mb-6 h-[300px] overflow-hidden rounded-xl bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKRsjvMaVFc9pgKdLGJHH7x-gON13jD9A1DLXzzpJ2NyAFH20ruOFErmrFVJOP5hJHdcjNEAYAIC3nFZ-jm-5JGJuW1hXA1nVe5haBsWQMSfBj9dqWE1DPkcHqS1Qd7-eV6Hp_emzYZMJ0Sx32dWWV1IQC0qi2XphKH_mYZhQxG4e9xy9gOTduG6csipTL1Q_FpR0f5adpkkSqBzHWrBOfPaKTyCW9hqjpSpaOhfoC4pg3qHBJpvVZeZhbmh9-78Oct0ipvVtoTY0p"
                  alt="Regional topography map"
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>

                <div className="absolute left-1/3 top-1/4 rounded-lg border-l-4 border-primary bg-white p-2 shadow-xl">
                  <p className="text-[0.6rem] font-bold uppercase text-on-surface-variant">Maharashtra</p>
                  <p className="text-xs font-black">₹12.4M Claims</p>
                </div>

                <div className="absolute bottom-1/3 right-1/4 rounded-lg border-l-4 border-tertiary bg-white p-2 shadow-xl">
                  <p className="text-[0.6rem] font-bold uppercase text-on-surface-variant">Punjab</p>
                  <p className="text-xs font-black">High Risk</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-surface-container-low/50 p-3">
                  <span className="text-sm font-semibold">Madhya Pradesh</span>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full w-3/4 bg-primary"></div>
                    </div>
                    <span className="w-8 text-sm font-bold">75%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-surface-container-low/50 p-3">
                  <span className="text-sm font-semibold">Uttar Pradesh</span>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full w-2/5 bg-primary"></div>
                    </div>
                    <span className="w-8 text-sm font-bold">40%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface-container-lowest p-8">
              <h4 className="mb-8 text-lg font-bold tracking-tight text-on-surface">Crop Category Performance</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-5 rounded-xl p-4 transition-colors hover:bg-surface-container-low">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                    <span className="material-symbols-outlined text-emerald-800">agriculture</span>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h5 className="text-sm font-bold text-on-surface">Cereals &amp; Pulses</h5>
                      <span className="text-[0.7rem] font-bold text-primary">Stable</span>
                    </div>
                    <p className="mb-4 text-xs text-on-surface-variant">Rice, Wheat, Maize accounts for 62% of all claims.</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Yield</p>
                        <p className="text-xs font-black">94.2%</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Claims</p>
                        <p className="text-xs font-black">2.4k</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Growth</p>
                        <p className="text-xs font-black text-secondary">+2.1%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 rounded-xl p-4 transition-colors hover:bg-surface-container-low">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <span className="material-symbols-outlined text-amber-800">energy_savings_leaf</span>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h5 className="text-sm font-bold text-on-surface">Oilseeds</h5>
                      <span className="text-[0.7rem] font-bold text-tertiary">Volatile</span>
                    </div>
                    <p className="mb-4 text-xs text-on-surface-variant">Soybean crops showing high sensitivity to moisture levels.</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Yield</p>
                        <p className="text-xs font-black">78.5%</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Claims</p>
                        <p className="text-xs font-black">5.8k</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Growth</p>
                        <p className="text-xs font-black text-tertiary">-12.4%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 rounded-xl p-4 transition-colors hover:bg-surface-container-low">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                    <span className="material-symbols-outlined text-purple-800">spa</span>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h5 className="text-sm font-bold text-on-surface">Commercial Crops</h5>
                      <span className="text-[0.7rem] font-bold text-primary">Emerging</span>
                    </div>
                    <p className="mb-4 text-xs text-on-surface-variant">Cotton and Sugarcane expansion in Southern zones.</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Yield</p>
                        <p className="text-xs font-black">88.9%</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Claims</p>
                        <p className="text-xs font-black">1.1k</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center">
                        <p className="text-[0.55rem] font-bold uppercase text-zinc-400">Growth</p>
                        <p className="text-xs font-black text-secondary">+8.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-outline-variant/10 pt-8 md:flex-row">
            <p className="text-[0.75rem] text-on-surface-variant">© 2024 Annadata Connect. Data privacy standards ISO 27001 compliant.</p>
            <div className="flex items-center gap-6">
              <button type="button" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary">
                Internal Use Only
              </button>
              <button type="button" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary">
                Security Audit Log
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
