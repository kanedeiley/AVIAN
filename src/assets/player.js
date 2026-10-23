// People: the player and NPCs like Hannah share these drawings, 16x20 pixels:
// a tile wide and a bit taller, so heads stick up over the tile above (like the
// GBA games). A person is built from parts, layered top to bottom:
//   hair  'short' or 'long': the head and torso (rows 0-14)
//   hat   'cap', 'beanie', 'sunhat' or 'none', painted over the top of the hair
//   legs  'pants', 'shorts' or 'skirt': hands, hem, legs and shoes (rows 15-19)
// Each direction has a standing frame and two step frames that alternate (left
// foot, right foot); a step swaps in other legs from row 17. Right is just mirrored left.
//
// In the art: 1 hat, 2 hat shade, 3 top, 4 top shade, 5 trousers or skirt,
// 8 their shade, 6 hair, 7 hair shade; personSprites() fills those in. k is
// the outline, eyes and shoes, s/S skin, i cheeks, w a hat's shine.

import { PALETTE } from './palette.js';
import { makeSprite, mirror, recolor, stamp } from '../gfx/sprite.js';

const STEP_ROW = 17;  // a step swaps the legs from here down

// ---------- hair: the head and torso, with no hat ----------

const HAIR = {
  // Short hair, a T-shirt.
  short: {
    down: [
      '.....kkkkkk.....',
      '...kk666666kk...',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k7666666667k..',
      '..k6sss66sss6k..',
      '..k6skssssks6k..',
      '..k6skssssks6k..',
      '..kSissssssiSk..',
      '...kSssssssSk...',
      '....kk3SS3kk....',
      '...k33333333k...',
      '..k4333333334k..',
      '..k4333333334k..',
    ],
    up: [
      '.....kkkkkk.....',
      '...kk666666kk...',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k7666666667k..',
      '..k7766666677k..',
      '...k77666677k...',
      '....kk3SS3kk....',
      '...k33333333k...',
      '..k4333333334k..',
      '..k4333333334k..',
    ],
    left: [
      '.....kkkkkk.....',
      '....k666666kk...',
      '...k666666666k..',
      '...k666666666k..',
      '...k666666666k..',
      '...k666666667k..',
      '...kss6666667k..',
      '...kskssS6667k..',
      '...kskssS6667k..',
      '..ksssssssS67k..',
      '...kSsssSS67k...',
      '.....k3SS3k.....',
      '....k333333k....',
      '....k334333k....',
      '....k334333k....',
    ],
  },
  // Long hair down past the shoulders.
  long: {
    down: [
      '.....kkkkkk.....',
      '...kk666666kk...',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '.k766666666667k.',
      '.k66sss66sss66k.',
      '.k66skssssks66k.',
      '.k66skssssks66k.',
      '.k6SissssssiS6k.',
      '.k6kSssssssSk6k.',
      '.k67kk3SS3kk76k.',
      '.k7k33333333k7k.',
      '..k4333333334k..',
      '..k4333333334k..',
    ],
    up: [
      '.....kkkkkk.....',
      '...kk666666kk...',
      '..k6666666666k..',
      '..k6666666666k..',
      '..k6666666666k..',
      '.k666666666666k.',
      '.k666666666666k.',
      '.k666666666666k.',
      '.k666666666666k.',
      '.k766666666667k.',
      '.k766666666667k.',
      '.k776666666677k.',
      '.k777666666777k.',
      '..k4777777774k..',
      '..k4333333334k..',
    ],
    left: [
      '.....kkkkkk.....',
      '....k666666kk...',
      '...k666666666k..',
      '...k666666666k..',
      '...k666666666k..',
      '...k6666666667k.',
      '...kss66666667k.',
      '...kskssS66667k.',
      '...kskssS66667k.',
      '..ksssssssS667k.',
      '...kSsssSS6667k.',
      '.....k3SSk6667k.',
      '....k3333k677k..',
      '....k3343k77k...',
      '....k334333k....',
    ],
  },
};

// ---------- hats: painted over the top rows of the hair ('.' lets the hair show) ----------

const HATS = {
  // A ball cap with a curved brim, and the brim's shadow on your forehead.
  cap: {
    down: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1ww1111111k..',
      '..k1w11111111k..',
      '..k1111111111k..',
      '.k222222222222k.',
      '....SSSSSSSS....',
    ],
    up: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1111111111k..',
      '..k1111111111k..',
      '..k1111111111k..',
      '..k1122222211k..',
    ],
    left: [
      '.....kkkkkk.....',
      '....k111111kk...',
      '...k1ww111111k..',
      '...k1w1111111k..',
      '...k111111111k..',
      '.k22222221111k..',
      '....SS..........',
    ],
  },
  // A knit beanie with a ribbed cuff.
  beanie: {
    down: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1ww1111111k..',
      '..k1111111111k..',
      '..k2121212121k..',
      '..k2121212121k..',
    ],
    up: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1111111111k..',
      '..k1111111111k..',
      '..k2121212121k..',
      '..k2121212121k..',
    ],
    left: [
      '.....kkkkkk.....',
      '....k111111kk...',
      '...k1ww111111k..',
      '...k111111111k..',
      '...k212121212k..',
      '...k212121212k..',
    ],
  },
  // A wide-brimmed field hat, for long days in the sun.
  sunhat: {
    down: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1w11111111k..',
      '..k2222222222k..',
      '.kk1111111111kk.',
      'k11111111111111k',
      '.kk.SSSSSSSS.kk.',
    ],
    up: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1111111111k..',
      '..k2222222222k..',
      '.kk1111111111kk.',
      'k11111111111111k',
      '.kk..........kk.',
    ],
    left: [
      '.....kkkkkk.....',
      '....k111111kk...',
      '...k1w1111111k..',
      '...k222222222k..',
      '.kk1111111111kk.',
      'k11111111111111k',
      '.kk.SS.......kk.',
    ],
  },
  // Sold at SunBeam in Frenchtown (data/items.js), not in the LOOK screen:
  // a beret, tipped to one side with a little stalk on top,
  beret: {
    down: [
      '.......kk.......',
      '....kkk11kkk....',
      '..kk11111111kk..',
      '.k11w111111111k.',
      '.k222222222222k.',
    ],
    up: [
      '.......kk.......',
      '....kkk11kkk....',
      '..kk11111111kk..',
      '.k111111111111k.',
      '.k222222222222k.',
    ],
    left: [
      '......kk........',
      '...kkk11kkk.....',
      '..k111111111kk..',
      '.k1w1111111111k.',
      '.k222222222222k.',
    ],
  },
  // and a floppy bucket hat with a short, droopy brim.
  bucket: {
    down: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1w11111111k..',
      '..k1111111111k..',
      '.k222222222222k.',
      '.kk..........kk.',
    ],
    up: [
      '.....kkkkkk.....',
      '...kk111111kk...',
      '..k1111111111k..',
      '..k1111111111k..',
      '.k222222222222k.',
      '.kk..........kk.',
    ],
    left: [
      '.....kkkkkk.....',
      '....k111111kk...',
      '...k1w1111111k..',
      '...k111111111k..',
      '.k222222222222k.',
      '.kk..........kk.',
    ],
  },
};

// ---------- legs: rows 15-19 standing, rows 17-19 mid-step ----------

const LEGS = {
  pants: {
    down: ['..ks44444444sk..', '...k55555558k...', '...k558kk558k...', '...kkkk..kkkk...', '................'],
    step: ['...k558kk558k...', '...kkkk.k558k...', '........kkkk....'],
    left: ['....k4s4444k....', '.....k55558k....', '.....k55558k....', '....kkkkkk......', '................'],
    leftStep: ['....k58kk558k...', '...kkkk..kkkk...', '................'],
  },
  skirt: {
    down: ['..ks44444444sk..', '..k5555555558k..', '..kk55555558kk..', '....ksk..ksk....', '....kkk..kkk....'],
    step: ['..kk55555558kk..', '....ksk..ksk....', '....kkk..kkk....'],
    left: ['....k4s4444k....', '...k55555558k...', '...kk5555558k...', '......ksk.......', '.....kkkk.......'],
    leftStep: ['...kk5555558k...', '.....ksk.ksk....', '....kkk..kkk....'],
  },
};

// Shorts are pants with bare legs below the knee (row 17 on).
{
  const { down, step, left, leftStep } = LEGS.pants;
  const bare = (rows) => recolor(rows, { 5: 's', 8: 'S' });
  LEGS.shorts = {
    down: [...down.slice(0, 2), ...bare(down.slice(2))],
    step: bare(step),
    left: [...left.slice(0, 2), ...bare(left.slice(2))],
    leftStep: bare(leftStep),
  };
}

/** Paint a hat's rows over the top of a head ('.' in the hat lets the hair show). */
const wearHat = (head, hat) => (hat ? stamp(head, [...hat, ...head.slice(hat.length).map((r) => '.'.repeat(r.length))]) : head);

// NPCs pick a whole outfit by name: 'male' (a cap, short hair, trousers) or
// 'female' (no hat, long hair, a skirt).
const OUTFITS = {
  male: { hair: 'short', hat: 'cap', legs: 'pants' },
  female: { hair: 'long', hat: 'none', legs: 'skirt' },
};

// The player's colors: a red cap and shirt, blue trousers, brown hair.
const DEFAULT_COLORS = {
  hat: PALETTE.p, hatShade: PALETTE.P,
  top: PALETTE.p, topShade: PALETTE.P,
  bottoms: PALETTE.u, // bottomsShade defaults to a darker bottoms
  hair: PALETTE.n, hairShade: PALETTE.N,
  skin: PALETTE.s, skinShade: PALETTE.S, cheeks: '#f8a8a0',
};

/** A hex color darkened by `by` (0-1). */
function darken(hex, by = 0.25) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (shift) => Math.round(((n >> shift) & 255) * (1 - by)).toString(16).padStart(2, '0');
  return `#${ch(16)}${ch(8)}${ch(0)}`;
}

/**
 * The walk cycle as sprites: { down, up, left, right } each { stand, stepA, stepB }.
 * `outfit` is 'male', 'female' or the parts { hair, hat, legs }; `colors`
 * overrides any of DEFAULT_COLORS, e.g.
 * personSprites('hannah', 'female', { top: '#3a9088', hair: '#8a4a28' }).
 */
export function personSprites(name, outfit = 'male', colors = {}) {
  const parts = typeof outfit === 'string' ? OUTFITS[outfit] : outfit;
  const head = HAIR[parts?.hair];
  const legs = LEGS[parts?.legs];
  const hat = parts?.hat === 'none' ? {} : HATS[parts?.hat];
  if (!head || !legs || !hat) throw new Error(`${name}: unknown outfit ${JSON.stringify(outfit)} (see OUTFITS and LOOK_OPTIONS in assets/player.js)`);

  const c = { ...DEFAULT_COLORS, ...colors };
  const palette = {
    ...PALETTE, 1: c.hat, 2: c.hatShade, 3: c.top, 4: c.topShade, 5: c.bottoms, 8: c.bottomsShade ?? darken(c.bottoms),
    6: c.hair, 7: c.hairShade, s: c.skin, S: c.skinShade, i: c.cheeks, 9: c.topStripe,
  };
  // A patterned top ('stripes' or 'plaid') paints `topStripe` over some of its pixels.
  const on = { stripes: (x, y) => y % 2 === 0, plaid: (x, y) => x % 3 === 0 || y % 3 === 0 }[c.topPattern];
  const pattern = (rows) => (on ? rows.map((r, y) => [...r].map((ch, x) => (ch === '3' && on(x, y) ? '9' : ch)).join('')) : rows);
  const s = (rows) => makeSprite(pattern(rows), palette, name);
  const down = [...wearHat(head.down, hat.down), ...legs.down];
  const up = [...wearHat(head.up, hat.up), ...legs.down];
  const left = [...wearHat(head.left, hat.left), ...legs.left];
  const downStep = [...down.slice(0, STEP_ROW), ...legs.step];
  const upStep = [...up.slice(0, STEP_ROW), ...legs.step];
  const leftStep = [...left.slice(0, STEP_ROW), ...legs.leftStep];
  return {
    down:  { stand: s(down),         stepA: s(downStep),         stepB: s(mirror(downStep)) },
    up:    { stand: s(up),           stepA: s(upStep),           stepB: s(mirror(upStep)) },
    left:  { stand: s(left),         stepA: s(leftStep),         stepB: s(leftStep) },
    right: { stand: s(mirror(left)), stepA: s(mirror(leftStep)), stepB: s(mirror(leftStep)) },
  };
}

// ---------- the player's look, picked in the intro (scenes/intro.js) ----------

export const LOOK_OPTIONS = {
  hair: ['short', 'long'],
  hat: ['cap', 'beanie', 'sunhat', 'none'],
  legs: ['pants', 'shorts', 'skirt'],
};

// [color, shade] for clothes and hair; [skin, shade, cheeks] for skin.
export const CLOTH_COLORS = {
  red: [PALETTE.p, PALETTE.P],
  orange: ['#e88030', '#b05818'],
  yellow: ['#f0c030', '#b88a18'],
  green: ['#58a040', '#3a7028'],
  teal: [PALETTE.t, PALETTE.T],
  blue: [PALETTE.u, PALETTE.U],
  violet: [PALETTE.v, PALETTE.V],
  pink: [PALETTE.i, PALETTE.I],
  brown: [PALETTE.n, PALETTE.N],
  khaki: ['#8a7a58', '#6a5a40'],
  black: ['#404050', '#282834'],
  white: ['#e8e8e8', '#b0b0b8'],
};
export const HAIR_COLORS = {
  brown: [PALETTE.n, PALETTE.N],
  black: ['#303038', '#18181f'],
  blonde: ['#e8c860', '#b89838'],
  auburn: ['#a0502c', '#6a3018'],
  ginger: ['#d87030', '#a04818'],
  gray: ['#c8c8c8', '#909098'],
  blue: ['#4878d0', '#2c4c98'],
  pink: ['#f08cb8', '#c05888'],
};
// Only from SunBeam in Frenchtown (data/items.js): hat colors and tops the LOOK screen doesn't offer.
// A top can have a pattern: [color, shade, pattern color, 'stripes' or 'plaid'].
export const SHOP_COLORS = {
  maroon: ['#8a2838', '#5a1824'],
  sunbeam: ['#f8b028', '#c87c10'],
  flannel: [PALETTE.p, PALETTE.P, '#302028', 'plaid'],
  breton: ['#f0f0f0', '#c0c0c8', '#283c80', 'stripes'],
};
export const SHOP_HATS = ['beret', 'bucket'];

export const SKIN_TONES = {
  fair: [PALETTE.s, PALETTE.S, '#f8a8a0'],
  light: ['#f0c090', '#d09868', '#f09098'],
  tan: ['#d8a070', '#b07848', '#e08080'],
  brown: ['#b07848', '#885530', '#c06858'],
  deep: ['#8a5a38', '#643c22', '#9a4c3c'],
  dark: ['#5e3a24', '#432816', '#704030'],
};

// Which list each part of a look picks from.
export const LOOK_CHOICES = {
  hair: LOOK_OPTIONS.hair, hairColor: Object.keys(HAIR_COLORS),
  hat: LOOK_OPTIONS.hat, hatColor: Object.keys(CLOTH_COLORS),
  top: Object.keys(CLOTH_COLORS),
  legs: LOOK_OPTIONS.legs, legsColor: Object.keys(CLOTH_COLORS),
  skin: Object.keys(SKIN_TONES),
};

export const DEFAULT_LOOK = {
  hair: 'short', hairColor: 'brown', hat: 'cap', hatColor: 'red', top: 'red', legs: 'pants', legsColor: 'blue', skin: 'fair',
};

// Everything a look can be: the LOOK screen's choices, plus what SunBeam sells.
const COLORS = { ...CLOTH_COLORS, ...SHOP_COLORS };
const ALLOWED = {
  ...LOOK_CHOICES,
  hat: [...LOOK_CHOICES.hat, ...SHOP_HATS],
  hatColor: Object.keys(COLORS),
  top: Object.keys(COLORS),
};

/** The player's sprites for a look (see DEFAULT_LOOK); anything missing or unknown falls back to the default. */
export function lookSprites(look = {}) {
  const l = { ...DEFAULT_LOOK };
  for (const [key, choices] of Object.entries(ALLOWED)) {
    if (choices.includes(look?.[key])) l[key] = look[key];
  }
  const [hat, hatShade] = COLORS[l.hatColor];
  const [top, topShade, topStripe, topPattern] = COLORS[l.top];
  const [hair, hairShade] = HAIR_COLORS[l.hairColor];
  const [skin, skinShade, cheeks] = SKIN_TONES[l.skin];
  return personSprites('player', { hair: l.hair, hat: l.hat, legs: l.legs }, {
    hat, hatShade, top, topShade, topStripe, topPattern, bottoms: CLOTH_COLORS[l.legsColor][0], bottomsShade: CLOTH_COLORS[l.legsColor][1], hair, hairShade, skin, skinShade, cheeks,
  });
}

export const PLAYER = lookSprites(DEFAULT_LOOK);
