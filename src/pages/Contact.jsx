import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="w-full pt-24 pb-0">
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Contato
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-500 text-lg uppercase tracking-widest"
          >
            Estamos à disposição para atendê-lo
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Informações de Contato</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Nosso escritório está localizado em uma região de fácil acesso, com infraestrutura completa para recebê-lo com conforto e total sigilo. 
                Agende uma visita ou entre em contato pelos nossos canais.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Endereço</h3>
                    <p className="text-gray-600">Av. Paulista, 1000 - 10º Andar<br />Bela Vista, São Paulo - SP<br />CEP: 01310-100</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Telefone & WhatsApp</h3>
                    <p className="text-gray-600">(11) 3000-0000<br />(11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">E-mail</h3>
                    <p className="text-gray-600">contato@silvaadvogados.com.br<br />juridico@silvaadvogados.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Horário de Atendimento</h3>
                    <p className="text-gray-600">Segunda a Sexta: 09h às 18h<br />Atendimento presencial mediante agendamento.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full min-h-[400px] bg-gray-200 rounded-sm overflow-hidden shadow-md"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1437172049925!2d-46.6547146!3d-23.5632924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1713725000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Escritório"
              ></iframe>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Note: The global ContactSection will be automatically rendered here by App.jsx, fulfilling the requirement to have it above the footer. */}
    </div>
  );
};

export default Contact;
