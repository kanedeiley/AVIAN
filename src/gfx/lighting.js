// Time-of-day lighting and weather, drawn over a finished scene (before its
// UI) so the pixel art keeps its own palette underneath. See time.js for the clock.
//
//   sky     multiplied over a backdrop's sky (tintSky)
//   tint    multiplied over the whole scene, `alpha` strong
//   shade   a dark rect laid over that, for night
import { VIEW_W, VIEW_H } from '../config.js';
import { drawBox } from './ui.js';

const LIGHTING = {
  dawn:      { sky: '#ffd6b0', tint: '#ffc890', alpha: 0.3 },
  morning:   { sky: '#b8d8f0', tint: '#fff0d8', alpha: 0.2 },
  midday:    { sky: '#ffffff' },
  afternoon: { sky: '#f5e6c8', tint: '#f8dca0', alpha: 0.3 },
  dusk:      { sky: '#ff8a60', tint: '#f09860', alpha: 0.5 },
  night:     { sky: '#0a1a3a', tint: '#6878c0', alpha: 1, shade: 'rgba(5,10,35,0.18)' },
};
// Indoors the light is always the same; only the windows show the time.
const PANE_ALPHA = 0.7;
const RAIN_DROPS = 48;
const FOG_HAZE = 'rgba(232,236,240,0.1)'; // the thin, even haze under the patches
const FOG_LAYERS = [                      // dithered patches drifting at different speeds, for depth
  { alpha: 0.2, speed: 5, flip: false },
  { alpha: 0.12, speed: 11, flip: true },
];
const FOG_DIM = { dusk: 0.7, night: 0.35 }; // fog catches less light when it's dark
const GLOW_STRENGTH = 0.5; // how much the light map brightens the scene, however many lights overlap
const ICON_SUN = '#f8c830';
const ICON_GOLD = '#f08840';
const ICON_MOON = '#e8e8d0';
const INK = '#283050';

/**
 * Light the scene for `phase`, then add the weather. `lights` ({ x, y, r,
 * flicker } in screen px, from tiles with `glow`) shine through the dark at
 * night. `camX`/`camY` (the camera, in px) make fog drift with the world, not the screen.
 */
export function drawLighting(ctx, phase, { weather = 'clear', time = 0, lights = [], h = VIEW_H, camX = 0, camY = 0 } = {}) {
  const { tint, alpha, shade } = LIGHTING[phase];
  ctx.save();
  if (tint) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = alpha;
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, VIEW_W, h);
    ctx.globalAlpha = 1;
  }
  ctx.globalCompositeOperation = 'source-over';
  if (shade) {
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, VIEW_W, h);
  }
  if (phase === 'night') drawGlows(ctx, lights, time);
  drawWeather(ctx, weather, time, h, camX, camY, FOG_DIM[phase] ?? 1);
  ctx.restore();
}

/** Tint a backdrop's sky (x, y, w, h) for the phase. */
export function tintSky(ctx, phase, x, y, w, h) {
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = LIGHTING[phase].sky;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

/** Indoors: tint just the window tiles (screen-px rects) with the sky outside. */
export function tintPanes(ctx, phase, panes) {
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = PANE_ALPHA;
  ctx.fillStyle = LIGHTING[phase].sky;
  for (const { x, y, w, h } of panes) ctx.fillRect(x, y, w, h);
  ctx.restore();
}

let lightMap = null; // reused offscreen canvas for drawGlows

/**
 * Warm light spilling from windows, lamps and fires at night. The lights are
 * gathered on a light map first and added to the scene once, so a row of
 * windows glows together instead of piling up into a white blob.
 */
function drawGlows(ctx, lights, time) {
  lightMap ??= Object.assign(document.createElement('canvas'), { width: VIEW_W, height: VIEW_H });
  const l = lightMap.getContext('2d');
  l.clearRect(0, 0, VIEW_W, VIEW_H);
  l.globalCompositeOperation = 'lighten';
  for (const { x, y, r: base, flicker, seed = 0 } of lights) {
    // Each light is a little brighter or dimmer than the next, so a street doesn't look stamped.
    let r = base * 1.5 + Math.sin(time * 2 + seed * 7) * 0.5;
    let a = 0.6 + 0.3 * seed;
    if (flicker) {
      const f = Math.sin(time * 11) * 0.5 + Math.sin(time * 27 + 1) * 0.3;
      r += f * 2;
      a = 1;
    }
    if (x + r < 0 || y + r < 0 || x - r > VIEW_W || y - r > VIEW_H) continue;
    const g = l.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,190,110,${a})`);
    g.addColorStop(0.5, `rgba(255,170,90,${a * 0.4})`);
    g.addColorStop(1, 'rgba(255,170,90,0)');
    l.fillStyle = g;
    l.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = GLOW_STRENGTH;
  ctx.drawImage(lightMap, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

function drawWeather(ctx, weather, time, h, camX, camY, fogDim) {
  if (weather === 'overcast' || weather === 'rain') {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = weather === 'rain' ? '#a8b0c0' : '#c8c8d0';
    ctx.fillRect(0, 0, VIEW_W, h);
    ctx.globalCompositeOperation = 'source-over';
  }
  if (weather === 'rain') {
    ctx.fillStyle = 'rgba(210,220,248,0.6)';
    for (let i = 0; i < RAIN_DROPS; i++) {
      // Each drop falls on its own track, slanting a little to the left.
      const y = (i * 97 + time * 200) % (h + 8) - 8;
      const x = (i * 53 + 400 - time * 40) % (VIEW_W + 8);
      ctx.fillRect(Math.round(x), Math.round(y), 1, 4);
      ctx.fillRect(Math.round(x) - 1, Math.round(y) + 4, 1, 2);
    }
  }
  if (weather === 'fog') {
    ctx.globalAlpha = fogDim;
    ctx.fillStyle = FOG_HAZE;
    ctx.fillRect(0, 0, VIEW_W, h);
    fogTexture ??= makeFog();
    for (const { alpha, speed, flip } of FOG_LAYERS) {
      ctx.globalAlpha = alpha * fogDim;
      // Tile the texture so it can scroll forever; the second layer is offset and drifts faster.
      const ox = mod(camX - time * speed + (flip ? FOG_W / 2 : 0), FOG_W);
      const oy = mod(camY + (flip ? FOG_H / 2 : 0), FOG_H);
      for (let x = -ox; x < VIEW_W; x += FOG_W) {
        for (let y = -oy; y < h; y += FOG_H) ctx.drawImage(fogTexture, Math.round(x), Math.round(y));
      }
    }
    ctx.globalAlpha = 1;
  }
}

const FOG_W = VIEW_W;
const FOG_H = VIEW_H;
const FOG_OCTAVES = [[40, 0.55], [20, 0.3], [10, 0.15]]; // [cell size in px, weight]
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
let fogTexture = null;

const mod = (a, n) => ((a % n) + n) % n;

/**
 * A screen-sized patch of fog that tiles seamlessly: soft value noise, then
 * dithered to single pixels, so it reads as grainy pixel-art mist rather than a smear.
 */
function makeFog() {
  const canvas = Object.assign(document.createElement('canvas'), { width: FOG_W, height: FOG_H });
  const c = canvas.getContext('2d');
  const image = c.createImageData(FOG_W, FOG_H);
  // A fixed random value at each lattice point, wrapping around so the edges match up.
  const lattice = FOG_OCTAVES.map(([cell]) => {
    const cols = FOG_W / cell, rows = FOG_H / cell;
    const values = Array.from({ length: cols * rows }, (_, i) => hash(i + cell * 1000));
    return (cx, cy) => values[mod(cy, rows) * cols + mod(cx, cols)];
  });
  const smooth = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < FOG_H; y++) {
    for (let x = 0; x < FOG_W; x++) {
      let n = 0;
      FOG_OCTAVES.forEach(([cell, weight], o) => {
        const fx = x / cell, fy = y / cell;
        const cx = Math.floor(fx), cy = Math.floor(fy);
        const tx = smooth(fx - cx), ty = smooth(fy - cy);
        const at = lattice[o];
        const top = at(cx, cy) + (at(cx + 1, cy) - at(cx, cy)) * tx;
        const bottom = at(cx, cy + 1) + (at(cx + 1, cy + 1) - at(cx, cy + 1)) * tx;
        n += (top + (bottom - top) * ty) * weight;
      });
      // Only the thicker parts of the noise become fog, thinning out at their edges.
      const density = Math.min(1, Math.max(0, (n - 0.42) / 0.3));
      if (density * 16 > BAYER[y % 4][x % 4]) {
        const i = (y * FOG_W + x) * 4;
        image.data.set([240, 243, 246, 255], i);
      }
    }
  }
  c.putImageData(image, 0, 0);
  return canvas;
}

function hash(n) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** The little clock in the top-right corner: a sun, a low golden sun at dawn and dusk, or a moon. */
export function drawClock(ctx, phase) {
  const x = VIEW_W - 24;
  drawBox(ctx, x, 4, 20, 20);
  drawIcon(ctx, phase, x + 5, 8);
}

function drawIcon(ctx, phase, x, y) {
  if (phase === 'night') {
    // A crescent: a full moon with a bite out of it.
    ctx.fillStyle = ICON_MOON;
    ctx.fillRect(x + 2, y + 1, 5, 10);
    ctx.fillRect(x + 1, y + 2, 7, 8);
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(x + 4, y + 1, 5, 8);
    return;
  }
  const low = phase === 'dawn' || phase === 'dusk';
  ctx.fillStyle = low ? ICON_GOLD : ICON_SUN;
  const top = low ? y + 4 : y + 2;
  ctx.fillRect(x + 2, top, 6, 6);
  ctx.fillRect(x + 3, top - 1, 4, 8);
  ctx.fillRect(x + 1, top + 1, 8, 4);
  if (low) {
    // Half set behind the horizon.
    ctx.fillStyle = INK;
    ctx.fillRect(x, y + 8, 10, 1);
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(x, y + 9, 10, 3);
  }
}
