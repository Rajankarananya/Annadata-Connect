import { useState } from 'react'

import { AdminSidebar } from '../../../components/layout/AdminSidebar'
import { AsyncButton } from '../../../components/shared/AsyncButton'

import './ClaimReviewPage.css'

export function ClaimReviewPage() {
  const [reviewNotes, setReviewNotes] = useState('')
  const [decisionLoading, setDecisionLoading] = useState(false)
  const [decisionFeedback, setDecisionFeedback] = useState({ error: '', success: '' })
  const modelDamageSeverity = 72.4
  const modelConfidence = 94
  const confidenceBand = modelConfidence >= 85 ? 'High confidence' : modelConfidence >= 70 ? 'Moderate confidence' : 'Low confidence'

  const handleDecision = async (action) => {
    if (decisionLoading) {
      return
    }

    if ((action === 'reject' || action === 'senior') && reviewNotes.trim().length < 12) {
      setDecisionFeedback({
        error: 'Please add at least 12 characters in review notes before this action.',
        success: '',
      })
      return
    }

    setDecisionFeedback({ error: '', success: '' })
    setDecisionLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    const actionLabel = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'sent for senior review'
    setDecisionFeedback({ error: '', success: `Claim has been ${actionLabel}.` })
    setDecisionLoading(false)
  }

  return (
    <div className="claim-review-page overflow-hidden bg-surface text-on-surface">
      <AdminSidebar />

      <main className="min-h-screen md:ml-64">
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-[rgba(236,253,245,0.8)] px-6 text-emerald-900 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold tracking-tighter text-emerald-900">Claim Review</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-xl bg-[rgba(224,227,224,0.3)] px-3 py-1.5">
              <span className="material-symbols-outlined mr-2 text-lg text-emerald-700">search</span>
              <input type="text" className="w-48 border-none bg-transparent text-sm focus:ring-0" placeholder="Search Claims..." />
            </div>
            <span className="material-symbols-outlined cursor-pointer rounded-full p-2 transition-colors hover:bg-emerald-100/50">notifications</span>
            <span className="material-symbols-outlined cursor-pointer rounded-full p-2 transition-colors hover:bg-emerald-100/50">language</span>
            <div className="ml-2 flex items-center gap-2 border-l border-emerald-100 pl-4">
              <span className="text-xs font-medium text-on-surface-variant">Admin Panel</span>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDaZsYvjiS-o4wl314X87g1jp6HDJdFb9B6R510eM57kG5qP8tFG8IcJJsjKTuY4-k7i0QMpYa-uQGsFdhMQrkZqJgvFutTto-82lBwR5XkD-hFcGlaGP7HPmKfOYn8o7q8g1KhYoMoRLWkHXtpYkg2nvpIlEnUuyNJY2rZHP-N5k-tmzNMKG4IGx9b-H_Z2FCmaD5ZOOBrKcznp3P8J98uWsNjnf3-VZm-CfH5zQxFCwJcK27-rrSvXMyRrel3WL10GsdNMd_ffr"
                alt="Administrator profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)] flex-col overflow-auto lg:flex-row lg:overflow-hidden">
          <section className="no-scrollbar w-full overflow-y-auto bg-surface p-8 lg:w-1/2">
            <div className="mx-auto max-w-2xl space-y-10">
              <header>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-lg bg-secondary-container px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-on-secondary-container">
                    Claim #CLM-88291
                  </span>
                  <span className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">Submitted: Oct 12, 2023</span>
                </div>
                <h1 className="leading-tight text-3xl font-extrabold tracking-tight text-on-surface">Post-Flood Wheat Crop Damage</h1>
              </header>

              <div className="flex items-center gap-6 rounded-xl bg-surface-container-low p-6">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXzQe9U4yqyDItBlg6JQH6ViQ1g91xjJlA8aUGb0NcO6iSEMhrEUDdS_wAn4KmDkheK1Iqbq1KNu8Bx1gFo0tN0--ySOladEaMa1WOpigfauwbWBGgDXGD5TMdUUzUX330jqK1l8W-RB8ufJTpgCv6iQRWBq2TDOrZukd10uk6GGUKJRDv70fpxlqEcfR3L3vzAanDOnEq4ZHkI2k94cBQEhfY6efKOB1shNYwYikZs3PwTDgLiSD4EvZ9vqi-_0qV7c97fqh7Mqom"
                  alt="Farmer Profile"
                  className="h-20 w-20 rounded-xl object-cover shadow-sm"
                />
                <div>
                  <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Farmer Information</p>
                  <h3 className="text-xl font-bold text-on-surface">Rajesh Kumar Singh</h3>
                  <p className="text-sm text-on-surface-variant">Location: Gorakhpur District, Block B-12</p>
                  <p className="text-sm text-on-surface-variant">Land Holding: 4.5 Hectares</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Submitted Evidence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative aspect-video overflow-hidden rounded-xl bg-surface-container">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV8jAsOjEoNtTWpJhcsrlqsci_jTUYetfh71x1Zb1FfgLUK_hBRBweFV2CCrQKcncUO6dZ2BNndyU4aQXzos9OIZo-OUK8AyOLvizcqAHjwbkCCnipXcGiySPOG9vcItdaReCkVjFovTagOvR3fh_2RN8pOK8Tlbs8IQBWK3bFpoZrJBedZvkj8HH9kP3lBZsoDtB-o_hqHb_p6OrPHqF45nspfSkHwHEmrRjnPwyI5V68Q6IQ95__0w1ZxmyAgWa4fme1InHXj_3I"
                      alt="Wheat Field Damage"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="material-symbols-outlined text-3xl text-white">zoom_in</span>
                    </div>
                  </div>

                  <div className="group relative aspect-video overflow-hidden rounded-xl bg-surface-container">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD16wYWOiG0H8xxNoheEjb-TVl6VI5v_kYpRkqHn0Olw6omOtKBRKMSwubmfaBJmz8DS8oAUMLcbTfWnRuGkuVFFl3PrqN7VUPpoK-Naz6htkVpvzjWyLmjW4NJ3wMVpVTDQpXcfvtFJxb3CqbZ9zs_YRApWmfZrKzj2WKYMokj4jjfz6yMe2Y79gzmMmCiC8gg65eYbUFV9Rbiy0M6kE2qhq2XHF4Wd-4jwPTOYFSzva5Phut5lQunXEitNgNFb-0W8sLCB0YEQ2H"
                      alt="Soil Moisture Check"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="material-symbols-outlined text-3xl text-white">zoom_in</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="editorial-shadow space-y-4 rounded-xl border-l-4 border-primary bg-surface-container-lowest p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Claim Narrative</h4>
                <p className="leading-relaxed text-on-surface italic">
                  "Unprecedented rainfall between Oct 8-10 led to severe waterlogging in 80% of the wheat plantation. The water has remained
                  stagnant for over 72 hours, causing root rot and stalk collapse. Expected yield loss is approximately 75% for the season."
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <h4 className="border-b border-outline-variant/20 pb-2 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Audit Trail</h4>
                <div className="space-y-6">
                  <div className="relative flex gap-4">
                    <div className="absolute left-[15px] top-8 h-full w-px bg-outline-variant/30"></div>
                    <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="material-symbols-outlined text-sm text-emerald-700">cloud_upload</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Claim Submitted by Farmer</p>
                      <p className="text-xs text-on-surface-variant">Oct 12, 2023 · 09:14 AM</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <span className="material-symbols-outlined text-sm text-blue-700">smart_toy</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">AI Pre-Analysis Completed</p>
                      <p className="text-xs text-on-surface-variant">Oct 12, 2023 · 09:45 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="no-scrollbar w-full overflow-y-auto border-t border-emerald-100 bg-surface-container-low p-8 lg:w-1/2 lg:border-l lg:border-t-0">
            <div className="mx-auto max-w-xl space-y-6">
              <div className="editorial-shadow relative overflow-hidden rounded-xl bg-surface-container-lowest p-8">
                <div className="absolute right-0 top-0 p-4">
                  <span className="material-symbols-outlined text-6xl text-emerald-600/20">auto_awesome</span>
                </div>

                <header>
                  <p className="mb-1 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-widest text-emerald-700">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    AI CLAIM ANALYSIS
                  </p>
                  <h2 className="text-2xl font-bold text-on-surface">Model Prediction Summary</h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-on-surface-variant">For officer support, not auto-approval</p>
                </header>

                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">AI Prediction: Damage Severity</p>
                    <p className="text-4xl font-black tracking-tighter text-on-surface">{modelDamageSeverity}%</p>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full bg-primary" style={{ width: `${modelDamageSeverity}%` }}></div>
                    </div>
                    <p className="text-xs text-on-surface-variant">Likely severe impact to payout-relevant acreage.</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Model Confidence Score</p>
                    <p className="text-4xl font-black tracking-tighter text-secondary">{modelConfidence}%</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="material-symbols-outlined fill-icon text-sm text-secondary">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-on-surface-variant">{confidenceBand}</p>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-emerald-900">Prediction Explanation</p>
                  <p className="text-sm leading-relaxed text-emerald-800">
                    Satellite imagery corroborates regional flooding. Historical data suggests root saturation leads to terminal crop failure for
                    wheat in this growth stage.
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-emerald-900">AI Recommendation: Expedited approval review</p>
                </div>

                <div className="mt-4 rounded-lg border-2 border-amber-300/80 bg-amber-50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-amber-900">Final decision by officer</p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-900/90">
                    The assigned officer must validate evidence, policy criteria, and field context before approving or rejecting this claim.
                  </p>
                </div>
              </div>

              <div className="editorial-shadow space-y-6 rounded-xl bg-surface-container-lowest p-8">
                <header>
                  <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Human Governance</p>
                  <h2 className="text-xl font-bold text-on-surface">Officer Decision</h2>
                </header>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Review Notes</label>
                    <textarea
                      rows="4"
                      placeholder="Add mandatory decision rationale here..."
                      value={reviewNotes}
                      onChange={(event) => setReviewNotes(event.target.value)}
                      disabled={decisionLoading}
                      className="w-full resize-none rounded-xl border-none bg-[rgba(224,227,224,0.3)] p-4 text-sm focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <AsyncButton
                      onClick={() => handleDecision('approve')}
                      isLoading={decisionLoading}
                      loadingText="Submitting..."
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-6 py-4 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      Approve Claim
                    </AsyncButton>

                    <AsyncButton
                      onClick={() => handleDecision('reject')}
                      isLoading={decisionLoading}
                      loadingText="Submitting..."
                      className="flex items-center justify-center gap-2 rounded-xl bg-surface-container-high px-6 py-4 text-sm font-bold text-on-surface transition-colors hover:bg-emerald-100/50"
                    >
                      <span className="material-symbols-outlined text-lg">cancel</span>
                      Reject Claim
                    </AsyncButton>

                    <AsyncButton
                      onClick={() => handleDecision('senior')}
                      isLoading={decisionLoading}
                      loadingText="Submitting..."
                      className="col-span-2 flex items-center justify-center gap-2 rounded-xl border-2 border-outline-variant/30 px-6 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface"
                    >
                      <span className="material-symbols-outlined text-lg">flag</span>
                      Mark for Senior Review
                    </AsyncButton>
                  </div>
                </div>

                {decisionFeedback.error ? <p className="text-xs text-red-600">{decisionFeedback.error}</p> : null}
                {decisionFeedback.success ? <p className="text-xs text-emerald-700">{decisionFeedback.success}</p> : null}

                <div className="flex items-start gap-3 border-t border-outline-variant/10 pt-4">
                  <span className="material-symbols-outlined text-lg text-tertiary">report_problem</span>
                  <p className="text-xs italic text-on-surface-variant">
                    Final decision is made by the officer. Your action will be recorded in the immutable ledger and affects farmer payout
                    priority.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary-container/20 p-6">
                <div>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-secondary-container">Est. Payout Value</p>
                  <p className="text-2xl font-black tracking-tight text-on-secondary-container">₹ 82,450.00</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  <span className="text-[0.6875rem] font-bold">Standard Rate</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
