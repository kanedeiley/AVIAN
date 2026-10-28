// Art for the items in data/items.js: a 16x16 icon each for the shop and the
// bag, the bike you ride on (drawn over the player, see scenes/overworld.js),
// and the skis under your feet.
import { PALETTE } from './palette.js';
import { makeSprite, mirror, recolor } from '../gfx/sprite.js';

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

// A pair of yellow skis, crossed.
const SKIS_ICON = [
  '..k..........k..',
  '.kfk........kfk.',
  '..kfk......kfk..',
  '...kfk....kfk...',
  '....kfk..kfk....',
  '.....kfkkfk.....',
  '......kffk......',
  '......kffk......',
  '.....kfkkfk.....',
  '....kfk..kfk....',
  '...kfk....kfk...',
  '..kfk......kfk..',
  '.kfk........kfk.',
  '.kk..........kk.',
  BLANK,
  BLANK,
];

// Under your feet on the slopes, by the way you face: skis point the way you go.
const SKIS_FRONT = [
  ...Array(12).fill(BLANK),
  '....kk....kk....',
  '...kffk..kffk...',
  '...kffk..kffk...',
  '....kk....kk....',
];
const SKIS_SIDE = [
  ...Array(12).fill(BLANK),
  '..............k.',
  'kkkkkkkkkkkkkkfk',
  'fffffffffffffkk.',
  'kkkkkkkkkkkkkk..',
];

// A pint of amber beer with a head of foam.
const PINT = [
  BLANK,
  '.....wwwwww.....',
  '....wwwwwwww....',
  '...kwwwwwwwwk...',
  ...Array(6).fill('...kacaaaaaak...'),
  '....kaaaaaak....',
  '....kAAAAAAk....',
  '....kkkkkkkk....',
  BLANK,
  BLANK,
  BLANK,
];

// A paper to-go cup of coffee with a lid, a sleeve and a wisp of steam.
const COFFEE_CUP = [
  '......w..w......',
  '.......w..w.....',
  '......w..w......',
  '....kkkkkkkk....',
  '...kqqqqqqqqk...',
  '...kkkkkkkkkk...',
  '....kwwwwwwk....',
  '....kwwwwwwk....',
  '....knnnnnnk....',
  '....knNNNNnk....',
  '....knnnnnnk....',
  '.....kwwwwk.....',
  '.....kwwwwk.....',
  '.....kkkkkk.....',
  BLANK,
  BLANK,
];

// SunBeam's clothes: a T-shirt ('x' the color, 'z' the hem), recolored for each one,
const TEE = [
  BLANK,
  '....kk....kk....',
  '..kkxxkkkkxxkk..',
  '.kxxxxxxxxxxxxk.',
  'kxxxxxxxxxxxxxxk',
  'kxxkxxxxxxxxkxxk',
  '.kk.kxxxxxxk.kk.',
  '....kxxxxxxk....',
  '....kxxxxxxk....',
  '....kxxxxxxk....',
  '....kzzzzzzk....',
  '....kkkkkkkk....',
  BLANK,
  BLANK,
  BLANK,
  BLANK,
];
/** Paint `line` over some of the shirt's color: every 3rd row and column (plaid), or every other row (stripes). */
const pattern = (rows, line, on) => rows.map((r, y) => [...r].map((c, x) => (c === 'x' && on(x, y) ? line : c)).join(''));

// a beret,
const BERET = [
  ...Array(4).fill(BLANK),
  '.......kk.......',
  '....kkkPPkkk....',
  '..kkPPPPPPPPkk..',
  '.kPPpPPPPPPPPPk.',
  '.kNNNNNNNNNNNNk.',
  '..kkkkkkkkkkkk..',
  ...Array(6).fill(BLANK),
];

// and a bucket hat.
const BUCKET_HAT = [
  ...Array(3).fill(BLANK),
  '.....kkkkkk.....',
  '...kkYYYYYYkk...',
  '..kYwYYYYYYYYk..',
  '..kYYYYYYYYYYk..',
  '..kDDDDDDDDDDk..',
  '.kYYYYYYYYYYYYk.',
  'kYYYYYYYYYYYYYYk',
  '.kkkkkkkkkkkkkk.',
  ...Array(5).fill(BLANK),
];

const sprite = (art, name) => makeSprite(art, PALETTE, name);

export const ITEM_SPRITES = {
  binoculars: sprite(BINOCULARS, 'binoculars icon'),
  bike: sprite([...BIKE_SIDE.slice(3), BLANK, BLANK, BLANK], 'bike icon'),
  birdseed: sprite(SEED_SACK, 'birdseed icon'),
  coffee: sprite(COFFEE_CUP, 'coffee icon'),
  beer: sprite(PINT, 'beer icon'),
  skis: sprite(SKIS_ICON, 'skis icon'),
  beret: sprite(BERET, 'beret icon'),
  bucketHat: sprite(BUCKET_HAT, 'bucket hat icon'),
  sunbeamTee: sprite(recolor(TEE, { x: 'a', z: 'A' }), 'sunbeam tee icon'),
  flannel: sprite(recolor(pattern(TEE, 'k', (x, y) => x % 3 === 0 || y % 3 === 0), { x: 'p', z: 'P' }), 'flannel icon'),
  breton: sprite(recolor(pattern(TEE, 'u', (x, y) => y % 2 === 0), { x: 'w', z: 'q' }), 'breton icon'),
};

/** Skis under your feet, by the way you face (drawn under the player). */
export const SLIDE_SPRITES = {
  skis: {
    down: sprite(SKIS_FRONT, 'skis'), up: sprite(SKIS_FRONT, 'skis'),
    right: sprite(SKIS_SIDE, 'skis'), left: sprite(mirror(SKIS_SIDE), 'skis'),
  },
};

/** The bike under you while riding, by the way you face. */
export const BIKE_SPRITES = {
  right: sprite(BIKE_SIDE, 'bike'),
  left: sprite(mirror(BIKE_SIDE), 'bike'),
  up: sprite(BIKE_FRONT, 'bike'),
  down: sprite(BIKE_FRONT, 'bike'),
};
