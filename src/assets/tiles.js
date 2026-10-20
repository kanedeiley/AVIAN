// TILE DEFINITIONS
// ----------------
// A tile is art + rules. Properties:
//   art         16x16 pixel art (rows of palette characters)
//   frames      instead of `art`: a list of art for an animated tile
//   frameTime   seconds per animation frame
//   base        id of another tile drawn underneath (for art with '.' holes)
//   solid       the player can't walk onto it
//   encounter   stepping here can start a wild battle (if the map has encounters)
//   coversFeet  redraw the bottom of the tile over the player (tall grass)
//
// Maps refer to tiles by a single character, set in LEGEND at the bottom.

import { PALETTE } from './palette.js';
import { makeSprite, shiftX, layer } from '../gfx/sprite.js';

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
  grass:     { art: GRASS },
  tallGrass: { art: TALL_GRASS, encounter: true, coversFeet: true },
  flowers:   { art: FLOWERS },
  flowerPot: { art: FLOWER_POT, base: 'grass', solid: true },
  flyerSign: { art: FLYER_SIGN, base: 'grass', solid: true },
  boutiqueSign: { art: BOUTIQUE_SIGN, base: 'grass', solid: true },
  shopSign: { art: SHOP_SIGN, base: 'grass', solid: true },
  dirt:      { art: DIRT },
  water:     { frames: [WATER, shiftX(WATER, 3)], frameTime: 0.6, solid: true },
  tree:      { art: TREE, base: 'grass', solid: true },
  sign:      { art: SIGN, base: 'grass', solid: true },  // the map's `signs` list holds its text

  roof:      { art: ROOF, solid: true },
  wall:      { art: WALL, solid: true },
  window:    { art: WINDOW, solid: true },
  door:      { art: DOOR },          // walkable: the map puts a warp on it

  floor:     { art: FLOOR },
  innerWall: { art: INNER_WALL, solid: true },
  rug:       { art: RUG },
  table:     { art: TABLE, base: 'floor', solid: true },
  bed:       { art: BED, base: 'floor', solid: true },
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
};

// Bake every tile's art into canvases once, at load time.
export const TILES = {};
for (const [id, def] of Object.entries(DEFS)) {
  const arts = def.frames ?? [def.art];
  TILES[id] = { id, ...def, sprites: arts.map((a) => makeSprite(a, PALETTE, `tile "${id}"`)) };
}
for (const tile of Object.values(TILES)) {
  if (tile.base) tile.sprites = tile.sprites.map((s) => layer(TILES[tile.base].sprites[0], s));
}
