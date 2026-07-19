import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Users, BarChart3, Search, Settings, LogOut, LayoutDashboard, CreditCard } from 'lucide-react'

export default function OrgLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-brand-50">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r shadow-brand-sm flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-brand-900 tracking-tight">Talent Platform</h2>
          <p className="text-xs text-muted-foreground mt-1">Organization Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/org/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/org/candidates">
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Candidates
            </Button>
          </Link>
          <Link to="/org/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics & Ranking
            </Button>
          </Link>
          <Link to="/org/team">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team Management
            </Button>
          </Link>
          <Link to="/org/subscription">
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscription
            </Button>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold uppercase">
              {user?.name?.[0] || user?.email?.[0]}
            </div>
            <div className="text-sm truncate font-medium">
              {user?.name || 'Admin'}
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
