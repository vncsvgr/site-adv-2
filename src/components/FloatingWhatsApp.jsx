const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp Icon" className="w-16 h-16" />
    </a>
  );
};

export default FloatingWhatsApp;
