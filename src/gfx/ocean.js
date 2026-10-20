// The open sea, drawn straight onto the canvas: sky, a distant island, and
// bands of water with glints that drift sideways. Used by the voyage scene
// and as the photo minigame's ocean background.
import { VIEW_W } from '../config.js';

const SKY = '#b8e0f8';
const HAZE = '#d8f0f8';
const ISLAND = '#88b0c0';
const ISLAND_SHADE = '#6890a8';
const SEA = ['#78b0f0', '#4890e8', '#3070c0']; // far to near
const GLINT = '#d8f0f8';

/** A fixed pseudo-random number in [0, 1) for each n, so glints don't jump around. */
const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * Sky down to `horizon`, sea from there to `bottom`. `drift` is how far the
 * boat has moved in px: the water slides by faster up close, which reads as motion.
 */
export function drawOcean(ctx, time, horizon, bottom, drift = 0) {
  ctx.fillStyle = SKY;
  ctx.fillRect(0, 0, VIEW_W, horizon);
  ctx.fillStyle = HAZE;
  ctx.fillRect(0, horizon - 6, VIEW_W, 6);

  // A far-off island, sliding by very slowly while the boat moves.
  const ix = Math.round(150 - drift * 0.05) % (VIEW_W + 80);
  const islandX = ix < -60 ? ix + VIEW_W + 80 : ix;
  ctx.fillStyle = ISLAND;
  ctx.fillRect(islandX, horizon - 5, 44, 5);
  ctx.fillRect(islandX + 6, horizon - 8, 26, 3);
  ctx.fillRect(islandX + 12, horizon - 10, 10, 2);
  ctx.fillStyle = ISLAND_SHADE;
  ctx.fillRect(islandX, horizon - 2, 44, 2);

  drawWater(ctx, time, horizon, bottom, drift);
}

/** Just the water between `top` and `bottom`, e.g. in front of a floating bird. */
export function drawWater(ctx, time, top, bottom, drift = 0) {
  const h = bottom - top;
  for (let i = 0; i < SEA.length; i++) {
    const y0 = top + Math.round((h * i) / SEA.length);
    const y1 = top + Math.round((h * (i + 1)) / SEA.length);
    ctx.fillStyle = SEA[i];
    ctx.fillRect(0, y0, VIEW_W, y1 - y0);
  }

  // Glints: short light dashes, longer and faster the closer they are.
  ctx.fillStyle = GLINT;
  for (let y = top + 2, row = 0; y < bottom - 1; y += 5, row++) {
    const near = (y - top) / h;
    const len = 2 + Math.round(near * 6);
    const speed = 4 + near * 10;
    for (let k = 0; k < 4; k++) {
      const seed = row * 7 + k;
      const span = VIEW_W + 40;
      const x = ((hash(seed) * span + time * speed * (hash(seed + 99) > 0.5 ? 1 : -1) + drift * (0.2 + near)) % span + span) % span - 20;
      // Each glint blinks on and off on its own timer.
      if ((time * 0.8 + hash(seed + 7)) % 1 < 0.75) ctx.fillRect(Math.round(x), y, len, 1);
    }
  }
}
