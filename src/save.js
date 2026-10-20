// Saving progress in the browser (localStorage). Storage can be unavailable
// (private windows, blocked site data), so every access is wrapped and the
// game just starts fresh, or stops saving, if it fails.
//
// Every save also calls the `onSave` hook, which main.js uses to send the
// save to the database when you're signed in (see cloud.js). Your location is
// saved on every step, so it's a `lazy` save: it can wait a while to go online.
const JOURNAL_KEY = 'avian.journal';
const MONEY_KEY = 'avian.money';
const PROGRESS_KEY = 'avian.progress';
const LOCATION_KEY = 'avian.location';

let onSave = () => {};

/** Call `fn(lazy)` after every save, e.g. to save online too. */
export function whenSaved(fn) {
  onSave = fn;
}

/** Forget this browser's save (after signing out, so the next player starts fresh). */
export function clearSave() {
  try {
    localStorage.removeItem(JOURNAL_KEY);
    localStorage.removeItem(MONEY_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(LOCATION_KEY);
  } catch {
    // Nothing saved to clear.
  }
}

/** The saved journal (bird id -> best photo stars), or an empty one. */
export function loadJournal() {
  try {
    const saved = JSON.parse(localStorage.getItem(JOURNAL_KEY));
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

export function saveJournal(journal) {
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
  } catch {
    // Not saved; the journal still works until the page is closed.
  }
  onSave();
}

/** The saved money in dollars, or 0. */
export function loadMoney() {
  try {
    const saved = Number(localStorage.getItem(MONEY_KEY));
    return Number.isFinite(saved) && saved > 0 ? Math.floor(saved) : 0;
  } catch {
    return 0;
  }
}

export function saveMoney(money) {
  try {
    localStorage.setItem(MONEY_KEY, String(money));
  } catch {
    // Not saved; the money still counts until the page is closed.
  }
  onSave();
}

/**
 * The saved story progress, or a fresh one:
 *   flags    story beats you've reached, e.g. { metHannah: true } (see data/flags.js)
 *   nemeses  nemesis birds you've beaten -> stars of the winning photo (see data/nemeses.js)
 */
export function loadProgress() {
  const fresh = { flags: {}, nemeses: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    return saved && typeof saved === 'object' ? { ...fresh, ...saved } : fresh;
  } catch {
    return fresh;
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Not saved; the progress still counts until the page is closed.
  }
  onSave();
}

/** Where you last stood ({ map, x, y, facing, at }, `at` in ms since 1970), or null. */
export function loadLocation() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCATION_KEY));
    return saved && typeof saved.map === 'string' && Number.isInteger(saved.x) && Number.isInteger(saved.y) ? saved : null;
  } catch {
    return null;
  }
}

export function saveLocation(location) {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  } catch {
    // Not saved; you'll start back in the village next time.
  }
  onSave(true);
}
