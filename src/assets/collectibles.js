// Collectibles' art (data/collectibles.js): one 16x16 picture each, drawn 3x
// in the journal, plus a silhouette for its not-yet-found entries. On the map
// a collectible is hidden, so only drawStench() shows where it is.
import { PALETTE } from './palette.js';
import { makeSprite } from '../gfx/sprite.js';

const ART = {
  // Rolled paper, lit at the left end (ash and ember), twisted shut at the right.
  jacobsDoobie: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '..kkkkkkkkkk....',
    '.kqfwwwwwwwwkk..',
    '.kpfwwwwwwwwwwkk',
    '.kqfYYYYYYYYkk..',
    '..kkkkkkkkkk....',
    '................',
  ],
};

export const COLLECTIBLE_SPRITES = Object.fromEntries(Object.entries(ART).map(([id, art]) => [id, {
  sprite: makeSprite(art, PALETTE, id),
  silhouette: makeSprite(art.map((r) => r.replace(/[^.]/g, 'Q')), PALETTE, `${id} silhouette`),
}]));

const STENCH = '232,240,150'; // pale sickly yellow-green
const STENCH_EDGE = '70,90,30';  // dark olive down its right side, so it shows up over grass and bamboo

/** Three wavy stink lines rising off a tile (x, y in screen px) and fading, a third of a cycle apart. */
export function drawStench(ctx, x, y, time) {
  for (let i = 0; i < 3; i++) {
    const t = (time * 0.6 + i / 3) % 1;
    const top = y + 4 - t * 24;
    const alpha = Math.min(1, (1 - t) * 1.6);
    for (let k = 0; k < 9; k++) {
      const py = Math.round(top + k);
      const px = Math.round(x + 2 + i * 5 + Math.sin((py + i * 4) * 0.5) * 2);
      ctx.fillStyle = `rgba(${STENCH_EDGE},${alpha * 0.7})`;
      ctx.fillRect(px + 2, py, 1, 1);
      ctx.fillStyle = `rgba(${STENCH},${alpha})`;
      ctx.fillRect(px, py, 2, 1);
    }
  }
}
