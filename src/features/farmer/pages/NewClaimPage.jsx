import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { claimsApi } from '../../../services/api'
import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import { AsyncButton } from '../../../components/shared/AsyncButton'
import './NewClaimPage.css'

const claimSchema = z.object({
  cropType: z.string().trim().min(1, 'Please select a crop type.'),
  sowingDate: z.string().min(1, 'Sowing date is required.'),
  incidentDate: z.string().min(1, 'Incident date is required.'),
  farmLocation: z.string().trim().min(3, 'Enter a valid farm location.'),
  damageType: z.string().trim().min(1, 'Select a nature of damage.'),
  narrative: z.string().trim().min(20, 'Please provide at least 20 characters in the narrative.'),
})

export function NewClaimPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [submitFeedback, setSubmitFeedback] = useState({ error: '', success: '' })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      cropType: 'Premium Basmati Rice',
      sowingDate: '2023-10-15',
      incidentDate: '',
      farmLocation: '',
      damageType: 'Excessive Rain',
      narrative: '',
    },
  })

  const selectedDamageType = watch('damageType')

  const onSubmit = async (data) => {
    if (isSubmitting || isSavingDraft) {
      return
    }

    setSubmitFeedback({ error: '', success: '' })
    setIsSubmitting(true)

    try {
      // Map form data to API schema
      // Map damage types from form to API damage_type values
      const damageTypeMap = {
        'Excessive Rain': 'flood',
        'Pest Infestation': 'pest',
        'Hailstorm': 'hail',
        'Wildfire': 'fire',
      }

      const claimPayload = {
        // farmer_id will be set automatically by the backend
        damage_type: damageTypeMap[data.damageType] || data.damageType.toLowerCase(),
        description: data.narrative,
        gps_lat: '0', // TODO: Get from map component
        gps_lng: '0', // TODO: Get from map component
        image_path: null, // TODO: Handle image uploads
      }

      console.log('[NewClaimPage] Submitting claim:', claimPayload)
      
      const response = await claimsApi.createClaim(claimPayload)
      
      console.log('[NewClaimPage] Claim created successfully:', response)
      setSubmitFeedback({ error: '', success: t('newClaim.submitSuccess') })
      
      // Redirect to my claims page after 1.5 seconds
      setTimeout(() => {
        navigate('/farmer/my-claims', { replace: true })
      }, 1500)
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error.message || t('newClaim.submitError')
      console.error('[NewClaimPage] Claim submission error:', error)
      setSubmitFeedback({ error: errorMessage, success: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    if (isSubmitting || isSavingDraft) {
      return
    }

    const hasDraftData = Object.values(getValues()).some((value) => typeof value === 'string' && value.trim().length > 0)
    if (!hasDraftData) {
      setSubmitFeedback({ error: t('newClaim.emptyDraftError'), success: '' })
      return
    }

    await trigger(['cropType', 'sowingDate'])

    setSubmitFeedback({ error: '', success: '' })
    setIsSavingDraft(true)

    try {
      // Save draft to localStorage for now (until backend supports it)
      localStorage.setItem('claimDraft', JSON.stringify(getValues()))
      setSubmitFeedback({ error: '', success: t('newClaim.draftSaved') })
    } catch (error) {
      console.error('Draft save error:', error)
      setSubmitFeedback({ error: t('newClaim.draftError'), success: '' })
    } finally {
      setIsSavingDraft(false)
    }
  }

  return (
    <div className="new-claim-root bg-background text-on-surface min-h-screen antialiased">
      <FarmerSidebar />
      <FarmerTopNav />

      <main className="px-6 pb-32 pt-24 lg:pl-72">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-2 text-sm text-stone-500">
              <Link className="transition-colors hover:text-primary" to="/farmer/my-claims">{t('common.claims')}</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-semibold text-primary">{t('newClaim.breadcrumb')}</span>
            </div>
            <h1 className="font-headline mb-2 text-4xl font-extrabold tracking-tight text-on-surface">{t('newClaim.title')}</h1>
            <p className="font-medium text-stone-600">{t('newClaim.subtitle')}</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
            <section className="asymmetric-card bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">potted_plant</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">{t('newClaim.cropIdentity')}</h2>
                  <p className="text-sm text-stone-500">{t('newClaim.cropIdentityDesc')}</p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">{t('newClaim.cropType')}</label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-xl border-0 bg-surface-container-low py-4 pl-4 pr-10 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint"
                      {...register('cropType')}
                    >
                      <option value="">{t('newClaim.selectCropType')}</option>
                      <option>Premium Basmati Rice</option>
                      <option>Organic Wheat</option>
                      <option>Hybrid Maize</option>
                      <option>Sugarcane (Co 0238)</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">expand_more</span>
                  </div>
                  {errors.cropType ? <p className="px-1 text-xs text-red-600">{errors.cropType.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">{t('newClaim.sowingDate')}</label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint"
                      type="date"
                      {...register('sowingDate')}
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 lg:hidden">calendar_today</span>
                  </div>
                  {errors.sowingDate ? <p className="px-1 text-xs text-red-600">{errors.sowingDate.message}</p> : null}
                </div>
              </div>
            </section>

            <section className="asymmetric-card bg-surface-container-low p-8">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined">history_edu</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">{t('newClaim.incidentLogistics')}</h2>
                  <p className="text-sm text-stone-500">{t('newClaim.incidentLogisticsDesc')}</p>
                </div>
              </div>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">{t('newClaim.incidentDate')}</label>
                  <input
                    className="w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint"
                    type="date"
                    {...register('incidentDate')}
                  />
                  {errors.incidentDate ? <p className="px-1 text-xs text-red-600">{errors.incidentDate.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">{t('newClaim.farmLocation')}</label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border-0 bg-surface-container-lowest py-4 pl-12 pr-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint"
                      placeholder={t('newClaim.farmLocationPlaceholder')}
                      type="text"
                      {...register('farmLocation')}
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">location_on</span>
                  </div>
                  {errors.farmLocation ? <p className="px-1 text-xs text-red-600">{errors.farmLocation.message}</p> : null}
                </div>
              </div>

              <div className="group relative h-48 w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                  <button className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary shadow-xl backdrop-blur-sm" type="button">
                    <span className="material-symbols-outlined text-lg">my_location</span>
                    {t('newClaim.refineMapPin')}
                  </button>
                </div>
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP-WSen7-l9dmm8Ne9jMgH__yAnd6AnTC05SvmrikhOBNZMpNXoo22R3Gt5TxkS2h8ZACOaA9TxyIropHAZy1GNwFylyDJfNZU6OLBMW35i9dMrSiCbk7ygB1BBCZ-aXu3xS2kxy3hjGBpNJFakVHsMgVvQdZKmBKxl-F5woDNDXhpjyGlFSHfcrdJoRM3RmgEOgPWKtnF4CDKL0qSPJMjhxmxVLZ-q3OGS2bDHkfxEw1W_o7c0uZadh_JTdKWoNPnC6t2AD3E8vDL"
                  alt="Satellite farm view"
                />
              </div>
            </section>

            <section className="asymmetric-card bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tertiary-fixed-dim text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">{t('newClaim.damageDescription')}</h2>
                  <p className="text-sm text-stone-500">{t('newClaim.damageDescriptionDesc')}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">{t('newClaim.natureOfDamage')}</label>
                  <div className="flex flex-wrap gap-3">
                    {['Excessive Rain', 'Pest Infestation', 'Hailstorm', 'Wildfire'].map((damageType) => (
                      <button
                        key={damageType}
                        className={
                          selectedDamageType === damageType
                            ? 'rounded-full border-2 border-primary-fixed bg-primary-fixed/20 px-5 py-2.5 text-sm font-bold text-primary'
                            : 'rounded-full border-2 border-transparent bg-surface-container px-5 py-2.5 text-sm font-bold text-stone-500 transition-all hover:border-outline-variant'
                        }
                        type="button"
                        onClick={() => setValue('damageType', damageType, { shouldDirty: true, shouldValidate: true })}
                      >
                        {damageType}
                      </button>
                    ))}
                  </div>
                  {errors.damageType ? <p className="px-1 text-xs text-red-600">{errors.damageType.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">{t('newClaim.detailedNarrative')}</label>
                  <textarea
                    className="w-full rounded-2xl border-0 bg-surface-container-low px-4 py-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint"
                    placeholder={t('newClaim.narrativePlaceholder')}
                    rows={4}
                    {...register('narrative')}
                  />
                  {errors.narrative ? <p className="px-1 text-xs text-red-600">{errors.narrative.message}</p> : null}
                </div>
              </div>
            </section>

            <section className="asymmetric-card bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">photo_library</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">{t('newClaim.visualEvidence')}</h2>
                  <p className="text-sm text-stone-500">{t('newClaim.visualEvidenceDesc')}</p>
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-low/30 p-10 text-center transition-colors hover:bg-surface-container-low">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
                </div>
                <h3 className="text-lg font-bold text-stone-800">{t('newClaim.dropFiles')}</h3>
                <p className="mt-1 text-sm text-stone-500">{t('newClaim.fileSupport')}</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 p-4">
                    <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white">Uploading 75%</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-3/4 bg-primary-fixed" />
                    </div>
                  </div>
                  <img
                    className="h-full w-full object-cover blur-[2px]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByHwWXpqIewGNVATEL6TgcsQsrynAekSb8_I8mNtYaSZPXW4AzoUeHB-ykINTjSOOqsSTWiYWLlo6r4Cb4z10HOoWM_PGZ2mmtcBLcrYGzJqu76vMpz-Mwd9BcSxWTKTKRd4x0c8TcZx5M3HAPPld9nXy-8cuKkCdVZRuxeFHUIYdf6f9hMIIXVGeez8XL8VR8YVxLnErdt-AhOlTf3EDpOV-P9sXMToINfBjyPgj3dyhitGpWzkVJ8I-n0aQaD_89TY_par7Jq2RO"
                    alt="Rain damage"
                  />
                </div>

                <div className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-transparent transition-all hover:border-primary">
                  <button className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-error opacity-0 shadow backdrop-blur transition-opacity group-hover:opacity-100" type="button">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa6CS9CCtni82GPswczkPzZqppWNDIGML4IhjBBV6hOcG_QW8sxc5xkQjhlFDs0Rv7DbtUcYTqAQvl-WXInYLMnFNdhyvg8sewW3dS0uTFNYvaj_IY1wKZSNBl8DqDvbIOQ5YQk8zAR_4zoKchtkZwnSscj8fFYrkdOztzBSssjd22ToyfRxbYA4darXLZMqXTRui3DVcEXh_N6iR4vuQ0l6FZaIovljpCwJJj2giL5xd6MYHdCWA4zNHjFjjuR6Ev8M8dgrTQ7MmG"
                    alt="Field damage"
                  />
                </div>

                <div className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-transparent transition-all hover:border-primary">
                  <button className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-error opacity-0 shadow backdrop-blur transition-opacity group-hover:opacity-100" type="button">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH51s2-a9sl2KMSRoj0zjogt-6avszAUqxWwbyhahUw0r13fvdQhzoyXgy51EaqVijs6CDxPPal97nfFQ0FgftWe0G8kUc6Gwr8ck33DxlSIbR6Isfu2uZHuflpc0s-xkN8RB3gF33uKTny3ItGZ2UEMBHUgoVELjbBeYhhcOyQ1WuNDzZVUaRA279mSDjKAuh18iFq-DrW-Jew0EkzURMtY_B2GrqqaxIHg7Rm4oi_teGxK8RPXL0PZQDuY2ec6jXgZqtYgq2pZcz"
                    alt="Leaf disease"
                  />
                </div>

                <button className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 text-stone-400 transition-colors hover:border-primary hover:text-primary" type="button">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                  <span className="mt-2 text-[10px] font-bold uppercase">{t('newClaim.addPhoto')}</span>
                </button>
              </div>
            </section>

            <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
              <div className="flex items-center gap-3 text-stone-500">
                <span className="material-symbols-outlined text-primary">security</span>
                <p className="max-w-xs text-xs font-medium">
                  {t('newClaim.securityNote')}
                </p>
              </div>
              <div className="w-full sm:w-auto">
                {submitFeedback.error ? <p className="text-xs text-red-600 sm:text-right">{submitFeedback.error}</p> : null}
                {submitFeedback.success ? <p className="text-xs text-emerald-700 sm:text-right">{submitFeedback.success}</p> : null}
              </div>
              <div className="flex w-full items-center gap-4 sm:w-auto">
                <AsyncButton
                  onClick={handleSaveDraft}
                  isLoading={isSavingDraft}
                  loadingText={t('newClaim.saving')}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl px-8 py-4 font-bold text-stone-600 transition-colors hover:bg-surface-container-high sm:flex-none"
                >
                  {t('newClaim.saveDraft')}
                </AsyncButton>
                <AsyncButton
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={t('newClaim.submitting')}
                  disabled={isSavingDraft}
                  className="font-headline flex-1 rounded-xl bg-gradient-to-br from-primary to-primary-container px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl sm:flex-none"
                >
                  {t('newClaim.submitClaim')}
                </AsyncButton>
              </div>
            </div>
          </form>
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  )
}
