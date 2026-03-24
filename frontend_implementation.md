# Frontend Implementation Plan

## Project
AI-Powered Smart Agriculture Office Administration System

## Frontend Stack
- React.js
- Tailwind CSS
- React Router
- Axios
- React Hook Form + Zod
- TanStack Query
- Recharts
- i18next (English + one regional language)

## Frontend Goals
- Build two clear experiences: Farmer Portal and Admin Portal.
- Keep workflows simple, fast, and mobile-friendly.
- Make AI outputs understandable (confidence, recommendation, risk).
- Provide real-time status transparency for farmers.
- Enable efficient case handling for officials.

## User Roles
- Farmer
- Admin Officer

## App Navigation Structure
- Public: Landing, Login, Register, Language Selection
- Farmer: Dashboard, New Claim, My Claims, Claim Details, Chatbot, Grievances, Profile
- Admin: Dashboard, Claims Queue, Claim Review, Grievance Queue, Reports, Settings

## Core Pages and Features

## 1) Public Pages
### Landing Page
- Product overview and impact.
- Quick links to Farmer Login and Admin Login.
- Language switcher.

### Login Page
- Role-based login (Farmer/Admin).
- Validation messages.
- Forgot password flow (basic version).

### Register Page (Farmer)
- Name, mobile, location, preferred language.
- Optional Aadhaar/ID field if needed by project scope.
- Form validation and success state.

## 2) Farmer Portal
### Farmer Dashboard
- Summary cards: total claims, pending, approved, rejected.
- Latest claim status timeline.
- Quick actions: New Claim, Ask Chatbot, Raise Grievance.

### New Claim Page
- Claim form fields:
  - Crop type
  - Sowing date
  - Location
  - Incident date
  - Damage description
  - Image upload (single or multiple)
- Upload preview and remove option.
- Submit and loading/progress state.

### My Claims Page
- Claim list table/cards with filters:
  - Status
  - Date range
  - Crop type
  - Search by claim ID
- Pagination or infinite scroll.

### Claim Details Page
- Full claim information.
- Uploaded images.
- AI result panel:
  - Damage severity
  - Confidence score
  - Recommendation (Approve/Review/Reject)
- Current status timeline.

### Chatbot Page
- Multilingual chat interface.
- Suggested prompts for scheme and crop questions.
- Message timestamp.
- Copy and clear chat options.
- Escalate to grievance button.

### Grievance Page
- Raise new grievance form.
- Category selector.
- Priority indicator (auto + manual visible).
- Grievance history list with status.

### Profile and Settings
- Personal details.
- Preferred language.
- Notification preferences.

## 3) Admin Portal
### Admin Dashboard
- KPI cards:
  - Total claims
  - Pending review
  - High-risk claims
  - Grievances unresolved
- Charts:
  - Claims by status
  - Claims by district/region
  - Weekly trend

### Claims Queue Page
- List with advanced filters:
  - Status
  - Risk level
  - District
  - Date
- Priority sorting (AI risk first).
- Bulk actions for status update (optional).

### Claim Review Page
- Side-by-side layout:
  - Farmer-submitted data
  - AI assessment
  - Officer decision controls
- Decision actions:
  - Approve
  - Reject
  - Mark for manual review
- Notes/comments section.
- Audit trail section.

### Grievance Queue Page
- List with category, urgency, assignee, SLA timer.
- Open grievance detail drawer/page.
- Actions: assign, update status, resolve.

### Reports Page
- Export-ready views.
- Time filters (daily/weekly/monthly).
- Summary metrics and trend charts.
- Printable report layout.

### Admin Settings
- Manage categories (claims/grievances).
- Threshold display for AI risk interpretation.
- Basic profile and security settings.

## Shared Components to Build
- App shell (sidebar + topbar)
- Role-based protected route wrapper
- Reusable data table
- Status badge component
- File uploader with preview
- Empty state and error state components
- Loading skeletons
- Confirmation modal
- Toast notification system
- Pagination component
- Language switcher

## Frontend State and Data Strategy
- Auth state: token, role, user profile.
- Server state via TanStack Query:
  - Claims list
  - Claim details
  - Dashboard metrics
  - Grievances
- Form state via React Hook Form + Zod.
- Global UI state:
  - Sidebar open/close
  - Selected language
  - Theme if needed

## API Integration Requirements (Frontend Perspective)
- Auth APIs:
  - login
  - register
  - logout
- Claims APIs:
  - create claim
  - list claims
  - claim detail
  - update status (admin)
- AI APIs:
  - upload image + analyze
  - fetch AI recommendation
- Chat APIs:
  - send message
  - get history
- Grievance APIs:
  - create grievance
  - list grievances
  - update grievance status
- Reports APIs:
  - dashboard summary
  - trend data

## UX and UI Standards
- Mobile-first responsive design.
- Consistent spacing and typography scale.
- Form validation visible before submit.
- Accessible color contrast and keyboard support.
- Friendly empty/loading/error states.
- Clear AI explainability labels:
  - What AI predicted
  - Confidence
  - Final human decision authority

## Tailwind Design System Setup
- Define color tokens:
  - Primary
  - Success
  - Warning
  - Danger
  - Neutral
- Define typography scale and spacing scale.
- Reusable utility classes for cards, tables, buttons, forms.
- Variant system for status badges and alerts.

## Frontend Security and Reliability Checklist
- Route guards by role.
- Token expiry handling.
- Graceful API error handling.
- Retry strategy for non-critical calls.
- Input sanitization on forms.
- Secure file upload constraints on UI side (type, size).

## Testing Scope for Frontend
- Unit tests:
  - form validation
  - utility functions
  - component rendering states
- Integration tests:
  - claim submission flow
  - admin decision flow
  - chatbot send/receive flow
- Manual QA checklist:
  - mobile layout
  - slow network behavior
  - multilingual switching
  - status updates across pages

## Suggested Build Order
1. Project setup, routing, layout shell, auth flow.
2. Farmer claim submission and claims list.
3. Admin claims queue and claim review.
4. Chatbot interface and grievance pages.
5. Dashboard analytics and reports.
6. Polish: responsiveness, accessibility, loading/error states.

## Definition of Done (Frontend)
- All target pages implemented and navigable.
- Farmer can submit claim and track status.
- Admin can review claim and update decision.
- Chatbot works with multilingual support.
- Grievance flow is end-to-end.
- Dashboard shows real backend data.
- UI responsive on mobile and desktop.
- Basic test coverage and QA checklist completed.
