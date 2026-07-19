import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterOrg from './pages/auth/RegisterOrg'
import ForgotPassword from './pages/auth/ForgotPassword'
import MFASetup from './pages/auth/MFASetup'
import { AuthGuard } from './components/auth/AuthGuard'
import CandidateLayout from './components/layout/CandidateLayout'
import CandidateDashboard from './pages/candidate/Dashboard'
import Profile from './pages/candidate/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="flex items-center justify-center min-h-screen bg-brand-50"><h1 className="text-4xl font-bold text-brand-900">Technical Assessment Platform</h1></div>} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-org" element={<RegisterOrg />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/mfa-setup" element={<MFASetup />} />

      {/* Candidate Routes */}
      <Route element={<AuthGuard allowedRoles={['candidate']} />}>
        <Route element={<CandidateLayout />}>
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/profile" element={<Profile />} />
          <Route path="/candidate/assessments" element={<div className="p-8"><h1 className="text-2xl font-bold">Assessments</h1></div>} />
          <Route path="/candidate/certifications" element={<div className="p-8"><h1 className="text-2xl font-bold">Certifications</h1></div>} />
          <Route path="/candidate/history" element={<div className="p-8"><h1 className="text-2xl font-bold">History</h1></div>} />
        </Route>
      </Route>
      
      {/* Organization Routes */}
      <Route path="/org/dashboard" element={<div>Org Dashboard</div>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />

      {/* Assessment Routes */}
      <Route path="/assessment/:id" element={<div>Assessment Delivery</div>} />
      
    </Routes>
  )
}
