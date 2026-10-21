// Collectibles' art (data/collectibles.js): one 16x16 picture each, drawn 3x
// in the journal, plus a silhouette for its not-yet-found entries. On the map
// a collectible is hidden, so only its tell (TELLS below) shows where it is.
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
  // A two-deck DJ controller: blue jog wheels, knobs between them, crossfader along the front.
  wyattsSoundboard: [
    '................',
    '................',
    '................',
    '................',
    '.kkkkkkkkkkkkkk.',
    'kqqqqqqqqqqqqqqk',
    'kqQkkkQpfQkkkQqk',
    'kqkuuukQQkuuukqk',
    'kqkucukivkucukqk',
    'kqkuuukQQkuuukqk',
    'kqQkkkQQQQkkkQqk',
    'kqqqkkkwkkkkqqqk',
    'kQQQQQQQQQQQQQQk',
    '.kkkkkkkkkkkkkk.',
    '................',
    '................',
  ],
  // An open sketchbook: a red cardinal drawn on the left page, notes on the right.
  hannahsJournal: [
    '................',
    '................',
    '................',
    '.kkkkkk..kkkkkk.',
    'kwwwwwwkkwwwwwwk',
    'kwwwppwkkwqqqqwk',
    'kwpppkfkkwwwwwwk',
    'kppppPwkkwqqqwwk',
    'kwpPpwwkkwwwwwwk',
    'kwwkwkwkkwqqqqwk',
    'kwwwwwwkkwwwwwwk',
    'knnnnnnkknnnnnnk',
    '.kkkkkkkkkkkkkk.',
    '................',
    '................',
    '................',
  ],
  // A cheeseburger: sesame bun, lettuce, melty cheese dripping over the patty.
  davidsCheeseburger: [
    '................',
    '................',
    '....kkkkkkkk....',
    '...kaaawaaaak...',
    '..kawaaaaawaak..',
    '..kaaaaawaaaak..',
    '..kAAAAAAAAAAk..',
    '.kgGgGgGgGgGgGk.',
    '.kffffffffffffk.',
    '..kfNffNNNfNNk..',
    '.knnnnnnnnnnnnk.',
    '.kNNNNNNNNNNNNk.',
    '..kAAAAAAAAAAk..',
    '...kaaaaaaaak...',
    '....kkkkkkkk....',
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

const NOTE = [
  '..##.',
  '..#.#',
  '..#..',
  '.##..',
  '###..',
  '.#...',
];
const FEATHER = [
  '...#',
  '..##',
  '.##.',
  '.#..',
  '#...',
];
const EDGE = '32,32,40'; // a dark shadow down and right, so they show up over pale cabinets and floors

/** A tell of three little pictures (rows of '#') drifting up off a tile, swaying and fading, a third of a cycle apart. */
function drifting(shape, colors) {
  return (ctx, x, y, time) => {
    for (let i = 0; i < 3; i++) {
      const t = (time * 0.5 + i / 3) % 1;
      const top = Math.round(y + 2 - t * 22);
      const left = Math.round(x + 1 + i * 4 + Math.sin(t * Math.PI * 2 + i * 2) * 2);
      const alpha = Math.min(1, (1 - t) * 1.6);
      for (const [color, off] of [[`rgba(${EDGE},${alpha * 0.7})`, 1], [`rgba(${colors[i]},${alpha})`, 0]]) {
        ctx.fillStyle = color;
        shape.forEach((row, sy) => [...row].forEach((ch, sx) => {
          if (ch === '#') ctx.fillRect(left + sx + off, top + sy + off, 1, 1);
        }));
      }
    }
  };
}

/** Music notes in pink, yellow and pale blue. */
export const drawMusic = drifting(NOTE, ['248,144,184', '248,224,80', '184,224,248']);
/** Feathers: a cardinal's red, a jay's blue, a goldfinch's yellow. */
export const drawFeathers = drifting(FEATHER, ['224,64,64', '72,144,232', '248,224,80']);

const SMOKE = '200,200,208';     // light grey
const SMOKE_EDGE = '96,96,112'; // darker down its right side, so it shows up over pale grass

/** Three puffs of smoke rising off a tile (x, y in screen px), growing, drifting east with the wind and fading. */
export function drawSmoke(ctx, x, y, time) {
  for (let i = 0; i < 3; i++) {
    const t = (time * 0.45 + i / 3) % 1;
    const r = 2 + t * 4;
    const cx = Math.round(x + 7 + t * 6 + Math.sin(t * 6 + i * 2) * 1.5);
    const cy = Math.round(y + 2 - t * 22);
    const alpha = Math.min(1, (1 - t) * 1.6);
    for (const [color, off] of [[`rgba(${SMOKE_EDGE},${alpha * 0.6})`, 1], [`rgba(${SMOKE},${alpha})`, 0]]) {
      ctx.fillStyle = color;
      for (let dy = -Math.floor(r); dy <= r; dy++) {
        const w = Math.floor(Math.sqrt(r * r - dy * dy));
        ctx.fillRect(cx - w + off, cy + dy + off, w * 2 + 1, 1);
      }
    }
  }
}

/** What gives each kind of collectible away on the map: data/collectibles.js picks one with `tell`. */
export const TELLS = { stench: drawStench, music: drawMusic, feathers: drawFeathers, smoke: drawSmoke };
