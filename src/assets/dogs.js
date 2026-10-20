// Hannah's puppies. Macie and Chloe share a small curly drawing (16x16) with
// a topknot, floppy ears and bobbly curls; Libby the lab is bigger (20x18).
// Each has a sitting front view and a two-frame walk seen from the side.
// In the art, '1' is the coat, '2' its shade, '3' its highlight (the curls),
// '4' the collar and '5' Libby's yellow patches; each dog fills those in below.
import { PALETTE } from './palette.js';
import { makeSprite, mirror } from '../gfx/sprite.js';

// A small curly dog (schnoodle, cockapoo), walking to the right.
const CURLY_WALK = [
  '................',
  '................',
  '.........kk.kk..',
  '........k33k33k.',
  '.......k3121312k',
  '.......k2213k31k',
  '......k22213111k',
  '.kk...k2221311kk',
  '.k33kkkk22241kk.',
  '.k31312131213k..',
  '..k1213121312k..',
  '..k3121312131k..',
  '..k21kkkkkk12k..',
  '..k31k....k31k..',
  '..kkkk....kkkk..',
  '................',
];
const CURLY_STRIDE = [...CURLY_WALK.slice(0, 13), '.k31k......k31k.', '.kkkk......kkkk.', '................'];

// Sitting, facing you (also used while you talk to one).
const CURLY_SITTING = [
  '................',
  '.....kk..kk.....',
  '....k33kk33k....',
  '...k31211213k...',
  '..k3311311133k..',
  '..k211k12k122k..',
  '..k3213113132k..',
  '.k22211kk11222k.',
  '.k23231ii13232k.',
  '..k2244444422k..',
  '...k31131131k...',
  '...k12112112k...',
  '...k11311311k...',
  '...k11121121k...',
  '...k21k11k12k...',
  '....kkkkkkkk....',
];

// A lab: bigger and leaner, with long legs, a smooth coat, a long tail and a
// yellowish ear and back.
const LAB_WALK = [
  '....................',
  '....................',
  '....................',
  '..............kkkk..',
  '.............k1111k.',
  '.k..........k111331k',
  'k1k.........k555k11k',
  'k1k.........k5551111',
  '.k1k.kkkkkkkk5551111',
  '.k1kk515555141511kkk',
  '..kk515555154411k...',
  '..k11111111111111k..',
  '...k12222222221kk...',
  '...k1kkkkkkkk1k.....',
  '...k1k......k1k.....',
  '...k1k......k1k.....',
  '...k1k......k1k.....',
  '....k........k......',
];
const LAB_STRIDE = [
  '....................',
  '....................',
  '....................',
  '..............kkkk..',
  '.............k1111k.',
  '.k..........k111331k',
  'k1k.........k555k11k',
  'k1k.........k5551111',
  '.k1k.kkkkkkkk5551111',
  '.k1kk515555141511kkk',
  '..kk515555154411k...',
  '..k11111111111111k..',
  '..k1k2222222221kk...',
  '..k1kkkkkkkkkk1k....',
  '..k1k........k1k....',
  '..k1k........k1k....',
  '..k1k........k1k....',
  '...k..........k.....',
];
const LAB_SITTING = [
  '....................',
  '.........kk.........',
  '.......kk51kk.......',
  '......k551551k......',
  '....kk11111111kk....',
  '...k551k1111k155k...',
  '..k55551111115555k..',
  '..k555511kk115555k..',
  '...k555133331555k...',
  '...k55kk1111kk55k...',
  '....kkk444444kkk....',
  '......k111111k......',
  '.....k11111111k.....',
  '.....k11111111k.....',
  '.....k22222222k.....',
  '......k222222k......',
  '.....k22222222k.....',
  '......kkkkkkkk......',
];

const CURLY = { walk: [CURLY_WALK, CURLY_STRIDE], sitting: CURLY_SITTING };
const LAB = { walk: [LAB_WALK, LAB_STRIDE], sitting: LAB_SITTING };

const DOGS = {
  // A red-headed schnoodle with a teal collar.
  macie: { ...CURLY, colors: ['#c8643c', '#8a3c20', '#e89060', '#3a9088'] },
  // A white cockapoo with a pink collar.
  chloe: { ...CURLY, colors: ['#f8f4ec', '#c8b8a0', '#ffffff', '#f890b8'] },
  // A lean white lab with yellowish patches and a lime-green collar.
  libby: { ...LAB, colors: ['#f8f0dc', '#dcc8a0', '#ffffff', '#8ce040', '#f0d088'] },
};

/**
 * DOG_SPRITES[id].sitting, and DOG_SPRITES[id].left / .right: [step A, step B].
 * Sprites can be bigger than a tile; they're drawn centered on it, feet at the bottom.
 */
export const DOG_SPRITES = {};
for (const [id, dog] of Object.entries(DOGS)) {
  const [coat, shade, highlight, collar, patches = coat] = dog.colors;
  const palette = { ...PALETTE, 1: coat, 2: shade, 3: highlight, 4: collar, 5: patches };
  const make = (art, name) => makeSprite(art, palette, `dog '${id}' ${name}`);
  DOG_SPRITES[id] = {
    sitting: make(dog.sitting, 'sitting'),
    right: dog.walk.map((art, i) => make(art, `walk ${i}`)),
    left: dog.walk.map((art, i) => make(mirror(art), `walk ${i}`)),
  };
}
