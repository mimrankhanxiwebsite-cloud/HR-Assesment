import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import {
  Search, Plus, Edit, Trash2, Shield, UserCheck,
  Users, Building2, ChevronDown, X, Check, Loader2,
  AlertCircle, Filter
} from 'lucide-react'

const ROLES = ['candidate', 'recruiter', 'hiring_manager', 'org_admin', 'platform_admin']
const ROLE_COLORS: Record<string, string> = {
  candidate: 'bg-blue-100 text-blue-700 border-blue-200',
  recruiter: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  hiring_manager: 'bg-amber-100 text-amber-700 border-amber-200',
  org_admin: 'bg-violet-100 text-violet-700 border-violet-200',
  platform_admin: 'bg-red-100 text-red-700 border-red-200',
}

const MOCK_USERS = [
  { id: '1', email: 'ahmed.khan@example.com', first_name: 'Ahmed', last_name: 'Khan', role: 'candidate', is_active: true, created_at: '2026-07-01T00:00:00Z' },
  { id: '2', email: 'sarah@techcorp.com', first_name: 'Sarah', last_name: 'Jenkins', role: 'recruiter', is_active: true, created_at: '2026-06-15T00:00:00Z' },
  { id: '3', email: 'admin@platform.com', first_name: 'Platform', last_name: 'Admin', role: 'platform_admin', is_active: true, created_at: '2026-01-01T00:00:00Z' },
  { id: '4', email: 'david.chen@devhub.io', first_name: 'David', last_name: 'Chen', role: 'org_admin', is_active: false, created_at: '2026-05-20T00:00:00Z' },
  { id: '5', email: 'elena@nexus.ai', first_name: 'Elena', last_name: 'Rodriguez', role: 'hiring_manager', is_active: true, created_at: '2026-06-01T00:00:00Z' },
]

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, role, is_active, created_at')
        .order('created_at', { ascending: false })
        .limit(100)
      setUsers(data?.length ? data : MOCK_USERS)
      setIsLoading(false)
    }
    load()
  }, [])

  const displayUsers = users.length > 0 ? users : MOCK_USERS

  const filtered = displayUsers.filter(u => {
    const matchSearch = `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchStatus = statusFilter === 'all' || (statusFilter === 'active' ? u.is_active : !u.is_active)
    return matchSearch && matchRole && matchStatus
  })

  const handleRoleChange = async (userId: string, newRole: string) => {
    setSavingId(userId)
    const { error } = await supabase.from('users').update({ role: newRole }).eq('id', userId)
    if (!error) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } else {
      setActionError('Failed to update role')
    }
    setSavingId(null)
    setEditingUser(null)
  }

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    setSavingId(userId)
    const { error } = await supabase.from('users').update({ is_active: !currentStatus }).eq('id', userId)
    if (!error) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u))
    }
    setSavingId(null)
  }

  const stats = {
    total: displayUsers.length,
    active: displayUsers.filter(u => u.is_active).length,
    candidates: displayUsers.filter(u => u.role === 'candidate').length,
    orgs: displayUsers.filter(u => ['org_admin', 'recruiter', 'hiring_manager'].includes(u.role)).length,
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage platform users, roles, and access control.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" /> Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats.total, icon: Users, color: 'text-primary', bg: 'bg-blue-50' },
          { label: 'Active Users', value: stats.active, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Candidates', value: stats.candidates, icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Org Users', value: stats.orgs, icon: Building2, color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 capitalize"
        >
          <option value="all">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {actionError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4" /> {actionError}
          <button onClick={() => setActionError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{user.first_name} {user.last_name}</div>
                          <div className="text-slate-400 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === user.id ? (
                        <div className="flex items-center gap-2">
                          <select
                            defaultValue={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                          >
                            {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                          </select>
                          <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${ROLE_COLORS[user.role] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {user.role?.replace('_', ' ')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.is_active)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          user.is_active
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        disabled={savingId === user.id}
                      >
                        {savingId === user.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        )}
                        {user.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingUser(user.id === editingUser ? null : user.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Change Role"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Deactivate User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No users found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
