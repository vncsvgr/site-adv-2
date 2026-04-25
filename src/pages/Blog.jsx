import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Nova Reforma Tributária: O que muda para as empresas em 2026",
      summary: "Entenda os principais impactos da recente reforma tributária aprovada e como sua empresa deve se preparar para as novas alíquotas e obrigações.",
      date: "15 de Outubro, 2026",
      author: "Dr. Roberto Silva",
      category: "Direito Tributário",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Direitos do Trabalhador em regime de Home Office",
      summary: "Com a consolidação do teletrabalho, muitas dúvidas surgem sobre direitos e deveres. Saiba o que diz a CLT sobre o custeio de equipamentos e horas extras.",
      date: "02 de Outubro, 2026",
      author: "Dra. Amanda Costa",
      category: "Direito Trabalhista",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Holding Familiar como ferramenta de proteção patrimonial",
      summary: "Descubra como a criação de uma holding familiar pode evitar litígios no inventário e garantir a perpetuidade do patrimônio da sua família.",
      date: "28 de Setembro, 2026",
      author: "Dr. Marcos Oliveira",
      category: "Direito Empresarial",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Lei Geral de Proteção de Dados (LGPD): Sua empresa está regular?",
      summary: "As multas por descumprimento da LGPD já estão sendo aplicadas. Veja um checklist básico para garantir que seu negócio está dentro da lei.",
      date: "10 de Setembro, 2026",
      author: "Dr. Roberto Silva",
      category: "Direito Digital",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Guarda Compartilhada: Mitos e Verdades",
      summary: "A guarda compartilhada é a regra no Brasil, mas muitas pessoas ainda confundem seu significado jurídico. Esclarecemos os principais pontos.",
      date: "25 de Agosto, 2026",
      author: "Dra. Amanda Costa",
      category: "Direito de Família",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Contratos de Aluguel Comerciais: Cláusulas Essenciais",
      summary: "Antes de assinar um contrato de locação comercial, é fundamental analisar algumas cláusulas que podem salvar o seu negócio no futuro.",
      date: "12 de Agosto, 2026",
      author: "Dr. Marcos Oliveira",
      category: "Direito Civil",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
            Blog Jurídico
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-500 text-lg uppercase tracking-widest"
          >
            Artigos, notícias e atualizações
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  </div>
                  
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                    {post.summary}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-900 uppercase tracking-wider"
                  >
                    Ler artigo completo <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination (Visual only) */}
          <div className="mt-16 flex justify-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-primary-600 text-white rounded-sm font-medium">1</button>
            <button className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-sm font-medium transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-sm font-medium transition-colors">3</button>
            <button className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-sm font-medium transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
