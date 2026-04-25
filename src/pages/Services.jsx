import { motion } from 'framer-motion';
import { Scale, Briefcase, Users, FileText, Landmark, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: "civil",
      icon: <Scale size={40} />,
      title: 'Direito Civil',
      desc: 'Atuação consultiva e contenciosa em questões envolvendo contratos, responsabilidade civil, obrigações, posse e propriedade. Buscamos sempre a melhor solução para proteger o patrimônio e os direitos civis dos nossos clientes.',
    },
    {
      id: "empresarial",
      icon: <Briefcase size={40} />,
      title: 'Direito Empresarial',
      desc: 'Assessoria jurídica completa para o ambiente de negócios. Inclui estruturação societária, fusões e aquisições, contratos mercantis, recuperação de crédito e compliance, garantindo segurança jurídica para as operações corporativas.',
    },
    {
      id: "trabalhista",
      icon: <Users size={40} />,
      title: 'Direito Trabalhista',
      desc: 'Defesa e orientação tanto para empregadores quanto para empregados. Atuação em reclamações trabalhistas, auditorias (due diligence), elaboração de contratos de trabalho e negociações sindicais, mitigando riscos.',
    },
    {
      id: "familia",
      icon: <FileText size={40} />,
      title: 'Direito de Família e Sucessões',
      desc: 'Atendimento humanizado e discreto em casos de divórcio, união estável, guarda de filhos, pensão alimentícia, inventários e planejamento sucessório patrimonial familiar.',
    },
    {
      id: "tributario",
      icon: <Landmark size={40} />,
      title: 'Direito Tributário',
      desc: 'Planejamento tributário estratégico, recuperação de créditos fiscais e defesa em execuções fiscais. Nosso objetivo é otimizar a carga tributária das empresas de forma legal e segura.',
    },
    {
      id: "consumidor",
      icon: <ShieldAlert size={40} />,
      title: 'Direito do Consumidor',
      desc: 'Proteção nas relações de consumo, defesa contra práticas abusivas, indenizações por danos morais e materiais, além de assessoria preventiva para empresas evitarem litígios com clientes.',
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
            Áreas de Atuação
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-500 text-lg uppercase tracking-widest"
          >
            Especialidade e dedicação ao seu caso
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl transition-all border-l-4 border-transparent hover:border-primary-600 group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-primary-500 shrink-0 mt-1">
                    {service.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <Link 
                      to="/contato" 
                      className="text-sm font-bold text-gray-900 hover:text-primary-600 uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                    >
                      Solicitar Atendimento
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Inside Services */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Não encontrou o que procurava?
          </h3>
          <p className="text-gray-600 mb-8">
            Nossa equipe atua de forma abrangente em diversas outras áreas do direito. 
            Entre em contato para discutirmos a viabilidade jurídica do seu caso.
          </p>
          <Link 
            to="/contato" 
            className="inline-block bg-primary-600 hover:bg-primary-900 text-white px-8 py-3 rounded-sm font-medium transition-colors"
          >
            Falar com a Equipe
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
