// Boot + game loop + scene switching.
//
// A "scene" is any object with update(dt) and draw(ctx). The game runs
// exactly one at a time: the Overworld, or a PhotoScene, WorldMapScene or
// JournalScene that hands control back to it when it's done.
import { VIEW_W, VIEW_H, FADE_TIME } from './config.js';
import { input } from './input.js';
import { Overworld } from './scenes/overworld.js';
import { loadJournal } from './save.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const game = {
  scene: null,
  fade: 0,       // 0 = clear, 1 = fully black
  fadeDir: 0,    // 1 fading out, -1 fading in, 0 idle
  onBlack: null,
  journal: loadJournal(), // bird id -> best photo (1-3 stars); saved in the browser

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

// Dev shortcut: index.html?map=house&x=4&y=6 starts you anywhere.
const params = new URLSearchParams(location.search);
const start = {
  map: params.get('map') ?? 'village',
  x: Number(params.get('x') ?? 5),
  y: Number(params.get('y') ?? 5),
};
game.setScene(new Overworld(game, start.map, start.x, start.y, 'down'));

// Scale the 240x160 canvas by the biggest whole number that fits the window.
function resize() {
  const scale = Math.max(1, Math.floor(Math.min(innerWidth / VIEW_W, innerHeight / VIEW_H)));
  canvas.style.width = `${VIEW_W * scale}px`;
  canvas.style.height = `${VIEW_H * scale}px`;
}
addEventListener('resize', resize);
resize();

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
