// Saving progress in the browser (localStorage). Storage can be unavailable
// (private windows, blocked site data), so every access is wrapped and the
// game just starts fresh, or stops saving, if it fails.
//
// Every save also calls the `onSave` hook, which main.js uses to send the
// save to the database when you're signed in (see cloud.js).
const JOURNAL_KEY = 'avian.journal';
const MONEY_KEY = 'avian.money';

let onSave = () => {};

/** Call `fn` after every save, e.g. to save online too. */
export function whenSaved(fn) {
  onSave = fn;
}

/** Forget this browser's save (after signing out, so the next player starts fresh). */
export function clearSave() {
  try {
    localStorage.removeItem(JOURNAL_KEY);
    localStorage.removeItem(MONEY_KEY);
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
