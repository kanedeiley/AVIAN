// Boot + game loop + scene switching.
//
// A "scene" is any object with update(dt) and draw(ctx). The game runs
// exactly one at a time: the Overworld, or a PhotoScene, VoyageScene,
// WorldMapScene or JournalScene that hands control back to it when it's done.
import { VIEW_W, VIEW_H, FADE_TIME } from './config.js';
import { input } from './input.js';
import { Overworld } from './scenes/overworld.js';
import { loadJournal, loadMoney, loadProgress, loadLocation, saveJournal, saveMoney, saveProgress, saveLocation, whenSaved, clearSave } from './save.js';
import { canStand } from './maps/index.js';
import { cloud } from './cloud.js';
import { askToSignIn, showAccount } from './signIn.js';
import { setUpTouchControls } from './touch.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Scale the 240x160 canvas to fill the space the page leaves for it (#screen,
// which shrinks for the account bar and, on touch screens, the controls). The
// scale is a whole number of *device* pixels per game pixel so the pixels stay
// crisp on phones too, where a CSS pixel is 2-3 device pixels.
const screenBox = document.getElementById('screen');
function resize() {
  const dpr = devicePixelRatio || 1;
  const fit = Math.min(screenBox.clientWidth / VIEW_W, screenBox.clientHeight / VIEW_H);
  const scale = Math.max(1, Math.floor(fit * dpr)) / dpr;
  canvas.style.width = `${VIEW_W * scale}px`;
  canvas.style.height = `${VIEW_H * scale}px`;
}
new ResizeObserver(resize).observe(screenBox);
setUpTouchControls();

const game = {
  scene: null,
  fade: 0,       // 0 = clear, 1 = fully black
  fadeDir: 0,    // 1 fading out, -1 fading in, 0 idle
  onBlack: null,
  journal: loadJournal(), // bird id -> best photo (1-3 stars); saved in the browser
  money: loadMoney(),     // dollars, for boat fares; there's no way to earn any yet
  progress: loadProgress(), // story flags, beaten nemesis birds and found collectibles (see progress.js)
  location: loadLocation(), // where you last stood, to carry on from there; the Overworld keeps it up to date

  setScene(scene) {
    this.scene = scene;
  },

  /** Fade to black, run `fn` (swap map/scene) while hidden, fade back in. */
  transition(fn) {
    if (this.fadeDir !== 0) return;
    this.fadeDir = 1;
    this.onBlack = fn;
  },
};

// Online saves (cloud.js). If Supabase is set up, sign in before the game
// starts so your online journal is loaded first. Without it, or if it can't
// be reached, the game just saves in this browser.
if (cloud.enabled) {
  whenSaved((lazy) => cloud.queueSave({ journal: game.journal, money: game.money, progress: game.progress, location: game.location }, lazy));
  // Send anything still waiting (like a lazy location save) when the tab is hidden or closed.
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && cloud.flush());
  try {
    if (!(await cloud.connect())) await askToSignIn();
    if (cloud.user) await mergeOnlineSave();
  } catch (err) {
    console.warn('Playing offline, online saves are unavailable:', err.message);
  }
  updateAccount();
}

/**
 * Combine this browser's save with the online one: keep the best photo of
 * each bird from either, every story flag and beaten nemesis from either,
 * every collectible found in either, the online money, and whichever location is newer. Then save the result to both,
 * so progress made offline (or before signing in) isn't lost.
 */
async function mergeOnlineSave() {
  const online = await cloud.load();
  if (online) {
    for (const [id, stars] of Object.entries(online.journal)) {
      game.journal[id] = Math.max(game.journal[id] ?? 0, stars);
    }
    game.money = online.money;
    const { flags = {}, nemeses = {}, collectibles = {} } = online.progress ?? {};
    Object.assign(game.progress.flags, flags);
    Object.assign(game.progress.collectibles, collectibles);
    for (const [id, stars] of Object.entries(nemeses)) {
      game.progress.nemeses[id] = Math.max(game.progress.nemeses[id] ?? 0, stars);
    }
    if (online.location && !(game.location?.at >= online.location.at)) game.location = online.location;
  }
  if (game.location) saveLocation(game.location);
  saveMoney(game.money);
  saveProgress(game.progress);
  saveJournal(game.journal);
}

function updateAccount() {
  if (!cloud.user && !cloud.ready) return; // couldn't reach Supabase: no account bar
  showAccount({
    onSignIn: async () => {
      if (await askToSignIn()) await mergeOnlineSave();
      updateAccount();
    },
    onSignOut: async () => {
      await cloud.signOut();
      clearSave(); // the next player on this browser starts fresh
      location.reload();
    },
  });
}

// Carry on where you last stood, if that's still a place you can stand (maps change).
// Dev shortcut: index.html?map=house&x=4&y=6 starts you anywhere.
const params = new URLSearchParams(location.search);
const saved = game.location && canStand(game.location.map, game.location.x, game.location.y) ? game.location : null;
const start = params.has('map')
  ? { map: params.get('map'), x: Number(params.get('x') ?? 5), y: Number(params.get('y') ?? 5) }
  : saved ?? { map: 'village', x: 5, y: 5 };
game.setScene(new Overworld(game, start.map, start.x, start.y, start.facing ?? 'down'));


let last = performance.now();
function frame(now) {
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
  last = now;

  if (game.fadeDir === 0) game.scene.update(dt);

  if (game.fadeDir === 1) {
    game.fade = Math.min(1, game.fade + dt / FADE_TIME);
    if (game.fade === 1) {
      game.onBlack();
      game.fadeDir = -1;
    }
  } else if (game.fadeDir === -1) {
    game.fade = Math.max(0, game.fade - dt / FADE_TIME);
    if (game.fade === 0) game.fadeDir = 0;
  }

  game.scene.draw(ctx);
  if (game.fade > 0) {
    ctx.fillStyle = `rgba(0,0,0,${game.fade})`;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  }

  input.endFrame();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
