// Tiles for the Leister family farm, west of Willow Village: two clapboard
// farmhouses with metal roofs and front porches, the grandparents' red barn
// and horse pen, a greenhouse, a garage, the chicken coop and goat pen, a
// bamboo grove, a gravel driveway, and the insides of both farmhouses.
//
// The houses share their art and differ in color: the Leisters' is white with
// a dark gray roof and a red door, the grandparents' is butter yellow with a red
// roof and a blue door. Art that comes in more than one color uses 'x' for the
// main color and 'z' for its shade, and recolor() fills them in.
import { recolor, stamp, mirror } from '../gfx/sprite.js';

// ---------- the yard ----------

const GRAVEL = [
  'qqQqqqYqqqqQqqqq',
  'qQqqqqqqqYqqqqqY',
  'qqqqYqqQqqqqqQqq',
  'qqqqqqqqqqqwqqqq',
  'qYqqqQqqqqqqqqqq',
  'qqqqqqqqqYqqQqqq',
  'qqwqqqqqqqqqqqqq',
  'QqqqqqYqqqQqqqYq',
  'qqqqqqqqqqqqqqqq',
  'qqqYqqqqQqqqqqqq',
  'qQqqqqqqqqqqYqqq',
  'qqqqqqwqqqqqqqqQ',
  'qqqqQqqqqqYqqqqq',
  'qYqqqqqqqqqqqqqq',
  'qqqqqqqQqqqqwqqq',
  'qqqQqqqqqYqqqqqq',
];

// Bamboo: tall green poles with dark joints and thin leaves, packed so tight
// you can't see through. The top row of a grove uses BAMBOO_TOP, its leafy tips.
const BAMBOO = [
  'ggGkgGGGggGkggGk',
  'ggGkggGkhhhkggGk',
  'ggGkggGkgGGGggGk',
  'hhhkggGkggGkggGk',
  'gGGGggGkggGkggGk',
  'ggGGggGkggGkhhhk',
  'ggGkggGkggGkgGGG',
  'ggGkhhhkggGkggGk',
  'ggGkgGGGggGkggGk',
  'ggGkggGkghhkggGk',
  'ggGkggGkgGGGggGk',
  'hhhkggGkggGkggGk',
  'gGGGggGkggGkggGG',
  'ggGkggGkggGkhhhk',
  'ggGkggGkggGkgGGk',
  'ggGkhhhkggGkggGk',
];
const BAMBOO_TOP = [
  '................',
  '...g......g.....',
  '..gGg..g.gGg..g.',
  '.gGhGggGgGhGggGg',
  'gGhGGhGhGGhGGhGG',
  'GhGgGGhGgGGhGgGh',
  'hGGhGgGGhGgGGhGG',
  'GgGGhGGgGGhGGgGh',
  'ghGgkGhGgkhGGhgk',
  'ggGkggGkghhkggGk',
  'ggGkggGkgGGGggGk',
  'hhhkggGkggGkggGk',
  'gGGGggGkggGkggGG',
  'ggGkggGkggGkhhhk',
  'ggGkggGkggGkgGGk',
  'ggGkhhhkggGkggGk',
];

// Two rows of cabbages in tilled soil (the second row is the first, shifted).
const CROP_ROW = [
  'dddddddddddddddd',
  'dgGgddgGgddgGgdd',
  'gGhGggGhGggGhGgd',
  'dhGhddhGhddhGhdd',
  'DDDDDDDDDDDDDDDD',
  'DDDDDDDDDDDDDDDD',
  'dddddddddddddddd',
  'dddddddddddddddd',
];
const shiftRow = (rows, n) => rows.map((r) => r.slice(-n) + r.slice(0, -n));
const CROPS = [...CROP_ROW, ...shiftRow(CROP_ROW, 3)];

const HAY_BALE = [
  '................',
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '.kfffefffeffffk.',
  '.kfefffeffffefk.',
  '.keeeeeeeeeeeek.',
  '.kfffNffffNfffk.',
  '.kffeNfeffNfefk.',
  '.kfefNffefNffek.',
  '.kfffNfeffNfffk.',
  '.keffNffffNfeek.',
  '.kfffNffefNfffk.',
  '.keeeeeeeeeeeek.',
  '..kkkkkkkkkkkk..',
  '................',
];

const TROUGH = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  'kqqqqqqqqqqqqqqk',
  'kqbbbcbbbbbcbbqk',
  'kqbcbbbbbcbbbbqk',
  'kQqqqqqqqqqqqqQk',
  'kQQQQQQQQQQQQQQk',
  '.kQQQQQQQQQQQQk.',
  '..kk........kk..',
  '................',
  '................',
];

// A big wooden cable spool. Goats love standing on top of things.
const SPOOL = [
  '................',
  '................',
  '....kkkkkkkk....',
  '..kknnnnnnnnkk..',
  '.knnnnNNNNnnnnk.',
  '.knnnnnnnnnnnnk.',
  '..kknnnnnnnnkk..',
  '..kNkkkkkkkkNk..',
  '....kNNNNNNk....',
  '....kNNNNNNk....',
  '....kNNNNNNk....',
  '..kkkkkkkkkkkk..',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  '..kkkkkkkkkkkk..',
  '................',
];

const SCARECROW = [
  '......kkkk......',
  '.....kNNNNk.....',
  '...kkNNNNNNkk...',
  '..kNNNNNNNNNNk..',
  '...kkkkkkkkkk...',
  '....kddddddk....',
  '....kdkddkdk....',
  '....kddddddk....',
  '....kdkkkkdk....',
  '.fkPpPpPpPpPpkf.',
  'f..kkkpPpPkkk..f',
  '.....kpPpPk.....',
  '.....kPpPpk.....',
  '......kNNk......',
  '......kNNk......',
  '.....kkkkkk.....',
];

// Chicken wire around the coop's run: posts and rails with mesh between.
const CHICKEN_WIRE = [
  '................',
  '................',
  'kk......kk......',
  'NNkkkkkkNNkkkkkk',
  'NNq.q.q.NNq.q.q.',
  'NN.q.q.qNN.q.q.q',
  'NNq.q.q.NNq.q.q.',
  'NN.q.q.qNN.q.q.q',
  'NNq.q.q.NNq.q.q.',
  'NN.q.q.qNN.q.q.q',
  'NNq.q.q.NNq.q.q.',
  'NN.q.q.qNN.q.q.q',
  'NNkkkkkkNNkkkkkk',
  'kk......kk......',
  '................',
  '................',
];
const CHICKEN_WIRE_SIDE = [
  '......kNNk......',
  '......kNNk......',
  '......kq.k......',
  '......k.qk......',
  '......kq.k......',
  '......k.qk......',
  '......kq.k......',
  '......k.qk......',
  '......kNNk......',
  '......kNNk......',
  '......kq.k......',
  '......k.qk......',
  '......kq.k......',
  '......k.qk......',
  '......kq.k......',
  '......k.qk......',
];

// An apple tree, red apples all over it.
const APPLE_TREE = [
  '....hhhhhhhh....',
  '..hhGGGGGGGGhh..',
  '.hGGgGGGGGgGGGh.',
  '.hGgggGGGgppGGh.',
  'hGGppGGGGGPPGGGh',
  'hGGPPGGgGGGGGGGh',
  'hGGGGGgggGGGppGh',
  'hGgGGGGppGGGPPGh',
  '.hGggGGPPGGgggh.',
  '.hGGppGGGGppGGh.',
  '..hhPPGGGGPPhh..',
  '....hhhNNhhh....',
  '......NnnN......',
  '......NnnN......',
  '.....NnnnnN.....',
  '......NNNN......',
];

// A split-rail fence for the horse pen, running east-west and north-south.
const RAIL_FENCE = [
  '................',
  '................',
  '......kkkk......',
  'kkkkkkknNkkkkkkk',
  'nnnnnnknNknnnnnn',
  'NNNNNNknNkNNNNNN',
  'kkkkkkknNkkkkkkk',
  '......knNk......',
  '......knNk......',
  'kkkkkkknNkkkkkkk',
  'nnnnnnknNknnnnnn',
  'NNNNNNknNkNNNNNN',
  'kkkkkkknNkkkkkkk',
  '......knNk......',
  '......kkkk......',
  '................',
];
const RAIL_FENCE_SIDE = [
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '.....kknNkk.....',
  '.....kNNNNk.....',
  '.....kknNkk.....',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
  '......knNk......',
];

const RURAL_MAILBOX = [
  '................',
  '................',
  '....kkkkkk......',
  '...kkqqqqqk.....',
  '...kqqqqqqkp....',
  '...kqqqqqqkpp...',
  '...kqqqqqqkk....',
  '...kQQQQQQk.....',
  '...kkkkkkkk.....',
  '......kNk.......',
  '......kNk.......',
  '......kNk.......',
  '......kNk.......',
  '......kNk.......',
  '.....kkkkk......',
  '................',
];

// ---------- farmhouses ----------

// A standing-seam metal roof.
const METAL_ROOF = Array(16).fill('xxxzxxxzxxxzxxxz');
// The top row, with the ridge cap.
const METAL_RIDGE = ['kkkkkkkkkkkkkkkk', 'zzzzzzzzzzzzzzzz', 'xxxxxxxxxxxxxxxx', 'kkkkkkkkkkkkkkkk', ...METAL_ROOF.slice(4)];
// The bottom row, with white fascia and its shadow on the wall.
const METAL_EAVE = [...METAL_ROOF.slice(0, 13), 'kkkkkkkkkkkkkkkk', 'wwwwwwwwwwwwwwww', 'qqqqqqqqqqqqqqqq'];

// A gabled dormer window poking out of the roof.
const DORMER = [
  '................',
  '.......kk.......',
  '......kwwk......',
  '.....kwwwwk.....',
  '....kwwwwwwk....',
  '...kwwkkkkwwk...',
  '...kwkcccckwk...',
  '...kwkcbbckwk...',
  '...kwkkkkkkwk...',
  '...kwkcbbbkwk...',
  '...kwkcbbbkwk...',
  '...kwkkkkkkwk...',
  '...kwwwwwwwwk...',
  '...kkkkkkkkkk...',
  '................',
  '................',
];

const CHIMNEY = [
  '................',
  '....kkkkkkkk....',
  '....kQQQQQQk....',
  '....kkkkkkkk....',
  '....kRrrRrrk....',
  '....kRRRRRRk....',
  '....krRrrRrk....',
  '....kRRRRRRk....',
  '....kRrrRrrk....',
  '....kRRRRRRk....',
  '....krRrrRrk....',
  '....kRRRRRRk....',
  '....kkkkkkkk....',
  '................',
  '................',
  '................',
];

// Clapboard siding: an upper floor, and a ground floor on a stone foundation.
const CLAPBOARD = [
  'zzzzzzzzzzzzzzzz',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'zzzzzzzzzzzzzzzz',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'zzzzzzzzzzzzzzzz',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'zzzzzzzzzzzzzzzz',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'zzzzzzzzzzzzzzzz',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'zzzzzzzzzzzzzzzz',
];
const CLAPBOARD_BASE = [...CLAPBOARD.slice(0, 13), 'kkkkkkkkkkkkkkkk', 'qQqqqQqqqQqqqQqq', 'QQQQQQQQQQQQQQQQ'];

// A tall double-hung window with shutters ('t' and 'T', recolored per house).
const FARM_WINDOW = [
  '................',
  '.kkkkkkkkkkkkkk.',
  '.ktwwwwwwwwwwtk.',
  '.kTwcbbwwcbbwTk.',
  '.ktwbbbwwbbbwtk.',
  '.kTwbbbwwbbbwTk.',
  '.ktwwwwwwwwwwtk.',
  '.kTwcbbwwcbbwTk.',
  '.ktwbbbwwbbbwtk.',
  '.kTwbBbwwbbBwTk.',
  '.ktwwwwwwwwwwtk.',
  '.kkkkkkkkkkkkkk.',
  '..kwwwwwwwwwwk..',
  '................',
  '................',
  '................',
];

// A paneled front door with a window ('p' and 'P', recolored per house).
const FARM_DOOR = [
  '................',
  '...kkkkkkkkkk...',
  '...kwwwwwwwwk...',
  '...kwpkkkkpwk...',
  '...kwpkcbkpwk...',
  '...kwpkbbkpwk...',
  '...kwpkkkkpwk...',
  '...kwppppppwk...',
  '...kwpPPPPpwk...',
  '...kwpPppPfwk...',
  '...kwpPppPpwk...',
  '...kwpPPPPpwk...',
  '...kwppppppwk...',
  '...kwwwwwwwwk...',
  '..kqqqqqqqqqqk..',
  '..kQQQQQQQQQQk..',
];

// A pine wreath with a red bow, for the grandparents' door.
const WREATH = [
  '................',
  '................',
  '................',
  '......hhhh......',
  '.....hGggGh.....',
  '.....hg..gh.....',
  '.....hG..Gh.....',
  '......hppG......',
  '.......pp.......',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// Porch steps down to the yard.
const PORCH_STEPS = [
  'kooooooooooooook',
  'kooooooooooooook',
  'kOOOOOOOOOOOOOOk',
  'kNNNNNNNNNNNNNNk',
  'kooooooooooooook',
  'kooooooooooooook',
  'kOOOOOOOOOOOOOOk',
  'kNNNNNNNNNNNNNNk',
  'kooooooooooooook',
  'kooooooooooooook',
  'kOOOOOOOOOOOOOOk',
  'kNNNNNNNNNNNNNNk',
  '................',
  '................',
  '................',
  '................',
];

// A rocking chair with a red cushion (on the porch, and in the living room).
const ROCKER = [
  '................',
  '....kkkkkkkk....',
  '....knNnNnNk....',
  '....knNnNnNk....',
  '....knNnNnNk....',
  '....knnnnnnk....',
  '...kkkkkkkkkk...',
  '...kppppppppk...',
  '...kPPPPPPPPk...',
  '...kkkkkkkkkk...',
  '...kN......Nk...',
  '...kN......Nk...',
  '..kkkkkkkkkkkk..',
  '................',
  '................',
  '................',
];

// The porch deck, the same planks as Hannah's (coastTiles.js), with a post
// holding up the porch roof.
const PORCH_POST = [
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '......kwwk......',
  '.....kwwwwk.....',
  '.....kkkkkk.....',
  '................',
  '................',
  '................',
];

// The two houses' colors.
const LEISTER = { x: 'w', z: 'q', t: 'h', T: 'k' };
const GRANDPARENTS = { x: 'y', z: 'Y', t: 'u', T: 'U' };
const LEISTER_ROOF = { x: 'C', z: 'F' };
const GRANDPARENTS_ROOF = { x: 'r', z: 'R' };

// ---------- the barn ----------

// Red board-and-batten walls with a stone foundation.
const BARN_BOARDS = Array(16).fill('pppPpppPpppPpppP');
const BARN_WALL = [...BARN_BOARDS.slice(0, 13), 'kkkkkkkkkkkkkkkk', 'qQqqqQqqqQqqqQqq', 'QQQQQQQQQQQQQQQQ'];

// The hayloft door, open, with hay inside.
const HAYLOFT = [
  'pppPpppPpppPpppP',
  'pppwwwwwwwwwwppP',
  'pppwkkkkkkkkwppP',
  'pppwkfeffefkwppP',
  'pppwkffeffekwppP',
  'pppwkefffefkwppP',
  'pppwkffffffkwppP',
  'pppwkfeffefkwppP',
  'pppwkkkkkkkkwppP',
  'pppwwwwwwwwwwppP',
  'pppPpppPpppPpppP',
  'pppPpppPpppPpppP',
  'pppPpppPpppPpppP',
  'pppPpppPpppPpppP',
  'pppPpppPpppPpppP',
  'pppPpppPpppPpppP',
];

// The left half of the big double doors, white X bracing on red; the right half is its mirror.
const BARN_DOOR = [
  'pppPpppPpppPpppP',
  'pppPpppPpppPpppP',
  'kkkkkkkkkkkkkkkk',
  'wwwwwwwwwwwwwwwk',
  'wwwwpppppppppwwk',
  'wwpwwppppppppwwk',
  'wwppwwpppppppwwk',
  'wwpppwwppppppwwk',
  'wwppppwwpppppwwk',
  'wwpppppwwppppwwk',
  'wwppppppwwpppwwk',
  'wwpppppppwwppwwk',
  'wwppppppppwwpwwk',
  'wwpppppppppwwwwk',
  'wwwwwwwwwwwwwwwk',
  'kkkkkkkkkkkkkkkk',
];

const BARN_WINDOW = [
  '................',
  '................',
  '................',
  '....kkkkkkkk....',
  '....kwwwwwwk....',
  '....kwcbwcbk....',
  '....kwbbwbbk....',
  '....kwwwwwwk....',
  '....kwcbwcbk....',
  '....kwbbwbbk....',
  '....kwwwwwwk....',
  '....kkkkkkkk....',
  '................',
  '................',
  '................',
  '................',
];

// ---------- the greenhouse ----------

const GLASS_ROOF = [
  'kkkkkkkkkkkkkkkk',
  'wwwwwwwwwwwwwwww',
  'wcccwcccwcccwccc',
  'wcccwccbwcccwccb',
  'wccbwcbbwccbwcbb',
  'wcbbwbbbwcbbwbbb',
  'wwwwwwwwwwwwwwww',
  'wcccwcccwcccwccc',
  'wcccwccbwcccwccb',
  'wccbwcbbwccbwcbb',
  'wcbbwbbbwcbbwbbb',
  'wwwwwwwwwwwwwwww',
  'wcccwcccwcccwccc',
  'wccbwccbwccbwccb',
  'kkkkkkkkkkkkkkkk',
  'wwwwwwwwwwwwwwww',
];

// Glass walls with seedlings and potted flowers on the benches inside.
const GLASS_WALL = [
  'wwwwwwwwwwwwwwww',
  'wcccwcccwcccwccc',
  'wccgwgccwcgcwgcc',
  'wcgGwGgcwgGgwGgc',
  'wgGgwgGgwGgGwgGg',
  'wGgGwGgGwgGgwGgG',
  'wwwwwwwwwwwwwwww',
  'wcicwcfcwcvcwcic',
  'wiGiwfGfwvGvwiGi',
  'weeEweeEweeEweeE',
  'wNNNwNNNwNNNwNNN',
  'wcccwcccwcccwccc',
  'wwwwwwwwwwwwwwww',
  'kkkkkkkkkkkkkkkk',
  'qqQqqqQqqqQqqqQq',
  'QQQQQQQQQQQQQQQQ',
];

const GLASS_DOOR = [
  '................',
  '...kkkkkkkkkk...',
  '...kwwwwwwwwk...',
  '...kwccccccwk...',
  '...kwccccccwk...',
  '...kwcwccccwk...',
  '...kwccwcccwk...',
  '...kwccccccwk...',
  '...kwwwwwfwwk...',
  '...kwccccccwk...',
  '...kwccccccwk...',
  '...kwccccccwk...',
  '...kwwwwwwwwk...',
  '...kkkkkkkkkk...',
  '................',
  '................',
];

// ---------- the garage ----------

const GARAGE_DOOR = [
  '................',
  'kkkkkkkkkkkkkkkk',
  'kwwwwwwwwwwwwwwk',
  'kwcckcckcckcckwk',
  'kwkkkkkkkkkkkkwk',
  'kwqqqqqqqqqqqqwk',
  'kwQQQQQQQQQQQQwk',
  'kwqqqqqqqqqqqqwk',
  'kwQQQQQQQQQQQQwk',
  'kwqqqqqqqqqqqqwk',
  'kwQQQQQQQQQQQQwk',
  'kwqqqqqqqqqqqqwk',
  'kwQQQQQkkQQQQQwk',
  'kwqqqqqqqqqqqqwk',
  'kkkkkkkkkkkkkkkk',
  'QQQQQQQQQQQQQQQQ',
];

// ---------- the chicken coop and goat shed ----------

// Plank walls on short legs.
const COOP_WALL = [
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'NNNNNNNNNNNNNNNN',
  'kkkkkkkkkkkkkkkk',
  '.kNk........kNk.',
  '.kkk........kkk.',
];

// The little pop door, with a ramp down to the run.
const COOP_DOOR = [
  '................',
  '................',
  '.....kkkkkk.....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kkkkkkkk....',
  '....kNNNNNNk....',
  '....knnnnnnk....',
  '....kNnNnNnk....',
  '....knnnnnnk....',
  '....kNnNnNnk....',
];

const COOP_WINDOW = [
  '................',
  '................',
  '................',
  '...kkkkkkkkkk...',
  '...kqkqkqkqkk...',
  '...kkqkqkqkqk...',
  '...kqkqkqkqkk...',
  '...kkqkqkqkqk...',
  '...kkkkkkkkkk...',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// The goats' shed: open at the front, with hay inside.
const SHED = [
  'nnnNnnnNnnnNnnnN',
  'nnnNnnnNnnnNnnnN',
  'nnkkkkkkkkkkkknN',
  'nnkNNNNNNNNNNknN',
  'nnkNNNNNNNNNNknN',
  'nnkNNNNNNNNNNknN',
  'nnkNNNNNNNNNNknN',
  'nnkNNNNNNNNNNknN',
  'nnkNNNNNNNNNNknN',
  'nnkNNfNNNNfNNknN',
  'nnkNfefNNfefNknN',
  'nnkfefffeffefknN',
  'nnkfffefffeffknN',
  'kkkkkkkkkkkkkkkk',
  '................',
  '................',
];

// ---------- inside the farmhouses ----------

// Wide honey-colored floorboards.
const PLANKS = [
  'OOOOOnOOOOOOOOOO',
  'OOOOOnOOOOOOOONO',
  'OOOOOnOOOOOOOOOO',
  'nnnnnnnnnnnnnnnn',
  'OOOOOOOOOOOnOOOO',
  'OoOOOOOOOOOnOOOO',
  'OOOOOOOOOOOnOOOO',
  'nnnnnnnnnnnnnnnn',
  'OOnOOOOOOOOOOOOO',
  'OOnOOOOOONOOOOOO',
  'OOnOOOOOOOOOOOOO',
  'nnnnnnnnnnnnnnnn',
  'OOOOOOOnOOOOOOoO',
  'OOOOOOOnOOOOOOOO',
  'ONOOOOOnOOOOOOOO',
  'nnnnnnnnnnnnnnnn',
];

// Dark ceiling beams along the top of the room.
const BEAMS = Array(16).fill('NNNnNNNNNNNnNNNN');

// White shiplap above a chair rail and painted beadboard ('x' and 'z').
const SHIPLAP = [
  'qqqqqqqqqqqqqqqq',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'qqqqqqqqqqqqqqqq',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'qqqqqqqqqqqqqqqq',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'NNNNNNNNNNNNNNNN',
  'nnnnnnnnnnnnnnnn',
  'xxxzxxxzxxxzxxxz',
  'xxxzxxxzxxxzxxxz',
  'xxxzxxxzxxxzxxxz',
  'NNNNNNNNNNNNNNNN',
  'nnnnnnnnnnnnnnnn',
];

// A window with gingham curtains ('p', recolored per house).
const GINGHAM_WINDOW = [
  '................',
  '.kkkkkkkkkkkkkk.',
  '.kpwpwpwpwpwpwk.',
  '.kkkkkkkkkkkkkk.',
  '.kpwkccwcbbkwpk.',
  '.kwpkcwcbbbkpwk.',
  '.kpwkkkkkkkkwpk.',
  '.kwpkcbbbbbkpwk.',
  '.kpwkbbbbbbkwpk.',
  '..kkkkkkkkkkkk..',
  '..kwwwwwwwwwwk..',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// Hooks by the door: a plaid jacket and a straw hat.
const COAT_HOOKS = [
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.kkkkkkkkkkkkkk.',
  '..kkkkk...kkkkk.',
  '.kpPpPpk.kfffffk',
  '.kPpPpPk.keeeeek',
  '.kpPpPpk.kfffffk',
  '.kPpPpPk..kkkkk.',
  '.kpPpPpk........',
  '.kkkkkkk........',
  '................',
  '................',
  '................',
  '................',
];

// Muddy rubber boots on the floor by the door.
const BOOTS = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '..kkk....kkk....',
  '..kGk....kGk....',
  '..kGk....kGk....',
  '..kGk....kGk....',
  '..kGGkk..kGGkk..',
  '..khhhk..khhhk..',
  '..kkkkk..kkkkk..',
  '................',
  '................',
];

// A hutch: plates and canning jars up top (in front of the wall), cupboards below.
const HUTCH_TOP = [
  '................',
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  '.knkkkkkkkkkknk.',
  '.knNuuuNNuuuNnk.',
  '.knNuwuNNuwuNnk.',
  '.knNuuuNNuuuNnk.',
  '.knkkkkkkkkkknk.',
  '.knNkkkNNkkkNnk.',
  '.knNcfcNNcpcNnk.',
  '.knNcfcNNcpcNnk.',
  '.knkkkkkkkkkknk.',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  '.knnnnnnnnnnnnk.',
];
const HUTCH = [
  '.knnnnnnnnnnnnk.',
  '.kkkkkkkkkkkkkk.',
  '.knnnnnkknnnnnk.',
  '.knNNNnkknNNNnk.',
  '.knNnnnkknnnNnk.',
  '.knNnnfkkfnnNnk.',
  '.knNnnnkknnnNnk.',
  '.knNNNnkknNNNnk.',
  '.knnnnnkknnnnnk.',
  '.kkkkkkkkkkkkkk.',
  '.kNk........kNk.',
  '.kkk........kkk.',
  '................',
  '................',
  '................',
  '................',
];

// A cast iron wood stove: its pipe runs up the wall. The fire flickers.
const STOVE_PIPE = [
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '.....kkkkkk.....',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
  '......kQqk......',
];
const WOOD_STOVE = [
  '......kQqk......',
  '......kQqk......',
  '..kkkkkkkkkkkk..',
  '.kQQQQQQQQQQQQk.',
  '.kkkkkkkkkkkkkk.',
  '.kQkkkkkkkkkkQk.',
  '.kQkfepfefpekQk.',
  '.kQkpefffepekQk.',
  '.kQkkkkkkkkkkQk.',
  '.kQQQQQQQQQQQQk.',
  '.kQQQQQQQQQQQQk.',
  '.kkkkkkkkkkkkkk.',
  '..kQk......kQk..',
  '..kkk......kkk..',
  '................',
  '................',
];

// A stone fireplace: the chimney breast and mantel up the wall, the fire below.
const STONE_A = 'qqQqqqqQqq';
const STONE_B = 'QQQQQQQQQQ';
const STONE_C = 'qqqqQqqqqQ';
const breast = (s) => `..k${s}k..`;
const CHIMNEY_BREAST = [
  breast(STONE_A), breast(STONE_A), breast(STONE_B), breast(STONE_C),
  breast(STONE_C), breast(STONE_B), breast(STONE_A), breast(STONE_A),
  breast(STONE_B), breast(STONE_C),
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  breast(STONE_A), breast(STONE_A), breast(STONE_B),
];
const FIREPLACE = [
  breast(STONE_A),
  breast('qkkkkkkkkq'),
  breast('qkNNNNNNkq'),
  breast('qkNNfNNNkq'),
  breast('qkNfefNfkq'),
  breast('qkfepefekq'),
  breast('qkepppepkq'),
  breast('qknNnNNnkq'),
  breast('qkkkkkkkkq'),
  breast(STONE_B),
  '.kkkkkkkkkkkkkk.',
  '.kqqqqqqqqqqqqk.',
  '.kQQQQQQQQQQQQk.',
  '.kkkkkkkkkkkkkk.',
  '................',
  '................',
];
const flicker = (art) => recolor(art, { f: 'e', e: 'f' });

// A grandfather clock: its face against the wall, its pendulum below.
const CLOCK_TOP = [
  '................',
  '....kkkkkkkk....',
  '...kNNNNNNNNk...',
  '...knkkkkkknk...',
  '...knkwwwwknk...',
  '...knwwwkwwnk...',
  '...knwwwkkwnk...',
  '...knwwwwwwnk...',
  '...knkwwwwknk...',
  '...knnkkkknnk...',
  '...knnnnnnnnk...',
  '....knnnnnnk....',
  '....knkkkknk....',
  '....knkcwknk....',
  '....knkckknk....',
  '....knkckknk....',
];
const CLOCK = [
  '....knkckknk....',
  '....knkckknk....',
  '....knkckknk....',
  '....knkffknk....',
  '....knkffknk....',
  '....knkcwknk....',
  '....knkkkknk....',
  '....knnnnnnk....',
  '...kNNNNNNNNk...',
  '...kkkkkkkkkk...',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const BOOKSHELF = [
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.knpuGfeuvpGink.',
  '.knpuGfeuvpGink.',
  '.knpuGfeuvpGink.',
  '.knnnnnnnnnnnnk.',
  '.kneGkuwpfvIunk.',
  '.kneGkuwpfvIunk.',
  '.kneGkuwpfvIunk.',
  '.knnnnnnnnnnnnk.',
  '.knvpuGeUfPwGnk.',
  '.knvpuGeUfPwGnk.',
  '.knvpuGeUfPwGnk.',
  '.knnnnnnnnnnnnk.',
  '.kkkkkkkkkkkkkk.',
  '.kNk........kNk.',
];

// A quilted bed, two tiles long: the headboard and pillows, then the footboard.
const QUILT_A = 'ppuuffiiGGvv';
const QUILT_B = 'ffGGvvppuuii';
const QUILT_C = 'uuiippGGffvv';
const quilt = (s) => `.k${s}k.`;
const BED_HEAD = [
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.knNNNNNNNNNNnk.',
  '.knNnnnnnnnnNnk.',
  '.kkkkkkkkkkkkkk.',
  '.kwwwwwkkwwwwwk.',
  '.kwwwwwkkwwwwwk.',
  '.kqqqqqkkqqqqqk.',
  '.kkkkkkkkkkkkkk.',
  quilt(QUILT_A), quilt(QUILT_A), quilt(QUILT_B), quilt(QUILT_B), quilt(QUILT_C), quilt(QUILT_C), quilt(QUILT_A),
];
const BED_FOOT = [
  quilt(QUILT_A), quilt(QUILT_B), quilt(QUILT_B), quilt(QUILT_C), quilt(QUILT_C), quilt(QUILT_A), quilt(QUILT_A),
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.knNNNNNNNNNNnk.',
  '.kkkkkkkkkkkkkk.',
  '.kNk........kNk.',
  '.kkk........kkk.',
  '................',
  '................',
  '................',
];

// A long farm table: two ends and as many middles as you like, with a pie and a basket of eggs on it.
const TABLE_LEFT = [
  '................',
  '................',
  '..kkkkkkkkkkkkkk',
  '.knnnnnnnnnnnnnn',
  '.knOOOOOOOOOOOOO',
  '.knnnnnnnnnnnnnn',
  '.knnnnnnnnnnnnnn',
  '.knOOOOOOOOOOOOO',
  '.knnnnnnnnnnnnnn',
  '.kNNNNNNNNNNNNNN',
  '.kkkkkkkkkkkkkkk',
  '..kNk...........',
  '..kNk...........',
  '..kNk...........',
  '..kkk...........',
  '................',
];
const TABLE_MIDDLE = [
  '................',
  '................',
  'kkkkkkkkkkkkkkkk',
  'nnnnnnnnnnnnnnnn',
  'OOOOOOOOOOOOOOOO',
  'nnnnnnnnnnnnnnnn',
  'nnnnnnnnnnnnnnnn',
  'OOOOOOOOOOOOOOOO',
  'nnnnnnnnnnnnnnnn',
  'NNNNNNNNNNNNNNNN',
  'kkkkkkkkkkkkkkkk',
  '................',
  '................',
  '................',
  '................',
  '................',
];
const PIE = [
  '................',
  '................',
  '................',
  '....kkkkkkk.....',
  '...kfefefefk....',
  '..kefefefefek...',
  '..kEEEEEEEEEk...',
  '...kkkkkkkkk....',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];
const EGG_BASKET = [
  '................',
  '................',
  '.......kkk......',
  '......k...k.....',
  '....kwdwdwk.....',
  '....kNnNnNk.....',
  '....kNnNnNk.....',
  '.....kkkkk......',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// A ladder-back chair, seen from behind.
const CHAIR = [
  '................',
  '....kkkkkkkk....',
  '....knnnnnnk....',
  '....kkkkkkkk....',
  '....kn....nk....',
  '....kkkkkkkk....',
  '....kn....nk....',
  '....kkkkkkkk....',
  '....kn....nk....',
  '...kkkkkkkkkk...',
  '...knnnnnnnnk...',
  '...kkkkkkkkkk...',
  '....kN....Nk....',
  '....kN....Nk....',
  '....kk....kk....',
  '................',
];

// A braided rag rug in red and cream.
const RAG_RUG = [
  'pPpPpPpPpPpPpPpP',
  'PpPpPpPpPpPpPpPp',
  'yYyYyYyYyYyYyYyY',
  'YyYyYyYyYyYyYyYy',
  'eEeEeEeEeEeEeEeE',
  'EeEeEeEeEeEeEeEe',
  'yYyYyYyYyYyYyYyY',
  'YyYyYyYyYyYyYyYy',
  'pPpPpPpPpPpPpPpP',
  'PpPpPpPpPpPpPpPp',
  'yYyYyYyYyYyYyYyY',
  'YyYyYyYyYyYyYyYy',
  'eEeEeEeEeEeEeEeE',
  'EeEeEeEeEeEeEeEe',
  'yYyYyYyYyYyYyYyY',
  'YyYyYyYyYyYyYyYy',
];

// A woven doormat by the front door.
const DOORMAT = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '..kdDddDddDddk..',
  '..kDddDddDddDk..',
  '..kdDddDddDddk..',
  '..kDddDddDddDk..',
  '..kdDddDddDddk..',
  '..kDddDddDddDk..',
  '..kkkkkkkkkkkk..',
  '................',
  '................',
];

// The kitchen: a butcher block counter over painted cabinets ('x' and 'z'),
// a deep farmhouse sink, a pot simmering over the oven, and the fridge.
const FARM_COUNTER = [
  'kkkkkkkkkkkkkkkk',
  'oooooooOoooooooo',
  'oooooooOoooooooo',
  'OOOOOOOOOOOOOOOO',
  'kkkkkkkkkkkkkkkk',
  'xxxxxxxxxxxxxxxx',
  'xkkkkkkxxkkkkkkx',
  'xkxxxxkxxkxxxxkx',
  'xkxxfxkxxkxfxxkx',
  'xkxxxxkxxkxxxxkx',
  'xkxxxxkxxkxxxxkx',
  'xkkkkkkxxkkkkkkx',
  'xxxxxxxxxxxxxxxx',
  'zzzzzzzzzzzzzzzz',
  'kkkkkkkkkkkkkkkk',
  '................',
];
const APRON_SINK = [
  '.......kk.......',
  '..kkkkkkkkkkkk..',
  '..kwqqqqqqqqwk..',
  '..kwqbbcbbbqwk..',
  '..kwqqqqqqqqwk..',
  '..kwwwwwwwwwwk..',
  '..kwwwwwwwwwwk..',
  '..kwwwwwwwwwwk..',
  '..kwwwwwwwwwwk..',
  '..kqqqqqqqqqqk..',
  '..kkkkkkkkkkkk..',
  '................',
  '................',
  '................',
  '................',
  '................',
];
const OVEN = [
  '....w.w.........',
  '...kkkkkk.......',
  '..kQQQQQQk......',
  '..kkkkkkkk......',
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.kQQQQQQQQQQQQk.',
  '.kQkkkkkkkkkkQk.',
  '.kQkEEEEEEEEkQk.',
  '.kQkkkkkkkkkkQk.',
  '.kQQQQQQQQQQQQk.',
  '.kkkkkkkkkkkkkk.',
  '................',
  '................',
  '................',
];
const FRIDGE_TOP = [
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxkxk.',
  '.kxxxxxxxxxxkxk.',
  '.kxxxxxxxxxxkxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxkwwwkxxxxxxk.',
  '.kxkwpwkxxfxxxk.',
  '.kxkkkkkxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kzzzzzzzzzzzzk.',
  '.kkkkkkkkkkkkkk.',
  '.kxxxxxxxxxxxxk.',
];
const FRIDGE = [
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxkxk.',
  '.kxxxxxxxxxxkxk.',
  '.kxxxxxxxxxxkxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kxxxxxxxxxxxxk.',
  '.kzzzzzzzzzzzzk.',
  '.kkkkkkkkkkkkkk.',
  '..kk........kk..',
  '................',
  '................',
];

// The two kitchens' and walls' colors.
const LEISTER_INSIDE = { x: 'u', z: 'U' };     // navy cabinets and beadboard
const GRANDPARENTS_INSIDE = { x: 'G', z: 'h' }; // sage green
const WHITE_FRIDGE = { x: 'w', z: 'q' };
const MINT_FRIDGE = { x: 'c', z: 'q' };       // the grandparents' old fridge

// ---------- the tile table (merged into tiles.js) ----------

const leister = (art) => recolor(art, LEISTER);
const grand = (art) => recolor(art, GRANDPARENTS);
const leisterWall = recolor(SHIPLAP, LEISTER_INSIDE);
const grandWall = recolor(SHIPLAP, GRANDPARENTS_INSIDE);

export const FARM_DEFS = {
  gravel:      { art: GRAVEL, perch: true },
  bamboo:      { art: BAMBOO, solid: true, perch: true },
  bambooTop:   { art: BAMBOO_TOP, base: 'grass', solid: true, perch: true },
  crops:       { art: CROPS, perch: true },
  hayBale:     { art: HAY_BALE, base: 'grass', solid: true },
  hayBaleDirt: { art: HAY_BALE, base: 'dirt', solid: true },
  trough:      { art: TROUGH, base: 'dirt', solid: true },
  spool:       { art: SPOOL, base: 'dirt', solid: true },
  scarecrow:   { art: SCARECROW, base: 'crops', solid: true },
  railFence:   { art: RAIL_FENCE, base: 'grass', solid: true },
  railFenceSide: { art: RAIL_FENCE_SIDE, base: 'grass', solid: true },
  appleTree:   { art: APPLE_TREE, base: 'grass', solid: true },
  chickenWire: { art: CHICKEN_WIRE, base: 'grass', solid: true },
  chickenWireSide: { art: CHICKEN_WIRE_SIDE, base: 'grass', solid: true },
  ruralMailbox: { art: RURAL_MAILBOX, base: 'grass', solid: true },

  // The Leisters' farmhouse: white, with a dark gray roof and a red door.
  slateRoof:      { art: recolor(METAL_ROOF, LEISTER_ROOF), solid: true },
  slateRidge:     { art: recolor(METAL_RIDGE, LEISTER_ROOF), solid: true },
  slateChimney:   { art: stamp(recolor(METAL_RIDGE, LEISTER_ROOF), CHIMNEY), solid: true },
  slateDormer:    { art: stamp(recolor(METAL_ROOF, LEISTER_ROOF), DORMER), solid: true },
  slateEave:      { art: recolor(METAL_EAVE, LEISTER_ROOF), solid: true },
  whiteSiding:    { art: leister(CLAPBOARD), solid: true },
  whiteSidingBase: { art: leister(CLAPBOARD_BASE), solid: true },
  whiteWindow:    { art: leister(stamp(CLAPBOARD, FARM_WINDOW)), solid: true, glow: 1 },
  whiteWindowBase: { art: leister(stamp(CLAPBOARD_BASE, FARM_WINDOW)), solid: true, glow: 1 },
  leisterDoor:    { art: leister(stamp(CLAPBOARD_BASE, FARM_DOOR)) },  // walkable: the map puts a warp on it

  // The grandparents' farmhouse: butter yellow, with a red roof and a blue door.
  redRoof:        { art: recolor(METAL_ROOF, GRANDPARENTS_ROOF), solid: true },
  redRidge:       { art: recolor(METAL_RIDGE, GRANDPARENTS_ROOF), solid: true },
  redChimney:     { art: stamp(recolor(METAL_RIDGE, GRANDPARENTS_ROOF), recolor(CHIMNEY, { r: 'q', R: 'Q' })), solid: true },
  redDormer:      { art: stamp(recolor(METAL_ROOF, GRANDPARENTS_ROOF), DORMER), solid: true },
  redEave:        { art: recolor(METAL_EAVE, GRANDPARENTS_ROOF), solid: true },
  yellowSiding:   { art: grand(CLAPBOARD), solid: true },
  yellowSidingBase: { art: grand(CLAPBOARD_BASE), solid: true },
  yellowWindow:   { art: grand(stamp(CLAPBOARD, FARM_WINDOW)), solid: true, glow: 1 },
  yellowWindowBase: { art: grand(stamp(CLAPBOARD_BASE, FARM_WINDOW)), solid: true, glow: 1 },
  grandparentsDoor: { art: grand(stamp(CLAPBOARD_BASE, stamp(recolor(FARM_DOOR, { p: 'u', P: 'U' }), WREATH))) },

  porchPost:   { art: PORCH_POST, base: 'porch', solid: true },
  porchRocker: { art: ROCKER, base: 'porch', solid: true },
  porchSteps:  { art: PORCH_STEPS, base: 'grass' },

  // The grandparents' red barn, with a grey roof.
  greyRoof:    { art: recolor(METAL_ROOF, { x: 'q', z: 'Q' }), solid: true },
  greyRidge:   { art: recolor(METAL_RIDGE, { x: 'q', z: 'Q' }), solid: true },
  greyEave:    { art: recolor(METAL_EAVE, { x: 'q', z: 'Q' }), solid: true },
  barnBoards:  { art: BARN_BOARDS, solid: true },
  hayloft:     { art: HAYLOFT, solid: true },
  barnWall:    { art: BARN_WALL, solid: true },
  barnWindow:  { art: stamp(BARN_WALL, BARN_WINDOW), solid: true, glow: 1 },
  barnDoorLeft:  { art: BARN_DOOR, solid: true },   // closed: give it sign text
  barnDoorRight: { art: mirror(BARN_DOOR), solid: true },

  // The greenhouse.
  glassRoof:   { art: GLASS_ROOF, solid: true },
  glassWall:   { art: GLASS_WALL, solid: true },
  glassDoor:   { art: stamp(GLASS_WALL, GLASS_DOOR), solid: true },  // give it sign text

  // The garage (white like the house, with a dark gray roof).
  garageDoor:  { art: leister(stamp(CLAPBOARD_BASE, GARAGE_DOOR)), solid: true },

  // The chicken coop (red roof) and the goats' shed.
  coopWall:    { art: COOP_WALL, base: 'dirt', solid: true },
  coopDoor:    { art: stamp(COOP_WALL, COOP_DOOR), base: 'dirt', solid: true },
  coopWindow:  { art: stamp(COOP_WALL, COOP_WINDOW), base: 'dirt', solid: true, glow: 1 },
  goatShed:    { art: SHED, base: 'dirt', solid: true },

  // Inside both farmhouses.
  planks:      { art: PLANKS },
  beams:       { art: BEAMS, solid: true },
  braidedRug:  { art: RAG_RUG },
  bedHead:     { art: BED_HEAD, base: 'planks', solid: true, rest: true },
  bedFoot:     { art: BED_FOOT, base: 'planks', solid: true, rest: true },
  farmTableLeft:  { art: TABLE_LEFT, base: 'planks', solid: true },
  farmTableRight: { art: mirror(TABLE_LEFT), base: 'planks', solid: true },
  farmTable:   { art: TABLE_MIDDLE, base: 'planks', solid: true },
  tablePie:    { art: stamp(TABLE_MIDDLE, PIE), base: 'planks', solid: true },
  tableEggs:   { art: stamp(TABLE_MIDDLE, EGG_BASKET), base: 'planks', solid: true },
  chair:       { art: CHAIR, base: 'planks', solid: true },
  rockingChair: { art: ROCKER, base: 'braidedRug', solid: true },
  bookshelf:   { art: BOOKSHELF, base: 'planks', solid: true },
  hutch:       { art: HUTCH, base: 'planks', solid: true },
  boots:       { art: stamp(PLANKS, BOOTS) },
  doormat:     { art: stamp(PLANKS, DOORMAT) },  // the map puts the exit warp on it
  clock:      { art: CLOCK, base: 'planks', solid: true },

  // The Leisters' walls: white shiplap over navy beadboard.
  leisterWall:    { art: leisterWall, solid: true },
  leisterWindow:  { art: stamp(leisterWall, GINGHAM_WINDOW), solid: true, pane: true },
  leisterHooks:   { art: stamp(leisterWall, COAT_HOOKS), solid: true },
  leisterHutch:   { art: stamp(leisterWall, HUTCH_TOP), solid: true },
  leisterPipe:    { art: stamp(leisterWall, STOVE_PIPE), solid: true },
  leisterFridgeTop: { art: stamp(leisterWall, recolor(FRIDGE_TOP, WHITE_FRIDGE)), solid: true },
  leisterFridge:  { art: recolor(FRIDGE, WHITE_FRIDGE), base: 'planks', solid: true },
  leisterCounter: { art: recolor(FARM_COUNTER, LEISTER_INSIDE), base: 'planks', solid: true },
  leisterSink:    { art: recolor(stamp(FARM_COUNTER, APRON_SINK), LEISTER_INSIDE), base: 'planks', solid: true },
  leisterOven:    { art: recolor(stamp(FARM_COUNTER, OVEN), LEISTER_INSIDE), base: 'planks', solid: true },
  woodStove:   { frames: [WOOD_STOVE, flicker(WOOD_STOVE)], frameTime: 0.3, base: 'planks', solid: true },

  // The grandparents' walls: white shiplap over sage beadboard, blue gingham curtains.
  grandWall:      { art: grandWall, solid: true },
  grandWindow:    { art: stamp(grandWall, recolor(GINGHAM_WINDOW, { p: 'u' })), solid: true, pane: true },
  grandHooks:     { art: stamp(grandWall, recolor(COAT_HOOKS, { p: 'u', P: 'U' })), solid: true },
  grandHutch:     { art: stamp(grandWall, HUTCH_TOP), solid: true },
  grandMantel:    { art: stamp(grandWall, CHIMNEY_BREAST), solid: true },
  grandClockTop:  { art: stamp(grandWall, CLOCK_TOP), solid: true },
  grandFridgeTop: { art: stamp(grandWall, recolor(FRIDGE_TOP, MINT_FRIDGE)), solid: true },
  grandFridge:    { art: recolor(FRIDGE, MINT_FRIDGE), base: 'planks', solid: true },
  grandCounter:   { art: recolor(FARM_COUNTER, GRANDPARENTS_INSIDE), base: 'planks', solid: true },
  grandSink:      { art: recolor(stamp(FARM_COUNTER, APRON_SINK), GRANDPARENTS_INSIDE), base: 'planks', solid: true },
  grandOven:      { art: recolor(stamp(FARM_COUNTER, OVEN), GRANDPARENTS_INSIDE), base: 'planks', solid: true },
  fireplace:   { frames: [FIREPLACE, flicker(FIREPLACE)], frameTime: 0.3, base: 'planks', solid: true },
};
