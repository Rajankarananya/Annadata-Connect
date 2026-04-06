import { Link, useLocation } from 'react-router-dom'

function getActiveKey(pathname) {
  if (pathname.startsWith('/farmer/profile')) return 'profile'
  if (pathname.startsWith('/farmer/grievances')) return 'support'
  if (pathname.startsWith('/farmer/chatbot')) return 'advisor'
  if (
    pathname.startsWith('/farmer/my-claims') ||
    pathname.startsWith('/farmer/claim-details') ||
    pathname.startsWith('/farmer/new-claim')
  ) {
    return 'claims'
  }
  return 'home'
}

export function FarmerSidebar() {
  const { pathname } = useLocation()
  const activeKey = getActiveKey(pathname)

  const isActive = (key) => key === activeKey

  const navClass = (key) =>
    isActive(key)
      ? 'ml-4 flex items-center gap-3 rounded-l-full bg-white py-3 pl-4 text-[#115638] shadow-sm dark:bg-stone-800 dark:text-[#4ade80]'
      : 'mx-4 flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50'

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-[#f1f4f1] py-6 dark:bg-stone-900 lg:flex">
      <div className="mb-10 mt-14 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              eco
            </span>
          </div>
          <div>
            <h2 className="font-headline text-lg font-black leading-tight text-[#115638] dark:text-[#4ade80]">
              Annadata
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Smart Agriculture</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <Link className={navClass('home')} to="/farmer/dashboard">
          <span className="material-symbols-outlined" style={isActive('home') ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            home
          </span>
          <span className="font-manrope text-sm font-bold tracking-wide">Home</span>
        </Link>

        {/* <button
          type="button"
          className="mx-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50"
        >
          <span className="material-symbols-outlined">eco</span>
          <span className="font-manrope text-sm font-bold tracking-wide">My Crops</span>
        </button> */}

        <Link className={navClass('advisor')} to="/farmer/chatbot">
          <span className="material-symbols-outlined" style={isActive('advisor') ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            psychology
          </span>
          <span className="font-manrope text-sm font-bold tracking-wide">AI Advisor</span>
        </Link>

        <Link className={navClass('claims')} to="/farmer/my-claims">
          <span className="material-symbols-outlined" style={isActive('claims') ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            assignment_turned_in
          </span>
          <span className="font-manrope text-sm font-bold tracking-wide">My Claims</span>
        </Link>

        {/* <button
          type="button"
          className="mx-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50"
        >
          <span className="material-symbols-outlined">storefront</span>
          <span className="font-manrope text-sm font-bold tracking-wide">Market</span>
        </button> */}
      </nav>

      <div className="mt-auto space-y-1 border-t border-stone-200 px-4 py-6 dark:border-stone-800">
        <Link className={navClass('profile')} to="/farmer/profile">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="font-manrope text-sm font-bold tracking-wide">Profile & Settings</span>
        </Link>

        <Link className={navClass('support')} to="/farmer/grievances">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="font-manrope text-sm font-bold tracking-wide">Support</span>
        </Link>
      </div>
    </aside>
  )
}
