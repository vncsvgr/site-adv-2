import { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBanners = () => {
  const { banners, setBanners, isConnected } = useSiteData();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    image_url: '', title: '', subtitle: '',
    button_text: 'Agendar Consulta', button_link: '/contato',
    active: true, order_index: 0,
  });

  const openNew = () => {
    setEditing(null);
    setForm({ image_url: '', title: '', subtitle: '', button_text: 'Agendar Consulta', button_link: '/contato', active: true, order_index: banners.length });
    setIsModalOpen(true);
  };

  const openEdit = (banner) => {
    setEditing(banner.id);
    setForm({ ...banner });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isConnected) {
        if (editing) {
          const { data } = await supabase.from('banners').update(form).eq('id', editing).select().single();
          setBanners(prev => prev.map(b => b.id === editing ? data : b));
        } else {
          const { data } = await supabase.from('banners').insert(form).select().single();
          setBanners(prev => [...prev, data]);
        }
      } else {
        if (editing) {
          setBanners(prev => prev.map(b => b.id === editing ? { ...b, ...form } : b));
        } else {
          setBanners(prev => [...prev, { ...form, id: `local-${Date.now()}` }]);
        }
      }
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este banner?')) return;
    if (isConnected) await supabase.from('banners').delete().eq('id', id);
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const toggleActive = async (banner) => {
    const updated = { ...banner, active: !banner.active };
    if (isConnected) await supabase.from('banners').update({ active: updated.active }).eq('id', banner.id);
    setBanners(prev => prev.map(b => b.id === banner.id ? updated : b));
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Banners</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie os banners da página inicial</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Novo Banner
        </button>
      </div>

      <div className="space-y-4">
        {banners.map((banner, index) => (
          <motion.div key={banner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            className="bg-gray-900 border border-gray-800/50 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-72 h-40 md:h-auto bg-gray-800 shrink-0 relative overflow-hidden">
                {banner.image_url ? <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon size={40} /></div>}
                {!banner.active && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><span className="text-gray-300 text-sm font-medium bg-black/60 px-3 py-1 rounded-full">Inativo</span></div>}
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{banner.title || 'Sem título'}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{banner.subtitle || 'Sem subtítulo'}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-4">
                    <button onClick={() => toggleActive(banner)} className={`p-2 rounded-lg transition-colors ${banner.active ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-gray-500 hover:bg-gray-800'}`}>
                      {banner.active ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => openEdit(banner)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(banner.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {banners.length === 0 && (
          <div className="text-center py-16 bg-gray-900 border border-gray-800/50 rounded-xl">
            <ImageIcon className="mx-auto text-gray-600 mb-3" size={40} />
            <p className="text-gray-400">Nenhum banner cadastrado</p>
            <button onClick={openNew} className="mt-4 text-primary-500 text-sm font-medium">Adicionar primeiro banner</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">{editing ? 'Editar Banner' : 'Novo Banner'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-5">
                {form.image_url && <div className="rounded-xl overflow-hidden h-48 bg-gray-800"><img src={form.image_url} alt="Preview" className="w-full h-full object-cover" /></div>}
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">URL da Imagem</label><input type="url" value={form.image_url} onChange={(e) => setForm(f => ({ ...f, image_url: e.target.value }))} className={inputClass} placeholder="https://..." /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Título</label><input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className={inputClass} placeholder="Título do banner" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Subtítulo</label><textarea value={form.subtitle} onChange={(e) => setForm(f => ({ ...f, subtitle: e.target.value }))} rows={3} className={inputClass + " resize-none"} placeholder="Texto descritivo" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Texto do Botão</label><input type="text" value={form.button_text} onChange={(e) => setForm(f => ({ ...f, button_text: e.target.value }))} className={inputClass} /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Link do Botão</label><input type="text" value={form.button_link} onChange={(e) => setForm(f => ({ ...f, button_link: e.target.value }))} className={inputClass} /></div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm(f => ({ ...f, active: e.target.checked }))} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                  <span className="text-sm text-gray-300">Banner ativo</span>
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

export default AdminBanners;
