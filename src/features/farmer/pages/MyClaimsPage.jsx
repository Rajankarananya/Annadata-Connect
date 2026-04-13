import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { claimsApi } from '../../../services/api'
import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import './MyClaimsPage.css'

export function MyClaimsPage() {
	const { t } = useTranslation()
	const [claims, setClaims] = useState([])
	const [filteredClaims, setFilteredClaims] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [filters, setFilters] = useState({
		searchId: '',
		status: '',
		cropType: '',
		dateFrom: '',
	})

	// Fetch claims on component mount
	useEffect(() => {
		const fetchClaims = async () => {
			try {
				setLoading(true)
				const data = await claimsApi.listClaims()
				setClaims(Array.isArray(data) ? data : data.claims || [])
				setError(null)
			} catch (err) {
				console.error('Error fetching claims:', err)
				setError('Failed to load claims. Please try again.')
				setClaims([])
			} finally {
				setLoading(false)
			}
		}

		fetchClaims()
	}, [])

	// Apply filters
	useEffect(() => {
		let result = claims

		if (filters.searchId) {
			result = result.filter(claim => String(claim.id).includes(filters.searchId))
		}

		if (filters.status) {
			result = result.filter(claim => claim.status === filters.status)
		}

		if (filters.cropType) {
			result = result.filter(claim => claim.damage_type === filters.cropType)
		}

		setFilteredClaims(result)
	}, [claims, filters])

	const handleFilterChange = (field, value) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	const getStatusColor = (status) => {
		switch (status) {
			case 'approved':
				return 'bg-secondary-container text-on-secondary-container'
			case 'pending':
				return 'bg-surface-container-highest text-stone-700'
			case 'rejected':
				return 'bg-error-container text-on-error-container'
			default:
				return 'bg-surface-container text-on-surface'
		}
	}

	const getDamageIcon = (damageType) => {
		switch (damageType?.toLowerCase()) {
			case 'rice_blast':
			case 'wheat_rust':
				return 'grass'
			case 'bacterial_spot':
				return 'eco'
			case 'healthy':
				return 'check_circle'
			default:
				return 'local_florist'
		}
	}

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A'
		return new Date(dateString).toLocaleDateString('en-IN', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}

	return (
		<div className="my-claims-root bg-background font-body text-on-background antialiased">
			<FarmerTopNav />

			<FarmerSidebar />

			<main className="mx-auto min-h-screen max-w-7xl px-4 pb-32 pt-24 md:px-8 lg:ml-64">
				<header className="mb-10">
					<h1 className="font-headline mb-2 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">{t('farmerClaims.title')}</h1>
					<p className="font-medium text-stone-600">{t('farmerClaims.subtitle')}</p>
				</header>

				<section className="editorial-shadow mb-8 rounded-[2rem] bg-surface-container-low p-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						<div className="relative">
							<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<<<<<<< HEAD
							<input className="w-full rounded-xl border-none bg-surface-container-lowest py-3 pl-12 pr-4 font-medium text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-surface-tint" placeholder={t('farmerClaims.searchById')} type="text" />
=======
							<input
								className="w-full rounded-xl border-none bg-surface-container-lowest py-3 pl-12 pr-4 font-medium text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-surface-tint"
								placeholder={t('farmerClaims.searchById')}
								type="text"
								value={filters.searchId}
								onChange={(e) => handleFilterChange('searchId', e.target.value)}
							/>
						</div>
						<div className="relative">
							<select
								className="w-full appearance-none rounded-xl border-none bg-surface-container-lowest px-4 py-3 font-medium text-stone-700 focus:ring-2 focus:ring-surface-tint"
								value={filters.status}
								onChange={(e) => handleFilterChange('status', e.target.value)}
							>
								<option value="">{t('farmerClaims.allStatuses')}</option>
								<option value="pending">{t('farmerClaims.pendingReview')}</option>
								<option value="approved">{t('farmerDashboard.approved')}</option>
								<option value="rejected">{t('farmerDashboard.rejected')}</option>
							</select>
							<span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline">expand_more</span>
						</div>
						<div className="relative">
							<select
								className="w-full appearance-none rounded-xl border-none bg-surface-container-lowest px-4 py-3 font-medium text-stone-700 focus:ring-2 focus:ring-surface-tint"
								value={filters.cropType}
								onChange={(e) => handleFilterChange('cropType', e.target.value)}
							>
								<option value="">{t('farmerClaims.allCrops')}pot">Bacterial Spot</option>
								<option value="healthy">Healthy</option>
							</select>
							<span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline">expand_more</span>
						</div>
						<div className="relative">
							<input
								className="w-full rounded-xl border-none bg-surface-container-lowest px-4 py-3 font-medium text-stone-700 focus:ring-2 focus:ring-surface-tint"
								type="date"
								value={filters.dateFrom}
								onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
							/>
						</div>
					</div>
				</section>

				{error && (
					<div className="mb-8 rounded-lg bg-error-container p-4 text-on-error-container">
						<p className="font-medium">{error}</p>
					</div>
				)}

				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin">
							<span className="material-symbols-outlined text-3xl text-primary">hourglass_empty</span>
						</div>
					</div>
				) : filteredClaims.length === 0 ? (
					<div className="rounded-[2rem] bg-surface-container-low p-8 text-center">
						<p className="text-lg text-stone-600">No claims found. Create your first claim to get started!</p>
						<Link to="/farmer/new-claim" className="mt-4 inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-on-primary hover:bg-primary-container">
							Create Claim
						</Link>
					</div>
				) : (
					<>
						<div className="editorial-shadow hidden overflow-hidden rounded-[2rem] bg-surface-container-lowest md:block">
							<table className="w-full border-collapse text-left">
								<thead>
									<tr className="bg-surface-container-low/50">
										<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Claim ID</th>
										<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Damage Type</th>
										<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Date Submitted</th>
										<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Status</th>
										<th className="font-label px-8 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-surface-container-low">
									{filteredClaims.map((claim) => (
										<tr key={claim.id} className="transition-colors hover:bg-surface-container-low/30">
											<td className="px-8 py-6 font-bold text-on-surface">CLM-{claim.id}</td>
											<td className="px-8 py-6">
												<div className="flex items-center gap-2">
													<span className="material-symbols-outlined text-[18px] text-primary">{getDamageIcon(claim.damage_type)}</span>
													<span className="font-medium capitalize">{claim.damage_type?.replace('_', ' ')}</span>
												</div>
											</td>
											<td className="px-8 py-6 font-medium text-stone-600">{formatDate(claim.created_at)}</td>
											<td className="px-8 py-6">
												<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(claim.status)}`}>
													<span className="mr-2 h-1.5 w-1.5 rounded-full bg-current opacity-60" />
													<span className="capitalize">{claim.status || 'pending'}</span>
												</span>
											</td>
											<td className="px-8 py-6">
												<Link className="text-sm font-bold text-primary hover:underline" to={`/farmer/claim-details/${claim.id}`}>
													Details
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="space-y-4 md:hidden">
							{filteredClaims.map((claim) => (
								<div key={claim.id} className="editorial-shadow rounded-3xl bg-surface-container-lowest p-6">
									<div className="mb-4 flex items-start justify-between">
										<div>
											<p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">CLM-{claim.id}</p>
											<h3 className="font-headline text-lg font-bold capitalize">{claim.damage_type?.replace('_', ' ')}</h3>
										</div>
										<span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${getStatusColor(claim.status)}`}>
											{claim.status || 'pending'}
										</span>
									</div>
									<div className="flex items-end justify-between">
										<div className="text-sm text-stone-600">
											<p>{formatDate(claim.created_at)}</p>
										</div>
										<Link className="rounded-xl bg-surface-container-low px-6 py-2 text-sm font-bold text-primary" to={`/farmer/claim-details/${claim.id}`}>
											View
										</Link>
									</div>
								</div>
							))}
						</div>
					</>
				)}

			</main>
		</div>
	)
}

				<section className="editorial-shadow mb-8 rounded-[2rem] bg-surface-container-low p-6">
	lassName="transition-colors hover:bg-surface-container-low/30">
								<td className="px-8 py-6 font-bold text-on-surface">CLM-2026-8841</td>
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
										{t('farmerDashboard.approved')}
									</span>
								</td>
								<td className="px-8 py-6"><Link className="text-sm font-bold text-primary hover:underline" to="/farmer/claim-details">{t('farmerClaims.details')}</Link></td>
							</tr>
							<tr className="transition-colors hover:bg-surface-container-low/30">
								<td className="px-8 py-6 font-bold text-on-surface">CLM-2026-9012</td>
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
										{t('farmerDashboard.pending')}
									</span>
								</td>
								<td className="px-8 py-6"><Link className="text-sm font-bold text-primary hover:underline" to="/farmer/claim-details">{t('farmerClaims.view')}</Link></td>
							</tr>
							<tr className="transition-colors hover:bg-surface-container-low/30">
								<td className="px-8 py-6 font-bold text-on-surface">CLM-2026-7721</td>
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
										{t('farmerDashboard.rejected')}
									</span>
								</td>
								<td className="px-8 py-6"><Link className="text-sm font-bold text-primary hover:underline" to="/farmer/claim-details">{t('farmerClaims.appeal')}</Link></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="space-y-4 md:hidden">
					<div className="editorial-shadow rounded-3xl bg-surface-container-lowest p-6">
						<div className="mb-4 flex items-start justify-between">
							<div>
								<p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">CLM-2026-8841</p>
								<h3 className="font-headline text-lg font-bold">Premium Wheat</h3>
							</div>
							<span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">{t('farmerDashboard.approved')}</span>
						</div>
						<div className="flex items-end justify-between">
							<div className="text-sm text-stone-600">
								<p>Oct 12, 2023</p>
								<p className="text-lg font-bold text-primary">Rs 42,500</p>
							</div>
							<Link className="rounded-xl bg-surface-container-low px-6 py-2 text-sm font-bold text-primary" to="/farmer/claim-details">{t('farmerClaims.details')}</Link>
						</div>
					</div>
					<div className="editorial-shadow rounded-3xl bg-surface-container-lowest p-6">
						<div className="mb-4 flex items-start justify-between">
							<div>
								<p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">CLM-2026-9012</p>
								<h3 className="font-headline text-lg font-bold">Kharif Paddy</h3>
							</div>
							<span className="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase text-stone-600">{t('farmerDashboard.pending')}</span>
						</div>
						<div className="flex items-end justify-between">
							<div className="text-sm text-stone-600">
								<p>Oct 28, 2023</p>
								<p className="text-lg font-bold text-primary">Rs 18,200</p>
							</div>
							<Link className="rounded-xl bg-surface-container-low px-6 py-2 text-sm font-bold text-primary" to="/farmer/claim-details">{t('farmerClaims.view')}</Link>
						</div>
					</div>
				</div>

				<footer className="mt-12 flex flex-col items-center justify-between gap-6 md:flex-row">
					<p className="text-sm font-medium text-stone-500">{t('farmerClaims.showing')} <span className="font-bold text-on-surface">1 - 3</span> {t('farmerClaims.of')} <span className="font-bold text-on-surface">24</span> {t('farmerClaims.claims')}</p>
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
