import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Edit, Trash2, Shield, UserCheck } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      const { data } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, role, is_active, created_at')
        .order('created_at', { ascending: false })
        .limit(50)
      setUsers(data || [])
      setIsLoading(false)
    }
    loadUsers()
  }, [])

  const MOCK_USERS = [
    { id: '1', email: 'ahmed.khan@example.com', first_name: 'Ahmed', last_name: 'Khan', role: 'candidate', is_active: true, created_at: '2026-07-01' },
    { id: '2', email: 'sarah@techcorp.com', first_name: 'Sarah', last_name: 'Jenkins', role: 'recruiter', is_active: true, created_at: '2026-06-15' },
    { id: '3', email: 'admin@platform.com', first_name: 'Platform', last_name: 'Admin', role: 'platform_admin', is_active: true, created_at: '2026-01-01' },
    { id: '4', email: 'david.chen@devhub.io', first_name: 'David', last_name: 'Chen', role: 'org_admin', is_active: false, created_at: '2026-05-20' },
  ]

  const displayUsers = users.length > 0 ? users : MOCK_USERS
  const filtered = displayUsers.filter(u =>
    `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    const map: any = {
      candidate: 'bg-blue-900/40 text-blue-300',
      recruiter: 'bg-emerald-900/40 text-emerald-300',
      org_admin: 'bg-violet-900/40 text-violet-300',
      hiring_manager: 'bg-amber-900/40 text-amber-300',
      platform_admin: 'bg-red-900/40 text-red-300',
    }
    return map[role] || 'bg-slate-800 text-slate-300'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 mt-1">Manage platform users and role assignments.</p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              className="pl-9 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              placeholder="Search users by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-800">
                <tr className="text-left text-slate-400">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center text-white font-bold text-sm">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-slate-100">{user.first_name} {user.last_name}</div>
                          <div className="text-slate-400 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getRoleBadge(user.role)}`}>
                        {user.role?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 text-xs w-fit ${user.is_active ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-xs">{user.created_at?.split('T')[0]}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 h-8 px-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400 h-8 px-2">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-violet-400 h-8 px-2">
                          <Shield className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
