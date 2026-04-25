-- =====================================================
-- Supabase SQL Setup - Painel Administrativo
-- Silva & Advogados
-- Execute este SQL no editor SQL do Supabase
-- =====================================================

-- Tabela: Banners
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT,
  title TEXT,
  subtitle TEXT,
  button_text TEXT DEFAULT 'Agendar Consulta',
  button_link TEXT DEFAULT '/contato',
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela: Membros da Equipe
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  specialty TEXT,
  image_url TEXT,
  bio TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela: Serviços
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Scale',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela: Posts do Blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  date DATE DEFAULT CURRENT_DATE,
  author TEXT,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela: Depoimentos
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author_name TEXT,
  author_role TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela: Configurações do Site
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_name TEXT DEFAULT 'Silva & Advogados',
  phone TEXT,
  email TEXT,
  address TEXT,
  whatsapp_number TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública (SELECT para qualquer um)
CREATE POLICY "Public read banners" ON banners FOR SELECT USING (true);
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Políticas de escrita para usuários autenticados
CREATE POLICY "Auth insert banners" ON banners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update banners" ON banners FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete banners" ON banners FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert team" ON team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update team" ON team_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete team" ON team_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert services" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update services" ON services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete services" ON services FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert blog" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update blog" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete blog" ON blog_posts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update settings" ON site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- =====================================================
-- Dados iniciais (opcional)
-- =====================================================

-- Inserir configurações padrão
INSERT INTO site_settings (firm_name, phone, email, address, whatsapp_number, instagram_url, linkedin_url, facebook_url)
VALUES (
  'Silva & Advogados',
  '(11) 99999-9999',
  'contato@silvaadvogados.com.br',
  'Av. Paulista, 1000 - 10º Andar, Bela Vista, São Paulo - SP',
  '5511999999999',
  '#', '#', '#'
);
