// The sign-in screen: an HTML form over the game (typing an email on a
// 240x160 canvas would be no fun), plus the account bar under the game.
// The elements live in index.html.
import { cloud } from './cloud.js';

const $ = (id) => document.getElementById(id);

/**
 * Show the form until the player signs in, makes an account, or picks
 * "play offline". Resolves to the signed-in player, or null for offline.
 */
export function askToSignIn() {
  const panel = $('signin');
  const form = $('signin-form');
  const error = $('signin-error');
  const buttons = form.querySelectorAll('button');
  panel.hidden = false;
  error.textContent = '';
  $('signin-email').focus();

  return new Promise((resolve) => {
    const done = (player) => {
      panel.hidden = true;
      form.onsubmit = null;
      $('signin-offline').onclick = null;
      resolve(player);
    };

    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = $('signin-email').value.trim();
      const password = $('signin-password').value;
      const creating = e.submitter?.value === 'create';
      error.textContent = creating ? 'Creating your account...' : 'Signing in...';
      buttons.forEach((b) => (b.disabled = true));
      try {
        done(await (creating ? cloud.signUp(email, password) : cloud.signIn(email, password)));
      } catch (err) {
        // A failed request has no useful message of its own ("Failed to fetch").
        error.textContent = err instanceof TypeError ? "Couldn't reach the server. Check your connection, or play offline." : err.message;
      } finally {
        buttons.forEach((b) => (b.disabled = false));
      }
    };
    $('signin-offline').onclick = () => done(null);
  });
}

/** The line under the game: who's signed in, with a button to sign in or out. */
export function showAccount({ onSignIn, onSignOut }) {
  const bar = $('account');
  const label = $('account-label');
  const button = $('account-button');
  bar.hidden = false;
  if (cloud.user) {
    label.textContent = `Saving online as ${cloud.user.email}`;
    button.textContent = 'Sign out';
    button.onclick = onSignOut;
  } else {
    label.textContent = 'Playing offline: saved in this browser only';
    button.textContent = 'Sign in';
    button.onclick = onSignIn;
  }
}
