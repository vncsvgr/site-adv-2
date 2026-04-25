import { useSiteData } from '../contexts/SiteDataContext';
import { FileText, Users, Briefcase, Image, MessageSquareQuote, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { banners, team, services, blogPosts, testimonials, isConnected } = useSiteData();

  const stats = [
    { label: 'Posts no Blog', value: blogPosts.length, icon: FileText, color: 'from-blue-500 to-blue-600', link: '/admin/blog' },
    { label: 'Membros da Equipe', value: team.length, icon: Users, color: 'from-emerald-500 to-emerald-600', link: '/admin/equipe' },
    { label: 'Serviços', value: services.length, icon: Briefcase, color: 'from-violet-500 to-violet-600', link: '/admin/servicos' },
    { label: 'Banners Ativos', value: banners.filter(b => b.active !== false).length, icon: Image, color: 'from-amber-500 to-amber-600', link: '/admin/banners' },
    { label: 'Depoimentos', value: testimonials.length, icon: MessageSquareQuote, color: 'from-rose-500 to-rose-600', link: '/admin/depoimentos' },
  ];

  const quickActions = [
    { label: 'Novo Post', path: '/admin/blog', icon: FileText },
    { label: 'Adicionar Membro', path: '/admin/equipe', icon: Users },
    { label: 'Editar Banners', path: '/admin/banners', icon: Image },
    { label: 'Configurações', path: '/admin/configuracoes', icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-white mb-1">Bem-vindo ao Painel</h1>
        <p className="text-gray-400 text-sm">Gerencie todo o conteúdo do seu site de forma simples e rápida.</p>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3"
        >
          <TrendingUp className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-amber-400 text-sm font-medium">Supabase não configurado</p>
            <p className="text-amber-400/70 text-xs mt-1">
              Configure as variáveis <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">VITE_SUPABASE_URL</code> e <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> no arquivo <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">.env</code> para conectar ao banco de dados. Enquanto isso, dados padrão estão sendo usados.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={stat.link}
                className="block bg-gray-900 border border-gray-800/50 rounded-xl p-5 hover:border-gray-700/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <ArrowUpRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link
                  to={action.path}
                  className="flex items-center gap-3 bg-gray-900 border border-gray-800/50 rounded-xl p-4 hover:border-primary-500/30 hover:bg-gray-800/50 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-primary-500/10 flex items-center justify-center transition-colors">
                    <Icon size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Posts Recentes</h2>
          <Link to="/admin/blog" className="text-sm text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-1">
            Ver todos <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="bg-gray-900 border border-gray-800/50 rounded-xl overflow-hidden">
          {blogPosts.slice(0, 5).map((post, index) => (
            <div key={post.id} className={`flex items-center gap-4 p-4 ${index !== 0 ? 'border-t border-gray-800/50' : ''}`}>
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{post.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{post.author} · {post.category}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                post.published !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400'
              }`}>
                {post.published !== false ? 'Publicado' : 'Rascunho'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* View Site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-primary-600/20 to-primary-500/10 border border-primary-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <Eye size={24} className="text-primary-500" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Visualizar o Site</h3>
            <p className="text-gray-400 text-sm">Veja como as alterações aparecem para os visitantes</p>
          </div>
        </div>
        <Link
          to="/"
          target="_blank"
          className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-primary-500/20 whitespace-nowrap"
        >
          Abrir Site
        </Link>
      </motion.div>
    </div>
  );
};

export default Dashboard;
