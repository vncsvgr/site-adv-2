import { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_OPTIONS = ['Scale', 'Briefcase', 'Users', 'FileText', 'Landmark', 'ShieldAlert', 'Gavel', 'Building', 'Heart', 'Shield'];

const AdminServices = () => {
  const { services, setServices, isConnected } = useSiteData();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', icon: 'Scale', order_index: 0,
  });

  const inputClass = "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', description: '', icon: 'Scale', order_index: services.length });
    setIsModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service.id);
    setForm({ ...service });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isConnected) {
        if (editing) {
          const { data } = await supabase.from('services').update(form).eq('id', editing).select().single();
          setServices(prev => prev.map(s => s.id === editing ? data : s));
        } else {
          const { data } = await supabase.from('services').insert(form).select().single();
          setServices(prev => [...prev, data]);
        }
      } else {
        if (editing) {
          setServices(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s));
        } else {
          setServices(prev => [...prev, { ...form, id: `local-${Date.now()}` }]);
        }
      }
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este serviço?')) return;
    if (isConnected) await supabase.from('services').delete().eq('id', id);
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Serviços</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie as áreas de atuação do escritório</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Novo Serviço
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {services.map((service, index) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            className="bg-gray-900 border border-gray-800/50 rounded-xl p-5 flex items-start gap-4 group hover:border-gray-700/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 shrink-0 text-lg font-bold font-serif">
              {service.title?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold">{service.title}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{service.description}</p>
              <span className="inline-block mt-2 text-xs bg-gray-800 text-gray-500 px-2.5 py-1 rounded-full">Ícone: {service.icon}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(service)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={15} /></button>
              <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={15} /></button>
            </div>
          </motion.div>
        ))}
        {services.length === 0 && (
          <div className="text-center py-16 bg-gray-900 border border-gray-800/50 rounded-xl">
            <Briefcase className="mx-auto text-gray-600 mb-3" size={40} />
            <p className="text-gray-400">Nenhum serviço cadastrado</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">{editing ? 'Editar Serviço' : 'Novo Serviço'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Título</label><input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className={inputClass} placeholder="Nome da área de atuação" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Descrição</label><textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={4} className={inputClass + " resize-none"} placeholder="Descrição detalhada do serviço" /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Ícone</label>
                  <div className="grid grid-cols-5 gap-2">
                    {ICON_OPTIONS.map(icon => (
                      <button key={icon} type="button" onClick={() => setForm(f => ({ ...f, icon }))}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${form.icon === icon ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                        {icon}
                      </button>
                    ))}
                  </div>
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

export default AdminServices;
