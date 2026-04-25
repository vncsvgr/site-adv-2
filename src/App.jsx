import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SiteDataProvider } from './contexts/SiteDataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminBanners from './admin/AdminBanners';
import AdminBlog from './admin/AdminBlog';
import AdminTeam from './admin/AdminTeam';
import AdminServices from './admin/AdminServices';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminSettings from './admin/AdminSettings';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  return user ? children : <Navigate to="/admin/login" replace />;
};

const PublicSite = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <SiteDataProvider>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="equipe" element={<AdminTeam />} />
              <Route path="servicos" element={<AdminServices />} />
              <Route path="depoimentos" element={<AdminTestimonials />} />
              <Route path="configuracoes" element={<AdminSettings />} />
            </Route>
            {/* Public Routes */}
            <Route path="/*" element={<PublicSite />} />
          </Routes>
        </SiteDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
