import { Navigate, createBrowserRouter } from 'react-router-dom'

import { ROLES } from '../constants/roles'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage'
import { AdminSettingsPage } from '../features/admin/pages/AdminSettingsPage'
import { ClaimReviewPage } from '../features/admin/pages/ClaimReviewPage'
import { ClaimsQueuePage } from '../features/admin/pages/ClaimsQueuePage'
import { GrievanceQueuePage } from '../features/admin/pages/GrievanceQueuePage'
import { ReportsPage } from '../features/admin/pages/ReportsPage'
import { ChatbotPage } from '../features/farmer/pages/ChatbotPage'
import { ClaimDetailsPage } from '../features/farmer/pages/ClaimDetailsPage'
import { FarmerDashboardPage } from '../features/farmer/pages/FarmerDashboardPage'
import { GrievancesPage } from '../features/farmer/pages/GrievancesPage'
import { MyClaimsPage } from '../features/farmer/pages/MyClaimsPage'
import { NewClaimPage } from '../features/farmer/pages/NewClaimPage'
import { ProfilePage } from '../features/farmer/pages/ProfilePage'
import { LandingPage } from '../features/public/pages/LandingPage'
import { LoginPage } from '../features/public/pages/LoginPage'
import { RegisterPage } from '../features/public/pages/RegisterPage'

export const router = createBrowserRouter([
	{ path: '/', element: <LandingPage /> },
	{ path: '/login', element: <LoginPage /> },
	{ path: '/register', element: <RegisterPage /> },
	{
		element: <ProtectedRoute allowedRoles={[ROLES.FARMER]} />,
		children: [
			{ path: '/farmer/dashboard', element: <FarmerDashboardPage /> },
			{ path: '/farmer/new-claim', element: <NewClaimPage /> },
			{ path: '/farmer/my-claims', element: <MyClaimsPage /> },
			{ path: '/farmer/claim-details', element: <ClaimDetailsPage /> },
			{ path: '/farmer/chatbot', element: <ChatbotPage /> },
			{ path: '/farmer/grievances', element: <GrievancesPage /> },
			{ path: '/farmer/profile', element: <ProfilePage /> },
			{ path: '/farmer', element: <Navigate to="/farmer/dashboard" replace /> },
		],
	},
	{
		element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
		children: [
			{ path: '/admin', element: <Navigate to="/admin/dashboard" replace /> },
			{ path: '/admin/dashboard', element: <AdminDashboardPage /> },
			{ path: '/admin/claims-queue', element: <ClaimsQueuePage /> },
			{ path: '/admin/claim-review', element: <ClaimReviewPage /> },
			{ path: '/admin/grievance-queue', element: <GrievanceQueuePage /> },
			{ path: '/admin/reports', element: <ReportsPage /> },
			{ path: '/admin/settings', element: <AdminSettingsPage /> },
		],
	},
	{ path: '*', element: <Navigate to="/" replace /> },
])
