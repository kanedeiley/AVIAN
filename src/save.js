// Saving progress in the browser (localStorage). Storage can be unavailable
// (private windows, blocked site data), so every access is wrapped and the
// game just starts fresh, or stops saving, if it fails.
const JOURNAL_KEY = 'avian.journal';

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
}
