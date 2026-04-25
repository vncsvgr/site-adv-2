import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Scale className={`h-8 w-8 ${isScrolled ? 'text-primary-600' : 'text-primary-500'}`} />
          <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Silva & Advogados
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary-500 ${
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : isScrolled
                      ? 'text-gray-600'
                      : 'text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contato"
            className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-sm font-medium transition-colors"
          >
            Fale Conosco
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 text-sm font-medium uppercase tracking-wider ${
                    location.pathname === link.path ? 'text-primary-600 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="px-6 py-4">
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-sm font-medium transition-colors"
              >
                Fale Conosco
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
