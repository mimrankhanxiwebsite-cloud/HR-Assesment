import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore, type UserRole } from '@/store/authStore'

interface AuthGuardProps {
  allowedRoles?: UserRole[]
}

export function AuthGuard({ allowedRoles }: AuthGuardProps) {
  const { user, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
