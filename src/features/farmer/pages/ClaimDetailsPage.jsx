import { Link, useNavigate } from 'react-router-dom'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import './ClaimDetailsPage.css'

export function ClaimDetailsPage() {
  const navigate = useNavigate()
  const modelConfidence = 92
  const confidenceBand = modelConfidence >= 85 ? 'High Confidence' : modelConfidence >= 70 ? 'Moderate Confidence' : 'Low Confidence'

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/farmer/my-claims')
  }

  return (
    <div className="claim-details-root bg-background text-on-surface">
      <header className="fixed top-0 z-50 w-full bg-[#f7faf7]/80 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] backdrop-blur-md dark:bg-stone-900/80">
        <div className="flex w-full max-w-full items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight text-[#115638] dark:text-[#4ade80]">Annadata Connect</span>
            <nav className="hidden gap-6 md:flex">
              <Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" to="/farmer/dashboard">Dashboard</Link>
              <Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" to="/farmer/my-claims">Reports</Link>
              <Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" to="/farmer/chatbot">AI Insights</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-1 text-stone-700 font-medium transition-colors hover:bg-surface-container-low">
              <span className="material-symbols-outlined">translate</span>
              <span className="text-sm">Language</span>
            </button>
            <div className="relative">
              <span className="material-symbols-outlined text-stone-700">notifications</span>
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-error" />
            </div>
            <img
              alt="User Profile Avatar"
              className="h-8 w-8 rounded-full border-2 border-white bg-surface-container-high shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC5lmwttjm8E1zLwxZ4Gt-jicXhe6uHge65VnNVC9KyosH2zRI57IuWTp-3I9hK39vMudJkE_h94cGdCdkPNefp5X7ih3ir5SIppwrEm6G5-EunI5_PM2AvRKleolmYVeJz4HADgk9coZ4IQnDjH0xFFyGprfGJL4OhEtdTAyvFFPuSwmCxb9W6NdEB_hi9RcfEHQ5da8hJpjnCYv91yzygTmC-hE8CES3NPmcKC4EY9073mm6eUJB-sHLKSv1DvZ5Fp8wADDR1hsx"
            />
          </div>
        </div>
      </header>

      <FarmerSidebar />

      <main className="px-6 pb-32 pt-24 lg:ml-64 lg:px-12">
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <button type="button" onClick={handleBack} className="mb-2 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="text-sm font-semibold uppercase tracking-widest">Back to Claims</span>
            </button>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">Claim ID: #C-882910</h1>
            <p className="max-w-xl font-medium text-stone-500">Submitted on October 24, 2023 • Wheat Field Alpha-7</p>
          </div>
          <div className="flex gap-3">
            <button type="button" className="rounded-xl bg-surface-container-high px-6 py-3 font-bold text-on-surface transition-all hover:opacity-90">Download Receipt</button>
            <button type="button" className="rounded-xl bg-gradient-to-br from-primary to-primary-container px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95">Update Evidence</button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <section className="rounded-3xl bg-surface-container-lowest p-8 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)]">
              <h3 className="mb-8 text-lg font-bold uppercase tracking-widest text-stone-400">Processing Status</h3>
              <div className="relative flex items-start justify-between">
                <div className="absolute left-0 top-6 -z-10 h-1 w-full bg-surface-container-low" />
                <div className="absolute left-0 top-6 -z-10 h-1 w-2/3 bg-primary" />
                <div className="flex max-w-[120px] flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-white">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                  <p className="text-sm font-bold text-on-surface">Submitted</p>
                  <p className="text-xs text-stone-500">Oct 24, 10:45 AM</p>
                </div>
                <div className="flex max-w-[120px] flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-white ring-4 ring-primary-container/20">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                  <p className="text-sm font-bold text-on-surface">Under Review</p>
                  <p className="text-xs text-stone-500">In Progress</p>
                </div>
                <div className="flex max-w-[120px] flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-surface-container-high text-stone-400">
                    <span className="material-symbols-outlined">gavel</span>
                  </div>
                  <p className="text-sm font-bold text-stone-400">Decision</p>
                  <p className="text-xs text-stone-400">Pending</p>
                </div>
              </div>
            </section>

            <section className="rounded-bl-xl rounded-br-[3rem] rounded-tl-[3rem] rounded-tr-xl bg-surface-container-low p-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div>
                  <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Claim Details
                  </h3>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1"><label className="text-xs font-bold uppercase text-stone-500">Crop Type</label><p className="text-lg font-semibold">Premium Winter Wheat</p></div>
                    <div className="flex flex-col gap-1"><label className="text-xs font-bold uppercase text-stone-500">Acreage Affected</label><p className="text-lg font-semibold">42.5 Acres</p></div>
                    <div className="flex flex-col gap-1"><label className="text-xs font-bold uppercase text-stone-500">Reported Cause</label><p className="text-lg font-semibold">Localized Hailstorm Damage</p></div>
                  </div>
                </div>
                <div className="rounded-2xl bg-surface-container-lowest p-6">
                  <h4 className="mb-4 font-bold text-stone-600">Farmer's Statement</h4>
                  <p className="font-body italic leading-relaxed text-stone-700">"Severe hailstorm on the evening of Oct 23rd. Most of the north-facing slope crops have been flattened. Estimating significant yield loss for the upcoming harvest cycle."</p>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold">Evidence Gallery</h3>
                <span className="text-sm font-semibold text-primary">6 Photos Total</span>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm"><img alt="Crop Damage 1" className="h-full w-full object-cover transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASlVQUSrAmMH-i8gZ8ncroa-xaoFIgvP-LrNtciljzxGZ7aq2N8FTxcbLQxoyIjYOMz3PEFptxpr2VTql_CpD8hc-szb3VR4Ybju70FoMEGNmt8d9WZy0-xwtBReBvJ5KlR7sSgBrA_QWuhMZJAyvsE01rSmF9xb1k02C3lsPOtQA3kkNPy0iYnc6RPDwimSeTQ2vxlni6d5L_oMo8FR7YcpK-7Zb9nhdPrZFI0HGfXLe9ymbkk1_M-co1N65csMBcOAJeZjAFiXGn" /><div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" /></div>
                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm"><img alt="Crop Damage 2" className="h-full w-full object-cover transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg9mTP77FzXlYNZbUPixYicTdue2wR69rKNDh0cKzwZGqffosFWEUFYasV7eqqVnYpD-rFRzwhEF7zLpOHR6x5I9ydMFY2XNwRDExbJfAIgAAGseYx_IsEV5MFABgl2mQmuUPR5A-OETXOxS8J0bO5c0OwmpBD3K3nBksyCMT0SzDRpiDeZWSEi9z8T6kCJJSU18-M33ngCQhSBfaCONZ-G4oO1j8zXY3990hGUveJBYZw32VDiBEix2vheyLrfWULKzuDo0ykO37Y" /><div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" /></div>
                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm"><img alt="Crop Damage 3" className="h-full w-full object-cover transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdcy0jGCMKa8o9Xkjsr2qNz84fxQo0Qn5lssthHyHDSd6tycOSwBe8JyBl-xbctojD5rpyqAEjfd4LL7-vjrWdUlLnvTGT6xkxL7NsjA-jnmFvfyJXksYcNa51BMczRm-bpiCnxU6-yc5mZn00tHVfZ38azqmokkyf5s0_fOJZrL7xyBokSsyPdg2eDBemTh345uig1_RDG7Mn5UPOycFczm_En_7pQUBPk4IwDOq5F5HlwRRiVjYHU0jYVX3do1obeU5_XyG04SvH" /><div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"><span className="font-bold text-white">+3 More</span></div></div>
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:col-span-4">
            <section className="relative overflow-hidden rounded-[2.5rem] bg-[#115638] p-8 text-on-primary-container shadow-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent opacity-10" />
              <div className="relative z-10">
                <div className="mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined rounded-xl bg-primary-container p-2">auto_awesome</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Claim Analysis</h3>
                    <p className="text-xs uppercase tracking-widest text-white/70">Decision support only</p>
                  </div>
                </div>

                <div className="mb-8 rounded-2xl border border-white/20 bg-white/5 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">AI Prediction</p>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-white">High</span>
                    <div className="mb-2 flex gap-1" aria-hidden>
                      <div className="h-4 w-4 rounded-full bg-white" />
                      <div className="h-4 w-4 rounded-full bg-white" />
                      <div className="h-4 w-4 rounded-full bg-white" />
                      <div className="h-4 w-4 rounded-full bg-white/30" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white/85">Predicted damage severity based on uploaded photos and regional weather signals.</p>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-primary-container/40 p-4">
                    <p className="mb-1 text-xs text-white/60">Confidence Score</p>
                    <p className="text-2xl font-bold text-white">{modelConfidence}%</p>
                    <p className="text-xs font-semibold text-white/80">{confidenceBand}</p>
                  </div>
                  <div className="rounded-2xl bg-primary-container/40 p-4">
                    <p className="mb-1 text-xs text-white/60">Estimated Impact Area</p>
                    <p className="text-2xl font-bold text-white">38.4 acres</p>
                    <p className="text-xs text-white/80">Derived from image segmentation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-white">Why the model predicted this</h4>
                  <div className="rounded-2xl border border-white/10 bg-surface-container-lowest/10 p-5 backdrop-blur-md">
                    <p className="mb-3 text-sm leading-relaxed text-white/90">
                      Visual evidence confirms mechanical flattening consistent with weather-related impact. Spectral analysis of recent satellite data
                      shows significant biomass reduction in the target area.
                    </p>
                    <p className="text-xs uppercase tracking-widest text-white/70">Recommendation: Prioritize for officer review</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex gap-4 rounded-3xl border-2 border-error/30 bg-error-container p-6">
              <span className="material-symbols-outlined text-on-error-container">gavel</span>
              <div>
                <p className="mb-1 text-sm font-extrabold uppercase tracking-wide text-on-error-container">Final Decision by Officer</p>
                <p className="text-xs leading-relaxed text-on-error-container opacity-90">
                  AI outputs are advisory only. Claim approval or rejection is decided by the assigned officer after verification and policy review.
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] bg-surface-container-high p-8">
              <h3 className="mb-6 font-bold text-on-surface">Need Assistance?</h3>
              <div className="space-y-4">
                <button type="button" className="flex w-full items-center justify-center gap-3 rounded-xl bg-surface-container-lowest py-4 font-bold text-on-surface transition-colors hover:bg-white"><span className="material-symbols-outlined">chat</span>Talk to Support</button>
                <button type="button" className="flex w-full items-center justify-center gap-3 rounded-xl bg-surface-container-lowest py-4 font-bold text-on-surface transition-colors hover:bg-white"><span className="material-symbols-outlined">call</span>Request Field Visit</button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  )
}
