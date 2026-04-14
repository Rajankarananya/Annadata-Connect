import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminSidebar } from '../../../components/layout/AdminSidebar'
import { ROUTES } from '../../../constants/navigation'

import './ClaimsQueuePage.css'

const queueRows = [
  {
    claimId: '#CLM-98241',
    name: 'Ramesh Deshmukh',
    farmerId: 'ID: 8821-4431',
    crop: 'Turmeric',
    cropDot: 'bg-yellow-500',
    location: 'Nandurbar, MH',
    riskLabel: 'CRITICAL',
    riskIcon: 'warning',
    riskClass: 'bg-error-container text-on-error-container ring-1 ring-error/20',
    status: 'PENDING',
    statusClass: 'bg-surface-container-highest text-on-surface-variant',
    date: '24 Oct, 2023',
  },
  {
    claimId: '#CLM-98239',
    name: 'Sunita Patil',
    farmerId: 'ID: 1024-9982',
    crop: 'Cotton',
    cropDot: 'bg-emerald-500',
    location: 'Akola, MH',
    riskLabel: 'LOW',
    riskIcon: 'check_circle',
    riskClass: 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary/20',
    status: 'VERIFIED',
    statusClass: 'bg-emerald-100 text-emerald-800',
    date: '23 Oct, 2023',
  },
  {
    claimId: '#CLM-98238',
    name: 'Anil Kulkarni',
    farmerId: 'ID: 4432-1100',
    crop: 'Sugarcane',
    cropDot: 'bg-orange-400',
    location: 'Kolhapur, MH',
    riskLabel: 'MODERATE',
    riskIcon: 'monitoring',
    riskClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    status: 'PENDING',
    statusClass: 'bg-surface-container-highest text-on-surface-variant',
    date: '23 Oct, 2023',
  },
  {
    claimId: '#CLM-98237',
    name: 'Meera Bai',
    farmerId: 'ID: 0092-4412',
    crop: 'Turmeric',
    cropDot: 'bg-yellow-500',
    location: 'Nandurbar, MH',
    riskLabel: 'RE-SUBMITTED',
    riskIcon: 'history',
    riskClass: 'bg-error-container text-on-error-container',
    status: 'FLAGGED',
    statusClass: 'bg-error-container text-on-error-container',
    date: '22 Oct, 2023',
  },
]

export function ClaimsQueuePage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return queueRows.filter((row) => {
      const matchesQuery =
        !query ||
        [row.claimId, row.name, row.farmerId, row.crop, row.location].some((field) => field.toLowerCase().includes(query))

      const matchesStatus = statusFilter === 'All' || row.status === statusFilter.toUpperCase()
      const matchesRisk = riskFilter === 'All' || row.riskLabel === riskFilter.toUpperCase()

      return matchesQuery && matchesStatus && matchesRisk
    })
  }, [searchTerm, statusFilter, riskFilter])

  const totalRows = filteredRows.length
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setRiskFilter('All')
    setPage(1)
  }

  return (
    <div className="claims-queue-page flex min-h-screen bg-surface text-on-surface" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AdminSidebar />

      <main className="flex min-w-0 flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-[rgba(236,253,245,0.8)] px-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)] backdrop-blur-xl">
          <div className="flex flex-1 items-center gap-6">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-zinc-400">search</span>
              <input
                type="text"
                className="w-full rounded-xl border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-primary/20"
                placeholder="Search claims, farmers, or IDs..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                  setPage(1)
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="relative rounded-full p-2 text-emerald-900 transition-colors hover:bg-emerald-100/50">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-emerald-50 bg-error"></span>
            </button>

            <button type="button" className="rounded-full p-2 text-emerald-900 transition-colors hover:bg-emerald-100/50">
              <span className="material-symbols-outlined">language</span>
            </button>

            <div className="mx-2 h-8 w-px bg-emerald-200/50"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="hidden text-right md:block">
                <p className="text-sm font-bold leading-none text-emerald-900">Admin Portal</p>
                <p className="text-[0.7rem] font-medium text-zinc-500">Administrator</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChTwpYDNJysP4tB9Mc7OCU6jBBmHYJVswgZkmIaKXlp9dONSHg1bKxMmjWLfFRVFhpiq7aSvWRY81WRrZEFoEtd43WZnZ2xqLaiE9TwmB39MxORSFXLLTE6A_V7yxZwn72YX-N0rB90LxQnJN7CS0eusi9Bf0TqoPk8DZl1VM--7zkd9jmLwroLxGr_FWSbCrjUpNCJUstDpqduk2wI7xejdVobg4W5eETzj4RKeBsOPEmeaT6o8rhRZBb5eZ-7OWVEXq9weHNqQGP"
                alt="Administrator profile"
                className="h-9 w-9 rounded-xl object-cover ring-2 ring-emerald-100"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1600px] p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="label-caps font-bold text-on-surface-variant">Verification Engine</span>
              <h2 className="editorial-header mt-1 text-4xl font-black tracking-tighter text-on-surface">Claims Queue</h2>
              <p className="mt-2 max-w-xl text-on-surface-variant">
                Review and process insurance claims with AI-driven risk assessment and yield analytics.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN.REPORTS)}
                className="flex items-center gap-2 rounded-xl bg-surface-container-high px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export List
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN.CLAIM_REVIEW)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                Batch Approve
              </button>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm">
              <p className="label-caps text-on-surface-variant">Pending Review</p>
              <h3 className="mt-2 text-3xl font-bold text-on-surface">1,284</h3>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-primary">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                +12% from yesterday
              </div>
            </div>

            <div className="rounded-xl border-l-4 border-tertiary bg-surface-container-lowest p-6 shadow-sm">
              <p className="label-caps text-on-surface-variant">High Risk Flagged</p>
              <h3 className="mt-2 text-3xl font-bold text-tertiary">42</h3>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-on-tertiary-fixed-variant">Requires immediate audit</div>
            </div>

            <div className="rounded-xl border-l-4 border-secondary bg-surface-container-lowest p-6 shadow-sm">
              <p className="label-caps text-on-surface-variant">Avg. Processing</p>
              <h3 className="mt-2 text-3xl font-bold text-on-surface">
                2.4 <span className="text-sm font-medium text-zinc-400">days</span>
              </h3>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                -0.5 days optimization
              </div>
            </div>

            <div className="rounded-xl border-l-4 border-outline bg-surface-container-lowest p-6 shadow-sm">
              <p className="label-caps text-on-surface-variant">Total Value</p>
              <h3 className="mt-2 text-3xl font-bold text-on-surface">₹4.2M</h3>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-zinc-400">FY 2023-24 Q3</div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-surface-container-low p-4">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              <span className="text-sm font-bold">Filters:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setPage(1)
              }}
              className="rounded-lg border-none bg-white px-4 py-2 text-xs font-semibold outline-none ring-1 ring-outline-variant/30 focus:ring-primary"
            >
              <option value="All">Status: All</option>
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="FLAGGED">Flagged</option>
            </select>

            <select
              value={riskFilter}
              onChange={(event) => {
                setRiskFilter(event.target.value)
                setPage(1)
              }}
              className="rounded-lg border-none bg-white px-4 py-2 text-xs font-semibold outline-none ring-1 ring-outline-variant/30 focus:ring-primary"
            >
              <option value="All">Risk Level: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="MODERATE">Moderate</option>
              <option value="LOW">Low</option>
              <option value="RE-SUBMITTED">Re-submitted</option>
            </select>

            <select className="rounded-lg border-none bg-white px-4 py-2 text-xs font-semibold outline-none ring-1 ring-outline-variant/30 focus:ring-primary">
              <option>District: All</option>
              <option>Nandurbar</option>
              <option>Nashik</option>
              <option>Pune</option>
            </select>

            <div className="relative flex items-center">
              <input
                type="text"
                className="w-48 rounded-lg border-none bg-white px-4 py-2 text-xs font-semibold outline-none ring-1 ring-outline-variant/30 focus:ring-primary"
                placeholder="Date Range"
              />
              <span className="material-symbols-outlined absolute right-2 text-sm text-zinc-400">calendar_today</span>
            </div>

            <div className="ml-auto flex gap-2">
              <button type="button" onClick={resetFilters} className="px-2 text-xs font-bold text-primary hover:underline">
                Clear All
              </button>
              <div className="h-4 w-px self-center bg-outline-variant/50"></div>
              <span className="text-xs font-medium text-zinc-500">Showing {pageRows.length ? (currentPage - 1) * rowsPerPage + 1 : 0}-{Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)]">
            <div className="custom-scrollbar overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-10 bg-surface-container-lowest">
                  <tr className="bg-surface-container-low/50">
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">
                      <div className="flex cursor-pointer items-center gap-1 hover:text-primary">
                        Claim ID <span className="material-symbols-outlined text-[14px]">unfold_more</span>
                      </div>
                    </th>
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">Farmer Name</th>
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">Crop</th>
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">Location</th>
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        Risk Level (AI)
                        <span className="material-symbols-outlined text-[16px] text-primary" title="AI Confidence > 85%">
                          info
                        </span>
                      </div>
                    </th>
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">Status</th>
                    <th className="label-caps px-6 py-4 font-black text-on-surface-variant">Date</th>
                    <th className="label-caps px-6 py-4 text-center font-black text-on-surface-variant">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {pageRows.map((row) => (
                    <tr key={row.claimId} className="cubic-ease transition-colors hover:bg-surface-container-low">
                      <td className="px-6 py-5 font-mono text-sm font-bold text-primary">{row.claimId}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">{row.name}</span>
                          <span className="text-[0.75rem] text-zinc-500">{row.farmerId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${row.cropDot}`}></span>
                          <span className="text-sm font-medium">{row.crop}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm">{row.location}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold ${row.riskClass}`}>
                          <span className="material-symbols-outlined text-[14px]">{row.riskIcon}</span>
                          {row.riskLabel}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`rounded-lg px-2.5 py-1 text-[0.7rem] font-bold ${row.statusClass}`}>{row.status}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-zinc-600">{row.date}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(ROUTES.ADMIN.CLAIM_REVIEW)}
                            className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
                          >
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                          <button type="button" className="rounded-lg p-2 text-zinc-400 transition-colors hover:text-on-surface">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-surface-container bg-surface-container-low/30 px-6 py-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-on-surface-variant">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(event) => {
                    setRowsPerPage(Number(event.target.value))
                    setPage(1)
                  }}
                  className="border-none bg-transparent text-xs font-bold outline-none focus:ring-0"
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                  className="rounded-lg p-2 transition-colors hover:bg-surface-container-high disabled:opacity-30"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => {
                    const pageNumber = index + 1
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => setPage(pageNumber)}
                        className={`h-8 w-8 rounded-lg text-xs font-bold ${currentPage === pageNumber ? 'bg-primary text-white' : 'hover:bg-surface-container-high'}`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                  {totalPages > 3 ? <span className="flex h-8 w-8 items-center justify-center text-xs">...</span> : null}
                  {totalPages > 3 ? (
                    <button type="button" onClick={() => setPage(totalPages)} className="h-8 w-8 rounded-lg text-xs font-bold hover:bg-surface-container-high">
                      {totalPages}
                    </button>
                  ) : null}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
                  className="rounded-lg p-2 transition-colors hover:bg-surface-container-high disabled:opacity-30"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex h-full flex-col rounded-xl bg-surface-container-lowest p-8 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold tracking-tight">Geospatial Risk Mapping</h4>
                    <p className="text-sm text-on-surface-variant">Real-time flood and drought anomaly detection.</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">map</span>
                </div>

                <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-lg bg-surface-container">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXblM8FYQEPOsO90ifYA-CwGzeZBd3ivvKmBRm5f0wW7_4h3cYaniSCC5J3ISWa72qQ6gmscFO5C3Mx-E-dOy1o6upCU50hn3MUqL4eLo9p5CqlTJktywJtsPUHErkHS5zXTmdD49jh00zuKLw1chRr0SD3aqzeJ1bUxCzT0LoRCICbUaFFEgJFBitnl1l1_QyzsgufG-tbFckZylsZQn-qv2f3PY_lg3gCZbHzXrsj-9AeCs2o-6UkV5BnV2qZQpeElvrCLbbSppf"
                    alt="agricultural topography map"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-primary/10"></div>
                  <div className="absolute left-4 top-4 rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur">
                    <p className="label-caps mb-1 text-[0.6rem] font-bold">Anomalies Detected</p>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-error"></span>
                      <span className="text-xs font-bold">Nandurbar (Flash Flood)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-full rounded-xl bg-gradient-to-br from-emerald-900 to-primary-container p-8 text-white shadow-xl">
                <span className="material-symbols-outlined mb-4 text-4xl opacity-50">psychology</span>
                <h4 className="mb-4 text-2xl font-black leading-tight">AI Confidence Score Overview</h4>
                <p className="mb-8 text-sm text-emerald-100/80">
                  Our neural network has flagged 42 claims as outliers based on historical yield variance and satellite imagery discrepancies.
                </p>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span>IMAGE CONSISTENCY</span>
                      <span>94%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[94%] bg-secondary-fixed"></div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span>YIELD ACCURACY</span>
                      <span>81%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[81%] bg-secondary-fixed"></div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span>WEATHER ALIGNMENT</span>
                      <span>67%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[67%] bg-tertiary-fixed-dim"></div>
                    </div>
                  </div>
                </div>

                <button type="button" className="mt-10 w-full rounded-xl bg-white py-3 text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-50">
                  View Model Details
                </button>
              </div>
            </div>
          </div>
      </div>
      </main>
    </div>
  )
}
