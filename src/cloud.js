// Online saves with Supabase: email + password accounts and one `saves` row
// per player (see supabase/schema.sql). The Supabase library is only loaded
// when cloudConfig.js is filled in, so the game still runs offline without it.
import { SUPABASE_URL, SUPABASE_KEY } from './cloudConfig.js';

const SDK_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';
const SAVE_DELAY = 1500;  // ms: saves made close together are sent as one
const LAZY_DELAY = 60000; // ms: a lazy save (just your location, every step) waits up to this long

let client = null;
let user = null;
let pending = null;
let timer = null;
let dueAt = 0;

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

  /** The player's save from the database ({ journal, money, progress, location }), or null if they don't have one yet. */
  async load() {
    const { data, error } = await client.from('saves').select('journal, money, progress, location').eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    return data;
  },

  /**
   * Send this save soon: in SAVE_DELAY, or for a `lazy` one within LAZY_DELAY.
   * Only the latest save is sent, and a later save never puts off one that's
   * already due, so walking around doesn't hold back a new photo.
   */
  queueSave(save, lazy = false) {
    if (!user) return;
    pending = save;
    const due = Date.now() + (lazy ? LAZY_DELAY : SAVE_DELAY);
    if (timer && dueAt <= due) return;
    clearTimeout(timer);
    dueAt = due;
    timer = setTimeout(() => this.flush(), due - Date.now());
  },

  /** Send the queued save now. */
  async flush() {
    clearTimeout(timer);
    timer = null;
    if (!pending || !user) return;
    const { journal, money, progress, location } = pending;
    pending = null;
    const { error } = await client.from('saves').upsert({ user_id: user.id, journal, money, progress, location, updated_at: new Date().toISOString() });
    // It's still saved in the browser, and that gets merged in on the next sign-in.
    if (error) console.warn('Online save failed:', error.message);
  },
};
