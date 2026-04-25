import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const SiteDataContext = createContext({});

export const useSiteData = () => useContext(SiteDataContext);

// Default data that mirrors the current hardcoded content
const defaultBanners = [
  {
    id: 'default-1',
    image_url: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Defendendo seus direitos com excelência',
    subtitle: 'Estratégias jurídicas personalizadas para proteger o seu patrimônio, sua empresa e a sua família com segurança e agilidade.',
    button_text: 'Agendar Consulta',
    button_link: '/contato',
    active: true,
    order_index: 0,
  }
];

const defaultTeam = [
  {
    id: 'default-1',
    name: 'Dr. Roberto Silva',
    role: 'Sócio Fundador',
    specialty: 'Direito Empresarial',
    image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Com vasta experiência em litígios complexos e negociações estratégicas.',
    order_index: 0,
  },
  {
    id: 'default-2',
    name: 'Dra. Amanda Costa',
    role: 'Sócia Administradora',
    specialty: 'Direito Civil e Família',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Com vasta experiência em litígios complexos e negociações estratégicas.',
    order_index: 1,
  },
  {
    id: 'default-3',
    name: 'Dr. Marcos Oliveira',
    role: 'Advogado Sênior',
    specialty: 'Direito Trabalhista',
    image_url: 'https://images.unsplash.com/photo-1662104935762-707db0439ecd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Com vasta experiência em litígios complexos e negociações estratégicas.',
    order_index: 2,
  }
];

const defaultServices = [
  { id: 'default-1', title: 'Direito Civil', description: 'Atuação consultiva e contenciosa em questões envolvendo contratos, responsabilidade civil, obrigações, posse e propriedade.', icon: 'Scale', order_index: 0 },
  { id: 'default-2', title: 'Direito Empresarial', description: 'Assessoria jurídica completa para o ambiente de negócios. Inclui estruturação societária, fusões e aquisições, contratos mercantis.', icon: 'Briefcase', order_index: 1 },
  { id: 'default-3', title: 'Direito Trabalhista', description: 'Defesa e orientação tanto para empregadores quanto para empregados. Atuação em reclamações trabalhistas e auditorias.', icon: 'Users', order_index: 2 },
  { id: 'default-4', title: 'Direito de Família e Sucessões', description: 'Atendimento humanizado e discreto em casos de divórcio, união estável, guarda de filhos, pensão alimentícia e inventários.', icon: 'FileText', order_index: 3 },
  { id: 'default-5', title: 'Direito Tributário', description: 'Planejamento tributário estratégico, recuperação de créditos fiscais e defesa em execuções fiscais.', icon: 'Landmark', order_index: 4 },
  { id: 'default-6', title: 'Direito do Consumidor', description: 'Proteção nas relações de consumo, defesa contra práticas abusivas, indenizações por danos morais e materiais.', icon: 'ShieldAlert', order_index: 5 },
];

const defaultBlogPosts = [
  {
    id: 'default-1',
    title: 'Nova Reforma Tributária: O que muda para as empresas em 2026',
    summary: 'Entenda os principais impactos da recente reforma tributária aprovada e como sua empresa deve se preparar para as novas alíquotas e obrigações.',
    content: '',
    date: '2026-10-15',
    author: 'Dr. Roberto Silva',
    category: 'Direito Tributário',
    image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    published: true,
  },
  {
    id: 'default-2',
    title: 'Direitos do Trabalhador em regime de Home Office',
    summary: 'Com a consolidação do teletrabalho, muitas dúvidas surgem sobre direitos e deveres. Saiba o que diz a CLT.',
    content: '',
    date: '2026-10-02',
    author: 'Dra. Amanda Costa',
    category: 'Direito Trabalhista',
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    published: true,
  },
  {
    id: 'default-3',
    title: 'Holding Familiar como ferramenta de proteção patrimonial',
    summary: 'Descubra como a criação de uma holding familiar pode evitar litígios no inventário e garantir a perpetuidade do patrimônio.',
    content: '',
    date: '2026-09-28',
    author: 'Dr. Marcos Oliveira',
    category: 'Direito Empresarial',
    image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    published: true,
  },
];

const defaultTestimonials = [
  { id: 'default-1', text: 'A equipe da Silva & Advogados resolveu meu caso empresarial com uma eficiência impressionante. Recomendo de olhos fechados.', author_name: 'Carlos M.', author_role: 'Empresário', order_index: 0 },
  { id: 'default-2', text: 'Profissionais extremamente humanos e atenciosos. Me deram todo o suporte necessário durante um momento muito difícil da minha vida.', author_name: 'Ana P.', author_role: 'Professora', order_index: 1 },
];

const defaultSettings = {
  firm_name: 'Silva & Advogados',
  phone: '(11) 99999-9999',
  email: 'contato@silvaadvogados.com.br',
  address: 'Av. Paulista, 1000 - 10º Andar, Bela Vista, São Paulo - SP',
  whatsapp_number: '5511999999999',
  instagram_url: '#',
  linkedin_url: '#',
  facebook_url: '#',
};

export const SiteDataProvider = ({ children }) => {
  const [banners, setBanners] = useState(defaultBanners);
  const [team, setTeam] = useState(defaultTeam);
  const [services, setServices] = useState(defaultServices);
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [bannersRes, teamRes, servicesRes, blogRes, testimonialsRes, settingsRes] = await Promise.all([
        supabase.from('banners').select('*').order('order_index'),
        supabase.from('team_members').select('*').order('order_index'),
        supabase.from('services').select('*').order('order_index'),
        supabase.from('blog_posts').select('*').order('date', { ascending: false }),
        supabase.from('testimonials').select('*').order('order_index'),
        supabase.from('site_settings').select('*').limit(1).single(),
      ]);

      if (bannersRes.data?.length) setBanners(bannersRes.data);
      if (teamRes.data?.length) setTeam(teamRes.data);
      if (servicesRes.data?.length) setServices(servicesRes.data);
      if (blogRes.data?.length) setBlogPosts(blogRes.data);
      if (testimonialsRes.data?.length) setTestimonials(testimonialsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
      
      setIsConnected(true);
    } catch {
      // If Supabase is not configured, use default data
      console.log('Supabase not configured, using default data');
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const refreshData = () => fetchAll();

  return (
    <SiteDataContext.Provider value={{
      banners, team, services, blogPosts, testimonials, settings,
      loading, isConnected, refreshData,
      setBanners, setTeam, setServices, setBlogPosts, setTestimonials, setSettings,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};
