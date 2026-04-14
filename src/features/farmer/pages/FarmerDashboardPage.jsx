import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import './FarmerDashboardPage.css'

export function FarmerDashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState('')
  const [weatherLocationLabel, setWeatherLocationLabel] = useState(t('farmerDashboard.currentLocation'))
  const farmerName = 'Rajesh'
  const dashboardStats = { total: 32, pending: 12, approved: 15, rejected: 5 }
  const activityItems = [
    {
      id: 'fallback-1',
      title: t('farmerDashboard.activityApprovedTitle'),
      time: t('farmerDashboard.activityApprovedTime'),
      description: t('farmerDashboard.activityApprovedDesc'),
      status: 'approved',
    },
  ]

  const fetchWeatherForCoords = async (latitude, longitude, label) => {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      hourly: 'temperature_2m,soil_temperature_0cm,rain,surface_pressure,cloud_cover,visibility,evapotranspiration,temperature_80m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,wind_direction_80m,precipitation,precipitation_probability,relative_humidity_2m',
      timezone: 'auto',
    })

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
    if (!response.ok) {
      throw new Error(`Open-Meteo request failed: ${response.status}`)
    }

    const payload = await response.json()
    const hourly = payload?.hourly || {}

    const rainSeries = (hourly.rain || []).filter((value) => value !== null)
    const precipitationSeries = (hourly.precipitation || []).filter((value) => value !== null)
    const humiditySeries = (hourly.relative_humidity_2m || []).filter((value) => value !== null)

    const rainfall = rainSeries.length ? rainSeries[rainSeries.length - 1] : (precipitationSeries.length ? precipitationSeries[precipitationSeries.length - 1] : 0)
    const humidity = humiditySeries.length ? humiditySeries[humiditySeries.length - 1] : 50
    const floodRisk = Math.min(100, Math.round((rainfall * 5) + (humidity * 0.2)))
    const droughtRisk = Math.max(0, Math.round((100 - rainfall) * 0.5))

    setWeather({
      rainfall,
      flood_risk: floodRisk,
      drought_risk: droughtRisk,
      timestamp: new Date().toISOString(),
    })
    setWeatherError('')
    setWeatherLocationLabel(label)
  }

  // Fetch weather on mount using browser geolocation; fall back to Hisar if unavailable.
  useEffect(() => {
    const fetchWeather = async () => {
      const fallbackLat = 29.1965
      const fallbackLon = 75.7345
      const fallbackLabel = t('farmerDashboard.hisarFallback')

      const fetchFallback = async () => {
        try {
          await fetchWeatherForCoords(fallbackLat, fallbackLon, fallbackLabel)
        } catch (fallbackError) {
          console.error('Weather API fallback error:', fallbackError)
          setWeatherError(t('farmerDashboard.weatherError'))
        }
      }

      if (!navigator.geolocation) {
        await fetchFallback()
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const roundedLat = Number(latitude.toFixed(4))
            const roundedLon = Number(longitude.toFixed(4))
            await fetchWeatherForCoords(roundedLat, roundedLon, `${t('farmerDashboard.currentLocation')} (${roundedLat}, ${roundedLon})`)
          } catch (geoFetchError) {
            console.error('Weather API geolocation fetch error:', geoFetchError)
            await fetchFallback()
          }
        },
        async () => {
          await fetchFallback()
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      )
    }

    fetchWeather()
  }, [t])

  const totalClaims = dashboardStats.total || 0
  const approvedPct = totalClaims ? Math.round((dashboardStats.approved / totalClaims) * 100) : 0
  const pendingPct = totalClaims ? Math.round((dashboardStats.pending / totalClaims) * 100) : 0
  const rejectedPct = totalClaims ? Math.round((dashboardStats.rejected / totalClaims) * 100) : 0
  const efficiencyPct = totalClaims ? Math.round((dashboardStats.approved / totalClaims) * 100) : 0
  const welcomeText = t('farmerDashboard.welcome').replace('Rajesh', farmerName)

  return (
    <div className="bg-background text-on-surface min-h-screen farmer-dashboard-root">
      <FarmerSidebar />
      <FarmerTopNav />

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl space-y-8 px-6 pb-20 pt-24">
          <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">{t('farmerDashboard.title')}</h1>
              <p className="max-w-md text-stone-600 font-medium">
                {welcomeText}
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
                {t('farmerDashboard.newClaim')}
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="asymmetric-card editorial-shadow space-y-4 bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined text-3xl">receipt_long</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('farmerDashboard.overview')}</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">{dashboardStats.total}</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">{t('farmerDashboard.totalClaimsFiled')}</p>
              </div>
            </div>

            <div className="asymmetric-card editorial-shadow space-y-4 bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <span className="material-symbols-outlined text-3xl">pending_actions</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{t('farmerDashboard.inReview')}</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">{dashboardStats.pending}</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">{t('farmerDashboard.pendingApproval')}</p>
              </div>
            </div>

            <div className="asymmetric-card editorial-shadow space-y-4 border-l-4 border-primary bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('farmerDashboard.success')}</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">{dashboardStats.approved}</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">{t('farmerDashboard.claimsApproved')}</p>
              </div>
            </div>

            <div className="asymmetric-card editorial-shadow space-y-4 bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error-container text-error">
                  <span className="material-symbols-outlined text-3xl">cancel</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-error">{t('farmerDashboard.issues')}</span>
              </div>
              <div>
                <span className="font-headline text-4xl font-extrabold text-on-surface">{dashboardStats.rejected}</span>
                <p className="mt-1 text-sm font-semibold text-stone-500">{t('farmerDashboard.claimsRejected')}</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="editorial-shadow rounded-3xl bg-surface-container-low p-8">
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-on-surface">{t('farmerDashboard.claimDistribution')}</h3>
                    <p className="text-sm text-stone-500">{t('farmerDashboard.visualBreakdown')}</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-bold text-primary">
                    {t('farmerDashboard.monthly')} <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
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
                      <span className="font-headline text-3xl font-black">{efficiencyPct}%</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-400">{t('farmerDashboard.efficiency')}</span>
                    </div>
                  </div>

                  <div className="w-full flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-primary" /> {t('farmerDashboard.approved')}
                        </span>
                        <span className="text-stone-400">{approvedPct}%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-surface-container-highest">
                        <div className="h-3 rounded-full bg-primary" style={{ width: `${approvedPct}%` }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500" /> {t('farmerDashboard.pending')}
                        </span>
                        <span className="text-stone-400">{pendingPct}%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-surface-container-highest">
                        <div className="h-3 rounded-full bg-amber-500" style={{ width: `${pendingPct}%` }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-error" /> {t('farmerDashboard.rejected')}
                        </span>
                        <span className="text-stone-400">{rejectedPct}%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-surface-container-highest">
                        <div className="h-3 rounded-full bg-error" style={{ width: `${rejectedPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-xl font-bold text-on-surface">{t('farmerDashboard.recentActivity')}</h3>
                  <button className="text-sm font-bold text-primary hover:underline">{t('farmerDashboard.viewAll')}</button>
                </div>

                <div className="space-y-4">
                  {activityItems.map((item) => (
                    <div key={item.id} className="flex cursor-pointer gap-4 rounded-2xl bg-surface-container-lowest p-5 transition-transform hover:translate-x-1">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.status === 'approved' ? 'bg-green-50' : item.status === 'rejected' ? 'bg-red-50' : 'bg-amber-50'}`}>
                        <span className={`material-symbols-outlined ${item.status === 'approved' ? 'text-primary' : item.status === 'rejected' ? 'text-error' : 'text-amber-600'}`}>task_alt</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-on-surface">{item.title}</h4>
                          <span className="text-xs font-medium text-stone-400">{item.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-stone-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="editorial-shadow space-y-6 rounded-3xl p-8 text-on-primary" style={{ background: 'linear-gradient(135deg, #115638, #2f6f4f)' }}>
                <h3 className="font-headline text-xl font-bold">{t('farmerDashboard.quickActions')}</h3>
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
                      <p className="text-sm font-bold">{t('farmerDashboard.newClaim')}</p>
                      <p className="text-[10px] text-white/60">{t('farmerDashboard.newClaimHint')}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/farmer/chatbot')}
                    className="group flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">{t('farmerDashboard.aiConsult')}</p>
                      <p className="text-[10px] text-white/60">{t('farmerDashboard.aiConsultHint')}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/farmer/grievances')}
                    className="group flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>report_problem</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">{t('farmerDashboard.grievance')}</p>
                      <p className="text-[10px] text-white/60">{t('farmerDashboard.grievanceHint')}</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="asymmetric-card editorial-shadow group relative overflow-hidden rounded-3xl bg-surface-container-lowest p-8">
                <div className="relative z-10 space-y-4">
                  <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">{t('farmerDashboard.aiSuggestion')}</span>
                  <h3 className="font-headline text-xl font-bold leading-tight text-on-surface">{t('farmerDashboard.aiSuggestionTitle')}</h3>
                  <p className="text-sm text-stone-500">{t('farmerDashboard.aiSuggestionDesc')}</p>
                  <button type="button" onClick={() => navigate('/farmer/chatbot')} className="flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                    {t('farmerDashboard.readCaseStudy')} <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <div className="absolute -bottom-4 -right-4 scale-150 opacity-10 transition-transform duration-700 group-hover:rotate-12">
                  <span className="material-symbols-outlined text-9xl">psychology</span>
                </div>
              </div>

              <div className="editorial-shadow relative overflow-hidden rounded-3xl bg-surface-container-low p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-stone-400">{t('farmerDashboard.currentWeatherRisk')}</p>
                    {weather ? (
                      <>
                        <h4 className="font-headline mt-1 text-3xl font-black">
                          {Math.round(weather.rainfall || 0)}mm
                        </h4>
                        <p className="text-sm font-semibold text-stone-600">{t('farmerDashboard.rainfallLabel')} · {weatherLocationLabel}</p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-bold text-red-600">{t('farmerDashboard.floodRisk')}</p>
                            <p className="text-lg font-black text-red-600">{Math.round(weather.flood_risk || 0)}%</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-orange-600">{t('farmerDashboard.droughtRisk')}</p>
                            <p className="text-lg font-black text-orange-600">{Math.round(weather.drought_risk || 0)}%</p>
                          </div>
                        </div>
                      </>
                    ) : weatherError ? (
                      <p className="mt-2 text-sm text-red-500">{weatherError}</p>
                    ) : (
                      <p className="mt-2 text-sm text-stone-500">{t('farmerDashboard.loadingWeather')}</p>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-6xl text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                    cloud
                  </span>
                </div>

                <div className="scrollbar-hide mt-8 flex gap-4 overflow-x-auto pb-2">
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">{t('farmerDashboard.flood')}</span>
                    <span className="material-symbols-outlined my-1 text-lg text-blue-500">water</span>
                    <span className="text-xs font-bold">{Math.round(weather?.flood_risk || 0)}%</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">{t('farmerDashboard.drought')}</span>
                    <span className="material-symbols-outlined my-1 text-lg text-orange-500">dry</span>
                    <span className="text-xs font-bold">{Math.round(weather?.drought_risk || 0)}%</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">{t('farmerDashboard.rainfall')}</span>
                    <span className="material-symbols-outlined my-1 text-lg text-blue-400">grain</span>
                    <span className="text-xs font-bold">{Math.round(weather?.rainfall || 0)}mm</span>
                  </div>
                  {weather?.timestamp && (
                    <div className="flex shrink-0 flex-col items-center">
                      <span className="text-[10px] font-bold uppercase text-stone-400">{t('farmerDashboard.updated')}</span>
                      <span className="material-symbols-outlined my-1 text-lg text-stone-400">schedule</span>
                      <span className="text-xs font-bold">
                        {new Date(weather.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FarmerBottomNav />

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
