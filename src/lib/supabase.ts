import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export async function checkSystemOwnerExists() {
  try {
    const { data, error } = await supabase.rpc('check_system_owner_exists');
    
    if (error) {
      console.error('Supabase RPC error:', error);
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking system owner:', error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('Auth error:', authError);
      return null;
    }
    
    if (!user) return null;

    // Check user type
    const { data: systemOwner, error: ownerError } = await supabase
      .from('system_owners')
      .select()
      .eq('id', user.id)
      .single();

    if (ownerError && ownerError.code !== 'PGRST116') {
      console.error('System owner query error:', ownerError);
    }

    if (systemOwner) {
      return { type: 'owner', ...systemOwner };
    }

    const { data: clientCompany, error: companyError } = await supabase
      .from('client_companies')
      .select()
      .eq('id', user.id)
      .single();

    if (companyError && companyError.code !== 'PGRST116') {
      console.error('Client company query error:', companyError);
    }

    if (clientCompany) {
      return { type: 'company', ...clientCompany };
    }

    const { data: companyUser, error: userError } = await supabase
      .from('company_users')
      .select()
      .eq('id', user.id)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      console.error('Company user query error:', userError);
    }

    if (companyUser) {
      return { type: 'user', ...companyUser };
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}