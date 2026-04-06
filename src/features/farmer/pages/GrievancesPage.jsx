import { Link } from 'react-router-dom'

import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import './GrievancesPage.css'

export function GrievancesPage() {
  return (
    <div className="grievances-root bg-background text-on-background selection:bg-secondary-container">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#f7faf7]/80 px-6 py-3 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] backdrop-blur-md dark:bg-stone-900/80">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight text-[#115638] dark:text-[#4ade80]">Annadata Connect</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" to="/farmer/dashboard">Dashboard</Link>
          <button className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" type="button">Reports</button>
          <Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f] dark:text-stone-400" to="/farmer/chatbot">AI Insights</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex cursor-pointer items-center gap-1 text-stone-700 transition-colors hover:text-[#2f6f4f] dark:text-stone-300" type="button">
            <span className="material-symbols-outlined text-[20px]">translate</span>
            <span className="text-sm font-medium">Language</span>
          </button>
          <span className="material-symbols-outlined cursor-pointer text-stone-700 dark:text-stone-300">notifications</span>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-secondary-container">
            <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDach-pjF-ItHjj42bBBRyeS69tceZkRy_clYuUN9U0gH6V_QEzv0XG4RPwA0qe0GN8LIDkdqIO0fjZwRUDHPkI502-zdzn3uHS2Cs7_bOGQflXpphqKerZm9xe7J_NvIA320b-OJaZttg5D9I2hRsvpAAAq_PjUoVVH83PKNk8NKr30cDn8_tdaF94pIX-67_MWvjqJ-ze2Y1-Ye3aXrFjuVv6eEevx_fO280HqqeCNuXFpzJ2LO7o-wXBfBwEAPdQhcKfcAz8-bpC" alt="User Profile Avatar" />
          </div>
        </div>
      </nav>

      <FarmerSidebar />

      <main className="min-h-screen px-6 pb-20 pt-24 lg:ml-64">
        <div className="mx-auto max-w-6xl">
          <header className="mb-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">Grievance Support</h1>
            <p className="max-w-2xl text-lg font-medium text-on-surface-variant">Submit your concerns directly to our agronomy specialists. We track every issue from field to resolution.</p>
          </header>

          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
            <section className="space-y-8 xl:col-span-5">
              <div className="editorial-card bg-surface-container-lowest p-8 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.04)]">
                <div className="mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-primary">add_circle</span>
                  <h2 className="text-2xl font-bold">New Grievance</h2>
                </div>
                <form className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-on-surface-variant">Issue Category</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="group flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-surface-container-low p-4 transition-all hover:border-primary/20 hover:bg-surface-container-highest" type="button">
                        <span className="material-symbols-outlined mb-1 text-primary">potted_plant</span>
                        <span className="text-xs font-bold text-on-surface">Crop Health</span>
                      </button>
                      <button className="flex flex-col items-center justify-center rounded-xl border-2 border-primary bg-primary-container/10 p-4 transition-all" type="button">
                        <span className="material-symbols-outlined mb-1 text-primary">payments</span>
                        <span className="text-xs font-bold text-on-surface">Insurance</span>
                      </button>
                      <button className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-surface-container-low p-4 transition-all hover:border-primary/20 hover:bg-surface-container-highest" type="button">
                        <span className="material-symbols-outlined mb-1 text-primary">water_drop</span>
                        <span className="text-xs font-bold text-on-surface">Irrigation</span>
                      </button>
                      <button className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-surface-container-low p-4 transition-all hover:border-primary/20 hover:bg-surface-container-highest" type="button">
                        <span className="material-symbols-outlined mb-1 text-primary">inventory_2</span>
                        <span className="text-xs font-bold text-on-surface">Supply Chain</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-on-surface-variant">Priority Level</label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" name="priority" type="radio" />
                        <div className="rounded-lg bg-surface-container-low py-3 text-center text-xs font-bold transition-colors peer-checked:bg-secondary-container peer-checked:text-on-secondary-container">Low</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" defaultChecked name="priority" type="radio" />
                        <div className="rounded-lg bg-surface-container-low py-3 text-center text-xs font-bold transition-colors peer-checked:bg-primary-container peer-checked:text-on-primary-container">Medium</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" name="priority" type="radio" />
                        <div className="rounded-lg bg-surface-container-low py-3 text-center text-xs font-bold transition-colors peer-checked:bg-error-container peer-checked:text-on-error-container">Urgent</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-on-surface-variant">Describe the Situation</label>
                    <textarea className="w-full rounded-xl border-none bg-surface-container-low p-4 font-medium text-on-surface placeholder-stone-400 focus:ring-2 focus:ring-surface-tint" placeholder="Describe the issue in detail..." rows="4" />
                  </div>

                  <div className="group cursor-pointer rounded-xl border-2 border-dashed border-outline-variant/30 p-6 text-center transition-colors hover:bg-surface-container-low">
                    <span className="material-symbols-outlined mb-2 text-3xl text-stone-400 transition-colors group-hover:text-primary">cloud_upload</span>
                    <p className="text-xs font-bold text-stone-500">Upload field photos or documents</p>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90" type="button">
                    <span>Submit Report</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </form>
              </div>

              <div className="editorial-card relative overflow-hidden bg-primary p-6 text-on-primary">
                <div className="relative z-10">
                  <h3 className="mb-2 text-lg font-bold">Need immediate advice?</h3>
                  <p className="mb-4 text-sm leading-relaxed opacity-90">Our AI Advisor can analyze crop symptoms while your grievance is being processed.</p>
                  <Link className="rounded-full bg-white px-6 py-2 text-xs font-bold text-primary" to="/farmer/chatbot">Start AI Consult</Link>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10">psychology</span>
              </div>
            </section>

            <section className="space-y-6 xl:col-span-7">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Previous Submissions</h2>
                <div className="flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter History
                </div>
              </div>

              <div className="group rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">In Progress</span>
                      <span className="text-xs font-medium text-stone-400">Ticket #GRV-20491</span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface transition-colors group-hover:text-primary">Delayed Crop Insurance Disbursement</h3>
                    <p className="line-clamp-2 text-sm font-medium text-on-surface-variant">Submitted on Oct 12, 2023. Claim #INS-882 is still showing as 'Pending Verification' after 14 business days.</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">Priority</p>
                    <span className="rounded-lg bg-error-container px-4 py-1.5 text-xs font-bold text-on-error-container">Urgent</span>
                  </div>
                </div>

                <div className="relative mt-8">
                  <div className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-outline-variant/30" />
                  <div className="space-y-6">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <span className="material-symbols-outlined text-xs text-white">check</span>
                      </div>
                      <p className="text-xs font-bold text-on-surface">Officer Assigned</p>
                      <p className="text-[11px] font-medium text-stone-400">Today, 09:45 AM • Field Officer Rahul S.</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-outline-variant/30 bg-surface-container-high">
                        <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                      </div>
                      <p className="text-xs font-bold text-stone-400">Verification Pending</p>
                      <p className="text-[11px] font-medium text-stone-400">Estimated: Oct 20</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button className="rounded-xl bg-surface-container-low px-5 py-2.5 text-xs font-bold text-on-surface-variant transition-all hover:bg-surface-container-high" type="button">View Details</button>
                  <button className="flex items-center gap-2 rounded-xl bg-primary-container/10 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary-container/20" type="button">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Contact Officer
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-surface-container-low/50 p-6 opacity-80 transition-opacity hover:opacity-100">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Resolved</span>
                      <span className="text-xs font-medium text-stone-400">Ticket #GRV-19822</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">Pest Infestation in Wheat Sector B</h3>
                    <p className="text-sm font-medium text-on-surface-variant">Submitted on Sep 28, 2023. Request for emergency fungicide recommendation.</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">Priority</p>
                    <span className="rounded-lg bg-tertiary-container/20 px-4 py-1.5 text-xs font-bold text-on-tertiary-container">Medium</span>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lg text-secondary">verified</span>
                    <div>
                      <p className="mb-1 text-xs font-bold text-on-surface">Resolution Summary</p>
                      <p className="text-[11px] italic leading-relaxed text-on-surface-variant">&quot;Site visit conducted on Oct 1. Applied Tilt (Propiconazole 25% EC). Crop recovery observed at 85% efficacy.&quot;</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 py-4 text-sm font-bold text-stone-500 transition-colors hover:text-primary" type="button">
                View Archive History
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </section>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-stone-100 bg-white/90 px-4 pb-6 pt-3 shadow-[0_-8px_24px_rgba(18,28,27,0.04)] backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/90 lg:hidden">
        <Link className="flex flex-col items-center justify-center px-5 py-2 text-stone-400 dark:text-stone-500" to="/farmer/dashboard">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="mt-1 font-inter text-[11px] font-bold">Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center px-5 py-2 text-stone-400 dark:text-stone-500" to="/farmer/chatbot">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="mt-1 font-inter text-[11px] font-bold">AI Consult</span>
        </Link>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f1f4f1] px-5 py-2 text-[#115638] dark:bg-stone-800 dark:text-[#4ade80]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
          <span className="mt-1 font-inter text-[11px] font-bold">Claims</span>
        </div>
        <Link className="flex flex-col items-center justify-center px-5 py-2 text-stone-400 dark:text-stone-500" to="/farmer/profile">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="mt-1 font-inter text-[11px] font-bold">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
