import { createClient } from '@supabase/supabase-js';
import type { LeadSubmission } from '../types';
import { getAttribution } from './attribution';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const attr = getAttribution() || {};
    const payload: LeadSubmission = {
      ...lead,
      ref: lead.ref || attr.ref,
      utm_source: lead.utm_source || attr.utm_source,
      utm_medium: lead.utm_medium || attr.utm_medium,
      utm_campaign: lead.utm_campaign || attr.utm_campaign,
      utm_term: lead.utm_term || attr.utm_term,
      utm_content: lead.utm_content || attr.utm_content,
      gclid: lead.gclid || attr.gclid,
      fbclid: lead.fbclid || attr.fbclid,
      created_at: new Date().toISOString(),
    };

    // Se configurado com credenciais reais do Supabase
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const { error } = await supabase.from('leads').insert([payload]);
      if (error) throw error;
      return { success: true };
    }

    // Fallback: persistência local para ambiente de desenvolvimento/offline
    const existing = JSON.parse(localStorage.getItem('sb_leads') || '[]');
    existing.push(payload);
    localStorage.setItem('sb_leads', JSON.stringify(existing));
    return { success: true };
  } catch (err) {
    console.error('Error saving lead:', err);
    return { success: false, error: (err as Error).message };
  }
}
