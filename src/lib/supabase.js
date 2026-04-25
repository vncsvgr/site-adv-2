import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a real client only when credentials are configured
// Otherwise, create a mock that returns empty results
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Mock client for when Supabase is not configured
  const mockResponse = { data: null, error: { message: 'Supabase not configured' } };
  const mockQuery = {
    select: () => mockQuery,
    insert: () => mockQuery,
    update: () => mockQuery,
    delete: () => mockQuery,
    eq: () => mockQuery,
    order: () => mockQuery,
    limit: () => mockQuery,
    single: () => Promise.resolve(mockResponse),
    then: (resolve) => resolve(mockResponse),
  };
  // Make mockQuery thenable
  Object.defineProperty(mockQuery, 'then', {
    value: (resolve) => Promise.resolve(mockResponse).then(resolve),
    writable: true,
    configurable: true,
  });

  supabase = {
    from: () => mockQuery,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.resolve({}),
    },
  };
}

export { supabase };
