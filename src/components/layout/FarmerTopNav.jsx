import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES, isRouteActive } from '../../constants/navigation'
import i18n from '../../i18n/config'

export function FarmerTopNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || localStorage.getItem('language') || 'en')

  const isDashboardActive = isRouteActive(pathname, [ROUTES.FARMER.DASHBOARD])
  const isReportsActive = isRouteActive(pathname, [ROUTES.FARMER.MY_CLAIMS, ROUTES.FARMER.CLAIM_DETAILS, ROUTES.FARMER.NEW_CLAIM])
  const isInsightsActive = isRouteActive(pathname, [ROUTES.FARMER.CHATBOT])

  const handleLanguageToggle = () => {
    const nextLanguage = currentLanguage === 'en' ? 'hi' : 'en'
    i18n.changeLanguage(nextLanguage)
    localStorage.setItem('language', nextLanguage)
    setCurrentLanguage(nextLanguage)
  }

  const linkClass = (active) =>
    active
      ? 'border-b-2 border-[#115638] pb-1 text-sm font-semibold text-[#115638]'
      : 'text-sm font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]'

  return (
    <header className="fixed top-0 z-50 w-full bg-[#f7faf7]/80 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] backdrop-blur-md lg:left-64 lg:w-[calc(100%-16rem)]">
      <div className="flex w-full items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <span className="font-headline text-xl font-bold tracking-tight text-[#115638]">Annadata Connect</span>
          <nav className="hidden items-center gap-6 md:flex">
            <Link className={linkClass(isDashboardActive)} to={ROUTES.FARMER.DASHBOARD}>
              Dashboard
            </Link>
            <Link className={linkClass(isReportsActive)} to={ROUTES.FARMER.MY_CLAIMS}>
              Reports
            </Link>
            <Link className={linkClass(isInsightsActive)} to={ROUTES.FARMER.CHATBOT}>
              AI Insights
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-200"
          >
            <span className="material-symbols-outlined text-sm">translate</span>
            <span className="hidden sm:inline">{currentLanguage.toUpperCase()}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.FARMER.GRIEVANCES)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-error" />
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.FARMER.PROFILE)}
            className="h-10 w-10 overflow-hidden rounded-full border border-stone-200 bg-stone-200"
          >
            <img
              alt="User Profile Avatar"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmXfS16ER2Gkk65x1zDqtXBE1aVSKwN_FbFcDbrnbn1gV-IrSUDkDgLV9_o3jbRRjKleCzucWyhMR-w4HSIcYvkiBviokAJiMC19j9ERIoAlCgk_jAu4kF_Yl8EhuvDMYe_jhhdhYJMH-vu59ZLORO_aTdRPCNipq9l9sY3bfAw-p6pELjyYz2gIdPt9_cMAZrNm2K_7kpVMBNV3rSpoplmMftTu0CrhQyLDX2q4XIMgBD3VDecufb5gIEtX-YP_fECeyJplXbt_7X"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
