// On-screen controls for phones and tablets: a D-pad, A and B, and MAP and
// JOURNAL buttons. The elements are in index.html; CSS only shows them on
// touch screens. They press and release the same actions as the keyboard.
//
// The D-pad is one touch area: the direction is whichever way your thumb is
// from its center, so you can slide from one direction to another without lifting.
import { press, release } from './input.js';

const DEAD_ZONE = 0.2; // share of the pad's radius around the center that counts as no direction

/** Wire up the on-screen controls. */
export function setUpTouchControls() {
  setUpPad(document.getElementById('dpad'));
  for (const button of document.querySelectorAll('[data-action]')) setUpButton(button);
  // Keep the page from scrolling, zooming or bringing up the long-press menu while playing.
  document.getElementById('controls').addEventListener('contextmenu', (e) => e.preventDefault());
  // iOS Safari ignores user-scalable=no in the viewport meta, so stop pinch zoom here.
  for (const type of ['gesturestart', 'gesturechange', 'gestureend']) {
    document.addEventListener(type, (e) => e.preventDefault());
  }
}

function setUpPad(pad) {
  let current = null;
  const set = (dir) => {
    if (dir === current) return;
    if (current) release(current);
    if (dir) press(dir);
    current = dir;
    pad.dataset.dir = dir ?? '';
  };

  const follow = (e) => {
    const box = pad.getBoundingClientRect();
    const dx = (e.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const dy = (e.clientY - (box.top + box.height / 2)) / (box.height / 2);
    if (Math.hypot(dx, dy) < DEAD_ZONE) return set(null);
    set(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : dy < 0 ? 'up' : 'down');
  };

  pad.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    pad.setPointerCapture(e.pointerId);
    follow(e);
  });
  pad.addEventListener('pointermove', (e) => {
    if (pad.hasPointerCapture(e.pointerId)) follow(e);
  });
  for (const type of ['pointerup', 'pointercancel']) pad.addEventListener(type, () => set(null));
}

function setUpButton(button) {
  const action = button.dataset.action;
  button.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    button.setPointerCapture(e.pointerId);
    button.classList.add('down');
    press(action);
  });
  for (const type of ['pointerup', 'pointercancel']) {
    button.addEventListener(type, () => {
      button.classList.remove('down');
      release(action);
    });
  }
}
