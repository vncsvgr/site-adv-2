import { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, FileText, Calendar, User, Tag, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBlog = () => {
  const { blogPosts, setBlogPosts, isConnected } = useSiteData();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', summary: '', content: '', date: new Date().toISOString().split('T')[0],
    author: '', category: '', image_url: '', published: true,
  });

  const inputClass = "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', summary: '', content: '', date: new Date().toISOString().split('T')[0], author: '', category: '', image_url: '', published: true });
    setIsModalOpen(true);
  };

  const openEdit = (post) => {
    setEditing(post.id);
    setForm({ ...post });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isConnected) {
        if (editing) {
          const { data } = await supabase.from('blog_posts').update(form).eq('id', editing).select().single();
          setBlogPosts(prev => prev.map(p => p.id === editing ? data : p));
        } else {
          const { data } = await supabase.from('blog_posts').insert(form).select().single();
          setBlogPosts(prev => [data, ...prev]);
        }
      } else {
        if (editing) {
          setBlogPosts(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p));
        } else {
          setBlogPosts(prev => [{ ...form, id: `local-${Date.now()}` }, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este post?')) return;
    if (isConnected) await supabase.from('blog_posts').delete().eq('id', id);
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const togglePublished = async (post) => {
    const updated = { ...post, published: !post.published };
    if (isConnected) await supabase.from('blog_posts').update({ published: updated.published }).eq('id', post.id);
    setBlogPosts(prev => prev.map(p => p.id === post.id ? updated : p));
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Blog</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie os artigos do blog jurídico</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Novo Post
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-gray-900 border border-gray-800/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Post</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Categoria</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Autor</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Data</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                        {post.image_url && <img src={post.image_url} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <span className="text-sm text-white font-medium truncate max-w-[200px] lg:max-w-[300px]">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-full">{post.category}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-sm text-gray-400">{post.author}</td>
                  <td className="px-5 py-4 hidden sm:table-cell text-sm text-gray-500">{formatDate(post.date)}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => togglePublished(post)} className={`text-xs px-2.5 py-1 rounded-full font-medium ${post.published !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400'}`}>
                      {post.published !== false ? 'Publicado' : 'Rascunho'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(post)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="mx-auto text-gray-600 mb-3" size={40} />
            <p className="text-gray-400">Nenhum post cadastrado</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">{editing ? 'Editar Post' : 'Novo Post'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Título</label><input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className={inputClass} placeholder="Título do artigo" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Resumo</label><textarea value={form.summary} onChange={(e) => setForm(f => ({ ...f, summary: e.target.value }))} rows={2} className={inputClass + " resize-none"} placeholder="Breve resumo do artigo" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Conteúdo Completo</label><textarea value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))} rows={8} className={inputClass + " resize-none"} placeholder="Conteúdo do artigo..." /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">URL da Imagem</label><input type="url" value={form.image_url} onChange={(e) => setForm(f => ({ ...f, image_url: e.target.value }))} className={inputClass} placeholder="https://..." /></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Categoria</label><input type="text" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} className={inputClass} placeholder="Ex: Direito Civil" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Autor</label><input type="text" value={form.author} onChange={(e) => setForm(f => ({ ...f, author: e.target.value }))} className={inputClass} placeholder="Nome do autor" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Data</label><input type="date" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} className={inputClass} /></div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm(f => ({ ...f, published: e.target.checked }))} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                  <span className="text-sm text-gray-300">Publicar</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">Cancelar</button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                  <Save size={16} />{saving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlog;
