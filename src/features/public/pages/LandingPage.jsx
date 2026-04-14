import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../../hooks/useLanguage'

const VIDEO_SRC = '/15517474_3840_2160_30fps.mp4'

const SHORT_LANG_OPTIONS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
]

const LANG_OPTIONS = [
  { code: 'en', label: 'English', subtitle: 'Default language', glyph: 'A' },
  { code: 'mr', label: 'मराठी', subtitle: 'Marathi', glyph: 'म' },
  { code: 'hi', label: 'हिंदी', subtitle: 'Hindi', glyph: 'अ' },
]

const FOOTER_LINK_TARGETS = {
  platform: ['/login', '/register', 'https://agmarknet.gov.in/', '/farmer/chatbot', 'https://mausam.imd.gov.in/'],
  company: ['https://www.india.gov.in/', 'https://blog.mygov.in/', 'https://www.ncs.gov.in/', 'https://pib.gov.in/', 'mailto:support@annadataconnect.in'],
  support: ['mailto:support@annadataconnect.in', 'https://www.mygov.in/privacy-policy/', 'https://www.mygov.in/terms-and-conditions/', 'mailto:grievance@annadataconnect.in'],
}

function StepLeafIcon() {
  return (
    <svg className="h-5 w-5 text-[#1A3D1A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M5 15c0-5.523 4.477-10 10-10h4v4c0 5.523-4.477 10-10 10H5v-4Z" />
      <path d="M8 16c2.5-.3 4.3-1.2 5.6-2.6 1.2-1.3 2.1-3.1 2.4-5.4" />
    </svg>
  )
}

function StepChartIcon() {
  return (
    <svg className="h-5 w-5 text-[#1A3D1A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M6 17a5 5 0 1 1 9.6-1.8A3.5 3.5 0 1 1 18.5 21H7.5A3.5 3.5 0 0 1 6 17Z" />
      <path d="M10 9.5 8.8 12h2.1l-1.1 2.5 3-3.2h-2.1L12 9.5Z" />
    </svg>
  )
}

function StepConnectIcon() {
  return (
    <svg className="h-5 w-5 text-[#1A3D1A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M16.5 13.5v4" />
      <path d="M14.5 15.5h4" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M4 4 20 20" />
      <path d="M20 4 4 20" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M20 11.5a8.5 8.5 0 0 1-12.3 7.6L4 20l1-3.5A8.5 8.5 0 1 1 20 11.5Z" />
      <path d="M9.4 8.9c.2-.4.4-.4.8-.4.2 0 .5 0 .7.6.2.5.7 1.7.8 1.8.1.1.1.3 0 .4l-.3.4c-.1.1-.2.3-.1.5.1.2.5 1 1.2 1.5.9.8 1.7 1 2 1.1.2.1.4 0 .5-.1l.5-.5c.1-.1.3-.2.5-.1l1.6.8c.3.2.4.3.4.4 0 .1-.1.8-.4 1.2-.3.4-.7.6-1.1.6-.4 0-1.2-.2-2.5-.9-1-.5-1.9-1.3-2.6-2.1-.7-.8-1.3-1.7-1.6-2.6-.3-.9-.3-1.7-.1-2.2.2-.5.5-.8.7-.9Z" />
    </svg>
  )
}

function BrandLogo({ light = false, label = 'Annadata' }) {
  return (
    <span className={`font-display tracking-tight ${light ? 'text-white' : 'text-[#111111]'} text-2xl`}>
      {light ? label : ''}
      {light ? <sup className="ml-0.5 text-[11px] align-super">®</sup> : null}
    </span>
  )
}

export function LandingPage() {
  const { lang, setLang, t } = useLanguage()
  const [videoOpacity, setVideoOpacity] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    let rafId

    const tick = () => {
      const el = videoRef.current
      if (el && Number.isFinite(el.duration) && el.duration > 0) {
        const fadeWindow = 0.5
        const now = el.currentTime
        const duration = el.duration

        if (now <= fadeWindow) {
          setVideoOpacity(Math.min(now / fadeWindow, 1))
        } else if (now >= duration - fadeWindow) {
          setVideoOpacity(Math.max((duration - now) / fadeWindow, 0))
        } else {
          setVideoOpacity(1)
        }
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  const steps = useMemo(
    () => [
      { ...t.step1, icon: <StepLeafIcon /> },
      { ...t.step2, icon: <StepChartIcon /> },
      { ...t.step3, icon: <StepConnectIcon /> },
    ],
    [t],
  )

  const handleVideoEnded = () => {
    const el = videoRef.current
    if (!el) {
      return
    }

    setVideoOpacity(0)
    window.setTimeout(() => {
      el.currentTime = 0
      el.play().catch(() => {
        // Ignore autoplay failures in restrictive browsers.
      })
    }, 100)
  }

  const sectionParagraphs = [t.sectionBody]

  const renderFooterLink = (label, target) => {
    if (target.startsWith('/')) {
      return (
        <Link key={label} to={target} className="mb-2 block text-sm text-[#8FA888] transition-colors hover:text-white">
          {label}
        </Link>
      )
    }

    return (
      <a key={label} href={target} target="_blank" rel="noreferrer" className="mb-2 block text-sm text-[#8FA888] transition-colors hover:text-white">
        {label}
      </a>
    )
  }

  return (
    <div className="font-ui relative min-h-screen w-full overflow-hidden bg-[#FAFAF7] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-end px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {SHORT_LANG_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => setLang(option.code)}
                  className={`rounded-full border border-[#C2D9B0] px-3 py-1 text-xs transition ${
                    lang === option.code ? 'bg-[#1A3D1A] text-white' : 'bg-transparent text-[#6B7A5E]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <Link
              to="/register"
              className="rounded-full bg-[#1A3D1A] px-5 py-2 text-sm text-white transition-transform hover:scale-[1.03]"
            >
              {t.navCta}
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onEnded={handleVideoEnded}
            style={{ opacity: videoOpacity, transition: 'opacity 0.5s ease' }}
            className="h-full w-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[1] h-32 bg-gradient-to-t from-[#FAFAF7] to-transparent" />
        <div className="absolute inset-0 z-[1] bg-black/35" />

        <div className="relative z-10 flex w-full flex-col items-center px-6 pb-40 pt-[calc(8rem-75px)] text-center">
          <h1 className="font-display animate-fade-rise mt-8 max-w-5xl text-6xl font-normal leading-[0.9] tracking-[-2px] sm:text-7xl md:text-8xl lg:text-9xl">
            <span
              className="block text-[#d7dce6]"
              style={{
                textShadow: '0 1px 0 rgba(0,0,0,0.22), 0 10px 28px rgba(0,0,0,0.3)',
              }}
            >
              {t.heroLine1}
            </span>
            <span
              className="block text-white"
              style={{
                textShadow: '0 3px 0 rgba(0,0,0,0.28), 0 16px 40px rgba(0,0,0,0.38), 0 0 22px rgba(255,255,255,0.18)',
              }}
            >
              {t.heroLine2}.
            </span>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {t.heroSub}
          </p>
        </div>
      </section>

      <section className="border-y border-[#D6E8CC] bg-[#F4F8F0] px-6 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
          <div className="rounded-3xl border border-[#D6E8CC] bg-white p-5 md:p-6">
            <h2 className="text-center text-2xl font-extrabold text-[#285539] md:text-4xl">Welcome to Annadata Connect</h2>
            <p className="mt-2 text-center text-sm text-[#7888a0] md:text-lg">Please select your preferred language to proceed</p>

            <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              {LANG_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => setLang(option.code)}
                  className={`rounded-2xl border px-4 py-4 text-center transition ${
                    lang === option.code
                      ? 'border-[#2f7a51] bg-[#f7fbf2] shadow-[0_12px_24px_-14px_rgba(26,61,26,0.55)]'
                      : 'border-[#d8dfe8] bg-white hover:border-[#a9b8cc] hover:bg-[#fbfdfc]'
                  }`}
                >
                  <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f3ec] text-lg font-bold text-[#3b7a56]">
                    {option.glyph}
                  </span>
                  <span className="block text-xl font-bold text-[#273546]">{option.label}</span>
                  <span className="mt-1 block text-xs text-[#97a5b8]">{option.subtitle}</span>
                </button>
              ))}
            </div>

            <div className="my-10 h-px bg-[#e5ebf2]" />

            <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-5">
              <p className="text-lg font-semibold text-[#5d6c80]">Already have an account?</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/login"
                className="rounded-xl bg-[#2f7a51] px-6 py-2.5 text-base font-semibold text-white shadow-[0_8px_20px_-10px_rgba(47,122,81,0.8)] transition hover:scale-[1.02]"
              >
                Farmer Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl border-2 border-[#2f7a51] bg-white px-6 py-2.5 text-base font-semibold text-[#2f7a51] transition hover:scale-[1.02]"
              >
                Register Now
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="what-is-annadata" className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#4A7A28]">{t.eyebrow}</p>
            <h2 className="font-display mb-4 max-w-sm text-4xl font-normal text-[#111111]">{t.sectionTitle}</h2>
            <div className="space-y-4 text-base leading-relaxed text-[#6B7A5E]">
              {sectionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <article key={step.num + step.title} className="rounded-2xl border border-[#D6E8CC] bg-[#F4F8F0] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3DE]">{step.icon}</div>
                  <div>
                    <p className="mb-1 text-xs font-medium text-[#4A7A28]">{step.num}</p>
                    <h3 className="text-sm font-medium text-[#111111]">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B7A5E]">{step.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#111B11] text-[#CDD9C5]">
        <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-16 sm:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-3">
                <BrandLogo light label={t.brand} />
              </div>
              <p className="max-w-[200px] text-sm leading-relaxed text-[#8FA888]">
                {t.footerTagline}
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-white">{t.footerPlatformTitle}</h4>
              {t.footerPlatformLinks.map((item, index) => renderFooterLink(item, FOOTER_LINK_TARGETS.platform[index] || '/'))}
            </div>

            <div>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-white">{t.footerCompanyTitle}</h4>
              {t.footerCompanyLinks.map((item, index) => renderFooterLink(item, FOOTER_LINK_TARGETS.company[index] || '/'))}
            </div>

            <div>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-white">{t.footerSupportTitle}</h4>
              {t.footerSupportLinks.map((item, index) => renderFooterLink(item, FOOTER_LINK_TARGETS.support[index] || '/'))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A3D2A] pt-6">
            <p className="text-xs text-[#5A6E55]">{t.footerRights}</p>
            <div className="flex items-center gap-2">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter X" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3D2A] bg-[#1E3020] text-white/60">
                <XIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3D2A] bg-[#1E3020] text-white/60">
                <InstagramIcon />
              </a>
              <a href="https://wa.me/919000000000" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3D2A] bg-[#1E3020] text-white/60">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <p className="mt-4 text-center text-xs italic text-[#5A6E55]">{t.footerBlessing}</p>
        </div>
      </footer>
    </div>
  )
}
