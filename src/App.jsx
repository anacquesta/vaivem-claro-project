import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { SiteProvider } from '@/contexts/SiteContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';

// Admin Page Imports
import AdminLogin from './pages/admin/Login';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

// Admin Editor Imports
import HeroEditor from './pages/admin/editors/HeroEditor';
import NavbarEditor from './pages/admin/editors/NavbarEditor';
import AboutEditor from './pages/admin/editors/AboutEditor';
import ServicesEditor from './pages/admin/editors/ServicesEditor';
import FleetEditor from './pages/admin/editors/FleetEditor';
import DifferentialsEditor from './pages/admin/editors/DifferentialsEditor';
import ContactEditor from './pages/admin/editors/ContactEditor';
import FooterEditor from './pages/admin/editors/FooterEditor';
import GlobalEditor from './pages/admin/editors/GlobalEditor';
import MediaEditor from './pages/admin/editors/MediaEditor';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="navbar" element={<NavbarEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="services" element={<ServicesEditor />} />
        <Route path="fleet" element={<FleetEditor />} />
        <Route path="differentials" element={<DifferentialsEditor />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="footer" element={<FooterEditor />} />
        <Route path="global" element={<GlobalEditor />} />
        <Route path="media" element={<MediaEditor />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </SiteProvider>
    </AuthProvider>
  )
}

export default App