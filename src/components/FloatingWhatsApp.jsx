import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default FloatingWhatsApp;
