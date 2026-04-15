import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminSidebar } from '../../../components/layout/AdminSidebar'
import { ROUTES } from '../../../constants/navigation'

import './AdminDashboardPage.css'

const statCards = [
  {
    label: 'Total Claims',
    value: '14,282',
    icon: 'account_balance_wallet',
    accent: 'bg-primary',
    chip: '+12.5%',
    chipClass: 'text-secondary bg-secondary-container',
    iconClass: 'text-primary bg-[rgba(17,86,56,0.1)]',
  },
  {
    label: 'Pending Review',
    value: '843',
    icon: 'pending_actions',
    accent: 'bg-secondary',
    chip: 'Active',
    chipClass: 'text-secondary bg-secondary-container',
    iconClass: 'text-secondary bg-[rgba(22,107,72,0.1)]',
  },
  {
    label: 'High-Risk Claims',
    value: '42',
    icon: 'warning',
    accent: 'bg-error',
    chip: 'High Priority',
    chipClass: 'text-white bg-error',
    iconClass: 'text-error bg-[rgba(186,26,26,0.1)]',
  },
  {
    label: 'Unresolved Grievances',
    value: '127',
    icon: 'chat_bubble_outline',
    accent: 'bg-tertiary',
    chip: 'Unresolved',
    chipClass: 'text-on-tertiary-container bg-tertiary-container',
    iconClass: 'text-tertiary bg-[rgba(119,56,61,0.1)]',
  },
]

const trendData = [
  { day: 'Mon', value: 160 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 100 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 45 },
  { day: 'Sun', value: 140 },
]

const alerts = [
  {
    icon: 'security',
    iconClass: 'text-error',
    cardClass: 'bg-red-50',
    titleClass: 'text-error',
    title: 'Duplicate Identity Detected',
    description: 'Claim #8291 matches farmer record #1203 across 3 variables.',
    fill: true,
  },
  {
    icon: 'cloud_off',
    iconClass: 'text-orange-600',
    cardClass: 'bg-orange-50',
    titleClass: 'text-orange-700',
    title: 'Yield Deviation Flag',
    description: 'Reported yield in Punjab-Sector 4 is 45% below satellite projections.',
    fill: true,
  },
  {
    icon: 'verified_user',
    iconClass: 'text-blue-600',
    cardClass: 'bg-blue-50',
    titleClass: 'text-blue-700',
    title: 'Audit Requested',
    description: 'Bulk submission of 15 claims from Haryana requires supervisor sign-off.',
    fill: true,
  },
]

const claims = [
  { id: '#AC-9210', farmer: 'Rajesh Kumar', region: 'Uttar Pradesh', amount: '₹42,000', status: 'Reviewing', statusClass: 'bg-yellow-100 text-yellow-800' },
  { id: '#AC-9211', farmer: 'Harpreet Singh', region: 'Punjab', amount: '₹1,25,000', status: 'Verified', statusClass: 'bg-green-100 text-green-800' },
  { id: '#AC-9214', farmer: 'Deepak Reddy', region: 'Andhra Pradesh', amount: '₹68,400', status: 'Risk Flag', statusClass: 'bg-red-100 text-red-800' },
  { id: '#AC-9217', farmer: 'Suman Devi', region: 'Rajasthan', amount: '₹18,200', status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' },
]

const regions = [
  { name: 'Maharashtra', progress: 75 },
  { name: 'Uttar Pradesh', progress: 62 },
  { name: 'Madhya Pradesh', progress: 48 },
]

const chartPoints = trendData.map((d, i) => ({
  x: (i / (trendData.length - 1)) * 460 + 20,
  y: d.value,
  day: d.day,
}))

const linePath = chartPoints
  .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
  .join(' ')

const areaPath = `${linePath} L${chartPoints[chartPoints.length - 1].x},200 L${chartPoints[0].x},200 Z`

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeRange, setActiveRange] = useState('daily')

  const filteredClaims = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return claims
    return claims.filter((claim) =>
      [claim.id, claim.farmer, claim.region, claim.status].some((field) =>
        field.toLowerCase().includes(query)
      )
    )
  }, [searchTerm])

  return (
    <div className="admin-dashboard bg-surface text-on-surface" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AdminSidebar />

      <main className="min-h-screen md:ml-64">
        <header className="glass-nav sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-[rgba(236,253,245,0.8)] px-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)]">
          <div className="flex flex-1 items-center gap-6">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">search</span>
              <input
                className="w-full rounded-lg border-none bg-white/50 py-2 pl-10 pr-4 text-sm transition-all focus:bg-white focus:ring-1 focus:ring-primary"
                placeholder="Search claims, regions, or IDs..."
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="relative rounded-full p-2 transition-colors hover:bg-emerald-100/50">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error"></span>
            </button>

            <button type="button" className="rounded-full p-2 transition-colors hover:bg-emerald-100/50">
              <span className="material-symbols-outlined text-on-surface-variant">language</span>
            </button>

            <div className="mx-2 h-8 w-px bg-[rgba(191,201,192,0.3)]"></div>

            <div className="group flex cursor-pointer items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface">Administrator</p>
                <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Superuser</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKPtOla5ZmKCSyaCC0AeABEtDK2dIxuI8Jv77VO-cIWlW3Xn5ODKqWq35hToY3fEmO-vudwoX9Qti3_vA4QfgGjs5bI8KugqbGPKXgaGyYFrqjNILelZunJekxh5MCGcUpbSgE0o2EmrZtwY8JlEa-DUV8CH_1j2a46UPiNisQshvc2Vv7IBvbVGVm6y1VYUCb2pbjqIXCsxkfdzPg6HMDLYCaEfH0paXB8u8E9BvauvfCb6-s-ecYZQMwpmz2MJaA6HI-wn0h6QIG"
                alt="Administrator profile"
                className="h-8 w-8 rounded-full border border-[rgba(17,86,56,0.2)] object-cover"
              />
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1600px] space-y-8 p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-1 block text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Overview</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Operational Dashboard</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-lg bg-surface-container p-1">
                <button
                  type="button"
                  onClick={() => setActiveRange('daily')}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold shadow-sm ${activeRange === 'daily' ? 'bg-white text-primary' : 'text-on-surface-variant'}`}
                >
                  Daily
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRange('weekly')}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors hover:text-on-surface ${activeRange === 'weekly' ? 'text-primary' : 'text-on-surface-variant'}`}
                >
                  Weekly
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRange('monthly')}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors hover:text-on-surface ${activeRange === 'monthly' ? 'text-primary' : 'text-on-surface-variant'}`}
                >
                  Monthly
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="flex items-center gap-2 rounded-lg bg-surface-container-highest px-4 py-2 text-sm font-semibold text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Clear Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.label} className="group relative overflow-hidden rounded-xl bg-surface-container-lowest p-6">
                <div className={`absolute left-0 top-0 h-full w-1 ${card.accent}`}></div>
                <div className="mb-4 flex items-start justify-between">
                  <span className={`material-symbols-outlined rounded-lg p-2 ${card.iconClass}`}>{card.icon}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${card.chipClass}`}>{card.chip}</span>
                </div>
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant">{card.label}</p>
                <p className="text-3xl font-extrabold tracking-tighter text-on-surface">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Weekly Claim Trends</h3>
                  <p className="text-xs text-on-surface-variant">System-wide claim volume (Last 7 Days)</p>
                </div>
                <span className="material-symbols-outlined cursor-pointer text-on-surface-variant transition-colors hover:text-primary">more_vert</span>
              </div>

              <svg viewBox="0 0 500 210" className="w-full" style={{ height: '220px' }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#115638" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#115638" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="20" y1={y} x2="480" y2={y} stroke="rgba(191,201,192,0.25)" strokeWidth="1" />
                ))}

                <path d={areaPath} fill="url(#areaGrad)" />
                <path d={linePath} fill="none" stroke="#115638" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {chartPoints.map((p) => (
                  <g key={p.day}>
                    <circle cx={p.x} cy={p.y} r="5" fill="#115638" stroke="white" strokeWidth="2" />
                    <text x={p.x} y="198" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6b7280">{p.day}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex flex-col gap-6 rounded-xl bg-surface-container-lowest p-6">
              <div>
                <h3 className="text-sm font-bold text-on-surface">Urgent Alerts</h3>
                <p className="text-xs text-on-surface-variant">AI-flagged risks &amp; anomalies</p>
              </div>

              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.title} className={`flex items-start gap-3 rounded-lg p-3 ${alert.cardClass}`}>
                    <span
                      className={`material-symbols-outlined ${alert.iconClass}`}
                      style={alert.fill ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
                    >
                      {alert.icon}
                    </span>
                    <div>
                      <p className={`text-xs font-bold ${alert.titleClass}`}>{alert.title}</p>
                      <p className="text-[10px] leading-relaxed text-on-surface-variant">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN.CLAIMS_QUEUE)}
                className="mt-auto w-full rounded-lg border border-[rgba(17,86,56,0.2)] py-2 text-xs font-bold text-primary transition-colors hover:bg-[rgba(17,86,56,0.05)]"
              >
                View All Alerts
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 rounded-xl bg-surface-container-lowest p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface">Recent Claims Queue</h3>
                <div className="flex gap-2">
                  <button type="button" className="rounded-md bg-[rgba(17,86,56,0.1)] px-3 py-1 text-[10px] font-bold text-primary">
                    Live Updates
                  </button>
                </div>
              </div>

              <div className="no-scrollbar overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(191,201,192,0.2)] text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant">
                      <th className="pb-3 pr-4">Claim ID</th>
                      <th className="pb-3 pr-4">Farmer Name</th>
                      <th className="pb-3 pr-4">Region</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-medium text-on-surface">
                    {filteredClaims.map((claim) => (
                      <tr key={claim.id} className="group border-b border-[rgba(191,201,192,0.1)] transition-colors hover:bg-surface-container-low">
                        <td className="py-4 font-mono font-bold text-primary">{claim.id}</td>
                        <td className="py-4">{claim.farmer}</td>
                        <td className="py-4">{claim.region}</td>
                        <td className="py-4">{claim.amount}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${claim.statusClass}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            type="button"
                            onClick={() => navigate(ROUTES.ADMIN.CLAIM_REVIEW)}
                            className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-primary"
                          >
                            chevron_right
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 rounded-xl bg-surface-container-lowest p-6">
              <div>
                <h3 className="text-sm font-bold text-on-surface">Regional Claims Map</h3>
                <p className="text-xs text-on-surface-variant">Highest volume concentration</p>
              </div>

              <div className="relative h-48 w-full overflow-hidden rounded-lg bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1KYszMEekYjgRqL1EtPNLzpzSdoTimLSoPYcTkTDCaFZtxIxK1tPFulOkOkI7ZKsKB6WSrrmp0JM_Mv5FIVe9LL8T15oo5cJv4CRpja-mDFjw60Q7PTGGMW3rlrO7Wk7NnOfK9FN7fzUGerh1HaRYFbVWsnzXoLGGP39jTMGDRTBU0Dg8Aq1DV9YGLaf-oAyht0Awiz2sfHSczGxm3qdPJIqzOsxBMby75OVkXa1vwNyCBerlZCjl5sMSPe5UVJxw4P4kiu9gtQYK"
                  alt="Regional activity map"
                  className="h-full w-full object-cover opacity-50 mix-blend-multiply"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined animate-pulse text-4xl text-primary"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  >
                    location_on
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {regions.map((region) => (
                  <div key={region.name} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-on-surface-variant">{region.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-container-highest">
                        <div className="h-full bg-primary" style={{ width: `${region.progress}%` }}></div>
                      </div>
                      <span className="font-bold text-on-surface">{region.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl bg-primary p-6 text-on-primary-container shadow-lg shadow-[rgba(17,86,56,0.1)]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.1em] opacity-80">Sync Status</h4>
                <p className="text-2xl font-black tracking-tight">Active Nodes: 124</p>
                <p className="mt-1 text-[10px] font-medium opacity-70">Next satellite relay in 12m 45s</p>
              </div>
              <span className="material-symbols-outlined text-3xl opacity-30">satellite_alt</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-surface-container-highest p-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">System Health</h4>
                <p className="text-2xl font-black tracking-tight text-on-surface">Optimal</p>
                <p className="mt-1 text-[10px] font-medium text-on-secondary-fixed-variant">All services reporting 99.9% uptime</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-secondary">terminal</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-surface-container-lowest p-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Total Payouts</h4>
                <p className="text-2xl font-black tracking-tight text-on-surface">₹2.4B</p>
                <p className="mt-1 text-[10px] font-medium text-emerald-600">Disbursed Q1 2026</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-primary">payments</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}