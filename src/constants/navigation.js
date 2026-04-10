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
  { to: ROUTES.ADMIN.DASHBOARD, labelKey: 'common.dashboard', icon: 'dashboard' },
  { to: ROUTES.ADMIN.CLAIMS_QUEUE, labelKey: 'common.claimsQueue', icon: 'assignment_late' },
  { to: ROUTES.ADMIN.CLAIM_REVIEW, labelKey: 'common.claimReview', icon: 'fact_check' },
  { to: ROUTES.ADMIN.GRIEVANCE_QUEUE, labelKey: 'common.grievances', icon: 'error_outline' },
  { to: ROUTES.ADMIN.REPORTS, labelKey: 'common.reports', icon: 'analytics' },
  { to: ROUTES.ADMIN.SETTINGS, labelKey: 'common.settings', icon: 'settings' },
]

export const FARMER_SIDEBAR_ITEMS = [
  { key: 'home', to: ROUTES.FARMER.DASHBOARD, labelKey: 'common.home', icon: 'home', match: [ROUTES.FARMER.DASHBOARD] },
  { key: 'advisor', to: ROUTES.FARMER.CHATBOT, labelKey: 'common.aiAdvisor', icon: 'psychology', match: [ROUTES.FARMER.CHATBOT] },
  {
    key: 'claims',
    to: ROUTES.FARMER.MY_CLAIMS,
    labelKey: 'common.myClaims',
    icon: 'assignment_turned_in',
    match: [ROUTES.FARMER.MY_CLAIMS, ROUTES.FARMER.CLAIM_DETAILS, ROUTES.FARMER.NEW_CLAIM],
  },
  { key: 'profile', to: ROUTES.FARMER.PROFILE, labelKey: 'common.profileSettings', icon: 'account_circle', match: [ROUTES.FARMER.PROFILE] },
  { key: 'support', to: ROUTES.FARMER.GRIEVANCES, labelKey: 'common.support', icon: 'help_outline', match: [ROUTES.FARMER.GRIEVANCES] },
]

export const FARMER_MOBILE_NAV_ITEMS = [
  { to: ROUTES.FARMER.DASHBOARD, labelKey: 'common.home', icon: 'grid_view', match: [ROUTES.FARMER.DASHBOARD] },
  { to: ROUTES.FARMER.CHATBOT, labelKey: 'common.aiAdvisor', icon: 'chat_bubble', match: [ROUTES.FARMER.CHATBOT] },
  {
    to: ROUTES.FARMER.MY_CLAIMS,
    labelKey: 'common.claims',
    icon: 'history_edu',
    match: [ROUTES.FARMER.MY_CLAIMS, ROUTES.FARMER.CLAIM_DETAILS, ROUTES.FARMER.NEW_CLAIM],
  },
  { to: ROUTES.FARMER.PROFILE, labelKey: 'common.profile', icon: 'account_circle', match: [ROUTES.FARMER.PROFILE] },
]

export function isRouteActive(pathname, prefixes) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}
