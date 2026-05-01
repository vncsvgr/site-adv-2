import { Link } from 'react-router-dom';
import { Scale, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <Scale className="h-8 w-8 text-primary-500" />
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Silva & Advogados
                </span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Defendendo seus direitos com excelência, ética e comprometimento.
                Nossa equipe de especialistas está pronta para buscar as melhores soluções jurídicas para o seu caso.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-serif text-xl font-semibold mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
                <li><Link to="/sobre" className="hover:text-primary-500 transition-colors">Sobre Nós</Link></li>
                <li><Link to="/servicos" className="hover:text-primary-500 transition-colors">Áreas de Atuação</Link></li>
                <li><Link to="/blog" className="hover:text-primary-500 transition-colors">Blog Jurídico</Link></li>
                <li><Link to="/contato" className="hover:text-primary-500 transition-colors">Contato</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-serif text-xl font-semibold mb-6">Áreas de Atuação</h3>
              <ul className="space-y-3">
                <li><Link to="/servicos" className="hover:text-primary-500 transition-colors">Direito Civil</Link></li>
                <li><Link to="/servicos" className="hover:text-primary-500 transition-colors">Direito Trabalhista</Link></li>
                <li><Link to="/servicos" className="hover:text-primary-500 transition-colors">Direito Empresarial</Link></li>
                <li><Link to="/servicos" className="hover:text-primary-500 transition-colors">Direito de Família</Link></li>
                <li><Link to="/servicos" className="hover:text-primary-500 transition-colors">Direito Tributário</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-serif text-xl font-semibold mb-6">Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary-500 shrink-0 mt-1" size={20} />
                  <span>Av. Paulista, 1000 - 10º Andar<br />Bela Vista, São Paulo - SP</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-primary-500 shrink-0" size={20} />
                  <span>(11) 99999-9999</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-primary-500 shrink-0" size={20} />
                  <span>contato@silvaadvogados.com.br</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Silva & Advogados. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="opacity-30 hover:opacity-100 transition-opacity">Acesso restrito</Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-credits">
        <div className="container">
          <span>Desenvolvido por</span>
          <a href="https://exemplo-agencia.com.br" target="_blank" rel="noopener noreferrer">
            <img src="/images/pinfalllogo (2).png" alt="Logotipo da Agência" className="credits-logo" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
