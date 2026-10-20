// One bird drawing, recolored per species. In the art, '1' is the body,
// '2' the wing and '3' the belly; data/birds.js fills those in.
import { PALETTE } from './palette.js';
import { makeSprite, mirror } from '../gfx/sprite.js';
import { BIRDS } from '../data/birds.js';

const PERCHED = [
  '................',
  '................',
  '................',
  '.........kkkk...',
  '........k1111k..',
  '........k11k1kff',
  '.......k111111k.',
  '.kkk..k1222111k.',
  '.k22kk12222333k.',
  '..k2222222333k..',
  '...kk22223333k..',
  '.....kkkkkkkk...',
  '.......f..f.....',
  '................',
  '................',
  '................',
];

const FLAP = [
  '................',
  '................',
  '................',
  '..kk.....kkkk...',
  '.k22k...k1111k..',
  '.k222k..k11k1kff',
  '..k222kk111111k.',
  '...k22k1111111k.',
  '.kkkkk111113333k',
  '..k1111113333k..',
  '...kk1113333k...',
  '.....kkkkkkk....',
  '................',
  '................',
  '................',
  '................',
];

/**
 * BIRD_SPRITES[id][facing][pose], facing 'left'/'right', pose 'perched'/'flap'.
 * BIRD_SPRITES[id].silhouette is the perched bird in one flat color, for the
 * journal's not-yet-photographed entries.
 */
// A palette that paints every character of the bird art one flat color.
const SILHOUETTE = Object.fromEntries([...new Set(PERCHED.join(''))].map((c) => [c, c === '.' ? null : '#b8b0a0']));

export const BIRD_SPRITES = {};
for (const [id, bird] of Object.entries(BIRDS)) {
  const [body, wing, belly] = bird.colors;
  const palette = { ...PALETTE, 1: body, 2: wing, 3: belly };
  const make = (art, name) => makeSprite(art, palette, `bird "${id}" ${name}`);
  BIRD_SPRITES[id] = {
    right: { perched: make(PERCHED, 'perched'), flap: make(FLAP, 'flap') },
    left: { perched: make(mirror(PERCHED), 'perched'), flap: make(mirror(FLAP), 'flap') },
    silhouette: makeSprite(PERCHED, SILHOUETTE, `bird "${id}" silhouette`),
  };
}
