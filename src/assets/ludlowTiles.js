// Tiles for snowy Vermont, starting with Ludlow: snowbanks heaped along the
// roads, plowed roads with tire tracks, shoveled sidewalks, the railroad
// through the snow (and its bumper), snow-covered house roofs, a bridge's
// railings over the creek, the stone wing on the inn with the way down to
// Eight Oh Brew, a snowman, and a frozen pond. Plain snow and snowy pines are
// in caveTiles.js (from Eagle Peak's summit); snowy lamp posts, fences and
// signs are in tiles.js; a storefront() can have a snowy roof (storeTiles.js).
// Regions marked `snowy` (data/regions.js) turn the day's weather into snow.
import { recolor, mirror, stamp } from '../gfx/sprite.js';
import { FARM_DEFS } from './farmTiles.js';
import { CANAL_DEFS } from './canalTiles.js';
import { WALL_LANTERN } from './storeTiles.js';

const BLANK = '................';

/** Rows turned on their side: a north-south tile becomes east-west. */
const turn = (rows) => [...rows[0]].map((_, x) => rows.map((r) => r[x]).join(''));

// A heaped bank of plowed snow, lumpy on top, with a blue-gray shadow under it.
const SNOWBANK = [
  BLANK,
  BLANK,
  '...WWW....WWW...',
  '..WwwwW..WwwwW..',
  '.WwwwwwWWwwwwwW.',
  'WwwwwwwwwwwwwwwW',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwcwww',
  'wwcwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'WwwwwwwwwwwwwwwW',
  'WWWwwwwwwwwwwWWW',
  'qWWWWWWWWWWWWWWq',
  'qqqqqqqqqqqqqqqq',
  BLANK,
];

// A plowed road: packed gray slush with two tire tracks and flecks of snow, running north-south.
const PLOWED = [
  'qqqQQqqqqqqQQqwq',
  'qwqQQqqqqqqQQqqq',
  'qqqQQqqqwqqQQqqq',
  'qqqQQqqqqqqQQqqq',
  'qqqQQqqqqqqQQqqw',
  'wqqQQqqqqqqQQqqq',
  'qqqQQqwqqqqQQqqq',
  'qqqQQqqqqqqQQqqq',
  'qqqQQqqqqqqQQwqq',
  'qqqQQqqqqqqQQqqq',
  'qqwQQqqqqqqQQqqq',
  'qqqQQqqqqwqQQqqq',
  'qqqQQqqqqqqQQqqq',
  'qqqQQqqqqqqQQqqw',
  'qwqQQqqqqqqQQqqq',
  'qqqQQqqqwqqQQqqq',
];

// The railroad east-west: two steel rails over wooden ties, with snow caught on them.
const TRACK_EW = Array.from({ length: 16 }, (_, y) => [...BLANK].map((_, x) => {
  if (y === 3 || y === 11) return 'w';
  if (y === 4 || y === 12) return 'Q';
  if (y < 1 || y > 14 || x % 4 === 0 || x % 4 === 3) return '.';
  if ((x + y) % 5 === 0) return 'w'; // snow on the ties
  return x % 4 === 1 ? 'N' : 'n';
}).join(''));

// The end of a line that comes up from the south: the rails run up into a striped buffer beam with snow on top.
const BUMPER_SOUTH = [
  BLANK,
  BLANK,
  '...wwwwwwwwww...',
  '.kkkkkkkkkkkkkk.',
  '.kppwwppwwppwwk.',
  '.kwwppwwppwwppk.',
  '.kkkkkkkkkkkkkk.',
];

// ---------- Okemo, the ski mountain ----------

// A groomed slope: corduroy lines across fresh snow.
const CORDUROY = Array.from({ length: 16 }, (_, y) => [...BLANK].map((_, x) => (y % 3 === 2 && (x + y) % 9 !== 0 ? 'W' : (x * 5 + y * 7) % 37 === 0 ? 'c' : 'w')).join(''));

// A jump: a packed-snow kicker with orange marker poles either side of its lip. Hit it with some speed and you fly.
const KICKER = [
  ...CORDUROY.slice(0, 2),
  '...qWWWWWWWWq...',
  ...Array(6).fill('..qWwwwwwwwwWq..'),
  '.eqWwwwwwwwwWqe.',
  '.eqkkkkkkkkkkqe.',
  '.EQQQQQQQQQQQQE.',
  '..QQQQQQQQQQQQ..',
  ...CORDUROY.slice(13),
];

// A slalom gate on THE CHUTE (data/races.js): a pole with a pennant pointing the side you pass it on.
// Red points left: keep LEFT of it. The blue one (gateRight) is this mirrored.
const GATE_LEFT = Array.from({ length: 16 }, (_, y) => [...BLANK].map((_, x) => {
  if (y <= 14 && (x === 7 || x === 8)) return x === 7 ? 'q' : 'k';
  const reach = 7 - Math.abs(y - 4) * 2; // the pennant, rows 1-7, longest at row 4
  if (y >= 1 && y <= 7 && x < 7 && x >= 7 - reach) return x === 7 - reach ? 'k' : y > 4 ? 'P' : 'p';
  if (y === 15 && x >= 5 && x <= 10) return 'W';
  return '.';
}).join(''));

// Moguls: a field of round bumps, each lit on top and shadowed below.
const BUMP = ['.wwww.', 'wwwwww', 'WWWWWW', '.qqqq.'];
const MOGULS = [[1, 1], [9, 3], [4, 8], [11, 11]].reduce((rows, [bx, by]) => rows.map((r, y) => {
  const b = BUMP[y - by];
  return b ? [...r].map((ch, x) => (b[x - bx] && b[x - bx] !== '.' ? b[x - bx] : ch)).join('') : r;
}), CORDUROY);

// Powder: ungroomed snow in soft drifts, each with a shadowed lee under its crest, and a sparkle or two.
const POWDER = Array.from({ length: 16 }, (_, y) => [...BLANK].map((_, x) => {
  const crest = [[2, 1, 6], [7, 8, 14], [12, 0, 4], [12, 11, 15]].find(([cy, x0, x1]) => x >= x0 && x <= x1 && (y === cy || y === cy + 1));
  if (crest) return y === crest[0] ? (x === crest[1] || x === crest[2] ? 'W' : 'w') : 'W';
  return (x * 5 + y * 3) % 41 === 0 ? 'c' : 'w';
}).join(''));

// A trail sign on a post: the run's symbol in `c` on a white board.
const trailSign = (symbol, c) => [
  BLANK,
  '...kkkkkkkkkk...',
  ...symbol.map((r) => `...kw${r.replace(/X/g, c)}wk...`),
  '...kkkkkkkkkk...',
  ...Array(5).fill('.......NN.......'),
  '......kNNk......',
  BLANK,
];
const CIRCLE = ['wwwwww', 'wwXXww', 'wXXXXw', 'wXXXXw', 'wwXXww', 'wwwwww'];
const SQUARE = ['wwwwww', 'wXXXXw', 'wXXXXw', 'wXXXXw', 'wXXXXw', 'wwwwww'];
const DIAMOND = ['wwXXww', 'wXXXXw', 'XXXXXX', 'XXXXXX', 'wXXXXw', 'wwXXww'];

// The chairlift runs north-south: two cables (up on the west, down on the east) between steel towers.
const CABLES = Array.from({ length: 16 }, () => '...k........k...');
const chairAt = (rows, x, y) => rows.map((r, i) => (i >= y && i < y + 3 ? r.slice(0, x) + ['kuuk', 'kuuk', '.kk.'][i - y] + r.slice(x + 4) : r));
const TOWER = [
  BLANK,
  '.kkkkkkkkkkkkkk.',
  '.kQQQQQQQQQQQQk.',
  '.kkkkkkqQkkkkkk.',
  ...Array(10).fill('.......qQ.......'),
  '......kqQk......',
  '.....kkkkkk.....',
];
// A wooden deck where the chairs swing around: you get on at the bottom and off at the top.
const LIFT_DECK = [
  ...Array(2).fill('...k........k...'),
  '..kkkkkkkkkkkk..',
  ...Array(11).fill('..knnnnNnnnnnk..'),
  '..kNNNNNNNNNNk..',
  '..kkkkkkkkkkkk..',
];

// A shoveled sidewalk: packed snow, a shade grayer than fresh.
const SHOVELED = Array.from({ length: 16 }, (_, y) => [...BLANK].map((_, x) => ((x * 7 + y * 5) % 23 === 0 ? 'w' : (x * 3 + y * 11) % 31 === 0 ? 'q' : 'W')).join(''));

// The west railing of a bridge over the creek, north-south: wooden posts and a rail, the deck's edge beside it.
const BRIDGE_RAIL = Array.from({ length: 16 }, (_, y) => (y % 4 === 0 ? '........kNNNkqqq' : '.........knNkqqq'));

// Eight Oh Brew's way in: a fieldstone wing on the side of the Ludlow Inn,
// with an arched doorway and stairs down toward a warm glow, a hanging "802"
// sign above it and a lantern beside it.
const STONE = CANAL_DEFS.fieldstone.art;
const CELLAR_ARCH = [
  STONE[0],
  '....kkkkkkkk....',
  '...kkHHHHHHkk...',
  '..kkHHaaaaHHkk..',
  '..kHHaffffaHHk..',
  '..kHHHaaaaHHHk..',
  '..kHHHHHHHHHHk..',
  '..kCCCCCCCCCCk..',
  '..kHHHHHHHHHHk..',
  '..kKKKKKKKKKKk..',
  '..kCCCCCCCCCCk..',
  '..kQQQQQQQQQQk..',
  '..kqqqqqqqqqqk..',
  '..kQQQQQQQQQQk..',
  '..kqqqqqqqqqqk..',
  '..kqqqqqqqqqqk..',
];
const HANGING_802 = [
  '....N......N....',
  '....N......N....',
  '.kkkkkkkkkkkkkk.',
  '.kkiiikiiikiiik.',
  '.kkikikikikkkik.',
  '.kkiiikikikiiik.',
  '.kkikikikikikkk.',
  '.kkiiikiiikiiik.',
  '.kkkkkkkkkkkkkk.',
  ...Array(7).fill(BLANK),
];

// Snow on a house's metal roof (the farmhouses' roofs in farmTiles.js, gone white).
const SNOW_ON = { r: 'w', R: 'W' };

// A snowman in a black hat and a red scarf, with a carrot nose.
const SNOWMAN = [
  '......kkkk......',
  '......kNNk......',
  '....kkkkkkkk....',
  '.....kwwwwk.....',
  '....kwkwwkwk....',
  '....kwwweeek....',
  '.....kwwwwk.....',
  '....kppppppk....',
  '...kwwwPwwwwk...',
  '..kwwwwwwwwwwk..',
  '..kwwwwkwwwwWk..',
  '..kwwwwwwwwwWk..',
  '..kwwwwkwwwWWk..',
  '...kwwwwwwWWk...',
  '....kkkkkkkk....',
  BLANK,
];

// A frozen pond: pale ice with glints and a few cracks.
const ICE = [
  'cccccccccccccccc',
  'ccwccccccccccccc',
  'cccwccccccccbccc',
  'ccccwcccccccbccc',
  'cccccccccccbcccc',
  'cccccccccccbcccc',
  'ccccccccccbccccc',
  'cccccccccccccccc',
  'cccccccccccccwcc',
  'cbcccccccccccwcc',
  'ccbcccccccccccwc',
  'ccbbcccccccccccc',
  'cccccccwcccccccc',
  'ccccccccwccccccc',
  'ccccccccccccccbc',
  'cccccccccccccccc',
];

// The ski patrol's rope line across the way north off the summit: bamboo poles, a sagging orange rope, red pennants.
const SKI_ROPE = [
  '................',
  '................',
  '................',
  '.kk..........kk.',
  '.kfk........kfk.',
  '.kak........kak.',
  '.kfkee....eekfk.',
  '.kak..eeeeeekak.',
  '.kfk..p..p..kfk.',
  '.kak..pp.pp.kak.',
  '.kfk........kfk.',
  '.kak........kak.',
  '.kfk........kfk.',
  '.WkW........WkW.',
  '................',
  '................',
];

// TAMARACK BOG, past the ropes: snow over the bog with tufts of dead sedge poking through.
const BOG_GRASS = [
  '................',
  '..d.D...........',
  '..dDd.......D.d.',
  '.WWWWW......dDd.',
  '...........WWWWW',
  '................',
  '................',
  '......d.D.......',
  '......dDD.......',
  '.....WWWWW......',
  '................',
  '.D.d............',
  '.dDd............',
  'WWWWW...........',
  '................',
  '................',
];

// A dead tamarack snag, gray and bare, its broken branches sticking out.
const SNAG = [
  '.......kk.......',
  '......kqQk......',
  '......kqQk......',
  '..kk..kqQk......',
  '...kk.kqQk..kk..',
  '....kkkqQkkk....',
  '......kqQkk.....',
  '......kqQk......',
  '...kkkkqQk......',
  '.....kkqQk......',
  '......kqQk......',
  '......kqQk......',
  '.....kqqQQk.....',
  '....kqqqQQQk....',
  '...WWkkkkkkWW...',
  '................',
];

// DANIEL's shelter: a log lean-to with snow on its roof, dark inside, spruce boughs on the floor. Two tiles wide.
const LEAN_TO = [
  '................................',
  '..wwwwwwwwwwwwwwwwwwwwwwwwwwww..',
  '.wwwwwwwwwwwwwwwwwwwwwwwwwwwwww.',
  'kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk',
  'knnnNnnnNnnnNnnnNnnnNnnnNnnnNnnk',
  'kNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNk',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkHHHHHHHHHHHHHHHHHHHHHHHHknk.',
  '.knkhGhhhGhhhGhhhGhhhGhhhGhhknk.',
  '.WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW.',
  '................................',
];

// A little campfire in a ring of stones, its flames flickering between two frames.
const FIRE = [[
  '................',
  '................',
  '................',
  '................',
  '................',
  '.......f........',
  '......fpf.......',
  '.....fpfpf......',
  '.....pfffp......',
  '....kpfwfpk.....',
  '...qQnNnNnQq....',
  '..qQq.kkk.qQq...',
  '...qQqqqqqQq....',
  '....WWWWWWW.....',
  '................',
  '................',
], [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '.......f.f......',
  '......fpfp......',
  '.....pffffp.....',
  '....kpfwfpk.....',
  '...qQnNnNnQq....',
  '..qQq.kkk.qQq...',
  '...qQqqqqqQq....',
  '....WWWWWWW.....',
  '................',
  '................',
]];

export const LUDLOW_DEFS = {
  snowbank:   { art: SNOWBANK, base: 'snow', solid: true },
  plowedRoad: { art: PLOWED, perch: true },          // north-south
  plowedRoadEW: { art: turn(PLOWED), perch: true },
  shoveled:   { art: SHOVELED, perch: true },
  snowyRailEW: { art: TRACK_EW, base: 'snow', perch: true },
  snowyRail:  { art: turn(TRACK_EW), base: 'snow', perch: true },           // north-south
  snowyRailBumper: { art: [...BUMPER_SOUTH, ...turn(TRACK_EW).slice(BUMPER_SOUTH.length)], base: 'snow', solid: true }, // give it sign text
  // Snowy roofs for any house: ridge, roof, chimney and eave rows, over the farmhouse sidings.
  snowRidge:  { art: recolor(FARM_DEFS.redRidge.art, SNOW_ON), solid: true },
  snowRoof:   { art: recolor(FARM_DEFS.redRoof.art, SNOW_ON), solid: true },
  snowChimney: { art: recolor(FARM_DEFS.redChimney.art, SNOW_ON), solid: true },
  snowEave:   { art: recolor(FARM_DEFS.redEave.art, SNOW_ON), solid: true },
  bridgeRailW: { art: BRIDGE_RAIL, base: 'water', solid: true },
  bridgeRailE: { art: mirror(BRIDGE_RAIL), base: 'water', solid: true },
  cellarArch: { art: stamp(STONE, CELLAR_ARCH), glow: 1.5 },  // walkable: the map puts the warp down on it
  cellarSign: { art: stamp(STONE, HANGING_802), solid: true, glow: 1 },  // give it sign text
  cellarLanternStone: { art: stamp(STONE, WALL_LANTERN), solid: true, glow: 2, flicker: true },
  snowman:    { art: SNOWMAN, base: 'snow', solid: true },  // give it sign text
  // Okemo (maps/okemo.js). On a `slope`, skis slide you downhill (Overworld.slideStep).
  slope:      { art: CORDUROY, perch: true, slope: true },
  jump:       { art: stamp(CORDUROY, KICKER), slope: true, jump: true },
  moguls:     { art: MOGULS, perch: true, slope: true, moguls: true },
  powder:     { art: POWDER, perch: true, slope: true },  // the glades: ungroomed, slides like a slope
  gateLeft:   { art: stamp(CORDUROY, GATE_LEFT), solid: true },  // ski into one and you wipe out
  gateRight:  { art: stamp(CORDUROY, recolor(mirror(GATE_LEFT), { p: 'u', P: 'U' })), solid: true },
  trailGreen: { art: trailSign(CIRCLE, 'g'), base: 'snow', solid: true },  // give it sign text
  trailBlue:  { art: trailSign(SQUARE, 'u'), base: 'snow', solid: true },
  trailBlack: { art: trailSign(DIAMOND, 'k'), base: 'snow', solid: true },
  liftCable:  { frames: [0, 5, 10].map((y) => chairAt(chairAt(CABLES, 2, 12 - y), 10, y)), frameTime: 0.4, base: 'snow', solid: true },
  liftCrossing: { frames: [0, 5, 10].map((y) => stamp(CORDUROY, chairAt(chairAt(CABLES, 2, 12 - y), 10, y))), frameTime: 0.4, slope: true },  // where a run passes under the lift
  liftTower:  { art: stamp(CABLES, TOWER), base: 'snow', solid: true },
  liftDeck:   { art: chairAt(LIFT_DECK, 2, 0), base: 'snow' },  // walkable: the bottom one asks if you want to ride up
  ice:        { art: ICE, solid: true },             // give it sign text: too thin to walk on
  skiRope:    { art: SKI_ROPE, base: 'snow', solid: true },  // a gate's `locked.tile`: closed till ski patrol drops it
  bogGrass:   { art: BOG_GRASS, base: 'snow', perch: true },
  snag:       { art: SNAG, base: 'snow', solid: true },
  leanToW:    { art: LEAN_TO.map((r) => r.slice(0, 16)), base: 'snow', solid: true },
  leanToE:    { art: LEAN_TO.map((r) => r.slice(16)), base: 'snow', solid: true },
  campfire:   { frames: FIRE, frameTime: 0.25, base: 'snow', solid: true, glow: 2, flicker: true },
};
