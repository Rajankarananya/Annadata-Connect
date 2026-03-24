import './NewClaimPage.css'

export function NewClaimPage() {
  return (
    <div className="new-claim-root bg-background text-on-surface min-h-screen antialiased">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r-0 bg-[#f1f4f1] lg:flex dark:bg-stone-900">
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
            </div>
            <div>
              <h1 className="font-headline text-lg font-black tracking-tight text-[#115638]">Annadata Connect</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Smart Agriculture</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          <a className="mx-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold tracking-wide text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50" href="#">
            <span className="material-symbols-outlined">home</span> Home
          </a>
          <a className="mx-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold tracking-wide text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50" href="#">
            <span className="material-symbols-outlined">eco</span> My Crops
          </a>
          <a className="mx-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold tracking-wide text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50" href="#">
            <span className="material-symbols-outlined">psychology</span> AI Advisor
          </a>
          <a className="ml-4 flex items-center gap-3 rounded-l-full bg-white py-3 pl-4 text-sm font-bold tracking-wide text-[#115638] shadow-sm transition-transform duration-200 dark:bg-stone-800 dark:text-[#4ade80]" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              assignment_turned_in
            </span>{' '}
            Claims
          </a>
          <a className="mx-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold tracking-wide text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50" href="#">
            <span className="material-symbols-outlined">storefront</span> Market
          </a>
        </nav>

        <div className="mb-20 p-4">
          <button className="font-headline flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-white shadow-lg transition-all hover:opacity-90">
            <span className="material-symbols-outlined">add</span>
            New Analysis
          </button>
        </div>

        <div className="mx-4 border-t border-stone-200/50 py-6">
          <a className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-primary" href="#">
            <span className="material-symbols-outlined">settings</span> Settings
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-primary" href="#">
            <span className="material-symbols-outlined">help_outline</span> Support
          </a>
        </div>
      </aside>

      <header className="fixed top-0 z-30 w-full bg-[#f7faf7]/80 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] backdrop-blur-md lg:left-64 lg:w-[calc(100%-16rem)]">
        <div className="flex w-full items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-primary lg:hidden">menu</span>
            <nav className="hidden items-center gap-8 md:flex">
              <a className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" href="#">Dashboard</a>
              <a className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" href="#">Reports</a>
              <a className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" href="#">AI Insights</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full bg-surface-container px-3 py-1.5 text-sm font-medium text-stone-600 sm:flex">
              <span className="material-symbols-outlined text-lg">translate</span>
              Language
            </div>
            <div className="relative">
              <span className="material-symbols-outlined cursor-pointer rounded-full p-2 text-stone-600 hover:bg-surface-container">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-error" />
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary-fixed">
              <img
                alt="User Profile Avatar"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsJkenbmEAd0Uy7l9q-S0F7XtWBK1iSMYmUG1CcFEI6Um1Ky-VFv3dcBpAasC-9qB57lMoer9-yAGYq2mkLN6BEW0qEGYpz0Mn5I1s4Tue5fNvf3liwIC4_db-kts3NezckNwnWjPwYL_iDB3UBtzn-uRfz8BUyX5_3_mlc5ZVbS8wJGng46n7uD12K9eaxCxShFJU7Z5MBFqaxMHh3JJYfnJ57tUQbuSER85DjMRHnla5i-rzryTwGhtYO3ERLU_Eto2U9GMZM7ZI"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 pb-32 pt-24 lg:pl-72">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-2 text-sm text-stone-500">
              <a className="transition-colors hover:text-primary" href="#">Claims</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-semibold text-primary">New Claim Submission</span>
            </div>
            <h1 className="font-headline mb-2 text-4xl font-extrabold tracking-tight text-on-surface">Report Crop Damage</h1>
            <p className="font-medium text-stone-600">Please provide accurate details of the incident to expedite your insurance processing.</p>
          </div>

          <form className="space-y-8">
            <section className="asymmetric-card bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">potted_plant</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">Crop Identity</h2>
                  <p className="text-sm text-stone-500">Details of the affected plantation</p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">Crop Type</label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-xl border-0 bg-surface-container-low py-4 pl-4 pr-10 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint">
                      <option>Select Crop Type</option>
                      <option defaultValue>Premium Basmati Rice</option>
                      <option>Organic Wheat</option>
                      <option>Hybrid Maize</option>
                      <option>Sugarcane (Co 0238)</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">Sowing Date</label>
                  <div className="relative">
                    <input className="w-full rounded-xl border-0 bg-surface-container-low px-4 py-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint" defaultValue="2023-10-15" type="date" />
                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 lg:hidden">calendar_today</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="asymmetric-card bg-surface-container-low p-8">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined">history_edu</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">Incident Logistics</h2>
                  <p className="text-sm text-stone-500">When and where did it happen?</p>
                </div>
              </div>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">Date of Incident</label>
                  <input className="w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint" type="date" />
                </div>
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">Specific Farm Location</label>
                  <div className="relative">
                    <input className="w-full rounded-xl border-0 bg-surface-container-lowest py-4 pl-12 pr-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint" placeholder="Plot A-23, North Boundary" type="text" />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">location_on</span>
                  </div>
                </div>
              </div>

              <div className="group relative h-48 w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                  <button className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary shadow-xl backdrop-blur-sm" type="button">
                    <span className="material-symbols-outlined text-lg">my_location</span>
                    Refine Map Pin
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
                  <h2 className="font-headline text-xl font-bold text-primary">Damage Description</h2>
                  <p className="text-sm text-stone-500">Provide qualitative details for the adjuster</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">Nature of Damage</label>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-full border-2 border-primary-fixed bg-primary-fixed/20 px-5 py-2.5 text-sm font-bold text-primary" type="button">Excessive Rain</button>
                    <button className="rounded-full border-2 border-transparent bg-surface-container px-5 py-2.5 text-sm font-bold text-stone-500 transition-all hover:border-outline-variant" type="button">Pest Infestation</button>
                    <button className="rounded-full border-2 border-transparent bg-surface-container px-5 py-2.5 text-sm font-bold text-stone-500 transition-all hover:border-outline-variant" type="button">Hailstorm</button>
                    <button className="rounded-full border-2 border-transparent bg-surface-container px-5 py-2.5 text-sm font-bold text-stone-500 transition-all hover:border-outline-variant" type="button">Wildfire</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block px-1 text-sm font-bold tracking-wide text-stone-700">Detailed Narrative</label>
                  <textarea
                    className="w-full rounded-2xl border-0 bg-surface-container-low px-4 py-4 font-medium text-stone-800 focus:ring-2 focus:ring-surface-tint"
                    placeholder="Describe the progression of damage and current state of the crop..."
                    rows={4}
                  />
                </div>
              </div>
            </section>

            <section className="asymmetric-card bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">photo_library</span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">Visual Evidence</h2>
                  <p className="text-sm text-stone-500">High-resolution photos help speed up claims</p>
                </div>
              </div>

              <div className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-low/30 p-10 text-center transition-colors hover:bg-surface-container-low">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
                </div>
                <h3 className="text-lg font-bold text-stone-800">Drop files here or click to browse</h3>
                <p className="mt-1 text-sm text-stone-500">Support JPG, PNG up to 15MB per file</p>
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
                  <span className="mt-2 text-[10px] font-bold uppercase">Add Photo</span>
                </button>
              </div>
            </section>

            <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
              <div className="flex items-center gap-3 text-stone-500">
                <span className="material-symbols-outlined text-primary">security</span>
                <p className="max-w-xs text-xs font-medium">
                  Your data is protected by Grade-A encryption and will only be shared with certified adjusters.
                </p>
              </div>
              <div className="flex w-full items-center gap-4 sm:w-auto">
                <button className="flex-1 rounded-xl px-8 py-4 font-bold text-stone-600 transition-colors hover:bg-surface-container-high sm:flex-none" type="button">
                  Save Draft
                </button>
                <button className="font-headline flex-1 rounded-xl bg-gradient-to-br from-primary to-primary-container px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl sm:flex-none" type="submit">
                  Submit Claim
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[2rem] border-t border-stone-100 bg-white/90 px-4 pb-6 pt-3 shadow-[0_-8px_24px_rgba(18,28,27,0.04)] backdrop-blur-xl lg:hidden dark:bg-stone-900/90">
        <a className="flex flex-col items-center justify-center px-5 py-2 text-stone-400" href="#">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="mt-1 text-[11px] font-bold">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center px-5 py-2 text-stone-400" href="#">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="mt-1 text-[11px] font-bold">AI Consult</span>
        </a>
        <a className="flex flex-col items-center justify-center rounded-2xl bg-[#f1f4f1] px-5 py-2 text-[#115638]" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            history_edu
          </span>
          <span className="mt-1 text-[11px] font-bold">Claims</span>
        </a>
        <a className="flex flex-col items-center justify-center px-5 py-2 text-stone-400" href="#">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="mt-1 text-[11px] font-bold">Profile</span>
        </a>
      </nav>
    </div>
  )
}
