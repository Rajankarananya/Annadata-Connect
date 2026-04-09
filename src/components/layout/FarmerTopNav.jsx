import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES, isRouteActive } from '../../constants/navigation'
import { getAppLanguage, setAppLanguage, togglePrimaryLanguage } from '../../i18n/language'

export function FarmerTopNav() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [currentLanguage, setCurrentLanguage] = useState(getAppLanguage())

  const isHomeActive = isRouteActive(pathname, [ROUTES.FARMER.DASHBOARD])
  const isClaimsActive = isRouteActive(pathname, [ROUTES.FARMER.MY_CLAIMS, ROUTES.FARMER.CLAIM_DETAILS, ROUTES.FARMER.NEW_CLAIM])
  const isAiActive = isRouteActive(pathname, [ROUTES.FARMER.CHATBOT])

  const handleLanguageToggle = () => {
    const nextLanguage = togglePrimaryLanguage(currentLanguage)
    setAppLanguage(nextLanguage)
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
          <span className="font-headline text-xl font-bold tracking-tight text-[#115638]">{t('common.appName')}</span>
          <nav className="hidden items-center gap-6 md:flex">
            <Link className={linkClass(isHomeActive)} to={ROUTES.FARMER.DASHBOARD}>
              {t('common.home')}
            </Link>
            <Link className={linkClass(isClaimsActive)} to={ROUTES.FARMER.MY_CLAIMS}>
              {t('common.claims')}
            </Link>
            <Link className={linkClass(isAiActive)} to={ROUTES.FARMER.CHATBOT}>
              {t('common.aiAdvisor')}
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
