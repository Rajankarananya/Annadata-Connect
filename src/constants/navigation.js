export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  FARMER: {
    ROOT: '/farmer',
    DASHBOARD: '/farmer/dashboard',
    NEW_CLAIM: '/farmer/new-claim',
    MY_CLAIMS: '/farmer/my-claims',
    CLAIM_DETAILS: '/farmer/claim-details',
    CHATBOT: '/farmer/chatbot',
    GRIEVANCES: '/farmer/grievances',
    PROFILE: '/farmer/profile',
  },
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    CLAIMS_QUEUE: '/admin/claims-queue',
    CLAIM_REVIEW: '/admin/claim-review',
    GRIEVANCE_QUEUE: '/admin/grievance-queue',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },
}

export const ADMIN_NAV_ITEMS = [
  { to: ROUTES.ADMIN.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
  { to: ROUTES.ADMIN.CLAIMS_QUEUE, label: 'Claims Queue', icon: 'assignment_late' },
  { to: ROUTES.ADMIN.CLAIM_REVIEW, label: 'Claim Review', icon: 'fact_check' },
  { to: ROUTES.ADMIN.GRIEVANCE_QUEUE, label: 'Grievances', icon: 'error_outline' },
  { to: ROUTES.ADMIN.REPORTS, label: 'Reports', icon: 'analytics' },
  { to: ROUTES.ADMIN.SETTINGS, label: 'Settings', icon: 'settings' },
]

export const FARMER_SIDEBAR_ITEMS = [
  { key: 'home', to: ROUTES.FARMER.DASHBOARD, label: 'Home', icon: 'home', match: [ROUTES.FARMER.DASHBOARD] },
  { key: 'advisor', to: ROUTES.FARMER.CHATBOT, label: 'AI Advisor', icon: 'psychology', match: [ROUTES.FARMER.CHATBOT] },
  {
    key: 'claims',
    to: ROUTES.FARMER.MY_CLAIMS,
    label: 'My Claims',
    icon: 'assignment_turned_in',
    match: [ROUTES.FARMER.MY_CLAIMS, ROUTES.FARMER.CLAIM_DETAILS, ROUTES.FARMER.NEW_CLAIM],
  },
  { key: 'profile', to: ROUTES.FARMER.PROFILE, label: 'Profile & Settings', icon: 'account_circle', match: [ROUTES.FARMER.PROFILE] },
  { key: 'support', to: ROUTES.FARMER.GRIEVANCES, label: 'Support', icon: 'help_outline', match: [ROUTES.FARMER.GRIEVANCES] },
]

export const FARMER_MOBILE_NAV_ITEMS = [
  { to: ROUTES.FARMER.DASHBOARD, label: 'Home', icon: 'grid_view', match: [ROUTES.FARMER.DASHBOARD] },
  { to: ROUTES.FARMER.CHATBOT, label: 'AI Consult', icon: 'chat_bubble', match: [ROUTES.FARMER.CHATBOT] },
  {
    to: ROUTES.FARMER.MY_CLAIMS,
    label: 'Claims',
    icon: 'history_edu',
    match: [ROUTES.FARMER.MY_CLAIMS, ROUTES.FARMER.CLAIM_DETAILS, ROUTES.FARMER.NEW_CLAIM],
  },
  { to: ROUTES.FARMER.PROFILE, label: 'Profile', icon: 'account_circle', match: [ROUTES.FARMER.PROFILE] },
]

export function isRouteActive(pathname, prefixes) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}
