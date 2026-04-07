import { Link } from 'react-router-dom'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import './MyClaimsPage.css'

export function MyClaimsPage() {
	return (
		<div className="my-claims-root bg-background font-body text-on-background antialiased">
			<nav className="fixed top-0 z-50 w-full bg-[#f7faf7]/80 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] backdrop-blur-md dark:bg-stone-900/80">
				<div className="flex w-full max-w-full items-center justify-between px-6 py-3">
					<div className="flex items-center gap-8">
						<span className="font-headline text-xl font-bold tracking-tight text-[#115638]">Annadata Connect</span>
						<div className="hidden items-center gap-6 md:flex">
							<Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" to="/farmer/dashboard">Dashboard</Link>
							<Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" to="/farmer/my-claims">Reports</Link>
							<Link className="font-medium text-stone-500 transition-colors hover:text-[#2f6f4f]" to="/farmer/chatbot">AI Insights</Link>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<button type="button" className="flex items-center gap-2 font-medium text-stone-700 transition-colors hover:text-primary">
							<span className="material-symbols-outlined text-[20px]">translate</span>
							<span className="hidden sm:inline">Language</span>
						</button>
						<div className="relative">
							<span className="material-symbols-outlined cursor-pointer text-stone-700 transition-colors hover:text-primary">notifications</span>
							<span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-error" />
						</div>
						<img
							alt="User Profile Avatar"
							className="h-8 w-8 rounded-full border border-outline-variant"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoA00SyoAVkIo4TvF9ivRDzv7hcRp3OKxwsO41V2_BoyfALeQQP2ashfshuhJNtaQ4Ap7NofPrlgEnX5Z2MW5sFTwIx3Ln5F07K_3Qn1AN5DIBX-Vix11UIGM2t7qbrzsPAP5J5mhJgpl_sXZKqCP_-BTDAWbMJWortxjKeJ1kYG3-rCEjOkP-SYwTPJK8vOFOuEuxehca1809lcsoAWO-2rmcocGncA10P80TsjU5nofIiHZv0GRyuBGHcUokCIpRwpTu9vCuDjDV"
						/>
					</div>
				</div>
			</nav>

			<FarmerSidebar />

			<main className="mx-auto min-h-screen max-w-7xl px-4 pb-32 pt-24 md:px-8 lg:ml-64">
				<header className="mb-10">
					<h1 className="font-headline mb-2 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">My Claims</h1>
					<p className="font-medium text-stone-600">Track and manage your agricultural insurance claims and payouts.</p>
				</header>

				<section className="editorial-shadow mb-8 rounded-[2rem] bg-surface-container-low p-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						<div className="relative">
							<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
							<input className="w-full rounded-xl border-none bg-surface-container-lowest py-3 pl-12 pr-4 font-medium text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-surface-tint" placeholder="Search by ID" type="text" />
						</div>
						<div className="relative">
							<select className="w-full appearance-none rounded-xl border-none bg-surface-container-lowest px-4 py-3 font-medium text-stone-700 focus:ring-2 focus:ring-surface-tint" defaultValue="">
								<option value="">All Statuses</option>
								<option value="pending">Pending Review</option>
								<option value="approved">Approved</option>
								<option value="rejected">Rejected</option>
							</select>
							<span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline">expand_more</span>
						</div>
						<div className="relative">
							<div className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-surface-container-lowest px-4 py-3 font-medium text-stone-700">
								<span>All Crops</span>
								<span className="material-symbols-outlined text-outline">filter_list</span>
							</div>
						</div>
						<div className="relative">
							<input className="w-full rounded-xl border-none bg-surface-container-lowest px-4 py-3 font-medium text-stone-700 focus:ring-2 focus:ring-surface-tint" type="date" />
						</div>
					</div>
				</section>

				<div className="editorial-shadow hidden overflow-hidden rounded-[2rem] bg-surface-container-lowest md:block">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr className="bg-surface-container-low/50">
								<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Claim ID</th>
								<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Crop Type</th>
								<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Date Submitted</th>
								<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Est. Value</th>
								<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Status</th>
								<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-surface-container-low">
							<tr className="transition-colors hover:bg-surface-container-low/30">
								<td className="px-8 py-6 font-bold text-on-surface">CLM-2024-8841</td>
								<td className="px-8 py-6">
									<div className="flex items-center gap-2">
										<span className="material-symbols-outlined text-[18px] text-primary">grass</span>
										<span className="font-medium">Premium Wheat</span>
									</div>
								</td>
								<td className="px-8 py-6 font-medium text-stone-600">Oct 12, 2023</td>
								<td className="px-8 py-6 font-bold text-primary">Rs 42,500</td>
								<td className="px-8 py-6">
									<span className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
										<span className="mr-2 h-1.5 w-1.5 rounded-full bg-secondary" />
										Approved
									</span>
								</td>
								<td className="px-8 py-6"><Link className="text-sm font-bold text-primary hover:underline" to="/farmer/claim-details">Details</Link></td>
							</tr>
							<tr className="transition-colors hover:bg-surface-container-low/30">
								<td className="px-8 py-6 font-bold text-on-surface">CLM-2024-9012</td>
								<td className="px-8 py-6">
									<div className="flex items-center gap-2">
										<span className="material-symbols-outlined text-[18px] text-primary">eco</span>
										<span className="font-medium">Kharif Paddy</span>
									</div>
								</td>
								<td className="px-8 py-6 font-medium text-stone-600">Oct 28, 2023</td>
								<td className="px-8 py-6 font-bold text-primary">Rs 18,200</td>
								<td className="px-8 py-6">
									<span className="inline-flex items-center rounded-full bg-surface-container-highest px-3 py-1 text-xs font-bold text-stone-700">
										<span className="mr-2 h-1.5 w-1.5 rounded-full bg-stone-400" />
										Pending
									</span>
								</td>
								<td className="px-8 py-6"><Link className="text-sm font-bold text-primary hover:underline" to="/farmer/claim-details">View</Link></td>
							</tr>
							<tr className="transition-colors hover:bg-surface-container-low/30">
								<td className="px-8 py-6 font-bold text-on-surface">CLM-2024-7721</td>
								<td className="px-8 py-6">
									<div className="flex items-center gap-2">
										<span className="material-symbols-outlined text-[18px] text-primary">local_florist</span>
										<span className="font-medium">Organic Cotton</span>
									</div>
								</td>
								<td className="px-8 py-6 font-medium text-stone-600">Sep 15, 2023</td>
								<td className="px-8 py-6 font-bold text-primary">Rs 65,000</td>
								<td className="px-8 py-6">
									<span className="inline-flex items-center rounded-full bg-error-container px-3 py-1 text-xs font-bold text-on-error-container">
										<span className="mr-2 h-1.5 w-1.5 rounded-full bg-error" />
										Rejected
									</span>
								</td>
								<td className="px-8 py-6"><Link className="text-sm font-bold text-primary hover:underline" to="/farmer/claim-details">Appeal</Link></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="space-y-4 md:hidden">
					<div className="editorial-shadow rounded-3xl bg-surface-container-lowest p-6">
						<div className="mb-4 flex items-start justify-between">
							<div>
								<p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">CLM-2024-8841</p>
								<h3 className="font-headline text-lg font-bold">Premium Wheat</h3>
							</div>
							<span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">Approved</span>
						</div>
						<div className="flex items-end justify-between">
							<div className="text-sm text-stone-600">
								<p>Oct 12, 2023</p>
								<p className="text-lg font-bold text-primary">Rs 42,500</p>
							</div>
							<Link className="rounded-xl bg-surface-container-low px-6 py-2 text-sm font-bold text-primary" to="/farmer/claim-details">Details</Link>
						</div>
					</div>
					<div className="editorial-shadow rounded-3xl bg-surface-container-lowest p-6">
						<div className="mb-4 flex items-start justify-between">
							<div>
								<p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">CLM-2024-9012</p>
								<h3 className="font-headline text-lg font-bold">Kharif Paddy</h3>
							</div>
							<span className="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase text-stone-600">Pending</span>
						</div>
						<div className="flex items-end justify-between">
							<div className="text-sm text-stone-600">
								<p>Oct 28, 2023</p>
								<p className="text-lg font-bold text-primary">Rs 18,200</p>
							</div>
							<Link className="rounded-xl bg-surface-container-low px-6 py-2 text-sm font-bold text-primary" to="/farmer/claim-details">View</Link>
						</div>
					</div>
				</div>

				<footer className="mt-12 flex flex-col items-center justify-between gap-6 md:flex-row">
					<p className="text-sm font-medium text-stone-500">Showing <span className="font-bold text-on-surface">1 - 3</span> of <span className="font-bold text-on-surface">24</span> claims</p>
					<div className="flex items-center gap-2">
						<button type="button" className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container-low text-stone-400"><span className="material-symbols-outlined">chevron_left</span></button>
						<button type="button" className="signature-gradient flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white">1</button>
						<button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low font-bold text-stone-700 transition-colors hover:bg-surface-container-high">2</button>
						<button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low font-bold text-stone-700 transition-colors hover:bg-surface-container-high">3</button>
						<span className="mx-2 text-stone-400">...</span>
						<button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-stone-700 transition-colors hover:bg-surface-container-high"><span className="material-symbols-outlined">chevron_right</span></button>
					</div>
				</footer>
			</main>

			<FarmerBottomNav />
		</div>
	)
}
