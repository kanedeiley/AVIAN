// Shops, outside and in.
//
// Outside: storefront() builds a shop's whole front as a prop (maps/index.js):
// a red tin roof, a signboard lettered with the shop's name, upper windows, and
// a striped awning over display windows and a door. Any map can have one:
//
//   storefront('bakeryFront', 'BAKERY', 3, ['books'])   // here, once
//   props: [{ x: 10, y: 4, id: 'bakeryFront' }]          // in the map
//
// then put a warp on the door (the middle of the bottom row, which is walkable).
//
// Inside: wood floors, cream walls lined with shelves of goods, a counter with
// a register (talk to the shopkeeper across it: tiles with `counter`), shelving
// units, and things on display. Any shop's interior can use them.
import { stamp } from '../gfx/sprite.js';
import { TINY } from '../gfx/ui.js';
import { bigProp, COAST_DEFS } from './coastTiles.js';
import { BIKE_SIDE, SEED_SACK } from './items.js';

export const STORE_DEFS = {};

const BLANK = '................';

// ---------- outside ----------

const TIN_ROOF = [
  'RRRRRRRRRRRRRRRR',
  ...Array(12).fill('rprRrprRrprRrprR'),
  'RRRRRRRRRRRRRRRR',
  'kkkkkkkkkkkkkkkk',
  'NNNNNNNNNNNNNNNN',
];

// The same roof under a heap of snow, with icicles off the eave.
const SNOWY_ROOF = [
  'kkkkkkkkkkkkkkkk',
  'wwwwwwwwwwwwwwww',
  'wwwWwwwwwwwwwwww',
  'wwwwwwwwwwWwwwww',
  'WwwwwwWwwwwwwwwW',
  'WWwwwWWWwwwWwwWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'qWWWWqWWWWWqWWWW',
  'rprWWprRrWWRrprR',
  ...Array(3).fill('rprRrprRrprRrprR'),
  'RRRRRRRRRRRRRRRR',
  'kkkkkkkkkkkkkkkk',
  'NcNNNNNcNNNNcNNN',
];

// Wooden boards, four to a tile.
const SIDING = Array.from({ length: 16 }, (_, y) => (y % 4 === 3 ? 'OOOOOOOOOOOOOOOO' : 'oooooooooooooooo'));

const UPPER_WINDOW = [
  BLANK,
  BLANK,
  '...NNNNNNNNNN...',
  '...NccccNcccN...',
  '...NcBBcNcBcN...',
  '...NcBBBNBBBN...',
  '...NNNNNNNNNN...',
  '...NcBBBNBcBN...',
  '...NBBcBNBBBN...',
  '...NBBBBNBBBN...',
  '...NNNNNNNNNN...',
  '..wwwwwwwwwwww..',
  '..YYYYYYYYYYYY..',
  BLANK,
  BLANK,
  BLANK,
];

// A green-and-white awning along the top of the ground floor.
const AWNING = [
  'kkkkkkkkkkkkkkkk',
  'ggwwggwwggwwggww',
  'ggwwggwwggwwggww',
  'GGqqGGqqGGqqGGqq',
  'kGGkkqqkkGGkkqqk',
  '.kk..kk..kk..kk.',
  ...Array(10).fill(BLANK),
];

// A display window with a shelf, under the awning; `goods` are 4 rows sat on the shelf.
const display = (goods) => [
  ...Array(6).fill(BLANK),
  '.NNNNNNNNNNNNNN.',
  '.NcBBBBBBBBBBBN.',
  ...stamp(Array(4).fill('.NBBBBBBBBBBBBN.'), goods),
  '.NnnnnnnnnnnnnN.',
  '.NNNNNNNNNNNNNN.',
  '.wwwwwwwwwwwwww.',
  BLANK,
];

// What's in a shop's windows: storefront() takes a list of these.
const DISPLAYS = {
  // A pair of binoculars and a camera.
  optics: display([
    '..kk..kk..kk....',
    '..kckkck.kkkkk..',
    '..kckkck.kqcqk..',
    '..kk..kk.kkkkk..',
  ]),
  // Three sacks of seed.
  seed: display([
    '...kk..kk..kk...',
    '..kddkkddkkddk..',
    '..kdfkkdpkkdfk..',
    '..kkkkkkkkkkkk..',
  ]),
  // A row of field guides.
  books: display([
    '..p..u...f..i...',
    '..pf.ui.gf.vi...',
    '..pfwuiGgfpvi...',
    '..pfwuiGgfpvi...',
  ]),
  // Coffee cups with sleeves (Bridge Cafe).
  coffee: display([
    '...kk..kk..kk...',
    '..kwwkkwwkkwwk..',
    '..knnkknnkknnk..',
    '..kkkkkkkkkkkk..',
  ]),
  // Strings of red and yellow peppers (Cocina del Sol).
  peppers: display([
    '...h...h...h....',
    '..ppp.fff.ppp...',
    '..pPp.fef.pPp...',
    '...p...f...p....',
  ]),
  // A pizza on a stand (Napoli Pizza).
  pizza: display([
    '..kkkkkkkkkk....',
    '..kfpfffpffk....',
    '..kffpffffpk....',
    '..kkkkkkkkkk....',
  ]),
  // Two T-shirts on hangers (SunBeam).
  clothes: display([
    '..kkkk....kkkk..',
    '.kuuuuk..kaaaak.',
    '..kuuk....kaak..',
    '..kkkk....kkkk..',
  ]),
  // A striped barber pole, combs and scissors (the barber shop).
  barber: display([
    '..kk...k.k..k...',
    '..pw...kkk..k...',
    '..wp....k...k...',
    '..pw...k.k..k...',
  ]),
  // Mugs of beer with foam on top (Descendents Brew).
  mugs: display([
    '..ww..ww..ww....',
    '..ffk.ffk.ffk...',
    '..ffk.ffk.ffk...',
    '..kk..kk..kk....',
  ]),
  // Train timetables (Milford Station).
  timetable: display([
    '..kkkkk.kkkkk...',
    '..kwkwk.kwkwk...',
    '..kwwwk.kwwwk...',
    '..kkkkk.kkkkk...',
  ]),
  // Skis and poles standing up (Ludlow's ski shop).
  skis: display([
    '..p..u..t...k.k.',
    '..p..u..t...k.k.',
    '..p..u..t...k.k.',
    '..P..U..T...k.k.',
  ]),
  // Jugs of maple syrup.
  syrup: display([
    '...k....k....k..',
    '..kak..kak..kak.',
    '..kAk..kAk..kAk.',
    '..kkk..kkk..kkk.',
  ]),
  // A lamp glowing between red curtains (the hotel).
  lodge: display([
    '..PP...ff...PP..',
    '..PP...ff...PP..',
    '..PP...nn...PP..',
    '..PP...NN...PP..',
  ]),
  // Snacks and drinks (the Citgo).
  snacks: display([
    '..kkk.kkk.kkk...',
    '..kpk.kfk.kuk...',
    '..kpk.kfk.kuk...',
    '..kkk.kkk.kkk...',
  ]),
};

const SHOP_DOOR = [
  ...Array(6).fill(BLANK),
  '...NNNNNNNNNN...',
  '...NnnnnnnnnN...',
  '...NnccccccnN...',
  '...NncBppBcnN...',
  '...NnBBwwBBnN...',
  '...NnnnnnnnnN...',
  '...NnNNNNNNnN...',
  '...NnnnnnnnfN...',
  '...NnNNNNNNnN...',
  '...NnnnnnnnnN...',
];

/** A signboard across `cols` tiles of siding, with `name` lettered on it. */
function signboard(name, cols) {
  const w = cols * 16;
  const rows = SIDING.map((r) => [...r.repeat(cols)]);
  const x0 = 3, x1 = w - 4;
  for (let y = 2; y <= 12; y++) {
    for (let x = x0; x <= x1; x++) rows[y][x] = y === 2 || y === 12 || x === x0 || x === x1 ? 'k' : y === 11 ? 'Y' : 'y';
  }
  // The brackets it hangs from.
  for (const x of [x0 + 3, x1 - 3]) rows[0][x] = rows[1][x] = 'N';

  const textW = name.length * 4 - 1;
  if (textW > x1 - x0 - 3) throw new Error(`storefront "${name}": the name doesn't fit on a ${cols}-tile sign`);
  const tx = Math.floor((w - textW) / 2);
  [...name].forEach((ch, i) => {
    if (ch !== ' ' && !TINY[ch]) throw new Error(`storefront "${name}": no letter '${ch}' in the tiny font (gfx/ui.js)`);
    TINY[ch]?.forEach((line, gy) => [...line].forEach((px, gx) => {
      if (px === '#') rows[5 + gy][tx + i * 4 + gx] = 'N';
    }));
  });
  return rows.map((r) => r.join(''));
}

/**
 * A shop's front `cols` tiles wide (and 4 tall) as the prop `id`, with `name`
 * on the sign and `goods` (DISPLAYS ids) in the windows either side of the door.
 * A `shut` shop's door is solid (no inside yet): give it sign text. A `snowy` one has snow on its roof,
 * and `floors` (normally 1) is how many rows of upper windows it has: a taller building, like a hotel.
 */
export function storefront(id, name, cols, goods = Object.keys(DISPLAYS), shut = false, { snowy = false, floors = 1 } = {}) {
  const door = Math.floor(cols / 2);
  const each = (fn) => Array.from({ length: cols }, (_, col) => fn(col));
  const side = (tiles) => tiles[0].map((_, y) => tiles.map((t) => t[y]).join('')); // tiles side by side
  const windows = each((col) => col).filter((col) => col !== door);
  const ground = (col) => (col === door ? SHOP_DOOR : DISPLAYS[goods[windows.indexOf(col) % goods.length]]);
  const art = [
    ...side(each(() => (snowy ? SNOWY_ROOF : TIN_ROOF))),
    ...signboard(name, cols),
    ...Array(floors).fill(side(each((col) => (col % 2 === door % 2 ? stamp(SIDING, UPPER_WINDOW) : SIDING)))).flat(),
    ...side(each((col) => stamp(SIDING, stamp(ground(col), AWNING)))),
  ];
  const overrides = {};
  const doorRow = 2 + floors;
  for (let col = 0; col < cols; col++) overrides[`${col}_${doorRow}`] = col === door ? { solid: shut, glow: 1 } : { glow: 1.5 };
  bigProp(id, art, { solid: true }, overrides, STORE_DEFS);
}

storefront('generalStoreFront', 'GENERAL STORE', 5, ['optics', 'seed']);
// Frenchtown's shops. Kathleen's and SunBeam have insides; the rest are shut for now.
storefront('kathleensFront', "KATHLEEN'S", 5, ['optics', 'seed']);
storefront('sunbeamFront', 'SUNBEAM', 5, ['clothes']);
storefront('bridgeCafeFront', 'BRIDGE CAFE', 4, ['coffee'], true);
storefront('cocinaFront', 'COCINA DEL SOL', 5, ['peppers'], true);
storefront('napoliFront', 'NAPOLI PIZZA', 4, ['pizza'], true);
storefront('citgoFront', 'CITGO', 3, ['snacks'], true);
// Milford's. The station has an inside (maps/milfordStation.js); the rest are shut for now.
storefront('barberFront', 'BARBER SHOP', 5, ['barber'], true);
storefront('descendentsFront', 'DESCENDENTS BREW', 6, ['mugs'], true);
storefront('milfordStationFront', 'MILFORD STATION', 5, ['timetable']);
// Ludlow's, in the snow.
storefront('ludlowStationFront', 'LUDLOW STATION', 5, ['timetable'], false, { snowy: true });
storefront('ludlowInnFront', 'LUDLOW INN', 9, ['lodge'], true, { snowy: true, floors: 3 });
storefront('skiShopFront', 'SKI SHOP', 6, ['skis'], false, { snowy: true });
storefront('mapleFront', 'MAPLE SUGAR', 6, ['syrup', 'snacks'], true, { snowy: true });
storefront('ludlowBooksFront', 'BOOKSTORE', 5, ['books'], true, { snowy: true });
storefront('ludlowCafeFront', 'COCOA CAFE', 5, ['coffee'], true, { snowy: true });
storefront('outfitterFront', 'OUTFITTER', 5, ['clothes', 'optics'], true, { snowy: true });
// The base lodge at Okemo.
storefront('okemoLodgeFront', 'OKEMO LODGE', 7, ['skis', 'coffee'], true, { snowy: true });
// The lodge at PINKHAM NOTCH, in the WHITE MOUNTAINS.
storefront('notchLodgeFront', 'NOTCH LODGE', 7, ['lodge', 'optics'], true, { snowy: true });

// ---------- inside ----------

const WALL_TOP = [...Array(15).fill('nnnNnnnnnnnNnnnn'), 'NNNNNNNNNNNNNNNN'];

// Cream plaster over wood paneling.
const WALL = [
  ...Array(10).fill('yyyyyyyyyyyyyyyy'),
  'NNNNNNNNNNNNNNNN',
  ...Array(4).fill('nnnnnnnNnnnnnnnn'),
  'NNNNNNNNNNNNNNNN',
];

const WINDOW = [
  BLANK,
  '..NNNNNNNNNNNN..',
  '..NcwccNNcwccN..',
  '..NccccNNccccN..',
  '..NccccNNccccN..',
  '..NNNNNNNNNNNN..',
  '..NccccNNccccN..',
  '..NccccNNccwcN..',
  '..NccccNNccccN..',
  '..NNNNNNNNNNNN..',
  ...Array(6).fill(BLANK),
];

// A poster of a cardinal on a branch.
const POSTER = [
  BLANK,
  '...kkkkkkkkkk...',
  '...kwwwwwwwwk...',
  '...kwwppwwwwk...',
  '...kwpppPwwwk...',
  '...kwwpppwwwk...',
  '...kwwwnwwwwk...',
  '...knnnnnnwwk...',
  '...kwwwwwwwwk...',
  '...kkkkkkkkkk...',
  ...Array(6).fill(BLANK),
];

// Goods on a shelf, 3 rows tall.
const GOODS = {
  binoculars: ['..kkkkk..kkkkk..', '..kckck..kckck..', '..kkkkk..kkkkk..'],
  film: ['..ff.pp.ff.pp...', '..ff.pp.ff.pp...', '..kk.kk.kk.kk...'],
  jars: ['..qq.qq..qq.qq..', '..ff.dd..ff.dd..', '..fD.dD..fD.dD..'],
  books: ['..p.u.f.i.g.v...', '..pwuffiiggvv...', '..pwuffiiggvv...'],
  bottles: ['..G..a..t..G..a.', '.GG.aa.tt.GG.aa.', '.GG.aa.tt.GG.aa.'],
};

/** Shelves of `goods` (GOODS ids, top to bottom) in a wooden case starting at row `top`. */
function shelves(goods, top = 1) {
  const rows = Array(16).fill(BLANK);
  rows[top] = '.NNNNNNNNNNNNNN.';
  goods.forEach((id, i) => {
    const y = top + 1 + i * 4;
    stamp(Array(3).fill('.NOOOOOOOOOOOON.'), GOODS[id]).forEach((r, j) => (rows[y + j] = r));
    rows[y + 3] = '.NnnnnnnnnnnnnN.';
  });
  return rows;
}

// A freestanding shelving unit, three shelves tall, on little feet.
const unit = (goods) => {
  const rows = shelves(goods);
  rows[14] = '.NNNNNNNNNNNNNN.';
  rows[15] = '..N..........N..';
  return rows;
};

// The shop counter: its top, then paneled front.
const COUNTER = [
  BLANK,
  BLANK,
  'NNNNNNNNNNNNNNNN',
  'oooooooooooooooo',
  'oooooooooooooooo',
  'OOOOOOOOOOOOOOOO',
  'NNNNNNNNNNNNNNNN',
  'nNNNNNNnnNNNNNNn',
  'nNOOOONnnNOOOONn',
  'nNOOOONnnNOOOONn',
  'nNOOOONnnNOOOONn',
  'nNOOOONnnNOOOONn',
  'nNOOOONnnNOOOONn',
  'nNNNNNNnnNNNNNNn',
  'nnnnnnnnnnnnnnnn',
  'NNNNNNNNNNNNNNNN',
];
const REGISTER = [
  '...kkkkkkk......',
  '...kQcccQk......',
  '...kQQQQQk......',
  '..kqwqwqwqk.....',
  '..kqqqqqqqk.....',
  '..kkkkkkkkk.....',
  ...Array(10).fill(BLANK),
];
// A jar of sunflower seeds by the register.
const SEED_JAR = [
  '........kkkk....',
  '.......kqqqqk...',
  '.......kcffck...',
  '.......kfnfnk...',
  '.......kffffk...',
  '........kkkk....',
  ...Array(10).fill(BLANK),
];

// A barrel full of seed.
const BARREL = [
  BLANK,
  BLANK,
  BLANK,
  '....kkkkkkkk....',
  '...kdfdffdfdk...',
  '...kkkkkkkkkk...',
  '...knnnNnnnnk...',
  '...kQQQQQQQQk...',
  '...knnnNnnnnk...',
  '...knnnNnnnnk...',
  '...knnnNnnnnk...',
  '...knnnNnnnnk...',
  '...kQQQQQQQQk...',
  '...knnnNnnnnk...',
  '....kkkkkkkk....',
  BLANK,
];

const PLANT = [
  BLANK,
  '......GG........',
  '....GGggG..GG...',
  '...GggggGGGggG..',
  '..GgghggGgggghG.',
  '..GghhgGGghhggG.',
  '...GgggGgggggG..',
  '....GGGgggGGG...',
  '......GhhG......',
  '.....kkkkkk.....',
  '.....keeeek.....',
  '.....keEeek.....',
  '......keek......',
  '......kEEk......',
  '.......kk.......',
  BLANK,
];

// A price tag hanging off whatever's on display.
const TAG = [
  BLANK,
  BLANK,
  '..kkkk..........',
  '..kwwk..........',
  '..kfwk..........',
  '..kkkk..........',
  ...Array(10).fill(BLANK),
];

// ---------- inside a train station ----------

// Glass double doors out to the platform, under a yellow transom.
const PLATFORM_DOORS = [
  '.NNNNNNNNNNNNNN.',
  '.NffffffffffffN.',
  '.NkkkkkkkkkkkkN.',
  '.NkcwcckkcwcckN.',
  ...Array(4).fill('.NkcccckkcccckN.'),
  '.NkcccNkkNccckN.',
  ...Array(5).fill('.NkcccckkcccckN.'),
  '.NkkkkkkkkkkkkN.',
  '.NNNNNNNNNNNNNN.',
];
// A striped barrier across them while no trains run.
const BARRIER = [
  ...Array(7).fill(BLANK),
  '.kppwwppwwppwwk.',
  '.kwwppwwppwwppk.',
  ...Array(7).fill(BLANK),
];

// The departures board: yellow lines on a dark slate.
const DEPARTURES = [
  BLANK,
  '.kkkkkkkkkkkkkk.',
  '.kCCCCCCCCCCCCk.',
  '.kCfffCffCCfCCk.',
  '.kCCCCCCCCCCCCk.',
  '.kCffCfffCCffCk.',
  '.kCCCCCCCCCCCCk.',
  '.kCfCCffffCfCCk.',
  '.kCCCCCCCCCCCCk.',
  '.kkkkkkkkkkkkkk.',
  ...Array(6).fill(BLANK),
];

// A barred ticket window with a little shelf.
const TICKET_WINDOW = [
  BLANK,
  '..NNNNNNNNNNNN..',
  '..NffffffffffN..',
  '..NNNNNNNNNNNN..',
  ...Array(5).fill('..NcqcqcqcqcqN..'),
  '.NOOOOOOOOOOOON.',
  ...Array(6).fill(BLANK),
];

// The station clock.
const CLOCK = [
  BLANK,
  '.....kkkkkk.....',
  '....kwwwwwwk....',
  '...kwwwkwwwwk...',
  '...kwwwkwwwwk...',
  '...kwwwkkkwwk...',
  '...kwwwwwwwwk...',
  '....kwwwwwwk....',
  '.....kkkkkk.....',
  ...Array(7).fill(BLANK),
];

// Brass posts with a red rope between them, to keep you out of somewhere.
const STANCHION = [
  ...Array(6).fill(BLANK),
  '.kfk........kfk.',
  '.kfkPPPPPPPPkfk.',
  '.kfkpPPPPPPpkfk.',
  ...Array(4).fill('.kfk........kfk.'),
  'kkfkk......kkfkk',
  'kffffk....kffffk',
  BLANK,
];

// ---------- inside the ski shop (Ludlow) ----------

// Skis standing in a wall rack: red, blue and teal pairs with curled tips.
const SKI_RACK = Array.from({ length: 16 }, (_, y) => {
  if (y === 0 || y > 13) return BLANK;
  return [...BLANK].map((_, x) => {
    const pair = [[1, 'p'], [6, 'u'], [11, 't']].find(([c]) => x === c || x === c + 2);
    if (!pair) return '.';
    return y === 1 || y === 13 ? 'k' : pair[1];
  }).join('');
});

// ---------- inside a speakeasy (Eight Oh Brew) ----------

// Rough fieldstone, dark and damp: the cellar's walls.
const STONE_WALL = Array.from({ length: 16 }, (_, y) => {
  if (y === 14) return 'kkkkkkkkkkkkkkkk';
  if (y === 15) return 'HHHHHHHHHHHHHHHH';
  const course = Math.floor(y / 5);
  if (y % 5 === 4) return 'kkkkkkkkkkkkkkkk';
  return [...BLANK].map((_, x) => ((x + course * 5) % 7 === 0 ? 'k' : (x * 3 + y) % 11 === 0 ? 'K' : 'C')).join('');
});

// Big dark flagstones, with black seams.
const FLAGSTONES = Array.from({ length: 16 }, (_, y) => [...BLANK].map((_, x) => {
  if (y % 8 === 7) return 'H';
  if (x % 8 === (Math.floor(y / 8) % 2 ? 3 : 7)) return 'H';
  return (x * 5 + y * 3) % 17 === 0 ? 'C' : 'F';
}).join(''));

// An iron lantern on a bracket, lit.
export const WALL_LANTERN = [
  BLANK,
  BLANK,
  '.......kk.......',
  '......kkkk......',
  '.....kfwwfk.....',
  '.....kffffk.....',
  '.....kffffk.....',
  '......kkkk......',
  '.......NN.......',
  '.......NN.......',
  ...Array(6).fill(BLANK),
];

// A pink neon "802" (Vermont's area code) on a black board.
const NEON = [
  BLANK,
  BLANK,
  '.kkkkkkkkkkkkkk.',
  '.kkiiikiiikiiik.',
  '.kkikikikikkkik.',
  '.kkiiikikikiiik.',
  '.kkikikikikikkk.',
  '.kkiiikiiikiiik.',
  '.kkkkkkkkkkkkkk.',
  ...Array(7).fill(BLANK),
];

// Three beer taps on the bar, with colored handles.
const TAPS = [
  '...p...f...t....',
  '...p...f...t....',
  '...q...q...q....',
  '...q...q...q....',
  ...Array(12).fill(BLANK),
];

// A bar stool with a red seat.
const STOOL = [
  ...Array(7).fill(BLANK),
  '.....kkkkkk.....',
  '....kppppppk....',
  '....kPPPPPPk....',
  '.....kkkkkk.....',
  '.......kk.......',
  '.......NN.......',
  '.....kNNNNk.....',
  '......kkkk......',
  BLANK,
];

// Wooden stairs up and out, at the bottom of the room.
const STAIRS = Array.from({ length: 16 }, (_, y) => (y % 4 === 0 ? 'NkkkkkkkkkkkkkkN' : y % 4 === 3 ? 'NOOOOOOOOOOOOOON' : 'NooooooooooooooN'));

Object.assign(STORE_DEFS, {
  storeWallTop: { art: WALL_TOP, solid: true },
  storeWall: { art: WALL, solid: true },
  storeWindow: { art: stamp(WALL, WINDOW), solid: true, pane: true },
  storePoster: { art: stamp(WALL, POSTER), solid: true },
  shelfOptics: { art: stamp(WALL, shelves(['binoculars', 'film'])), solid: true },
  shelfSeed: { art: stamp(WALL, shelves(['jars', 'jars'])), solid: true },
  shelfBooks: { art: stamp(WALL, shelves(['books', 'film'])), solid: true },
  shelfMixed: { art: stamp(WALL, shelves(['film', 'jars'])), solid: true },
  shelvingOptics: { art: unit(['binoculars', 'film', 'books']), base: 'floor', solid: true },
  shelvingSeed: { art: unit(['jars', 'jars', 'film']), base: 'floor', solid: true },
  counter: { art: COUNTER, base: 'floor', solid: true, counter: true },
  counterRegister: { art: stamp(COUNTER, REGISTER), base: 'floor', solid: true, counter: true },
  counterJar: { art: stamp(COUNTER, SEED_JAR), base: 'floor', solid: true, counter: true },
  bikeDisplay: { art: stamp(BIKE_SIDE, TAG), base: 'floor', solid: true },
  seedSacks: { art: [BLANK, BLANK, ...SEED_SACK.slice(0, 14)], base: 'floor', solid: true },
  seedBarrel: { art: BARREL, base: 'floor', solid: true },
  storePlant: { art: PLANT, base: 'floor', solid: true },
  // Train stations (maps/milfordStation.js, ludlowStation.js).
  platformDoors: { art: stamp(WALL, PLATFORM_DOORS) },  // walkable: the map puts a `train` warp on it
  platformDoorsShut: { art: stamp(WALL, stamp(PLATFORM_DOORS, BARRIER)), solid: true },  // a locked warp's `tile`
  departures: { art: stamp(WALL, DEPARTURES), solid: true },
  ticketWindow: { art: stamp(WALL, TICKET_WINDOW), solid: true },
  stationClock: { art: stamp(WALL, CLOCK), solid: true },
  stanchion: { art: STANCHION, base: 'floor', solid: true },  // give it sign text
  benchFloor: { ...COAST_DEFS.bench, base: 'floor' },
  // The ski shop (maps/skiShop.js).
  skiRack: { art: stamp(WALL, SKI_RACK), solid: true },
  // Eight Oh Brew (maps/eightOhBrew.js): a stone cellar, lit by lanterns, candles and neon.
  cellarFloor: { art: FLAGSTONES },
  cellarWall: { art: STONE_WALL, solid: true },
  cellarLantern: { art: stamp(STONE_WALL, WALL_LANTERN), solid: true, glow: 2.5, flicker: true },
  bottleShelf: { art: stamp(STONE_WALL, shelves(['bottles', 'bottles'])), solid: true, glow: 1 },
  neonSign: { art: stamp(STONE_WALL, NEON), solid: true, glow: 2 },
  barCounter: { art: COUNTER, base: 'cellarFloor', solid: true, counter: true },
  tapCounter: { art: stamp(COUNTER, TAPS), base: 'cellarFloor', solid: true, counter: true, glow: 1.5 },
  barStool: { art: STOOL, base: 'cellarFloor', solid: true },
  cellarBarrel: { art: BARREL, base: 'cellarFloor', solid: true },
  stairsUp: { art: STAIRS, glow: 2 },  // walkable: the map puts the way-out warp on it; daylight comes down them
});
