// Keyboard and touch -> abstract actions. Game code only ever asks about
// actions ('up', 'a', ...), never raw keys, so remapping happens in one place.
// The on-screen controls (touch.js) call press() and release() like keys do.
const KEYMAP = {
  ArrowUp: 'up', KeyW: 'up',
  ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
  KeyZ: 'a', Enter: 'a', Space: 'a',
  KeyX: 'b', Escape: 'b',
  KeyM: 'map', Tab: 'map',
  KeyJ: 'journal',
  KeyI: 'bag',
};
const DIRECTIONS = ['up', 'down', 'left', 'right'];

const held = new Set();
const pressed = new Set();
const dirStack = []; // most recently pressed direction wins

// Keys typed into the sign-in form (text boxes, buttons) aren't game input.
const typing = (e) => e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement;

/** An action starts being held (a key or on-screen button went down). */
export function press(action) {
  if (held.has(action)) return;
  held.add(action);
  pressed.add(action);
  if (DIRECTIONS.includes(action)) dirStack.push(action);
}

/** An action stops being held. */
export function release(action) {
  held.delete(action);
  const i = dirStack.indexOf(action);
  if (i !== -1) dirStack.splice(i, 1);
}

window.addEventListener('keydown', (e) => {
  const action = KEYMAP[e.code];
  if (!action || typing(e)) return;
  e.preventDefault();
  if (!e.repeat) press(action);
});

window.addEventListener('keyup', (e) => {
  const action = KEYMAP[e.code];
  if (action) release(action);
});

window.addEventListener('blur', () => {
  held.clear();
  dirStack.length = 0;
});

export const input = {
  /** The direction currently held (latest press wins), or null. */
  dir: () => dirStack[dirStack.length - 1] ?? null,
  isDown: (action) => held.has(action),
  /** True only on the frame the key went down. */
  wasPressed: (action) => pressed.has(action),
  endFrame: () => pressed.clear(),
};
