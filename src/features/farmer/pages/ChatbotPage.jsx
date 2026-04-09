import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import './ChatbotPage.css'

export function ChatbotPage() {
  return (
    <div className="chatbot-root bg-background font-body text-on-surface selection:bg-secondary-container">
      <FarmerTopNav />

      <main className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-20 lg:px-0">
        <section className="mb-8 mt-4 text-center">
          <h1 className="font-headline mb-2 text-3xl font-extrabold text-primary">AI Advisor</h1>
          <p className="font-medium text-on-surface-variant">Your digital agronomist for smarter farming decisions</p>
        </section>

        <div className="relative flex min-h-[530px] flex-col overflow-hidden rounded-[2rem] bg-surface-container-low p-4 shadow-sm lg:p-6">
          <div className="mb-6 flex items-center justify-between px-2">
            <div className="flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                LIVE ADVICE
              </span>
            </div>
            <div className="flex gap-3">
              <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" title="Clear Chat" type="button">
                <span className="material-symbols-outlined">delete_sweep</span>
              </button>
              <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" title="Export Log" type="button">
                <span className="material-symbols-outlined">ios_share</span>
              </button>
            </div>
          </div>

          <div className="chat-container flex-1 space-y-6 overflow-y-auto px-2 pb-6">
            <div className="flex max-w-[85%] gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg">
                <span className="material-symbols-outlined text-xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div className="asymmetric-card border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm">
                <p className="mb-3 leading-relaxed text-on-surface">Welcome back! I&apos;ve reviewed your latest soil sensors from the North Plot. The moisture level is currently at 22%. Would you like a personalized irrigation plan for tonight?</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">AI ADVISOR • 09:41 AM</span>
              </div>
            </div>

            <div className="ml-auto flex max-w-[85%] flex-row-reverse gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-container">
                <span className="material-symbols-outlined text-xl text-primary">person</span>
              </div>
              <div className="rounded-2xl rounded-tr-none bg-primary-container p-5 text-on-primary-container shadow-md">
                <p className="mb-1 leading-relaxed">Yes, but also check if there&apos;s any risk of pest infestation given the humidity levels.</p>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">YOU • 09:42 AM</span>
              </div>
            </div>

            <div className="flex max-w-[85%] items-end gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                <span className="material-symbols-outlined text-xl text-white">psychology</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-none bg-surface-container-lowest px-6 py-4 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: '0.2s' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: '0.4s' }} />
                <span className="ml-2 text-xs font-semibold italic text-primary/60">Analyzing climate data...</span>
              </div>
            </div>
          </div>

          <div className="mt-4 px-2 pb-2">
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-4">
              <button className="shrink-0 rounded-full border border-transparent bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:border-primary hover:bg-primary hover:text-white" type="button">Check Pest Risk</button>
              <button className="shrink-0 rounded-full border border-transparent bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:border-primary hover:bg-primary hover:text-white" type="button">Best Fertilizer for Wheat?</button>
              <button className="shrink-0 rounded-full border border-transparent bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:border-primary hover:bg-primary hover:text-white" type="button">Next Rain Forecast</button>
              <button className="shrink-0 rounded-full border border-transparent bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:border-primary hover:bg-primary hover:text-white" type="button">Market Prices Today</button>
            </div>
          </div>

          <div className="mt-auto px-2">
            <div className="relative flex items-center gap-2 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <button className="p-3 text-on-surface-variant transition-colors hover:text-primary" type="button">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <textarea className="flex-1 border-none bg-transparent py-3 font-medium text-on-surface placeholder:text-stone-400 focus:ring-0" placeholder="Ask about your crops, soil, or market..." rows="1" />
              <button className="flex items-center justify-center rounded-2xl bg-primary p-3 text-white shadow-lg transition-all hover:bg-primary-container active:scale-95" type="button">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between px-2">
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-error transition-opacity hover:opacity-80" type="button">
                <span className="material-symbols-outlined text-sm">emergency_share</span>
                Escalate to Expert
              </button>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary" type="button">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  Copy Last
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-secondary-fixed bg-secondary-fixed/30 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>
          <div>
            <h4 className="font-headline text-sm font-bold text-on-secondary-fixed-variant">Trust Architecture</h4>
            <p className="text-xs leading-snug text-on-secondary-fixed-variant opacity-80">Recommendations are based on local regional data and validated agronomical science. Always consult local experts for large-scale operations.</p>
          </div>
        </div>
      </main>

      <FarmerBottomNav />

      <FarmerSidebar />
    </div>
  )
}
