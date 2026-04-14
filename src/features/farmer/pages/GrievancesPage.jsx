import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import { AsyncButton } from '../../../components/shared/AsyncButton'
import { grievancesApi } from '../../../services/api'
import './GrievancesPage.css'

export function GrievancesPage() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitFeedback, setSubmitFeedback] = useState({ error: '', success: '' })

  const grievanceSchema = z.object({
    category: z.enum(['crop', 'insurance', 'irrigation', 'supply'], { message: t('grievancesPage.validationCategory') }),
    priority: z.enum(['low', 'medium', 'urgent'], { message: t('grievancesPage.validationPriority') }),
    description: z.string().trim().min(20, t('grievancesPage.validationDescription')),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(grievanceSchema),
    defaultValues: {
      category: 'insurance',
      priority: 'medium',
      description: '',
    },
  })

  const selectedCategory = watch('category')
  const priority = watch('priority')

  const onSubmit = async (data) => {
    if (isSubmitting) {
      return
    }

    setSubmitFeedback({ error: '', success: '' })
    setIsSubmitting(true)

    try {
      // Call the grievances API
      const result = await grievancesApi.createGrievance({
        category: data.category,
        priority: data.priority,
        description: data.description,
      })
      setSubmitFeedback({ error: '', success: t('grievancesPage.submitSuccess') })
      reset({ category: 'insurance', priority: 'medium', description: '' })
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || t('grievancesPage.submitError')
      console.error('Grievance submission error:', error)
      setSubmitFeedback({ error: errorMessage, success: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grievances-root bg-background text-on-background selection:bg-secondary-container">
      <FarmerTopNav />

      <FarmerSidebar />

      <main className="min-h-screen px-6 pb-20 pt-24 lg:ml-64">
        <div className="mx-auto max-w-6xl">
          <header className="mb-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">{t('grievancesPage.title')}</h1>
            <p className="max-w-2xl text-lg font-medium text-on-surface-variant">{t('grievancesPage.subtitle')}</p>
          </header>

          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
            <section className="space-y-8 xl:col-span-5">
              <div className="editorial-card bg-surface-container-lowest p-8 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.04)]">
                <div className="mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-primary">add_circle</span>
                  <h2 className="text-2xl font-bold">{t('grievancesPage.newGrievance')}</h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-on-surface-variant">{t('grievancesPage.issueCategory')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className={`group flex min-h-[44px] flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${selectedCategory === 'crop' ? 'border-primary bg-primary-container/10' : 'border-transparent bg-surface-container-low hover:border-primary/20 hover:bg-surface-container-highest'}`}
                        type="button"
                        onClick={() => setValue('category', 'crop', { shouldDirty: true, shouldValidate: true })}
                      >
                        <span className="material-symbols-outlined mb-1 text-primary">potted_plant</span>
                        <span className="text-xs font-bold text-on-surface">{t('grievancesPage.categoryCropHealth')}</span>
                      </button>
                      <button
                        className={`flex min-h-[44px] flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${selectedCategory === 'insurance' ? 'border-primary bg-primary-container/10' : 'border-transparent bg-surface-container-low hover:border-primary/20 hover:bg-surface-container-highest'}`}
                        type="button"
                        onClick={() => setValue('category', 'insurance', { shouldDirty: true, shouldValidate: true })}
                      >
                        <span className="material-symbols-outlined mb-1 text-primary">payments</span>
                        <span className="text-xs font-bold text-on-surface">{t('grievancesPage.categoryInsurance')}</span>
                      </button>
                      <button
                        className={`flex min-h-[44px] flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${selectedCategory === 'irrigation' ? 'border-primary bg-primary-container/10' : 'border-transparent bg-surface-container-low hover:border-primary/20 hover:bg-surface-container-highest'}`}
                        type="button"
                        onClick={() => setValue('category', 'irrigation', { shouldDirty: true, shouldValidate: true })}
                      >
                        <span className="material-symbols-outlined mb-1 text-primary">water_drop</span>
                        <span className="text-xs font-bold text-on-surface">{t('grievancesPage.categoryIrrigation')}</span>
                      </button>
                      <button
                        className={`flex min-h-[44px] flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${selectedCategory === 'supply' ? 'border-primary bg-primary-container/10' : 'border-transparent bg-surface-container-low hover:border-primary/20 hover:bg-surface-container-highest'}`}
                        type="button"
                        onClick={() => setValue('category', 'supply', { shouldDirty: true, shouldValidate: true })}
                      >
                        <span className="material-symbols-outlined mb-1 text-primary">inventory_2</span>
                        <span className="text-xs font-bold text-on-surface">{t('grievancesPage.categorySupplyChain')}</span>
                      </button>
                    </div>
                    {errors.category ? <p className="mt-2 text-xs text-red-600">{errors.category.message}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-on-surface-variant">{t('grievancesPage.priorityLevel')}</label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input
                          className="peer hidden"
                          type="radio"
                          value="low"
                          checked={priority === 'low'}
                          {...register('priority')}
                          onChange={() => setValue('priority', 'low', { shouldDirty: true, shouldValidate: true })}
                        />
                        <div className="rounded-lg bg-surface-container-low py-3 text-center text-xs font-bold transition-colors peer-checked:bg-secondary-container peer-checked:text-on-secondary-container">{t('grievancesPage.priorityLow')}</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          className="peer hidden"
                          type="radio"
                          value="medium"
                          checked={priority === 'medium'}
                          {...register('priority')}
                          onChange={() => setValue('priority', 'medium', { shouldDirty: true, shouldValidate: true })}
                        />
                        <div className="rounded-lg bg-surface-container-low py-3 text-center text-xs font-bold transition-colors peer-checked:bg-primary-container peer-checked:text-on-primary-container">{t('grievancesPage.priorityMedium')}</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          className="peer hidden"
                          type="radio"
                          value="urgent"
                          checked={priority === 'urgent'}
                          {...register('priority')}
                          onChange={() => setValue('priority', 'urgent', { shouldDirty: true, shouldValidate: true })}
                        />
                        <div className="rounded-lg bg-surface-container-low py-3 text-center text-xs font-bold transition-colors peer-checked:bg-error-container peer-checked:text-on-error-container">{t('grievancesPage.priorityUrgent')}</div>
                      </label>
                    </div>
                    {errors.priority ? <p className="mt-2 text-xs text-red-600">{errors.priority.message}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-on-surface-variant">{t('grievancesPage.describeSituation')}</label>
                    <textarea
                      className="w-full rounded-xl border-none bg-surface-container-low p-4 font-medium text-on-surface placeholder-stone-400 focus:ring-2 focus:ring-surface-tint"
                      placeholder={t('grievancesPage.descriptionPlaceholder')}
                      rows="4"
                      {...register('description')}
                      disabled={isSubmitting}
                    />
                    {errors.description ? <p className="mt-2 text-xs text-red-600">{errors.description.message}</p> : null}
                  </div>

                  <div className="group cursor-pointer rounded-xl border-2 border-dashed border-outline-variant/30 p-6 text-center transition-colors hover:bg-surface-container-low">
                    <span className="material-symbols-outlined mb-2 text-3xl text-stone-400 transition-colors group-hover:text-primary">cloud_upload</span>
                    <p className="text-xs font-bold text-stone-500">{t('grievancesPage.uploadHint')}</p>
                  </div>

                  <AsyncButton
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={t('grievancesPage.submitting')}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                  >
                    <span>{t('grievancesPage.submitReport')}</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </AsyncButton>

                  {submitFeedback.error ? <p className="text-xs text-red-600">{submitFeedback.error}</p> : null}
                  {submitFeedback.success ? <p className="text-xs text-emerald-700">{submitFeedback.success}</p> : null}
                </form>
              </div>

              <div className="editorial-card relative overflow-hidden bg-primary p-6 text-on-primary">
                <div className="relative z-10">
                  <h3 className="mb-2 text-lg font-bold">{t('grievancesPage.immediateAdviceTitle')}</h3>
                  <p className="mb-4 text-sm leading-relaxed opacity-90">{t('grievancesPage.immediateAdviceDesc')}</p>
                  <Link className="rounded-full bg-white px-6 py-2 text-xs font-bold text-primary" to="/farmer/chatbot">{t('grievancesPage.startAiConsult')}</Link>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10">psychology</span>
              </div>
            </section>

            <section className="space-y-6 xl:col-span-7">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{t('grievancesPage.previousSubmissions')}</h2>
                <div className="flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  {t('grievancesPage.filterHistory')}
                </div>
              </div>

              <div className="group rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">{t('grievancesPage.inProgress')}</span>
                      <span className="text-xs font-medium text-stone-400">{t('grievancesPage.ticket20491')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface transition-colors group-hover:text-primary">{t('grievancesPage.delayedDisbursementTitle')}</h3>
                    <p className="line-clamp-2 text-sm font-medium text-on-surface-variant">{t('grievancesPage.delayedDisbursementDesc')}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">{t('grievancesPage.priorityLabel')}</p>
                    <span className="rounded-lg bg-error-container px-4 py-1.5 text-xs font-bold text-on-error-container">{t('grievancesPage.priorityUrgent')}</span>
                  </div>
                </div>

                <div className="relative mt-8">
                  <div className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-outline-variant/30" />
                  <div className="space-y-6">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <span className="material-symbols-outlined text-xs text-white">check</span>
                      </div>
                      <p className="text-xs font-bold text-on-surface">{t('grievancesPage.officerAssigned')}</p>
                      <p className="text-[11px] font-medium text-stone-400">{t('grievancesPage.officerAssignedTime')}</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-outline-variant/30 bg-surface-container-high">
                        <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                      </div>
                      <p className="text-xs font-bold text-stone-400">{t('grievancesPage.verificationPending')}</p>
                      <p className="text-[11px] font-medium text-stone-400">{t('grievancesPage.verificationEta')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button className="rounded-xl bg-surface-container-low px-5 py-2.5 text-xs font-bold text-on-surface-variant transition-all hover:bg-surface-container-high" type="button">{t('grievancesPage.viewDetails')}</button>
                  <button className="flex items-center gap-2 rounded-xl bg-primary-container/10 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary-container/20" type="button">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    {t('grievancesPage.contactOfficer')}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-surface-container-low/50 p-6 opacity-80 transition-opacity hover:opacity-100">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{t('grievancesPage.resolved')}</span>
                      <span className="text-xs font-medium text-stone-400">{t('grievancesPage.ticket19822')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">{t('grievancesPage.pestTitle')}</h3>
                    <p className="text-sm font-medium text-on-surface-variant">{t('grievancesPage.pestDesc')}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">{t('grievancesPage.priorityLabel')}</p>
                    <span className="rounded-lg bg-tertiary-container/20 px-4 py-1.5 text-xs font-bold text-on-tertiary-container">{t('grievancesPage.priorityMedium')}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lg text-secondary">verified</span>
                    <div>
                      <p className="mb-1 text-xs font-bold text-on-surface">{t('grievancesPage.resolutionSummary')}</p>
                      <p className="text-[11px] italic leading-relaxed text-on-surface-variant">{t('grievancesPage.resolutionQuote')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 py-4 text-sm font-bold text-stone-500 transition-colors hover:text-primary" type="button">
                {t('grievancesPage.viewArchiveHistory')}
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </section>
          </div>
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  )
}
