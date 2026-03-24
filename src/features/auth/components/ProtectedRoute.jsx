import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute({ allowedRoles = [] }) {
  const role = localStorage.getItem('authRole')
  const token = localStorage.getItem('authToken')

  if (!token || !role) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
