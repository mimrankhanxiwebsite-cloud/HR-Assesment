import React from 'react'
import { useAuthStore, type UserRole } from '@/store/authStore'

interface RBACWrapperProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RBACWrapper({ allowedRoles, children, fallback = null }: RBACWrapperProps) {
  const { user } = useAuthStore()

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
