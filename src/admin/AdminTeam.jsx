import { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTeam = () => {
  const { team, setTeam, isConnected } = useSiteData();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', role: '', specialty: '', image_url: '', bio: '', order_index: 0,
  });

  const inputClass = "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', role: '', specialty: '', image_url: '', bio: '', order_index: team.length });
    setIsModalOpen(true);
  };

  const openEdit = (member) => {
    setEditing(member.id);
    setForm({ ...member });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isConnected) {
        if (editing) {
          const { data } = await supabase.from('team_members').update(form).eq('id', editing).select().single();
          setTeam(prev => prev.map(m => m.id === editing ? data : m));
        } else {
          const { data } = await supabase.from('team_members').insert(form).select().single();
          setTeam(prev => [...prev, data]);
        }
      } else {
        if (editing) {
          setTeam(prev => prev.map(m => m.id === editing ? { ...m, ...form } : m));
        } else {
          setTeam(prev => [...prev, { ...form, id: `local-${Date.now()}` }]);
        }
      }
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este membro?')) return;
    if (isConnected) await supabase.from('team_members').delete().eq('id', id);
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Equipe</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie os membros da equipe</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Novo Membro
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member, index) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            className="bg-gray-900 border border-gray-800/50 rounded-xl overflow-hidden group">
            <div className="h-52 bg-gray-800 overflow-hidden relative">
              {member.image_url ? (
                <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600"><Users size={48} /></div>
              )}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(member)} className="p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(member.id)} className="p-2 rounded-lg bg-black/60 text-red-400 hover:bg-black/80 transition-colors backdrop-blur-sm"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-primary-500 text-sm font-medium uppercase tracking-wider mt-1">{member.role}</p>
              <p className="text-gray-500 text-sm mt-1">{member.specialty}</p>
            </div>
          </motion.div>
        ))}
        {team.length === 0 && (
          <div className="col-span-full text-center py-16 bg-gray-900 border border-gray-800/50 rounded-xl">
            <Users className="mx-auto text-gray-600 mb-3" size={40} />
            <p className="text-gray-400">Nenhum membro cadastrado</p>
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
                <h2 className="text-lg font-semibold text-white">{editing ? 'Editar Membro' : 'Novo Membro'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-5">
                {form.image_url && <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 mx-auto"><img src={form.image_url} alt="Preview" className="w-full h-full object-cover" /></div>}
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">URL da Foto</label><input type="url" value={form.image_url} onChange={(e) => setForm(f => ({ ...f, image_url: e.target.value }))} className={inputClass} placeholder="https://..." /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Nome</label><input type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Nome completo" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Cargo</label><input type="text" value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} className={inputClass} placeholder="Ex: Sócio Fundador" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Especialidade</label><input type="text" value={form.specialty} onChange={(e) => setForm(f => ({ ...f, specialty: e.target.value }))} className={inputClass} placeholder="Ex: Direito Civil" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Biografia</label><textarea value={form.bio} onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className={inputClass + " resize-none"} placeholder="Breve biografia profissional" /></div>
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

export default AdminTeam;
