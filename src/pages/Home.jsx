import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Briefcase, Users, ShieldCheck, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const services = [
    { icon: <Scale size={32} />, title: 'Direito Civil', desc: 'Atuação em contratos, responsabilidade civil, posse e propriedade, visando a proteção dos seus interesses.' },
    { icon: <Briefcase size={32} />, title: 'Direito Empresarial', desc: 'Assessoria completa para empresas, desde a constituição até a elaboração de contratos complexos.' },
    { icon: <Users size={32} />, title: 'Direito de Família', desc: 'Tratativa humanizada em divórcios, pensão alimentícia, guarda e inventários.' }
  ];

  const differentials = [
    { icon: <Award className="text-primary-500" size={40} />, title: 'Experiência Comprovada', desc: 'Mais de 15 anos de atuação com alto índice de sucesso em casos complexos.' },
    { icon: <ShieldCheck className="text-primary-500" size={40} />, title: 'Ética e Transparência', desc: 'Comunicação clara sobre os andamentos do seu processo e riscos envolvidos.' },
    { icon: <Clock className="text-primary-500" size={40} />, title: 'Agilidade no Atendimento', desc: 'Respostas rápidas e dedicação exclusiva para garantir a melhor estratégia.' }
  ];

  const testimonials = [
    { text: "A equipe da Silva & Advogados resolveu meu caso empresarial com uma eficiência impressionante. Recomendo de olhos fechados.", author: "Carlos M., Empresário" },
    { text: "Profissionais extremamente humanos e atenciosos. Me deram todo o suporte necessário durante um momento muito difícil da minha vida.", author: "Ana P., Professora" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        ></div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-primary-500"></div>
              <span className="text-primary-500 font-semibold uppercase tracking-widest text-sm">Escritório de Advocacia</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Defendendo seus direitos com <span className="text-primary-500 italic">excelência</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Estratégias jurídicas personalizadas para proteger o seu patrimônio,
              sua empresa e a sua família com segurança e agilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contato" className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-sm font-medium transition-all text-center">
                Agendar Consulta
              </Link>
              <Link to="/sobre" className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-sm font-medium transition-all text-center">
                Conheça o Escritório
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div {...fadeIn} className="lg:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Equipe do escritório"
                className="w-full h-auto rounded-sm shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-primary-900 text-white p-8 rounded-sm shadow-xl hidden md:block">
                <p className="text-4xl font-serif font-bold text-primary-500 mb-1">15+</p>
                <p className="text-sm uppercase tracking-wider">Anos de Experiência</p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="lg:w-1/2">
              <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">Sobre Nós</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Tradição e Inovação na Advocacia</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fundado com o propósito de oferecer uma advocacia moderna, combativa e altamente especializada,
                o escritório Silva & Advogados consolidou-se como referência na prestação de serviços jurídicos de excelência.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nossa atuação é pautada na ética, transparência e no compromisso inabalável com a defesa
                dos interesses dos nossos clientes, buscando sempre as soluções mais eficientes e seguras.
              </p>
              <Link to="/sobre" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-900 transition-colors">
                Ler a nossa história completa <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">Nossas Especialidades</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Áreas de Atuação</h3>
            <p className="text-gray-600">Oferecemos assessoria jurídica especializada em diversas áreas do direito, sempre com foco em resultados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 rounded-sm shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                <Link to="/servicos" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-900">
                  Saiba mais <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/servicos" className="inline-block bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-3 rounded-sm font-medium transition-colors">
              Ver todas as áreas
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Por que escolher nosso escritório?</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {differentials.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center flex flex-col items-center"
              >
                <div className="mb-6">{diff.icon}</div>
                <h4 className="text-xl font-serif font-bold mb-4">{diff.title}</h4>
                <p className="text-gray-400 leading-relaxed max-w-sm">{diff.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">Depoimentos</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">O que dizem nossos clientes</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-10 rounded-sm relative"
              >
                <span className="absolute top-6 left-6 text-6xl text-primary-200 font-serif leading-none opacity-50">"</span>
                <p className="text-lg text-gray-700 italic relative z-10 mb-6 leading-relaxed">
                  {test.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold font-serif">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{test.author.split(',')[0]}</p>
                    <p className="text-sm text-gray-500">{test.author.split(',')[1]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Precisa de assistência jurídica?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Nossa equipe de especialistas está pronta para analisar o seu caso e apresentar a melhor solução.
          </p>
          <Link to="/contato" className="inline-block bg-white text-primary-900 hover:bg-gray-100 px-10 py-4 rounded-sm font-bold text-lg transition-colors shadow-xl">
            Fale com um Advogado Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
