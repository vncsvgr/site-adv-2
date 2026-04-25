import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const team = [
    {
      name: "Dr. Roberto Silva",
      role: "Sócio Fundador",
      specialty: "Direito Empresarial",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Dra. Amanda Costa",
      role: "Sócia Administradora",
      specialty: "Direito Civil e Família",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Dr. Marcos Oliveira",
      role: "Advogado Sênior",
      specialty: "Direito Trabalhista",
      image: "https://images.unsplash.com/photo-1662104935762-707db0439ecd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="w-full pt-24 pb-12">
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Sobre Nós
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-500 text-lg uppercase tracking-widest"
          >
            Conheça nossa história e nossa equipe
          </motion.p>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div {...fadeIn} className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1170&auto=format&fit=crop&q=80"
                alt="Escritório de Advocacia"
                className="w-full h-auto rounded-sm shadow-xl"
              />
            </motion.div>
            <motion.div {...fadeIn} className="md:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Nossa História</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Fundado há mais de 15 anos, o escritório Silva & Advogados nasceu do desejo de oferecer uma prestação de serviços jurídicos diferenciada, aliando excelência técnica a um atendimento profundamente personalizado.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Ao longo de nossa trajetória, construímos uma sólida reputação baseada na ética, no comprometimento e nos resultados expressivos alcançados para nossos clientes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Hoje, contamos com uma estrutura moderna e uma equipe multidisciplinar, pronta para atender demandas complexas de empresas e pessoas físicas, sempre com foco na agilidade e na segurança jurídica.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeIn} className="bg-white p-10 shadow-md border-t-4 border-primary-600">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">Missão</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Proporcionar soluções jurídicas inovadoras e eficazes, atuando de forma incansável na defesa dos direitos e interesses de nossos clientes.
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-white p-10 shadow-md border-t-4 border-primary-600">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">Visão</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Ser reconhecido nacionalmente como um escritório de excelência, referência em ética, inovação e resultados jurídicos de alta performance.
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="bg-white p-10 shadow-md border-t-4 border-primary-600">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">Valores</h3>
              <ul className="text-gray-600 text-center space-y-2">
                <li>Ética e Transparência</li>
                <li>Excelência Técnica</li>
                <li>Comprometimento com o Cliente</li>
                <li>Inovação e Agilidade</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Nossa Equipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profissionais altamente qualificados e dedicados a buscar as melhores estratégias para o seu caso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">Com vasta experiência em litígios complexos e negociações estratégicas.</p>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-2">{member.role}</p>
                <p className="text-gray-500">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
