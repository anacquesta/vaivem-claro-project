import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { SiteProvider } from '@/contexts/SiteContext';
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

function App() {
  return (
    <SiteProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
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
        </Router>
        <Toaster />
      </QueryClientProvider>
    </SiteProvider>
  )
}

export default App