import { Routes, Route } from 'react-router-dom'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterOrg from './pages/auth/RegisterOrg'
import ForgotPassword from './pages/auth/ForgotPassword'
import MFASetup from './pages/auth/MFASetup'

// Guards & Layouts
import { AuthGuard } from './components/auth/AuthGuard'
import CandidateLayout from './components/layout/CandidateLayout'
import OrgLayout from './components/layout/OrgLayout'
import AdminLayout from './components/layout/AdminLayout'

// Public Pages
import LandingPage from './pages/LandingPage'
import Pricing from './pages/Pricing'

// Candidate Pages
import CandidateDashboard from './pages/candidate/Dashboard'
import Profile from './pages/candidate/Profile'
import Assessments from './pages/candidate/Assessments'
import Certifications from './pages/candidate/Certifications'
import History from './pages/candidate/History'
import AssessmentResults from './pages/candidate/AssessmentResults'

// Assessment Engine
import AssessmentLobby from './pages/assessment/AssessmentLobby'
import AssessmentDelivery from './pages/assessment/AssessmentDelivery'

// Organization Pages
import OrgDashboard from './pages/organization/Dashboard'
import CandidateSearch from './pages/organization/CandidateSearch'
import Analytics from './pages/organization/Analytics'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import UserManagement from './pages/admin/UserManagement'
import QuestionBank from './pages/admin/QuestionBank'
import SubscriptionManagement from './pages/admin/SubscriptionManagement'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-org" element={<RegisterOrg />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/mfa-setup" element={<MFASetup />} />

      {/* Assessment Routes (Auth Required) */}
      <Route element={<AuthGuard allowedRoles={['candidate']} />}>
        <Route path="/assessment/:id/lobby" element={<AssessmentLobby />} />
        <Route path="/assessment/:attemptId/delivery" element={<AssessmentDelivery />} />
      </Route>

      {/* Candidate Portal */}
      <Route element={<AuthGuard allowedRoles={['candidate']} />}>
        <Route element={<CandidateLayout />}>
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/profile" element={<Profile />} />
          <Route path="/candidate/assessments" element={<Assessments />} />
          <Route path="/candidate/certifications" element={<Certifications />} />
          <Route path="/candidate/history" element={<History />} />
          <Route path="/candidate/results/:attemptId" element={<AssessmentResults />} />
        </Route>
      </Route>

      {/* Organization Portal */}
      <Route element={<AuthGuard allowedRoles={['org_admin', 'recruiter', 'hiring_manager']} />}>
        <Route element={<OrgLayout />}>
          <Route path="/org/dashboard" element={<OrgDashboard />} />
          <Route path="/org/candidates" element={<CandidateSearch />} />
          <Route path="/org/analytics" element={<Analytics />} />
          <Route path="/org/team" element={<div className="p-8"><h1 className="text-2xl font-bold">Team Management</h1><p className="text-muted-foreground mt-2">Manage your recruiters and hiring managers.</p></div>} />
          <Route path="/org/subscription" element={<SubscriptionManagement />} />
        </Route>
      </Route>

      {/* Admin Panel */}
      <Route element={<AuthGuard allowedRoles={['platform_admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/question-bank" element={<QuestionBank />} />
          <Route path="/admin/assessments" element={<div className="p-8 text-slate-100"><h1 className="text-2xl font-bold text-white">Assessment Builder</h1></div>} />
          <Route path="/admin/organizations" element={<div className="p-8 text-slate-100"><h1 className="text-2xl font-bold text-white">Organizations</h1></div>} />
          <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
          <Route path="/admin/analytics" element={<div className="p-8 text-slate-100"><h1 className="text-2xl font-bold text-white">Admin Analytics</h1></div>} />
          <Route path="/admin/audit-logs" element={<div className="p-8 text-slate-100"><h1 className="text-2xl font-bold text-white">Audit Logs</h1></div>} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl font-bold text-brand-600">404</h1>
          <p className="text-slate-500 text-lg mt-4">Page not found.</p>
          <a href="/" className="mt-6 text-brand-600 font-medium hover:underline">← Back to Home</a>
        </div>
      } />
    </Routes>
  )
}
