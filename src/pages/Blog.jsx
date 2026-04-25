import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/SiteDataContext';

const Blog = () => {
  const { blogPosts } = useSiteData();

  // Only show published posts
  const publishedPosts = blogPosts.filter(p => p.published !== false);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  };

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
            {publishedPosts.map((post, index) => (
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
                    src={post.image_url || post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.date)}</span>
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

          {publishedPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhum artigo publicado ainda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
