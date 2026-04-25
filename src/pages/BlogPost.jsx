import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const BlogPost = () => {
  const { id } = useParams();
  const { blogPosts, loading } = useSiteData();

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Find the specific post
  const post = blogPosts.find(p => p.id === id || p.id === parseInt(id));

  if (!post) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-24 text-center px-4">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
        <p className="text-gray-600 mb-8">O artigo que você está procurando não existe ou foi removido.</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-900 text-white px-8 py-3 rounded-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Voltar para o Blog
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <div className="w-full pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
            <ArrowLeft size={16} /> Voltar para todos os artigos
          </Link>
        </div>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header Image */}
          {(post.image_url || post.image) && (
            <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
              <img 
                src={post.image_url || post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <div className="p-8 md:p-12 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 mb-6 uppercase tracking-wider">
              {post.category && (
                <span className="flex items-center gap-1.5 text-primary-600 bg-primary-50 px-3 py-1 rounded-sm">
                  <Tag size={14} /> {post.category}
                </span>
              )}
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 italic border-l-4 border-primary-500 pl-6 py-2">
              {post.summary}
            </p>
          </div>

          {/* Post Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </motion.article>

        {/* Share & Call to Action */}
        <div className="mt-12 bg-gray-900 text-white p-8 md:p-12 rounded-sm text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Ficou com alguma dúvida?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Se este artigo não respondeu todas as suas perguntas, nossa equipe de especialistas está à disposição para analisar o seu caso específico.
          </p>
          <Link 
            to="/contato" 
            className="inline-block bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-sm font-bold transition-colors"
          >
            Fale com um Especialista
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
