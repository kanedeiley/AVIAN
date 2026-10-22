// Art for the items in data/items.js: a 16x16 icon each for the shop and the
// bag, and the bike you ride on (drawn over the player, see scenes/overworld.js).
import { PALETTE } from './palette.js';
import { makeSprite, mirror } from '../gfx/sprite.js';

const BLANK = '................';

// A red bike seen from the side, facing right. The store's display bike uses it too (storeTiles.js).
export const BIKE_SIDE = [
  ...Array(6).fill(BLANK),
  '..........kkkk..',
  '...kkkk....p....',
  '.....p.....p....',
  '..kkk.pppppkkk..',
  '.k...kp..pk.p.k.',
  'k.....kppk..p..k',
  'k..kppkppk..k..k',
  'k.....k..k.....k',
  '.k...k....k...k.',
  '..kkk......kkk..',
];

// The same bike from the front (or back): handlebars and one thin wheel.
const BIKE_FRONT = [
  ...Array(8).fill(BLANK),
  '...kkkkkkkkkk...',
  '..k....pp....k..',
  '.......pp.......',
  '.......kk.......',
  '......kQQk......',
  '......kQQk......',
  '......kQQk......',
  '.......kk.......',
];

const BINOCULARS = [
  BLANK,
  BLANK,
  '...kkkk..kkkk...',
  '..kqqqqkkqqqqk..',
  '..kqQQqkkqQQqk..',
  '..kqQQqkkqQQqk..',
  '..kqqqqkkqqqqk..',
  '..kQQQQkkQQQQk..',
  '.kkkkkkkkkkkkkk.',
  '.kcbbbckkcbbbck.',
  '.kbBBBbkkbBBBbk.',
  '.kbBcBbkkbBcBbk.',
  '.kbbbbbkkbbbbbk.',
  '..kkkkk..kkkkk..',
  BLANK,
  BLANK,
];

// A burlap sack of seed, tied at the top. The store's sacks use it too (storeTiles.js).
export const SEED_SACK = [
  BLANK,
  BLANK,
  '......kkkk......',
  '.......nn.......',
  '......kddk......',
  '.....kddddk.....',
  '....kddddddk....',
  '...kddffffddk...',
  '...kdfnfnffdk...',
  '...kdffnffndk...',
  '...kddffffddk...',
  '...kDddddddDk...',
  '...kDDddddDDk...',
  '....kkkkkkkk....',
  BLANK,
  BLANK,
];

const sprite = (art, name) => makeSprite(art, PALETTE, name);

export const ITEM_SPRITES = {
  binoculars: sprite(BINOCULARS, 'binoculars icon'),
  bike: sprite([...BIKE_SIDE.slice(3), BLANK, BLANK, BLANK], 'bike icon'),
  birdseed: sprite(SEED_SACK, 'birdseed icon'),
};

/** The bike under you while riding, by the way you face. */
export const BIKE_SPRITES = {
  right: sprite(BIKE_SIDE, 'bike'),
  left: sprite(mirror(BIKE_SIDE), 'bike'),
  up: sprite(BIKE_FRONT, 'bike'),
  down: sprite(BIKE_FRONT, 'bike'),
};
