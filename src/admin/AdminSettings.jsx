import { useState, useEffect } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { supabase } from '../lib/supabase';
import { Save, Settings, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const { settings, setSettings, isConnected } = useSiteData();
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(settings); }, [settings]);

  const inputClass = "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isConnected) {
        const { id, ...rest } = form;
        if (id) {
          await supabase.from('site_settings').update(rest).eq('id', id);
        } else {
          await supabase.from('site_settings').upsert(rest);
        }
      }
      setSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Configurações</h1>
        <p className="text-gray-400 text-sm mt-1">Informações gerais do escritório</p>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm">
          <CheckCircle size={18} /> Configurações salvas com sucesso!
        </motion.div>
      )}

      <div className="bg-gray-900 border border-gray-800/50 rounded-xl divide-y divide-gray-800/50">
        {/* Firm Info */}
        <div className="p-6 space-y-5">
          <h2 className="text-white font-semibold flex items-center gap-2"><Settings size={18} className="text-primary-500" /> Informações do Escritório</h2>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Nome do Escritório</label><input type="text" value={form.firm_name || ''} onChange={(e) => setForm(f => ({ ...f, firm_name: e.target.value }))} className={inputClass} /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Endereço</label><input type="text" value={form.address || ''} onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Telefone</label><input type="tel" value={form.phone || ''} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">E-mail</label><input type="email" value={form.email || ''} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Número WhatsApp (com DDI)</label><input type="text" value={form.whatsapp_number || ''} onChange={(e) => setForm(f => ({ ...f, whatsapp_number: e.target.value }))} className={inputClass} placeholder="5511999999999" /></div>
        </div>

        {/* Social */}
        <div className="p-6 space-y-5">
          <h2 className="text-white font-semibold">Redes Sociais</h2>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Instagram URL</label><input type="url" value={form.instagram_url || ''} onChange={(e) => setForm(f => ({ ...f, instagram_url: e.target.value }))} className={inputClass} placeholder="https://instagram.com/..." /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">LinkedIn URL</label><input type="url" value={form.linkedin_url || ''} onChange={(e) => setForm(f => ({ ...f, linkedin_url: e.target.value }))} className={inputClass} placeholder="https://linkedin.com/..." /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Facebook URL</label><input type="url" value={form.facebook_url || ''} onChange={(e) => setForm(f => ({ ...f, facebook_url: e.target.value }))} className={inputClass} placeholder="https://facebook.com/..." /></div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 shadow-lg shadow-primary-500/20">
          <Save size={16} />{saving ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
