import { createClient } from '@supabase/supabase-js';
import type { LeadSubmission } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    // If configured with real env vars, insert to leads table
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const { error } = await supabase.from('leads').insert([
        {
          ...lead,
          created_at: new Date().toISOString(),
        }
      ]);
      if (error) throw error;
      return { success: true };
    }

    // Fallback: save to localStorage for offline / test resilience
    const existing = JSON.parse(localStorage.getItem('sb_leads') || '[]');
    existing.push({ ...lead, created_at: new Date().toISOString() });
    localStorage.setItem('sb_leads', JSON.stringify(existing));
    return { success: true };
  } catch (err) {
    console.error('Error saving lead:', err);
    return { success: false, error: (err as Error).message };
  }
}
