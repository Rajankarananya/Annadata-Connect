import { Navigate, createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '../constants/navigation'
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
	{ path: ROUTES.PUBLIC.HOME, element: <LandingPage /> },
	{ path: ROUTES.PUBLIC.LOGIN, element: <LoginPage /> },
	{ path: ROUTES.PUBLIC.REGISTER, element: <RegisterPage /> },
	{
		element: <ProtectedRoute allowedRoles={[ROLES.FARMER]} />,
		children: [
			{ path: ROUTES.FARMER.DASHBOARD, element: <FarmerDashboardPage /> },
			{ path: ROUTES.FARMER.NEW_CLAIM, element: <NewClaimPage /> },
			{ path: ROUTES.FARMER.MY_CLAIMS, element: <MyClaimsPage /> },
			{ path: ROUTES.FARMER.CLAIM_DETAILS, element: <ClaimDetailsPage /> },
			{ path: ROUTES.FARMER.CHATBOT, element: <ChatbotPage /> },
			{ path: ROUTES.FARMER.GRIEVANCES, element: <GrievancesPage /> },
			{ path: ROUTES.FARMER.PROFILE, element: <ProfilePage /> },
			{ path: ROUTES.FARMER.ROOT, element: <Navigate to={ROUTES.FARMER.DASHBOARD} replace /> },
		],
	},
	{
		element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
		children: [
			{ path: ROUTES.ADMIN.ROOT, element: <Navigate to={ROUTES.ADMIN.DASHBOARD} replace /> },
			{ path: ROUTES.ADMIN.DASHBOARD, element: <AdminDashboardPage /> },
			{ path: ROUTES.ADMIN.CLAIMS_QUEUE, element: <ClaimsQueuePage /> },
			{ path: ROUTES.ADMIN.CLAIM_REVIEW, element: <ClaimReviewPage /> },
			{ path: ROUTES.ADMIN.GRIEVANCE_QUEUE, element: <GrievanceQueuePage /> },
			{ path: ROUTES.ADMIN.REPORTS, element: <ReportsPage /> },
			{ path: ROUTES.ADMIN.SETTINGS, element: <AdminSettingsPage /> },
		],
	},
	{ path: '*', element: <Navigate to={ROUTES.PUBLIC.HOME} replace /> },
])
