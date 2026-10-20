// Online saves with Supabase: email + password accounts and one `saves` row
// per player (see supabase/schema.sql). The Supabase library is only loaded
// when cloudConfig.js is filled in, so the game still runs offline without it.
import { SUPABASE_URL, SUPABASE_KEY } from './cloudConfig.js';

const SDK_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';
const SAVE_DELAY = 1500; // ms: saves made close together are sent as one

let client = null;
let user = null;
let pending = null;
let timer = null;

export const cloud = {
  enabled: Boolean(SUPABASE_URL && SUPABASE_KEY),

  /** True once the library loaded and Supabase answered. */
  get ready() {
    return client !== null;
  },

  /** The signed-in player, or null. */
  get user() {
    return user;
  },

  /** Load the library and pick up a session from an earlier visit. Returns the player or null. */
  async connect() {
    const { createClient } = await import(SDK_URL);
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    client = supabase;
    user = data.session?.user ?? null;
    return user;
  },

  async signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return (user = data.user);
  },

  async signUp(email, password) {
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) throw error;
    // With "Confirm email" on, Supabase makes the account but doesn't sign you in.
    if (!data.session) throw new Error('Account made, but Supabase wants the email confirmed first. Turn off "Confirm email" in the Supabase dashboard.');
    return (user = data.user);
  },

  async signOut() {
    await this.flush();
    await client.auth.signOut();
    user = null;
  },

  /** The player's save from the database ({ journal, money }), or null if they don't have one yet. */
  async load() {
    const { data, error } = await client.from('saves').select('journal, money').eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    return data;
  },

  /** Send this save soon. Only the latest one is sent if several come in quickly. */
  queueSave(save) {
    if (!user) return;
    pending = save;
    clearTimeout(timer);
    timer = setTimeout(() => this.flush(), SAVE_DELAY);
  },

  /** Send the queued save now. */
  async flush() {
    clearTimeout(timer);
    if (!pending || !user) return;
    const { journal, money } = pending;
    pending = null;
    const { error } = await client.from('saves').upsert({ user_id: user.id, journal, money, updated_at: new Date().toISOString() });
    // It's still saved in the browser, and that gets merged in on the next sign-in.
    if (error) console.warn('Online save failed:', error.message);
  },
};
