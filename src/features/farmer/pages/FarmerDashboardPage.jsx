import { Link, useNavigate } from 'react-router-dom'

import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import './FarmerDashboardPage.css'

export function FarmerDashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-on-surface min-h-screen farmer-dashboard-root">
      <FarmerSidebar />

      <main className="min-h-screen lg:ml-64">
        <header className="editorial-shadow fixed left-0 right-0 top-0 z-30 flex items-center justify-between bg-[#f7faf7]/80 px-6 py-4 backdrop-blur-md lg:left-64">
          <div className="flex items-center gap-4">
            <h2 className="font-headline text-xl font-bold tracking-tight text-[#115638]">Dashboard</h2>
            <span className="hidden h-6 w-px bg-stone-200 md:block" />
            <nav className="hidden gap-6 md:flex">
              <Link className="border-b-2 border-[#115638] pb-1 text-sm font-medium text-[#115638]" to="/farmer/dashboard">Dashboard</Link>
              <a className="text-sm font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" href="#">Reports</a>
              <a className="text-sm font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" href="#">AI Insights</a>
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-200">
              <span className="material-symbols-outlined text-sm">translate</span>
              Language
            </button>
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="h-10 w-10 overflow-hidden rounded-full bg-stone-200">
                <img
                  alt="User Profile Avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmXfS16ER2Gkk65x1zDqtXBE1aVSKwN_FbFcDbrnbn1gV-IrSUDkDgLV9_o3jbRRjKleCzucWyhMR-w4HSIcYvkiBviokAJiMC19j9ERIoAlCgk_jAu4kF_Yl8EhuvDMYe_jhhdhYJMH-vu59ZLORO_aTdRPCNipq9l9sY3bfAw-p6pELjyYz2gIdPt9_cMAZrNm2K_7kpVMBNV3rSpoplmMftTu0CrhQyLDX2q4XIMgBD3VDecufb5gIEtX-YP_fECeyJplXbt_7X"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-8 px-6 pb-20 pt-24">
          <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Kisan Krishi Seva</h1>
              <p className="max-w-md text-stone-600 font-medium">
                Welcome back, Rajesh. Your crop health is looking stable across 14 hectares. We have detected new market opportunities for your Wheat harvest.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/farmer/new-claim')}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-on-primary shadow-lg transition-transform active:scale-95"
                style={{ background: 'linear-gradient(135deg, #115638, #2f6f4f)' }}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  add_circle
                </span>
                New Claim
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="asymmetric-card editorial-shadow space-y-4 bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined text-3xl">receipt_long</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Overview</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">32</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">Total Claims Filed</p>
              </div>
            </div>

            <div className="asymmetric-card editorial-shadow space-y-4 bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <span className="material-symbols-outlined text-3xl">pending_actions</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">In Review</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">12</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">Pending Approval</p>
              </div>
            </div>

            <div className="asymmetric-card editorial-shadow space-y-4 border-l-4 border-primary bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Success</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">15</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">Claims Approved</p>
              </div>
            </div>

            <div className="asymmetric-card editorial-shadow space-y-4 bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error-container text-error">
                  <span className="material-symbols-outlined text-3xl">cancel</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-error">Issues</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">5</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">Claims Rejected</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="editorial-shadow rounded-3xl bg-surface-container-low p-8">
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-on-surface">Claim Distribution</h3>
                    <p className="text-sm text-stone-500">Visual breakdown of processing status</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-bold text-primary">
                    Monthly <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                  </button>
                </div>

                <div className="flex flex-col items-center gap-12 md:flex-row">
                  <div className="relative flex h-48 w-48 items-center justify-center">
                    <svg className="-rotate-90 h-full w-full" viewBox="0 0 100 100">
                      <circle className="text-stone-200" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12" />
                      <circle className="text-primary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="125" strokeLinecap="round" strokeWidth="12" />
                      <circle className="text-amber-500" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="200" strokeLinecap="round" strokeWidth="12" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-headline text-3xl font-black">84%</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-400">Efficiency</span>
                    </div>
                  </div>

                  <div className="w-full flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-primary" /> Approved
                        </span>
                        <span className="text-stone-400">47%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-surface-container-highest">
                        <div className="h-3 w-[47%] rounded-full bg-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500" /> Pending
                        </span>
                        <span className="text-stone-400">38%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-surface-container-highest">
                        <div className="h-3 w-[38%] rounded-full bg-amber-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-error" /> Rejected
                        </span>
                        <span className="text-stone-400">15%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-surface-container-highest">
                        <div className="h-3 w-[15%] rounded-full bg-error" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-xl font-bold text-on-surface">Recent Activity</h3>
                  <button className="text-sm font-bold text-primary hover:underline">View All</button>
                </div>

                <div className="space-y-4">
                  <div className="flex cursor-pointer gap-4 rounded-2xl bg-surface-container-lowest p-5 transition-transform hover:translate-x-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                      <span className="material-symbols-outlined text-primary">task_alt</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-on-surface">Claim #AC-9821 Approved</h4>
                        <span className="text-xs font-medium text-stone-400">2 hours ago</span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">Your insurance claim for Wheat field frost damage has been approved for Rs 45,000.</p>
                    </div>
                  </div>

                  <div className="flex cursor-pointer gap-4 rounded-2xl bg-surface-container-lowest p-5 transition-transform hover:translate-x-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                      <span className="material-symbols-outlined text-amber-600">mark_chat_unread</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-on-surface">New Agent Message</h4>
                        <span className="text-xs font-medium text-stone-400">5 hours ago</span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">Officer Shinde requested additional photos of the irrigation setup for verification.</p>
                    </div>
                  </div>

                  <div className="flex cursor-pointer gap-4 rounded-2xl bg-surface-container-lowest p-5 transition-transform hover:translate-x-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100">
                      <span className="material-symbols-outlined text-stone-600">cloud_sync</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-on-surface">Weather Alert Synchronized</h4>
                        <span className="text-xs font-medium text-stone-400">Yesterday</span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">Extreme heat warning issued for next 48 hours. AI Advisor recommends early irrigation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="editorial-shadow space-y-6 rounded-3xl p-8 text-on-primary" style={{ background: 'linear-gradient(135deg, #115638, #2f6f4f)' }}>
                <h3 className="font-headline text-xl font-bold">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/farmer/new-claim')}
                    className="group flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>add_box</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">New Claim</p>
                      <p className="text-[10px] text-white/60">Start a new insurance request</p>
                    </div>
                  </button>

                  <button className="group flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">AI Consult</p>
                      <p className="text-[10px] text-white/60">Ask our chatbot about crops</p>
                    </div>
                  </button>

                  <button className="group flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>report_problem</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Grievance</p>
                      <p className="text-[10px] text-white/60">File a complaint or issue</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="asymmetric-card editorial-shadow group relative overflow-hidden rounded-3xl bg-surface-container-lowest p-8">
                <div className="relative z-10 space-y-4">
                  <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">AI Suggestion</span>
                  <h3 className="font-headline text-xl font-bold leading-tight text-on-surface">Switch to Organic Pest Control?</h3>
                  <p className="text-sm text-stone-500">Farmers in your region using bio-organic spray saw a 12% increase in Wheat yield last season.</p>
                  <button className="flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                    Read Case Study <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <div className="absolute -bottom-4 -right-4 scale-150 opacity-10 transition-transform duration-700 group-hover:rotate-12">
                  <span className="material-symbols-outlined text-9xl">psychology</span>
                </div>
              </div>

              <div className="editorial-shadow relative overflow-hidden rounded-3xl bg-surface-container-low p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-stone-400">Current Weather</p>
                    <h4 className="font-headline mt-1 text-3xl font-black">32C</h4>
                    <p className="text-sm font-semibold text-stone-600">Clear Skies · Hisar</p>
                  </div>
                  <span className="material-symbols-outlined text-6xl text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>sunny</span>
                </div>

                <div className="scrollbar-hide mt-8 flex gap-4 overflow-x-auto pb-2">
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">1PM</span>
                    <span className="material-symbols-outlined my-1 text-lg text-amber-500">sunny</span>
                    <span className="text-xs font-bold">32°</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">2PM</span>
                    <span className="material-symbols-outlined my-1 text-lg text-amber-500">sunny</span>
                    <span className="text-xs font-bold">34°</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">3PM</span>
                    <span className="material-symbols-outlined my-1 text-lg text-stone-400">partly_cloudy_day</span>
                    <span className="text-xs font-bold">33°</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">4PM</span>
                    <span className="material-symbols-outlined my-1 text-lg text-stone-400">cloud</span>
                    <span className="text-xs font-bold">31°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[2rem] border-t border-stone-100 bg-white/90 px-4 pb-6 pt-3 shadow-[0_-8px_24px_rgba(18,28,27,0.04)] backdrop-blur-xl lg:hidden">
        <Link className="group flex flex-col items-center justify-center rounded-2xl bg-[#f1f4f1] px-5 py-2 text-[#115638] transition-transform active:scale-90" to="/farmer/dashboard">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
          <span className="mt-1 text-[11px] font-bold">Home</span>
        </Link>
        <a className="group flex flex-col items-center justify-center px-5 py-2 text-stone-400 transition-transform active:scale-90" href="#">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="mt-1 text-[11px] font-bold">AI Consult</span>
        </a>
        <Link className="group flex flex-col items-center justify-center px-5 py-2 text-stone-400 transition-transform active:scale-90" to="/farmer/new-claim">
          <span className="material-symbols-outlined">history_edu</span>
          <span className="mt-1 text-[11px] font-bold">Claims</span>
        </Link>
        <a className="group flex flex-col items-center justify-center px-5 py-2 text-stone-400 transition-transform active:scale-90" href="#">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="mt-1 text-[11px] font-bold">Profile</span>
        </a>
      </nav>

      <button
        type="button"
        onClick={() => navigate('/farmer/new-claim')}
        className="group fixed bottom-28 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full text-on-primary shadow-2xl transition-transform active:scale-90 lg:bottom-12 lg:right-12"
        style={{ background: 'linear-gradient(135deg, #115638, #2f6f4f)' }}
      >
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>
      </button>
    </div>
  )
}
