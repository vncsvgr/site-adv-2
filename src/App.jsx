import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>
        <ContactSection />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
