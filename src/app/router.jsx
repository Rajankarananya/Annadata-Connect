import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppShell } from '../components/layout/AppShell'
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

const farmerLinks = [
  { to: '/farmer/dashboard', label: 'Dashboard' },
  { to: '/farmer/new-claim', label: 'New Claim' },
  { to: '/farmer/my-claims', label: 'My Claims' },
  { to: '/farmer/claim-details', label: 'Claim Details' },
  { to: '/farmer/chatbot', label: 'Chatbot' },
  { to: '/farmer/grievances', label: 'Grievances' },
  { to: '/farmer/profile', label: 'Profile' },
]

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/claims-queue', label: 'Claims Queue' },
  { to: '/admin/claim-review', label: 'Claim Review' },
  { to: '/admin/grievance-queue', label: 'Grievance Queue' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/settings', label: 'Settings' },
]

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <ProtectedRoute allowedRoles={[ROLES.FARMER]} />,
    children: [
      { path: '/farmer/dashboard', element: <FarmerDashboardPage /> },
      { path: '/farmer/new-claim', element: <NewClaimPage /> },
      {
        path: '/farmer',
        element: <AppShell title="Farmer Portal" links={farmerLinks} />,
        children: [
          { index: true, element: <Navigate to="/farmer/dashboard" replace /> },
          { path: 'my-claims', element: <MyClaimsPage /> },
          { path: 'claim-details', element: <ClaimDetailsPage /> },
          { path: 'chatbot', element: <ChatbotPage /> },
          { path: 'grievances', element: <GrievancesPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
    children: [
      {
        path: '/admin',
        element: <AppShell title="Admin Portal" links={adminLinks} />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'claims-queue', element: <ClaimsQueuePage /> },
          { path: 'claim-review', element: <ClaimReviewPage /> },
          { path: 'grievance-queue', element: <GrievanceQueuePage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'settings', element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
