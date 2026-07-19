import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { User, FileText, Award, Clock, LogOut, LayoutDashboard } from 'lucide-react'

export default function CandidateLayout() {
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
          <p className="text-xs text-muted-foreground mt-1">Candidate Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/candidate/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/candidate/profile">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </Button>
          </Link>
          <Link to="/candidate/assessments">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Assessments
            </Button>
          </Link>
          <Link to="/candidate/certifications">
            <Button variant="ghost" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              Certifications
            </Button>
          </Link>
          <Link to="/candidate/history">
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              History
            </Button>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
              {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="text-sm truncate font-medium">
              {user?.name || user?.email}
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
