// TILE DEFINITIONS
// ----------------
// A tile is art + rules. Properties:
//   art         16x16 pixel art (rows of palette characters)
//   frames      instead of `art`: a list of art for an animated tile
//   frameTime   seconds per animation frame
//   base        id of another tile drawn underneath (for art with '.' holes)
//   solid       the player can't walk onto it
//   perch       birds can land and hop around here (if the map has birds)
//   cover       birds barely notice you walking here
//   coversFeet  redraw the bottom of the tile over the player (tall grass)
//   over        art drawn over the player and everyone else, like a bridge you walk under
//               (see-through while you're under it)
//   glow        lights up this many tiles around it on a `dark` map (cave crystals, daylight),
//               and shines at night outdoors (windows, lamps)
//   flicker     its glow flickers like a fire
//   lit         only this fraction of these tiles glow (picked by position), so not every window is lit
//   rest        face it and press A to rest until another time of day (beds, benches)
//   pane        a window on an indoor map: tinted with the sky outside
//   counter     a shop counter: face it and press A to talk to whoever stands behind it
//
// Maps refer to tiles by a single character, set in LEGEND at the bottom.

import { PALETTE } from './palette.js';
import { makeSprite, shiftX, layer, recolor, stamp } from '../gfx/sprite.js';
import { COAST_DEFS } from './coastTiles.js';
import { HOUSE_DEFS } from './houseTiles.js';
import { CAVE_DEFS } from './caveTiles.js';
import { VAN_DEFS } from './vanTiles.js';
import { FARM_DEFS } from './farmTiles.js';
import { AIRPORT_DEFS } from './airportTiles.js';
import { STORE_DEFS } from './storeTiles.js';
import { CANAL_DEFS } from './canalTiles.js';
import { PARK_DEFS } from './parkTiles.js';
import { FRENCHTOWN_DEFS } from './frenchtownTiles.js';
import { MILFORD_DEFS } from './milfordTiles.js';
import { LUDLOW_DEFS } from './ludlowTiles.js';

// ---------- outdoor ----------

const GRASS = [
  'gggggggggggggggg',
  'gggggggggggggggg',
  'ggGgggggggggGggg',
  'gGgGgggggggGgGgg',
  'gggggggggggggggg',
  'gggggggggggggggg',
  'gggggggGgggggggg',
  'ggggggGgGggggggg',
  'gggggggggggggggg',
  'gggggggggggggggg',
  'gGgggggggggggGgg',
  'GgGgggggggggGgGg',
  'gggggggggggggggg',
  'gggggggGgggggggg',
  'ggggggGgGggggggg',
  'gggggggggggggggg',
];

const TALL_GRASS = [
  'gggggggggggggggg',
  'ggGggGggggGggGgg',
  'gGhGGhGggGhGGhGg',
  'GhGhhGhGGhGhhGhG',
  'hGhGGhGhhGhGGhGh',
  'GhhGGhhGGhhGGhhG',
  'hGGhhGGhhGGhhGGh',
  'hhhhhhhhhhhhhhhh',
  'gggggggggggggggg',
  'ggGggGggggGggGgg',
  'gGhGGhGggGhGGhGg',
  'GhGhhGhGGhGhhGhG',
  'hGhGGhGhhGhGGhGh',
  'GhhGGhhGGhhGGhhG',
  'hGGhhGGhhGGhhGGh',
  'hhhhhhhhhhhhhhhh',
];

const FLOWERS = [
  'gggggggggggggggg',
  'ggggwggggggggggg',
  'gggwfwgggggggggg',
  'ggggwggggggggggg',
  'ggggGggggggwgggg',
  'gggggggggggwfwgg',
  'gggggggggggGwggg',
  'gggggggggggggggg',
  'gggggggggggggggg',
  'ggwggggggggggggg',
  'gwfwgggggggggggg',
  'ggwgggggwggggggg',
  'ggGggggwfwgggggg',
  'ggggggggwggggggg',
  'ggggggggGggggggg',
  'gggggggggggggggg',
];

const DIRT = [
  'dddddddddddddddd',
  'ddDddddddddddddd',
  'dddddddddDdddddd',
  'dddddddddddddDdd',
  'dddddDdddddddddd',
  'dddddddddddddddd',
  'dDdddddddddDdddd',
  'dddddddddddddddd',
  'ddddddddDddddddd',
  'dddDdddddddddddd',
  'dddddddddddddDdd',
  'dddddddddddddddd',
  'ddddddDddddddddd',
  'dDdddddddddddDdd',
  'ddddddddddDddddd',
  'dddddddddddddddd',
];

const WATER = [
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbccbbbbbbbbbbbb',
  'bbbbccbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbccbbb',
  'bbbbbbbbbbbbbccb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbccbbbbbbbbb',
  'bbbbbbbccbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'BbbbbbbbbbbbbbbB',
  'bccbbbbbbbbbbbbb',
  'bbbccbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
];

const TREE = [
  '....hhhhhhhh....',
  '..hhGGGGGGGGhh..',
  '.hGGgGGGGGgGGGh.',
  '.hGgggGGGgggGGh.',
  'hGGggGGGGGggGGGh',
  'hGGGGGGgGGGGGGGh',
  'hGGGGGgggGGGGGGh',
  'hGgGGGGgGGGGgGGh',
  '.hGggGGGGGGgggh.',
  '.hGGGGGGGGGGGGh.',
  '..hhGGGGGGGGhh..',
  '....hhhNNhhh....',
  '......NnnN......',
  '......NnnN......',
  '.....NnnnnN.....',
  '......NNNN......',
];

const SIGN = [
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.kooooooooooook.',
  '.koNNNNoNNNNNok.',
  '.kooooooooooook.',
  '.koNNNoNNNNNook.',
  '.kooooooooooook.',
  '.kOOOOOOOOOOOOk.',
  '.kkkkkkkkkkkkkk.',
  '......kNNk......',
  '......kNNk......',
  '......kNNk......',
  '.....kNNNNk.....',
  '................',
  '................',
];

// 'x' is the petal color and 'z' the flower's center; the beds below fill them in.
const FLOWER_BED = [
  'ggxgGgggggggxggg',
  'gxzxgggxgggxzxgg',
  'ggxgggxzxgggxggg',
  'gggggggxggggGggg',
  'ggggxggggggggggx',
  'gggxzxggggxgggxz',
  'Ggggxggggxzxgggx',
  'ggggggggggxggggg',
  'gxgggggxGggggggg',
  'xzxgggxzxggggxgg',
  'gxgggggxggggxzxg',
  'gggggggggggGgxgg',
  'ggggxgggggxggggg',
  'xggxzxgggxzxgggx',
  'zxggxgggggxgggxz',
  'xggggggGggggggGx',
];

const LILY_PADS = [
  '................',
  '................',
  '...GGGG.........',
  '..GgggGG........',
  '..GggiiG........',
  '..GgiIiG........',
  '...GgiG.........',
  '....GG..........',
  '................',
  '................',
  '..........GGG...',
  '.........GgggG..',
  '.........GggGG..',
  '..........GG....',
  '................',
  '................',
];

const COBBLE = [
  'qqqqqqqQqqqqqqqQ',
  'qqqqqqqQqqqqqqqQ',
  'qqqqqqqQqqqqqqqQ',
  'QQQQQQQQQQQQQQQQ',
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'QQQQQQQQQQQQQQQQ',
  'qqqqqqqQqqqqqqqQ',
  'qqqqqqqQqqqqqqqQ',
  'qqqqqqqQqqqqqqqQ',
  'QQQQQQQQQQQQQQQQ',
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'QQQQQQQQQQQQQQQQ',
];

// A north-south footbridge: rails down both sides, planks across.
const BRIDGE = [
  'kOnnnnnnnnnnnnOk',
  'kNnnnnnnnnnnnnNk',
  'kNnnnnnnnnnnnnNk',
  'kNNNNNNNNNNNNNNk',
  'kNnnnnnnnnnnnnNk',
  'kNnnnnnnnnnnnnNk',
  'kNnnnnnnnnnnnnNk',
  'kNNNNNNNNNNNNNNk',
  'kOnnnnnnnnnnnnOk',
  'kNnnnnnnnnnnnnNk',
  'kNnnnnnnnnnnnnNk',
  'kNNNNNNNNNNNNNNk',
  'kNnnnnnnnnnnnnNk',
  'kNnnnnnnnnnnnnNk',
  'kNnnnnnnnnnnnnNk',
  'kNNNNNNNNNNNNNNk',
];

const FENCE = [
  '................',
  '................',
  '.kk..kk..kk..kk.',
  'kwwkkwwkkwwkkwwk',
  'kwwkkwwkkwwkkwwk',
  'kwwwwwwwwwwwwwwk',
  'kqqqqqqqqqqqqqqk',
  'kwwkkwwkkwwkkwwk',
  'kwwkkwwkkwwkkwwk',
  'kwwkkwwkkwwkkwwk',
  'kwwwwwwwwwwwwwwk',
  'kqqqqqqqqqqqqqqk',
  'kwwkkwwkkwwkkwwk',
  'kqqkkqqkkqqkkqqk',
  '.kk..kk..kk..kk.',
  '................',
];

// The same fence running north-south, for the sides of a yard.
const FENCE_SIDE = [
  '......kkkk......',
  '.....kwwwwk.....',
  '.....kwwwwk.....',
  '.....kqqqqk.....',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '.....kwwwwk.....',
  '.....kwwwwk.....',
  '.....kqqqqk.....',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
];

// A little stone fountain; the second frame moves the sparkles.
const FOUNTAIN = [
  '................',
  '....kkkkkkkk....',
  '..kkqqqqqqqqkk..',
  '.kqqQQQQQQQQqqk.',
  '.kqQbbbbbbbbQqk.',
  'kqQbbcbwwbcbbQqk',
  'kqQbbbkwwkbbbQqk',
  'kqQbcbkqqkbcbQqk',
  'kqQbbbkqqkbbbQqk',
  'kqQbbcbkkbcbbQqk',
  'kqQbbbbbbbbbbQqk',
  '.kqQbbbbbbbbQqk.',
  '.kqqQQQQQQQQqqk.',
  '..kkqqqqqqqqkk..',
  '....kkkkkkkk....',
  '................',
];

const LAMP_POST = [
  '......kkkk......',
  '.....kffffk.....',
  '.....kfwwfk.....',
  '.....kffffk.....',
  '......kkkk......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '......kkkk......',
  '.....kkkkkk.....',
  '................',
];

// ---------- house exterior ----------

const ROOF = [
  'rrrrrrrrrrrrrrrr',
  'RRRRRRRRRRRRRRRR',
  'rrrrrrrrrrrrrrrr',
  'rrrrrrrrrrrrrrrr',
  'RRRRRRRRRRRRRRRR',
  'rrrrrrrrrrrrrrrr',
  'rrrrrrrrrrrrrrrr',
  'RRRRRRRRRRRRRRRR',
  'rrrrrrrrrrrrrrrr',
  'rrrrrrrrrrrrrrrr',
  'RRRRRRRRRRRRRRRR',
  'rrrrrrrrrrrrrrrr',
  'rrrrrrrrrrrrrrrr',
  'RRRRRRRRRRRRRRRR',
  'kkkkkkkkkkkkkkkk',
  'YYYYYYYYYYYYYYYY',
];

const WALL = [
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'QQQQQQQQQQQQQQQQ',
];

const WINDOW = [
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYkkkkkkkkkkYYY',
  'yyykccccbbbbkyyy',
  'yyykccbbbbbbkyyy',
  'YYYkcbbbbbbbkYYY',
  'yyykkkkkkkkkkyyy',
  'yyykbbbbbbbbkyyy',
  'YYYkbbbbbbbbkYYY',
  'yyykbbbbbbbbkyyy',
  'yyykkkkkkkkkkyyy',
  'YYYYYYYYYYYYYYYY',
  'yyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'QQQQQQQQQQQQQQQQ',
];

const DOOR = [
  'yyyyyyyyyyyyyyyy',
  'yyykkkkkkkkkkyyy',
  'YYknnnnnnnnnnkYY',
  'yyknNnnnnnnNnkyy',
  'yyknNnnnnnnNnkyy',
  'YYknNnnnnnnNnkYY',
  'yyknNnnnnnnNnkyy',
  'yyknnnnnnnnnnkyy',
  'YYknNnnnnnnNnkYY',
  'yyknNnnnnnnNnkyy',
  'yyknNnnnnnfNnkyy',
  'YYknNnnnnnnNnkYY',
  'yyknNnnnnnnNnkyy',
  'yyknnnnnnnnnnkyy',
  'YYknnnnnnnnnnkYY',
  'QQkkkkkkkkkkkkQQ',
];

// A striped shop awning over the top of a wall.
const AWNING = [
  'kkkkkkkkkkkkkkkk',
  'ppwwppwwppwwppww',
  'ppwwppwwppwwppww',
  'ppwwppwwppwwppww',
  'PPwwPPwwPPwwPPww',
  'kppkkwwkkppkkwwk',
  '.kk..kk..kk..kk.',
  ...WALL.slice(7),
];

// A window with a flower box under it.
const FLOWER_BOX_WINDOW = [
  ...WINDOW.slice(0, 11),
  'YYkiifiivvfvvkYY',
  'yykeeeeeeeeeekyy',
  'yykEEEEEEEEEEkyy',
  'YYYYYYYYYYYYYYYY',
  'QQQQQQQQQQQQQQQQ',
];

// ---------- house interior ----------

const FLOOR = [
  'oooooooOoooooooo',
  'oooooooOoooooooo',
  'oooooooOoooooooo',
  'OOOOOOOOOOOOOOOO',
  'oooooooooooooooO',
  'oooooooooooooooO',
  'oooooooooooooooO',
  'OOOOOOOOOOOOOOOO',
  'oooooooOoooooooo',
  'oooooooOoooooooo',
  'oooooooOoooooooo',
  'OOOOOOOOOOOOOOOO',
  'oooooooooooooooO',
  'oooooooooooooooO',
  'oooooooooooooooO',
  'OOOOOOOOOOOOOOOO',
];

const INNER_WALL = [
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'yyyYyyyyyyyYyyyy',
  'NNNNNNNNNNNNNNNN',
  'nnnnnnnnnnnnnnnn',
  'NNNNNNNNNNNNNNNN',
];



const RUG = [
  'pppppppppppppppp',
  'pppppppfpppppppp',
  'ppppppfPfppppppp',
  'pppppfPpPfpppppp',
  'ppppfPpppPfppppp',
  'pppppfPpPfpppppp',
  'ppppppfPfppppppp',
  'pppppppfpppppppp',
  'pppppppppppppppp',
  'pppppppfpppppppp',
  'ppppppfPfppppppp',
  'pppppfPpPfpppppp',
  'ppppfPpppPfppppp',
  'pppppfPpPfpppppp',
  'ppppppfPfppppppp',
  'pppppppfpppppppp',
];

const TABLE = [
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '.knnnnnnnnnnnnk.',
  '.knwnnnnnnnnnnk.',
  '.knnnnnnnnnnnnk.',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  '.kkkkkkkkkkkkkk.',
  '..kNk......kNk..',
  '..kNk......kNk..',
  '..kNk......kNk..',
  '..kNk......kNk..',
  '..kkk......kkk..',
  '................',
  '................',
];

// A candle in a jar, set on a table (Eight Oh Brew); the flame flickers.
const CANDLE = [
  '.......f........',
  '.......e........',
  '......kwk.......',
  '......kwk.......',
  '......kkk.......',
  ...Array(11).fill('................'),
];

const BED = [
  '.kkkkkkkkkkkkkk.',
  '.kwwwwwwwwwwwwk.',
  '.kwwwwwwwwwwwwk.',
  '.kwwwwwwwwwwwwk.',
  '.kkkkkkkkkkkkkk.',
  '.kuuuuuuuuuuuuk.',
  '.kuuuuuuuuuuuuk.',
  '.kuUuuuuuuuuUuk.',
  '.kuuuuuuuuuuuuk.',
  '.kuuuuuuuuuuuuk.',
  '.kuUuuuuuuuuUuk.',
  '.kuuuuuuuuuuuuk.',
  '.kUUUUUUUUUUUUk.',
  '.kkkkkkkkkkkkkk.',
  '.kNk........kNk.',
  '................',
];

const GLYPHS = [
  'qqqqqqqqqqqqqqqq',
  'qkkkkkkkkkkkkkkq',
  'qkwwwwwwwwwwwwkq',
  'qkwkQkQQkQkQQwkq',
  'qkwwQQkQkQQkwwkq',
  'qkwQQkQQQkQQQwkq',
  'qkwwkQQkQQkQwwkq',
  'qkwQQQkQkQQQwwkq',
  'qkwwkQQQkQQkwwkq',
  'qkwQQkQkQQQkQwkq',
  'qkwwQQQkQQkQwwkq',
  'qkwQkQQkQkQQQwkq',
  'qkwwwwwwwwwwwwkq',
  'qkkkkkkkkkkkkkkq',
  'QQQQQQQQQQQQQQQQ',
  'qqqqqqqqqqqqqqqq',
];

const FLYER_SIGN = [
  'kkkkkkkkkkkkkkkk',
  'kffffffffffffffk',
  'kfkkkkkkkkkkkkfk',
  'kfkffwkYkwwkfkfk',
  'kffffffffffffffk',
  'kkkkkkkkkkkkkkkk',
  '......kkkk......',
  '......kkkk......',
  '......kkkk......',
  '.....kkkkkk.....',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const BOUTIQUE_SIGN = [
  'kkkkkkkkkkkkkkkk',
  'kppppppppppppppk',
  'kpkBBkOUkwwkQkpk',
  'kpkppppppppppppk',
  'kppppppppppppppk',
  'kkkkkkkkkkkkkkkk',
  '......kkkk......',
  '......kkkk......',
  '......kkkk......',
  '.....kkkkkk.....',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// A pink signpost with a white arrow pointing the way down (south).
const ARROW_SIGN = [
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '..kiiiiwwiiiik..',
  '..kiiiiwwiiiik..',
  '..kiiwwwwwwiik..',
  '..kiiiwwwwiiik..',
  '..kiiiiwwiiiik..',
  '..kkkkkkkkkkkk..',
  '......kNNk......',
  '......kNNk......',
  '......kNNk......',
  '......kNNk......',
  '.....kNNNNk.....',
  '................',
  '................',
];

const SHOP_SIGN = [
  'kkkkkkkkkkkkkkkk',
  'kyyyyyyyyyyyyyyk',
  'kykSSkwwOkPkykyk',
  'kyyyyyyyyyyyyyyk',
  'kkkkkkkkkkkkkkkk',
  '......kkkk......',
  '......kkkk......',
  '......kkkk......',
  '.....kkkkkk.....',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const FLOWER_POT = [
  '................',
  '......kkkk......',
  '.....kppppk.....',
  '....kppffppk....',
  '....kppffppk....',
  '.....kppppk.....',
  '..kkk..kk..kkk..',
  '.kgGGkkGGkkGGgk.',
  '...kkkkGGkkkk...',
  '..kkkkkkkkkkkk..',
  '..keeeeeeeeeek..',
  '..kkkkkkkkkkkk..',
  '...keeeeeeEEk...',
  '...keeeeeeEEk...',
  '....keeeeEEk....',
  '.....kkkkkk.....',
];

const MAT = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '..kppppppppppk..',
  '..kpPpPpPpPppk..',
  '..kppppppppppk..',
  '..kpPpPpPpPppk..',
  '..kppppppppppk..',
  '..kpPpPpPpPppk..',
  '..kppppppppppk..',
  '..kkkkkkkkkkkk..',
  '................',
];

// ---------- the tile table ----------

const DEFS = {
  grass:     { art: GRASS, perch: true },
  tallGrass: { art: TALL_GRASS, perch: true, cover: true, coversFeet: true },
  flowers:   { art: FLOWERS, perch: true },
  flowerPot: { art: FLOWER_POT, base: 'grass', solid: true },
  flyerSign: { art: FLYER_SIGN, base: 'grass', solid: true },
  boutiqueSign: { art: BOUTIQUE_SIGN, base: 'grass', solid: true },
  boutiqueSignPaved: { art: BOUTIQUE_SIGN, base: 'paving', solid: true },
  arrowSign: { art: ARROW_SIGN, base: 'grass', solid: true },
  shopSign: { art: SHOP_SIGN, base: 'grass', solid: true },
  dirt:      { art: DIRT, perch: true },
  water:     { frames: [WATER, shiftX(WATER, 3)], frameTime: 0.6, solid: true },
  lilyPads:  { frames: [stamp(WATER, LILY_PADS), stamp(shiftX(WATER, 3), LILY_PADS)], frameTime: 0.6, solid: true },
  bridge:    { art: BRIDGE },
  cobble:    { art: COBBLE, perch: true },
  fence:     { art: FENCE, base: 'grass', solid: true },
  fenceSnow: { art: FENCE, base: 'snow', solid: true },
  fenceSide: { art: FENCE_SIDE, base: 'grass', solid: true },
  fountain:  { frames: [FOUNTAIN, recolor(FOUNTAIN, { c: 'b', w: 'c' })], frameTime: 0.4, base: 'cobble', solid: true },
  lampPost:  { art: LAMP_POST, base: 'cobble', solid: true, glow: 2 },
  lampPostGrass:  { art: LAMP_POST, base: 'grass', solid: true, glow: 2 },
  lampPostPaving: { art: LAMP_POST, base: 'paving', solid: true, glow: 2 },
  lampPostSnow: { art: LAMP_POST, base: 'snow', solid: true, glow: 2 },
  pinkBed:   { art: recolor(FLOWER_BED, { x: 'i', z: 'f' }), perch: true },
  violetBed: { art: recolor(FLOWER_BED, { x: 'v', z: 'w' }), perch: true },
  yellowBed: { art: recolor(FLOWER_BED, { x: 'f', z: 'e' }), perch: true },
  tree:      { art: TREE, base: 'grass', solid: true },
  sign:      { art: SIGN, base: 'grass', solid: true },  // the map's `signs` list holds its text
  signSnow:  { art: SIGN, base: 'snow', solid: true },

  roof:      { art: ROOF, solid: true },
  wall:      { art: WALL, solid: true },
  window:    { art: WINDOW, solid: true, glow: 1 },
  door:      { art: DOOR },          // walkable: the map puts a warp on it
  shopDoor:  { art: DOOR, solid: true },  // a door with no inside yet; give it sign text
  pinkRoof:  { art: recolor(ROOF, { r: 'i', R: 'I' }), solid: true },
  awning:    { art: AWNING, base: 'wall', solid: true },
  pinkAwning: { art: recolor(AWNING, { p: 'i', P: 'I' }), base: 'wall', solid: true },
  pinkDoor:  { art: recolor(DOOR, { n: 'i', N: 'I' }), solid: true },
  flowerBoxWindow: { art: FLOWER_BOX_WINDOW, solid: true, glow: 1 },

  ...COAST_DEFS, // the Italian seaside town: see coastTiles.js
  ...HOUSE_DEFS, // inside Hannah's house: see houseTiles.js
  ...CAVE_DEFS,  // Echo Cave and Eagle Peak: see caveTiles.js
  ...VAN_DEFS,   // inside the van on Hannahville beach: see vanTiles.js
  ...FARM_DEFS,  // the Leister family farm and its farmhouses: see farmTiles.js
  ...AIRPORT_DEFS, // Van Sant Airport: see airportTiles.js
  ...STORE_DEFS,   // shop fronts and the inside of the general store: see storeTiles.js
  ...CANAL_DEFS,   // Erwinna, the canal town: see canalTiles.js
  ...PARK_DEFS,    // Tinicum Park's ball fields, polo grounds and playground: see parkTiles.js
  ...FRENCHTOWN_DEFS, // Frenchtown's gas pumps, and the racks inside SunBeam: see frenchtownTiles.js
  ...MILFORD_DEFS, // Milford's railroad: see milfordTiles.js
  ...LUDLOW_DEFS,  // snowy Vermont: see ludlowTiles.js
  hillTree:  { art: TREE, base: 'hill', solid: true },

  floor:     { art: FLOOR },
  innerWall: { art: INNER_WALL, solid: true },
  rug:       { art: RUG },
  table:     { art: TABLE, base: 'floor', solid: true },
  candleTable: { frames: [stamp(TABLE, CANDLE), stamp(TABLE, recolor(CANDLE, { f: 'e', e: 'f' }))], frameTime: 0.25, base: 'cellarFloor', solid: true, glow: 1.6, flicker: true },
  bed:       { art: BED, base: 'floor', solid: true, rest: true },
  mat:       { art: MAT, base: 'floor' },  // the map puts the exit warp on it
  glyphs:    { art: GLYPHS, solid: true },
};

/** Which character means which tile in map files. Maps can add their own. */
export const LEGEND = {
  '.': 'grass',
  ',': 'tallGrass',
  '*': 'flowers',
  'P': 'flowerPot',
  'F': 'flyerSign',
  'B': 'boutiqueSign',
  'O': 'shopSign',
  ':': 'dirt',
  '~': 'water',
  'T': 'tree',
  'S': 'sign',
  'R': 'roof',
  'W': 'wall',
  'H': 'window',
  'D': 'door',
  '_': 'floor',
  '#': 'innerWall',
  'r': 'rug',
  't': 'table',
  'b': 'bed',
  'm': 'mat',
  'G': 'glyphs',
  'L': 'lilyPads',
  '=': 'bridge',
  '+': 'cobble',
  '^': 'fence',
  '|': 'fenceSide',
  'o': 'fountain',
  'l': 'lampPost',
  '1': 'pinkBed',
  '2': 'violetBed',
  '3': 'yellowBed',
  'd': 'shopDoor',
  'K': 'pinkRoof',
  'A': 'awning',
  'a': 'pinkAwning',
  'p': 'pinkDoor',
  'Y': 'flowerBoxWindow',
};

// Bake every tile's art into canvases once, at load time.
export const TILES = {};
for (const [id, def] of Object.entries(DEFS)) {
  const arts = def.frames ?? [def.art];
  TILES[id] = { id, ...def, sprites: arts.map((a) => makeSprite(a, PALETTE, `tile "${id}"`)) };
  if (def.over) TILES[id].overSprite = makeSprite(def.over, PALETTE, `tile "${id}" over`);
}
for (const tile of Object.values(TILES)) {
  if (tile.base) tile.sprites = tile.sprites.map((s) => layer(TILES[tile.base].sprites[0], s));
}
