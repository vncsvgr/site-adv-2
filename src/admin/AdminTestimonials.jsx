import { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, MessageSquareQuote, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTestimonials = () => {
  const { testimonials, setTestimonials, isConnected } = useSiteData();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    text: '', author_name: '', author_role: '', order_index: 0,
  });

  const inputClass = "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  const openNew = () => {
    setEditing(null);
    setForm({ text: '', author_name: '', author_role: '', order_index: testimonials.length });
    setIsModalOpen(true);
  };

  const openEdit = (t) => {
    setEditing(t.id);
    setForm({ ...t });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isConnected) {
        if (editing) {
          const { data } = await supabase.from('testimonials').update(form).eq('id', editing).select().single();
          setTestimonials(prev => prev.map(t => t.id === editing ? data : t));
        } else {
          const { data } = await supabase.from('testimonials').insert(form).select().single();
          setTestimonials(prev => [...prev, data]);
        }
      } else {
        if (editing) {
          setTestimonials(prev => prev.map(t => t.id === editing ? { ...t, ...form } : t));
        } else {
          setTestimonials(prev => [...prev, { ...form, id: `local-${Date.now()}` }]);
        }
      }
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este depoimento?')) return;
    if (isConnected) await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Depoimentos</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie os depoimentos de clientes</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Novo Depoimento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t, index) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            className="bg-gray-900 border border-gray-800/50 rounded-xl p-6 relative group">
            <Quote className="absolute top-4 right-4 text-gray-800" size={32} />
            <p className="text-gray-300 italic mb-4 leading-relaxed text-sm relative z-10">"{t.text}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                  {t.author_name?.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.author_name}</p>
                  <p className="text-gray-500 text-xs">{t.author_role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(t)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full text-center py-16 bg-gray-900 border border-gray-800/50 rounded-xl">
            <MessageSquareQuote className="mx-auto text-gray-600 mb-3" size={40} />
            <p className="text-gray-400">Nenhum depoimento cadastrado</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">{editing ? 'Editar Depoimento' : 'Novo Depoimento'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Depoimento</label><textarea value={form.text} onChange={(e) => setForm(f => ({ ...f, text: e.target.value }))} rows={4} className={inputClass + " resize-none"} placeholder="O que o cliente disse..." /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Nome</label><input type="text" value={form.author_name} onChange={(e) => setForm(f => ({ ...f, author_name: e.target.value }))} className={inputClass} placeholder="Nome do cliente" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Profissão</label><input type="text" value={form.author_role} onChange={(e) => setForm(f => ({ ...f, author_role: e.target.value }))} className={inputClass} placeholder="Ex: Empresário" /></div>
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

export default AdminTestimonials;
