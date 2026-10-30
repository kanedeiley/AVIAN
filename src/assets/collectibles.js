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
  // A pair of red knit mittens with white cuffs, thumbs out.
  danielsMittens: [
    '................',
    '................',
    '...kkkk..kkkk...',
    '..kppppkkppppk..',
    '..kpPppkkppPpk..',
    '.kkppppkkppppkk.',
    'kppkpppkkpppkppk',
    'kppkpppkkpppkppk',
    'kpppppPkkPpppppk',
    '.kppppPkkPppppk.',
    '.kppppPkkPppppk.',
    '.kkkkkkkkkkkkkk.',
    '.kwwwwwkkwwwwwk.',
    '.kwqwqwkkwqwqwk.',
    '.kkkkkkkkkkkkkk.',
    '................',
  ],
  // A page torn out of a spiral notebook: a pencil sketch of a huge round owl face with yellow eyes, notes under it.
  danielsNotebook: [
    '..kkkkkkkkkkk...',
    '.kwkwkwkwkwkwk..',
    '.kwwwwwwwwwwwk..',
    '.kwwwQQQQQwwwk..',
    '.kwwQwwwwwQwwk..',
    '.kwQwfkwfkwQwk..',
    '.kwQwwwwwwwQwk..',
    '.kwQwwwkwwwQwk..',
    '.kwwQwwwwwQwwk..',
    '.kwwwQQQQQwwwk..',
    '.kwwwwwwwwwwwk..',
    '.kwqqqqqqqqwwk..',
    '.kwqqqqqwwwwk...',
    '.kwwwwwwwkkk....',
    '.kkkkkkkk.......',
    '................',
  ],
  // A dented green thermos, cup on top, a curl of steam still coming off it.
  danielsThermos: [
    '.......w.w......',
    '......w.w.......',
    '.......w........',
    '.....kkkkkk.....',
    '....kqqqqqQk....',
    '....kQQQQQQk....',
    '.....kkkkkk.....',
    '....khGhhhhk....',
    '....khGhhhhk....',
    '....khGhhhhk....',
    '....kqqqqqqk....',
    '....khGhhhhk....',
    '....khGhhhhk....',
    '....khGhhhhk....',
    '....khhhhhhk....',
    '.....kkkkkk.....',
  ],
  // Binoculars, the strap snapped off one side, with a strip of tape written on.
  danielsBinoculars: [
    '................',
    '................',
    '................',
    '..kkkk....kkkk..',
    '.kKKKKk..kKKKKk.',
    '.kCCCCkkkkCCCCk.',
    '.kCCCCkKKkCCCCk.',
    '.kCwwwwwwwwwwCk.',
    '.kCCCCkKKkCCCCk.',
    '.kCCCCkkkkCCCCk.',
    '.kCCCCk..kCCCCk.',
    '.kkkkkk..kkkkkk.',
    'nkccbk....kccbk.',
    'n.kkk......kkk..',
    'n...............',
    '.n..............',
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

// DANIEL's things, each poking up out of a little snowdrift (rows of BURIED_COLORS letters).
const DRIFT = [
  '...wwwwwwww...',
  '.wwwwwwwwwwww.',
  'wwwwwwwwwwwwww',
  '.WWWWWWWWWWWW.',
];
const BURIED_COLORS = {
  k: '#202028', p: '#e04040', P: '#a82828', w: '#f8f8f8', W: '#b8c0d8', q: '#a8a8b0',
  h: '#307830', G: '#58a840', C: '#4a4658', K: '#686478', c: '#b8e0f8',
};
// A red mitten, thumb out, with a white cuff.
const MITTEN = [
  '...kkkk.',
  '..kppppk',
  '.kkppppk',
  'kpkpppPk',
  'kppppppk',
  '.kppppPk',
  '.kwwwwwk',
  '.kkkkkkk',
];
// A notebook page caught on a twig, flat, then flapping up in the wind.
const PAGE = [
  '.kkkkkkk',
  'kwqwwwwk',
  'kwwqqwwk',
  'kwqwwqwk',
  'kwwwwwwk',
  'kwqqqwwk',
  'kwwwwwwk',
  'kkkkkkkk',
];
const PAGE_FLAP = [
  '........',
  '.....kkk',
  '..kkkwwk',
  'kkwqwwk.',
  'kwwwqwk.',
  'kwqqwwwk',
  'kwwwwwwk',
  'kkkkkkkk',
];
// The cup and neck of a green thermos.
const THERMOS = [
  '........',
  '..kkkk..',
  '.kqqqQk.',
  '.kkkkkk.',
  '.khGhhk.',
  '.khGhhk.',
  '.khGhhk.',
  '.khGhhk.',
];
// The tops of a pair of binoculars, lenses up.
const BINOCULARS = [
  '........',
  '........',
  '........',
  'kkk..kkk',
  'kcck.kcc',
  'kCCkkkCC',
  'kCCKKkCC',
  'kCCkkkCC',
];

/** Draw rows of BURIED_COLORS letters at (x, y). */
function pixels(ctx, rows, x, y) {
  rows.forEach((row, py) => [...row].forEach((ch, px) => {
    if (ch === '.') return;
    ctx.fillStyle = BURIED_COLORS[ch];
    ctx.fillRect(x + px, y + py, 1, 1);
  }));
}

/** A little four-pointed star at (x, y) that grows and shrinks as `glint` (-1 to 1) rises. */
function twinkle(ctx, x, y, glint) {
  if (glint <= 0) return;
  const arm = glint > 0.7 ? 2 : 1;
  ctx.fillStyle = `rgba(255,248,200,${glint})`;
  ctx.fillRect(x - arm, y, arm * 2 + 1, 1);
  ctx.fillRect(x, y - arm, 1, arm * 2 + 1);
}

/**
 * A tell for something half buried in the snow (x, y in screen px): `art(time)` gives the rows
 * sticking up out of a drift (and how far to shift them), and `extra` draws anything on top.
 */
function buried(art, extra = (ctx, x, y, time) => twinkle(ctx, x + 13, y + 1, Math.sin(time * 3.5))) {
  return (ctx, x, y, time) => {
    const { rows, dx = 0, dy = 0 } = art(time);
    pixels(ctx, rows, x + 4 + dx, y + 2 + dy);
    pixels(ctx, DRIFT, x + 1, y + 8);
    extra(ctx, x, y, time);
  };
}

/** A mitten in a drift that gives a little wave now and then, with a twinkle over it. */
export const drawMitten = buried((time) => {
  const t = time % 2.4;
  return t < 0.6 ? { rows: MITTEN, dx: Math.round(Math.sin(t * Math.PI * 5)), dy: -1 } : { rows: MITTEN };
});

/** A page in a drift that flaps up in the wind every couple of seconds. */
export const drawPage = buried((time) => ({ rows: time % 2 < 0.5 && Math.floor(time * 8) % 2 ? PAGE_FLAP : PAGE }));

/** A thermos in a drift, with a thin curl of steam rising off its cup. */
export const drawSteam = buried(() => ({ rows: THERMOS }), (ctx, x, y, time) => {
  for (let i = 0; i < 2; i++) {
    const t = (time * 0.5 + i / 2) % 1;
    const alpha = Math.min(1, (1 - t) * 1.4) * 0.9;
    for (let k = 0; k < 4; k++) {
      const py = Math.round(y + 2 - t * 14 - k);
      const px = Math.round(x + 8 + Math.sin(py * 0.6 + time * 2) * 1.5);
      ctx.fillStyle = `rgba(96,104,128,${alpha * 0.5})`;
      ctx.fillRect(px + 1, py + 1, 1, 1);
      ctx.fillStyle = `rgba(248,248,255,${alpha})`;
      ctx.fillRect(px, py, 1, 1);
    }
  }
});

/** Binoculars in a drift, the sun flashing off one lens and then the other. */
export const drawGlint = buried(() => ({ rows: BINOCULARS }), (ctx, x, y, time) => {
  const t = time % 2;
  twinkle(ctx, x + (t < 1 ? 6 : 10), y + 6, Math.sin((t % 1) * Math.PI) * 1.2 - 0.2);
});

/** What gives each kind of collectible away on the map: data/collectibles.js picks one with `tell`. */
export const TELLS = { stench: drawStench, music: drawMusic, feathers: drawFeathers, smoke: drawSmoke, mitten: drawMitten, page: drawPage, steam: drawSteam, glint: drawGlint };
