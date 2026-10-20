// Tiles for an Italian seaside town: colorful plaster houses with terracotta
// roofs, shutters, balconies and bougainvillea; stone terrace walls and stairs
// that step the town down the hill; alleys with hanging pots and laundry;
// lemon trees, cypresses, a waterfront with cafe tables, and a beach.
//
// Buildings come in three plaster colors. Their art uses 'x' for the plaster
// and 'z' for its shade, and the loop at the bottom makes every feature in
// every color: ochreShutters, peachDoor, roseArch and so on.
import { recolor, stamp, shiftX, flipY } from '../gfx/sprite.js';

// ---------- buildings ----------

// Curved clay roof tiles laid in vertical runs, each run overlapping the next.
const ROOF = [
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'NEeENEeENEeENEeE',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'NEeENEeENEeENEeE',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'NEeENEeENEeENEeE',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'EeSeEeSeEeSeEeSe',
  'NEeENEeENEeENEeE',
];

// The bottom row of a roof, with the eave's shadow.
const EAVE = [...ROOF.slice(0, 14), 'kkkkkkkkkkkkkkkk', 'NNNNNNNNNNNNNNNN'];

// An upper floor: plain plaster.
const PLASTER = [
  'zzzzzzzzzzzzzzzz',
  'xxxxxxxxxxxxxzxx',
  'xxxzxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxzxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'xzxxxxxxxxxxxxzx',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxzxxxx',
  'xxxxxxxxxxxxxxxx',
  'xxxxzxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxzx',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
  'xxxxxxxxxxxxxxxx',
];

// A ground floor: plaster above a stone base.
const PLASTER_BASE = [...PLASTER.slice(1, 14), 'zzzzzzzzzzzzzzzz', 'qqqqqqqqqqqqqqqq', 'QQQQQQQQQQQQQQQQ'];

// Features painted onto the plaster ('.' lets it show through).
const SHUTTERS = [
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.ktTkBBccBBkTtk.',
  '.ktTkBcBBBBkTtk.',
  '.kTTkBBBBBBkTTk.',
  '.ktTkkkkkkkkTtk.',
  '.ktTkBBBBBBkTtk.',
  '.kTTkBBBBBBkTTk.',
  '.ktTkBBBBBBkTtk.',
  '.ktTkBBBBBBkTtk.',
  '.kkkkkkkkkkkkkk.',
  '..yyyyyyyyyyyy..',
  '..YYYYYYYYYYYY..',
  '................',
  '................',
];

const BALCONY = [
  '................',
  '...kkkkkkkkkk...',
  '...kBBcBkBBBk...',
  '...kBcBBkBBBk...',
  '...kBBBBkBBBk...',
  '...kBBBBkBBBk...',
  '...kBBBBkBBBk...',
  '..kkkkkkkkkkkk..',
  '.iivGiiGvviGiiv.',
  '.kkkkkkkkkkkkkk.',
  '.kik.kGk.k.kik.k',
  '.k.kGk.k.kik.kGk',
  '.kkkkkkkkkkkkkk.',
  '..G..i...G...i..',
  '.....G.......G..',
  '................',
];

const VINES = [
  'iIiiviIiiviiIiiv',
  'iiviiIiiviIiivii',
  'GiiIGiivGiiIiGiv',
  '.iGi.iIi.GiiG.i.',
  '.i...iG...iv...G',
  '.G...v....G....i',
  '.....i.........G',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const HANGING_POT = [
  '................',
  '................',
  '.......kk.......',
  '.......k........',
  '......k.k.......',
  '.....k...k......',
  '....iviiivi.....',
  '...ivGiviGvi....',
  '....keeeeek.....',
  '....kEeeeEk.....',
  '...G.kEEEk.G....',
  '...i..kkk..i....',
  '...G.......G....',
  '....i.....i.....',
  '................',
  '................',
];

const DOOR = [
  '................',
  '................',
  '.....kkkkkk.....',
  '....knnnnnnk....',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '...knnNnnNfnk...',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '...knnNnnNnnk...',
  '..yyyyyyyyyyyy..',
  '..YYYYYYYYYYYY..',
];

// A passage through the building to the street behind it.
const ARCH = [
  '................',
  '.....kkkkkk.....',
  '...kkQQQQQQkk...',
  '..kQNNNNNNNNQk..',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNkkkkkkkkNQk.',
  '.kQNYYYYYYYYNQk.',
  '.kQNyyyyyyyyNQk.',
  '.kQNyyyyyyyyNQk.',
  '.kQNyyyyyyyyNQk.',
];

const PLASTERS = {
  ochre: { x: 'a', z: 'A' },
  peach: { x: 'm', z: 'M' },
  rose: { x: 'l', z: 'L' },
};

const BUILDING_PARTS = {
  // upper floors
  Wall: { art: PLASTER },
  Shutters: { art: stamp(PLASTER, SHUTTERS) },
  Balcony: { art: stamp(PLASTER, BALCONY) },
  Vines: { art: stamp(PLASTER, VINES) },
  Pot: { art: stamp(PLASTER, HANGING_POT) },
  // ground floors
  WallBase: { art: PLASTER_BASE },
  ShuttersBase: { art: stamp(PLASTER_BASE, SHUTTERS) },
  PotBase: { art: stamp(PLASTER_BASE, HANGING_POT) },
  VinesBase: { art: stamp(PLASTER_BASE, VINES) },
  Door: { art: stamp(PLASTER_BASE, DOOR) },          // solid: give it sign text
  Arch: { art: stamp(PLASTER_BASE, ARCH), walk: true },
};

// ---------- terraces ----------

// The face of a stone wall where the ground steps down to a lower terrace.
const TERRACE_WALL = [
  'yyyyyyyyyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
  'YYYYYOYYYYYYOYYY',
  'YYYYYOYYYYYYOYYY',
  'YYYYYOYYYYYYOYYY',
  'OOOOOOOOOOOOOOOO',
  'YYOYYYYYYOYYYYYY',
  'YYOYYYYYYOYYYYYY',
  'YYOYYYYYYOYYYYYY',
  'OOOOOOOOOOOOOOOO',
  'YYYYYYOYYYYYYYOY',
  'YYYYYYOYYYYYYYOY',
  'YYYYYYOYYYYYYYOY',
  'OOOOOOOOOOOOOOOO',
  'YYYOYYYYYYYOYYYY',
  'OOOOOOOOOOOOOOOO',
];

// Steps cut into a terrace wall, going up to the north.
const STAIRS = [
  'YOyyyyyyyyyyyyOY',
  'YOyyyyyyyyyyyyOY',
  'YOqqqqqqqqqqqqOY',
  'YOQQQQQQQQQQQQOY',
  'YOyyyyyyyyyyyyOY',
  'YOyyyyyyyyyyyyOY',
  'YOqqqqqqqqqqqqOY',
  'YOQQQQQQQQQQQQOY',
  'YOyyyyyyyyyyyyOY',
  'YOyyyyyyyyyyyyOY',
  'YOqqqqqqqqqqqqOY',
  'YOQQQQQQQQQQQQOY',
  'YOyyyyyyyyyyyyOY',
  'YOyyyyyyyyyyyyOY',
  'YOqqqqqqqqqqqqOY',
  'YOQQQQQQQQQQQQOY',
];

// ---------- streets ----------

const PAVING = [
  'yyyyyyyyyyyyyyyY',
  'yyyyyyyyyyyyyyyY',
  'yyywyyyyyyyyyyyY',
  'yyyyyyyyyyyyyyyY',
  'yyyyyyyyyyywyyyY',
  'yyyyyyyyyyyyyyyY',
  'yyyyyyyyyyyyyyyY',
  'YYYYYYYYYYYYYYYY',
  'yyyyyyyYyyyyyyyy',
  'yyyyyyyYyyyyyyyy',
  'ywyyyyyYyyyyyyyy',
  'yyyyyyyYyyyyywyy',
  'yyyyyyyYyyyyyyyy',
  'yyyyyyyYyyyyyyyy',
  'yyyyyyyYyyyyyyyy',
  'YYYYYYYYYYYYYYYY',
];

// Terracotta bricks in a basket weave.
const BRICK = [
  'eeeeeeeEeeeEeeeE',
  'eeeeeeeEeeeEeeeE',
  'eeeeeeeEeeeEeeeE',
  'EEEEEEEEeeeEeeeE',
  'eeeeeeeEeeeEeeeE',
  'eeeeeeeEeeeEeeeE',
  'eeeeeeeEeeeEeeeE',
  'EEEEEEEEEEEEEEEE',
  'eeeEeeeEeeeeeeeE',
  'eeeEeeeEeeeeeeeE',
  'eeeEeeeEeeeeeeeE',
  'eeeEeeeEEEEEEEEE',
  'eeeEeeeEeeeeeeeE',
  'eeeEeeeEeeeeeeeE',
  'eeeEeeeEeeeeeeeE',
  'EEEEEEEEEEEEEEEE',
];

// Washing hung across an alley; you can walk under it.
const LAUNDRY = [
  'k..............k',
  'kkk..........kkk',
  '.kkkkkkkkkkkkkk.',
  '...kwk..kik..k..',
  '...kwk.kiiik.kuk',
  '..kwwwkkiiik.kuk',
  '..kwwwk.kik..kuk',
  '..kkkkk.kkk..kkk',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const CAFE_TABLE = [
  '................',
  '.....kkkkkk.....',
  '...kkwpwpwpkk...',
  '..kwwppwwppwwk..',
  '.kwwppwwppwwppk.',
  '.kwwppwwppwwppk.',
  '.kwwppwkkpwwppk.',
  '.kwwppwkkpwwppk.',
  '.kwwppwwppwwppk.',
  '..kPPqqPPqqPPk..',
  '...kkPPqqPPkk...',
  '.....kkkkkk.....',
  '...kk..NN..kk...',
  '..knnk.NN.knnk..',
  '..kkkk.kk.kkkk..',
  '................',
];

const BENCH = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  '.kkkkkkkkkkkkkk.',
  '.knnnnnnnnnnnnk.',
  '.knnnnnnnnnnnnk.',
  '.kNNNNNNNNNNNNk.',
  '.kkkkkkkkkkkkkk.',
  '..kqk......kqk..',
  '..kkk......kkk..',
  '................',
];

// A stone footbridge running north-south.
const STONE_BRIDGE = [
  'kyyyyyyyyyyyyyyk',
  'kYqqqqqqqqqqqqYk',
  'kYqqqqqqqqqqqqYk',
  'kYQQQQQQQQQQQQYk',
  'kYqqqqqqqqqqqqYk',
  'kYqqqqqqqqqqqqYk',
  'kYQQQQQQQQQQQQYk',
  'kyqqqqqqqqqqqqyk',
  'kYqqqqqqqqqqqqYk',
  'kYQQQQQQQQQQQQYk',
  'kYqqqqqqqqqqqqYk',
  'kYqqqqqqqqqqqqYk',
  'kYQQQQQQQQQQQQYk',
  'kYqqqqqqqqqqqqYk',
  'kYqqqqqqqqqqqqYk',
  'kyQQQQQQQQQQQQyk',
];

// ---------- plants ----------

const PLANTER = [
  '................',
  '................',
  '..i.v..i.vi..i..',
  '.iviGivGiivGivi.',
  '.GiGvGiGGivGiGv.',
  '.GGhGGhGGGhGGhG.',
  'kkkkkkkkkkkkkkkk',
  'kyyyyyyyyyyyyyyk',
  'kYYYYYYYYYYYYYYk',
  'keeeeeeeeeeeeeek',
  'keeeeeeeeeeeeeek',
  'keeeeeeeeeeeeeek',
  'keeeeeeeeeeeeeek',
  'kEEEEEEEEEEEEEEk',
  'kkkkkkkkkkkkkkkk',
  '................',
];

const LEMON_TREE = [
  '................',
  '.....kkkkkk.....',
  '...kkGGgGGGkk...',
  '..kGGfGGGGfGGk..',
  '.kGgGGGGgGGGGGk.',
  '.kGGGfGGGGGfGhk.',
  '.kGfGGGgGGGGGhk.',
  '.khGGGGGGfGGhhk.',
  '..khhGfGGGGhhk..',
  '...kkhhhhhhkk...',
  '.......NN.......',
  '....kkkkkkkk....',
  '....keeeeeEk....',
  '.....keeeEk.....',
  '.....kEEEEk.....',
  '......kkkk......',
];

const CYPRESS = [
  '.......kk.......',
  '......khGk......',
  '......khGk......',
  '.....khGGGk.....',
  '.....khGgGk.....',
  '.....khGGGk.....',
  '....khhGGgGk....',
  '....khGGgGGk....',
  '....khhGGGGk....',
  '....khGGGgGk....',
  '....khhGGGGk....',
  '.....khGGGk.....',
  '.....khhGhk.....',
  '......kkkk......',
  '.......NN.......',
  '......kNNk......',
];

// A flowering bush; 'i' is recolored for each variety.
const BUSH = [
  '................',
  '................',
  '.....kkkkkk.....',
  '...kkiGiivGkk...',
  '..kGiiGvGiiGik..',
  '.kiGvGiiGGivGGk.',
  '.kGiiGGvGiiGiGk.',
  '.kGGiGiiGGvGiik.',
  '.kGvGGGiGiiGGhk.',
  '.khGGiGGGGGGhhk.',
  '..khhGGhGGhhhk..',
  '...kkhhhhhhkk...',
  '.....kkkkkk.....',
  '................',
  '................',
  '................',
];

// ---------- beach ----------

// A beach umbrella from above, with its shadow on the sand.
const BEACH_UMBRELLA = [
  ...CAFE_TABLE.slice(0, 11),
  '....JJJkkJJJ....',
  '.....JJkkJJ.....',
  '.......kk.......',
  '......kkkk......',
  '................',
];

const SAND = [
  'jjjjjjjjjjjjjjjj',
  'jjjJjjjjjjjjjjjj',
  'jjjjjjjjjjjJjjjj',
  'jjjjjjjjjjjjjjjj',
  'jJjjjjjjjjjjjjjj',
  'jjjjjjjjJjjjjjjj',
  'jjjjjjjjjjjjjjJj',
  'jjjjjjjjjjjjjjjj',
  'jjjjJjjjjjjjjjjj',
  'jjjjjjjjjjjwjjjj',
  'jjjjjjjjjjjjjjjj',
  'jjjjjjjJjjjjjjjj',
  'jJjjjjjjjjjjjJjj',
  'jjjjjjjjjjjjjjjj',
  'jjjjjjjjjjJjjjjj',
  'jjjjjjjjjjjjjjjj',
];

// Sand meeting water to the south, with foam along the edge.
const SHORE = [
  'jjjjjjjjjjjjjjjj',
  'jjjJjjjjjjjjjjjj',
  'jjjjjjjjjjjJjjjj',
  'jjjjjjjjjjjjjjjj',
  'jJjjjjjjjjjjjjjj',
  'jjjjjjjjJjjjjjjj',
  'jjjjjjjjjjjjjjJj',
  'JjjJjjjJJjjjJjjJ',
  'JJJJJJJJJJJJJJJJ',
  'wwJwwwJJwwwwJwww',
  'cwwcwwwcwwcwwwcw',
  'bbcbbbcbbbbcbbcb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbccbbbbbbbbb',
  'bbbbbbbbbbbbbccb',
  'bbbbbbbbbbbbbbbb',
];

const TOWEL = [
  '................',
  '................',
  '................',
  '...kkkkkkkkkk...',
  '...kiiiiiiiik...',
  '...kwwwwwwwwk...',
  '...kiiiiiiiik...',
  '...kwwwwwwwwk...',
  '...kiiiiiiiik...',
  '...kwwwwwwwwk...',
  '...kiiiiiiiik...',
  '...kkkkkkkkkk...',
  '................',
  '................',
  '................',
  '................',
];

const BOAT = [
  '................',
  '................',
  '................',
  '................',
  '....kkkkkkkk....',
  '..kknnnnnnnnkk..',
  '.knnNNNNNNNNnnk.',
  'knnNoooooooNNnnk',
  'knnNoNoooNooNnnk',
  '.knnNNNNNNNNnnk.',
  '..kknnnnnnnnkk..',
  '....kkkkkkkk....',
  '.....cc....cc...',
  '................',
  '................',
  '................',
];

// ---------- the boutique ----------
// White plaster, a pink roof with a pediment, a signboard, and a striped
// awning over display windows. It's the town's centerpiece, so it gets its
// own tiles instead of a plaster color.

const BOUTIQUE_PLASTER = { x: 'w', z: 'y' };
const PINK_ROOF = { e: 'i', E: 'I', S: 'l', N: 'P' };

// The pediment in the middle of the roof, with a round window.
const GABLE = [
  '.......kk.......',
  '.......kk.......',
  '......kwwk......',
  '......kwwk......',
  '.....kwyywk.....',
  '.....kwyywk.....',
  '....kwyyyywk....',
  '....kwyyyywk....',
  '...kwyfkkfywk...',
  '..kwyfkcikfywk..',
  '..kwykcciikywk..',
  '.kwyykiiiikyywk.',
  '.kwyyfkiikfyywk.',
  'kwyyyyfkkfyyyywk',
  'kkkkkkkkkkkkkkkk',
  'wwwwwwwwwwwwwwww',
];

// The signboard hangs from the eave across three tiles: left, middle, right.
const SIGN_LEFT = [
  '......k.........',
  '......k.........',
  '.kkkkkkkkkkkkkkk',
  '.kffffffffffffff',
  '.kfiiiiiiiiiiiii',
  '.kfiiiiiwwiiwwwi',
  '.kfiiiiiwiwiwiwi',
  '.kfiiiiiwwiiwiwi',
  '.kfiiiiiwiwiwiwi',
  '.kfiiiiiwwiiwwwi',
  '.kfiiiiiiiiiiiii',
  '.kffffffffffffff',
  '.kkkkkkkkkkkkkkk',
  '................',
  '................',
  '................',
];
const SIGN_MIDDLE = [
  '................',
  '................',
  'kkkkkkkkkkkkkkkk',
  'ffffffffffffffff',
  'iiiiiiiiiiiiiiii',
  'wiwiwwwiwwwiwwwi',
  'wiwiiwiiiwiiwiwi',
  'wiwiiwiiiwiiwiwi',
  'wiwiiwiiiwiiwwwi',
  'wwwiiwiiwwwiiwwi',
  'iiiiiiiiiiiiiiii',
  'ffffffffffffffff',
  'kkkkkkkkkkkkkkkk',
  '................',
  '................',
  '................',
];
const SIGN_RIGHT = [
  '.........k......',
  '.........k......',
  'kkkkkkkkkkkkkkk.',
  'ffffffffffffffk.',
  'iiiiiiiiiiiiifk.',
  'wiwiwwwiiiiiifk.',
  'wiwiwiiiiiiiifk.',
  'wiwiwwiiiiiiifk.',
  'wiwiwiiiiiiiifk.',
  'wwwiwwwiiiiiifk.',
  'iiiiiiiiiiiiifk.',
  'ffffffffffffffk.',
  'kkkkkkkkkkkkkkk.',
  '................',
  '................',
  '................',
];

// A pink-and-white awning along the top of the ground floor.
const AWNING = [
  'kkkkkkkkkkkkkkkk',
  'iiwwiiwwiiwwiiww',
  'iiwwiiwwiiwwiiww',
  'IIqqIIqqIIqqIIqq',
  'kiikkwwkkiikkwwk',
  '.kk..kk..kk..kk.',
  ...Array(10).fill('................'),
];

// A display window with a dress on a stand; 'X' is the dress color.
const DISPLAY = stamp(AWNING, [
  ...Array(6).fill('................'),
  '.kkkkkkkkkkkkkk.',
  '.kcBBBBssBBBBBk.',
  '.kBcBBXXXXBBBBk.',
  '.kBBBBBXXBBBBBk.',
  '.kBBBBXXXXBBcBk.',
  '.kBBBXXXXXXBBBk.',
  '.kBBBBBNNBBBBBk.',
  '.kkkkkkkkkkkkkk.',
  '................',
  '................',
]);

const GLASS_DOOR = stamp(AWNING, [
  ...Array(6).fill('................'),
  '....kkkkkkkk....',
  '...kcBBkkBBck...',
  '..kcBBBkkBBBck..',
  '..kBBBBkkBBBBk..',
  '..kBcBBkkBBcBk..',
  '..kBBBfkkfBBBk..',
  '..kBBBBkkBBBBk..',
  '..kBBBBkkBBBBk..',
  '.iiiiiiiiiiiiii.',
  '.IIIIIIIIIIIIII.',
]);

// A pink runner on the paving, leading to the door.
const CARPET = [
  '..kiiiiiiiiiik..',
  '..kiIiiiiiiIik..',
  '..kiiiiiiiiiik..',
  '..kiiiiiiiiiik..',
  '..kiIiiiiiiIik..',
  '..kiiiiiiiiiik..',
  '..kiiiiiiiiiik..',
  '..kiIiiiiiiIik..',
  '..kiiiiiiiiiik..',
  '..kiiiiiiiiiik..',
  '..kiIiiiiiiIik..',
  '..kiiiiiiiiiik..',
  '..kiiiiiiiiiik..',
  '..kiIiiiiiiIik..',
  '..kiiiiiiiiiik..',
  '..kkkkkkkkkkkk..',
];

const boutique = (art) => recolor(art, BOUTIQUE_PLASTER);
const BOUTIQUE_DEFS = {
  boutiqueRoof: { art: recolor(ROOF, PINK_ROOF), solid: true },
  boutiqueGable: { art: stamp(recolor(ROOF, PINK_ROOF), GABLE), solid: true },
  boutiqueEave: { art: recolor(EAVE, PINK_ROOF), solid: true },
  boutiqueSignLeft: { art: stamp(recolor(EAVE, PINK_ROOF), SIGN_LEFT), solid: true },
  boutiqueSignMiddle: { art: stamp(recolor(EAVE, PINK_ROOF), SIGN_MIDDLE), solid: true },
  boutiqueSignRight: { art: stamp(recolor(EAVE, PINK_ROOF), SIGN_RIGHT), solid: true },
  boutiqueVines: { art: boutique(stamp(PLASTER, VINES)), solid: true },
  boutiqueBalcony: { art: boutique(stamp(PLASTER, BALCONY)), solid: true },
  boutiqueShutters: { art: recolor(boutique(stamp(PLASTER, SHUTTERS)), { t: 'i', T: 'I' }), solid: true },
  boutiqueAwningPot: { art: boutique(stamp(PLASTER_BASE, stamp(AWNING, HANGING_POT.map((r, y) => (y < 6 ? '................' : r))))), solid: true },
  boutiqueDisplayPink: { art: recolor(boutique(stamp(PLASTER_BASE, DISPLAY)), { X: 'i' }), solid: true },
  boutiqueDisplayViolet: { art: recolor(boutique(stamp(PLASTER_BASE, DISPLAY)), { X: 'v' }), solid: true },
  boutiqueDisplayYellow: { art: recolor(boutique(stamp(PLASTER_BASE, DISPLAY)), { X: 'f' }), solid: true },
  boutiqueDoor: { art: boutique(stamp(PLASTER_BASE, GLASS_DOOR)), solid: true },
  boutiqueCarpet: { art: stamp(PAVING, CARPET) },
  topiary: { art: recolor(LEMON_TREE, { f: 'G', e: 'w', E: 'q' }), base: 'paving', solid: true },
};

// ---------- the tile table (merged into tiles.js) ----------

export const COAST_DEFS = {
  terraRoof: { art: ROOF, solid: true },
  terraEave: { art: EAVE, solid: true },

  terraceWall: { art: TERRACE_WALL, solid: true },
  terraceWallFlowers: { art: stamp(TERRACE_WALL, VINES), solid: true },
  terraceWallIvy: { art: stamp(TERRACE_WALL, recolor(VINES, { i: 'G', I: 'h', v: 'g' })), solid: true },
  stairs: { art: STAIRS },

  paving: { art: PAVING, perch: true },
  brick: { art: BRICK, perch: true },
  laundry: { art: stamp(BRICK, LAUNDRY), perch: true },
  cafeTable: { art: CAFE_TABLE, base: 'paving', solid: true },
  bench: { art: BENCH, base: 'paving', solid: true },
  stoneBridge: { art: STONE_BRIDGE },

  planter: { art: PLANTER, base: 'paving', solid: true },
  lemonTree: { art: LEMON_TREE, base: 'grass', solid: true },
  lemonTreePaved: { art: LEMON_TREE, base: 'paving', solid: true },
  cypress: { art: CYPRESS, base: 'grass', solid: true },
  pinkBush: { art: BUSH, base: 'grass', solid: true },
  violetBush: { art: recolor(BUSH, { i: 'v' }), base: 'grass', solid: true },
  whiteBush: { art: recolor(BUSH, { i: 'w' }), base: 'grass', solid: true },

  sand: { art: SAND, perch: true },
  shore: { frames: [SHORE, shiftX(SHORE, 4)], frameTime: 0.7 },
  shoreNorth: { frames: [flipY(SHORE), flipY(shiftX(SHORE, 4))], frameTime: 0.7 },
  beachUmbrella: { art: recolor(BEACH_UMBRELLA, { p: 'u', P: 'U' }), base: 'sand', solid: true },
  towel: { art: TOWEL, base: 'sand' },
  boat: { art: BOAT, base: 'water', solid: true },

  ...BOUTIQUE_DEFS,
};

for (const [color, swaps] of Object.entries(PLASTERS)) {
  for (const [part, { art, walk }] of Object.entries(BUILDING_PARTS)) {
    COAST_DEFS[color + part] = { art: recolor(art, swaps), solid: !walk };
  }
}
