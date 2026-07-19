import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, FileQuestion, Award, Building2, CreditCard, LogOut, ShieldAlert, BarChart2 } from 'lucide-react'

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/question-bank', icon: FileQuestion, label: 'Question Bank' },
    { to: '/admin/assessments', icon: Award, label: 'Assessment Builder' },
    { to: '/admin/organizations', icon: Building2, label: 'Organizations' },
    { to: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { to: '/admin/audit-logs', icon: ShieldAlert, label: 'Audit Logs' },
  ]

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar - Dark Admin Theme */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight text-white">Admin Console</h2>
          <p className="text-xs text-slate-400 mt-1">Platform Administration</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold uppercase">
              {user?.email?.[0] || 'A'}
            </div>
            <div className="text-sm text-slate-300 truncate">{user?.email || 'Admin'}</div>
          </div>
          <Button variant="outline" className="w-full justify-start text-red-400 border-slate-700 hover:bg-slate-800" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-950">
        <Outlet />
      </main>
    </div>
  )
}
