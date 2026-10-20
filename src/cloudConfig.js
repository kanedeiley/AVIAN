// The Supabase project the game saves to. Don't fill this in: put your keys in
// .env (see .env.example). serve.py serves this file made from .env instead, and
// the deploy writes it from GitHub repository variables (scripts/cloud_config.py).
// As committed, both are empty, so the game runs offline, saving only in the browser.
export const SUPABASE_URL = '';
export const SUPABASE_KEY = '';
// For testing: how many times faster than real time the time of day runs (see time.js).
export const TIME_SPEED = 1;
