// The LOOK screen: pick your hair, hat, clothes and colors, with a preview of
// you walking. The intro (scenes/intro.js) uses it, and so does the journal's
// YOU page (scenes/journal.js). It isn't a scene of its own: whoever shows it
// calls update() and draw() and gets `onDone(look)` when you pick DONE.
import { VIEW_H } from '../config.js';
import { input } from '../input.js';
import { drawBox, drawText, drawTinyText } from '../gfx/ui.js';
import { LOOK_CHOICES, DEFAULT_LOOK, CLOTH_COLORS, SHOP_COLORS, HAIR_COLORS, SKIN_TONES, lookSprites } from '../assets/player.js';

const MUTED = '#9898a8';
const INK = '#283050';
const ROW_H = 15;
const TURN = ['down', 'left', 'up', 'right']; // the preview turns around while you pick

// Which part of the look each row changes, and its swatches if it's a color.
const ROWS = [
  { label: 'HAIR', key: 'hair' },
  { label: 'HAIR', key: 'hairColor', swatches: HAIR_COLORS },
  { label: 'HAT', key: 'hat' },
  { label: 'HAT', key: 'hatColor', swatches: CLOTH_COLORS, off: (look) => look.hat === 'none' },
  { label: 'TOP', key: 'top', swatches: CLOTH_COLORS },
  { label: 'LEGS', key: 'legs' },
  { label: 'LEGS', key: 'legsColor', swatches: CLOTH_COLORS },
  { label: 'SKIN', key: 'skin', swatches: SKIN_TONES },
  { label: 'DONE' },
];

export class LookEditor {
  constructor(look, name, onDone) {
    this.look = { ...DEFAULT_LOOK, ...look };
    this.name = name;
    this.onDone = onDone;
    this.row = 0;
    this.time = 0;
    this.sprites = lookSprites(this.look);
  }

  update(dt) {
    this.time += dt;
    const n = ROWS.length;
    const move = (by) => {
      do this.row = (this.row + by + n) % n;
      while (ROWS[this.row].off?.(this.look));
    };
    if (input.wasPressed('up')) move(-1);
    if (input.wasPressed('down')) move(1);
    if (input.wasPressed('b')) this.row = ROWS.length - 1; // B jumps to DONE
    const row = ROWS[this.row];
    if (input.wasPressed('a')) {
      if (!row.key) return this.onDone({ ...this.look });
      move(1);
    }
    const by = input.wasPressed('right') ? 1 : input.wasPressed('left') ? -1 : 0;
    if (by && row.key) {
      const choices = LOOK_CHOICES[row.key];
      this.look[row.key] = choices[(choices.indexOf(this.look[row.key]) + by + choices.length) % choices.length];
      this.sprites = lookSprites(this.look);
    }
  }

  draw(ctx) {
    drawBox(ctx, 4, 4, 136, VIEW_H - 8);
    ROWS.forEach((row, i) => {
      const y = 12 + i * ROW_H;
      const off = row.off?.(this.look);
      const picked = i === this.row;
      if (picked) drawText(ctx, '>', 10, y);
      drawText(ctx, row.label, 20, y, off ? MUTED : INK);
      if (!row.key) return;
      if (picked) {
        drawText(ctx, '<', 62, y);
        drawText(ctx, '>', 128, y);
      }
      const value = this.look[row.key];
      if (off) drawText(ctx, '-', 92, y, MUTED);
      else if (row.swatches) {
        ctx.fillStyle = (row.swatches[value] ?? SHOP_COLORS[value])[0]; // or something from SunBeam you're wearing
        ctx.fillRect(76, y, 40, 8);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1;
        ctx.strokeRect(75.5, y - 0.5, 41, 9);
      } else drawText(ctx, value.toUpperCase(), 72, y);
    });
    drawTinyText(ctx, 'LEFT,RIGHT CHANGE  B DONE', 10, 146);

    // The preview walks in place, turning around now and then.
    drawBox(ctx, 144, 4, 92, VIEW_H - 8);
    const frames = this.sprites[TURN[Math.floor(this.time / 1.6) % TURN.length]];
    const sprite = [frames.stand, frames.stepA, frames.stand, frames.stepB][Math.floor(this.time * 4) % 4];
    drawPerson(ctx, sprite, 190, 98, 4);
    drawText(ctx, this.name, 190 - this.name.length * 4, 112);
  }
}

/** Draw a person `scale`x with a shadow, centered on `cx` with their feet at `feetY`. */
export function drawPerson(ctx, sprite, cx, feetY, scale) {
  const w = sprite.width * scale, h = sprite.height * scale;
  ctx.fillStyle = 'rgba(40,48,80,0.18)';
  ctx.beginPath();
  ctx.ellipse(cx, feetY - scale, w * 0.35, w * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  // The feet are on the second-to-last row.
  ctx.drawImage(sprite, Math.round(cx - w / 2), Math.round(feetY - h + scale), w, h);
}
