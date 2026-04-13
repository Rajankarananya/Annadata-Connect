import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import './FarmerDashboardPage.css'

export function FarmerDashboardPage() {
  const navigate = useNavigate()
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState('')
  const [weatherLocationLabel, setWeatherLocationLabel] = useState('Current Location')

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
      const fallbackLabel = 'Hisar Region (Fallback)'

      const fetchFallback = async () => {
        try {
          await fetchWeatherForCoords(fallbackLat, fallbackLon, fallbackLabel)
        } catch (fallbackError) {
          console.error('Weather API fallback error:', fallbackError)
          setWeatherError('Could not fetch weather data')
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
            await fetchWeatherForCoords(roundedLat, roundedLon, `Current Location (${roundedLat}, ${roundedLon})`)
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
  }, [])

  return (
    <div className="bg-background text-on-surface min-h-screen farmer-dashboard-root">
      <FarmerSidebar />
      <FarmerTopNav />

      <main className="min-h-screen lg:ml-64">
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
                    <p className="text-sm font-bold text-stone-400">Current Weather & Risk</p>
                    {weather ? (
                      <>
                        <h4 className="font-headline mt-1 text-3xl font-black">
                          {Math.round(weather.rainfall || 0)}mm
                        </h4>
                        <p className="text-sm font-semibold text-stone-600">Rainfall · {weatherLocationLabel}</p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-bold text-red-600">Flood Risk</p>
                            <p className="text-lg font-black text-red-600">{Math.round(weather.flood_risk || 0)}%</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-orange-600">Drought Risk</p>
                            <p className="text-lg font-black text-orange-600">{Math.round(weather.drought_risk || 0)}%</p>
                          </div>
                        </div>
                      </>
                    ) : weatherError ? (
                      <p className="mt-2 text-sm text-red-500">{weatherError}</p>
                    ) : (
                      <p className="mt-2 text-sm text-stone-500">Loading weather...</p>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-6xl text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                    cloud
                  </span>
                </div>

                <div className="scrollbar-hide mt-8 flex gap-4 overflow-x-auto pb-2">
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Flood</span>
                    <span className="material-symbols-outlined my-1 text-lg text-blue-500">water</span>
                    <span className="text-xs font-bold">{Math.round(weather?.flood_risk || 0)}%</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Drought</span>
                    <span className="material-symbols-outlined my-1 text-lg text-orange-500">dry</span>
                    <span className="text-xs font-bold">{Math.round(weather?.drought_risk || 0)}%</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Rainfall</span>
                    <span className="material-symbols-outlined my-1 text-lg text-blue-400">grain</span>
                    <span className="text-xs font-bold">{Math.round(weather?.rainfall || 0)}mm</span>
                  </div>
                  {weather?.timestamp && (
                    <div className="flex shrink-0 flex-col items-center">
                      <span className="text-[10px] font-bold uppercase text-stone-400">Updated</span>
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
