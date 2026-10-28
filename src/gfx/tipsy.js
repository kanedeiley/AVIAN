// After a beer (data/items.js `tipsy`): the finished scene sways in slow waves
// and glows with a color that drifts around the rainbow. `amount` (0-1) fades
// it in and out. Drawn over the scene, before its UI.
import { VIEW_W, VIEW_H } from '../config.js';

const STRIP = 2;      // px tall: each strip of the screen sways on its own
const SWAY = 3;       // px each strip sways side to side, fully tipsy
const HUE_ALPHA = 0.4;
let buffer = null;

export function drawTipsy(ctx, amount, time) {
  buffer ??= Object.assign(document.createElement('canvas'), { width: VIEW_W, height: VIEW_H });
  const b = buffer.getContext('2d');
  b.clearRect(0, 0, VIEW_W, VIEW_H);
  b.drawImage(ctx.canvas, 0, 0);

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // The whole view rocks gently, and each strip waves on top of that.
  const rock = Math.sin(time * 0.9) * SWAY * amount;
  for (let y = 0; y < VIEW_H; y += STRIP) {
    const dx = Math.round(rock + Math.sin(y / 14 + time * 2.2) * SWAY * amount);
    ctx.drawImage(buffer, 0, y, VIEW_W, STRIP, dx, y, VIEW_W, STRIP);
  }

  // A colorful glow, drifting around the color wheel.
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = HUE_ALPHA * amount;
  ctx.fillStyle = `hsl(${(time * 40) % 360}, 90%, 55%)`;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  ctx.globalAlpha = 0.18 * amount;
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = `hsl(${(time * 40 + 180) % 360}, 90%, 60%)`;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  ctx.restore();
}
