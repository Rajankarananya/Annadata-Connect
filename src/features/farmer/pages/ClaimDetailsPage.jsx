import { Link } from 'react-router-dom'

import './ClaimDetailsPage.css'

export function ClaimDetailsPage() {
  return (
    <div className="claim-details-root bg-background text-on-surface">
      <header className="fixed top-0 z-50 w-full bg-[#f7faf7]/80 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] backdrop-blur-md dark:bg-stone-900/80">
        <div className="flex w-full max-w-full items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight text-[#115638] dark:text-[#4ade80]">Annadata Connect</span>
            <nav className="hidden gap-6 md:flex">
              <Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" to="/farmer/dashboard">Dashboard</Link>
              <button type="button" className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400">Reports</button>
              <button type="button" className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400">AI Insights</button>
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

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-[#f1f4f1] dark:bg-stone-900 lg:flex">
        <div className="p-6 pt-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-[#115638] dark:text-[#4ade80]">Annadata Connect</h2>
              <p className="font-manrope text-xs font-bold tracking-wide text-stone-500">Smart Agriculture</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50" to="/farmer/dashboard">
              <span className="material-symbols-outlined">home</span>
              <span className="font-manrope text-sm font-bold tracking-wide">Home</span>
            </Link>
            <button type="button" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50">
              <span className="material-symbols-outlined">eco</span>
              <span className="font-manrope text-sm font-bold tracking-wide">My Crops</span>
            </button>
            <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50" to="/farmer/chatbot">
              <span className="material-symbols-outlined">psychology</span>
              <span className="font-manrope text-sm font-bold tracking-wide">AI Advisor</span>
            </Link>
            <div className="ml-4 flex items-center gap-3 rounded-l-full bg-white py-3 pl-4 shadow-sm text-[#115638] dark:bg-stone-800 dark:text-[#4ade80]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
              <span className="font-manrope text-sm font-bold tracking-wide">Claims</span>
            </div>
            <button type="button" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50">
              <span className="material-symbols-outlined">storefront</span>
              <span className="font-manrope text-sm font-bold tracking-wide">Market</span>
            </button>
          </nav>
        </div>
        <div className="mt-auto space-y-2 p-6">
          <Link className="flex items-center gap-3 rounded-lg px-4 py-2 text-stone-600 transition-colors hover:bg-stone-200/50" to="/farmer/profile">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-manrope text-sm font-bold tracking-wide">Settings</span>
          </Link>
          <Link className="flex items-center gap-3 rounded-lg px-4 py-2 text-stone-600 transition-colors hover:bg-stone-200/50" to="/farmer/grievances">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-manrope text-sm font-bold tracking-wide">Support</span>
          </Link>
        </div>
      </aside>

      <main className="px-6 pb-32 pt-24 lg:ml-64 lg:px-12">
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Link to="/farmer/my-claims" className="mb-2 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="text-sm font-semibold uppercase tracking-widest">Back to Claims</span>
            </Link>
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
                <div className="mb-8 flex items-center gap-3"><span className="material-symbols-outlined rounded-xl bg-primary-container p-2">auto_awesome</span><h3 className="text-xl font-bold text-white">AI Analysis Engine</h3></div>
                <div className="mb-10"><p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">Damage Severity</p><div className="flex items-end gap-3"><span className="text-5xl font-black text-white">High</span><div className="mb-2 flex gap-1"><div className="h-4 w-4 rounded-full bg-white" /><div className="h-4 w-4 rounded-full bg-white" /><div className="h-4 w-4 rounded-full bg-white" /><div className="h-4 w-4 rounded-full bg-white/30" /></div></div></div>
                <div className="mb-10 grid grid-cols-2 gap-6"><div className="rounded-2xl bg-primary-container/40 p-4"><p className="mb-1 text-xs text-white/60">Confidence</p><p className="text-2xl font-bold text-white">92%</p></div><div className="rounded-2xl bg-primary-container/40 p-4"><p className="mb-1 text-xs text-white/60">Area Calc.</p><p className="text-2xl font-bold text-white">38.4a</p></div></div>
                <div className="space-y-4"><h4 className="font-bold text-white">Recommendation</h4><div className="rounded-2xl border border-white/10 bg-surface-container-lowest/10 p-5 backdrop-blur-md"><p className="text-sm leading-relaxed text-white/90">"Visual evidence confirms mechanical flattening consistent with weather-related impact. Spectral analysis of recent satellite data shows significant biomass reduction in the target area."</p></div></div>
              </div>
            </section>

            <section className="flex gap-4 rounded-3xl border border-error/10 bg-error-container p-6">
              <span className="material-symbols-outlined text-on-error-container">warning</span>
              <div><p className="mb-1 text-sm font-bold text-on-error-container">Official Oversight</p><p className="text-xs leading-relaxed text-on-error-container opacity-80">AI metrics are provided for supportive evaluation. The final decision is taken by a human officer after field verification.</p></div>
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

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[2rem] border-t border-stone-100 bg-white/90 px-4 pb-6 pt-3 shadow-[0_-8px_24px_rgba(18,28,27,0.04)] backdrop-blur-xl dark:bg-stone-900/90 lg:hidden">
        <Link className="flex flex-col items-center justify-center px-5 py-2 text-stone-400" to="/farmer/dashboard"><span className="material-symbols-outlined">grid_view</span><span className="mt-1 text-[11px] font-bold font-inter">Home</span></Link>
        <Link className="flex flex-col items-center justify-center px-5 py-2 text-stone-400" to="/farmer/chatbot"><span className="material-symbols-outlined">chat_bubble</span><span className="mt-1 text-[11px] font-bold font-inter">AI Consult</span></Link>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f1f4f1] px-5 py-2 text-[#115638] dark:bg-stone-800 dark:text-[#4ade80]"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span><span className="mt-1 text-[11px] font-bold font-inter">Claims</span></div>
        <Link className="flex flex-col items-center justify-center px-5 py-2 text-stone-400" to="/farmer/profile"><span className="material-symbols-outlined">account_circle</span><span className="mt-1 text-[11px] font-bold font-inter">Profile</span></Link>
      </nav>
    </div>
  )
}
