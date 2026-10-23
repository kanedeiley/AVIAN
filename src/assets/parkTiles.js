// Tiles for Tinicum Park, down the towpath south of Erwinna: the ball fields'
// clay infields, bases and backstops, the polo grounds' goal posts and side
// boards, the playground (wood chips, swings, a slide and a seesaw), the disc
// golf course's baskets and tee pads, the snack stand (a blue shipping
// container, shut) and the white synagogue's round star window and doors.
// Also Tinicum Riverbank, north of the park: the red covered bridge the
// towpath runs under (its roof is `over` art, drawn over you), the steel truss
// bridge to Frenchtown with its construction barricade, and the Marshalls' door.
import { stamp, flipY } from '../gfx/sprite.js';
import { FARM_DEFS } from './farmTiles.js';

// ---------- the ball fields ----------

// Infield clay: a little redder and darker than a dirt path.
const CLAY = [
  'DDDDDDDDDDDDDDDD',
  'DDdDDDDDDDDDEDDD',
  'DDDDDDDDDdDDDDDD',
  'DDDDEDDDDDDDDDDD',
  'DDDDDDDdDDDDDDdD',
  'DdDDDDDDDDDEDDDD',
  'DDDDDDDDDDDDDDDD',
  'DDDDDDEDDDDDDDDD',
  'DDDdDDDDDDDdDDDD',
  'DDDDDDDDDDDDDDDE',
  'DEDDDDDDdDDDDDDD',
  'DDDDDDDDDDDDDDDD',
  'DDDDDdDDDDDEDDDD',
  'DDDDDDDDDDDDDDdD',
  'DdDDDDDDEDDDDDDD',
  'DDDDDDDDDDDDDDDD',
];

const EMPTY = Array(16).fill('................');

// A white base bag.
const BASE = [
  ...EMPTY.slice(0, 4),
  '.....kkkkkk.....',
  '....kwwwwwwk....',
  '....kwwwwwwk....',
  '....kwwwwwqk....',
  '....kwwwwwqk....',
  '....kwqqqqqk....',
  '.....kkkkkk.....',
  ...EMPTY.slice(0, 5),
];

// Home plate, pointing down at the backstop, between the chalk batter's boxes.
const HOME_PLATE = [
  '................',
  '................',
  '.ww..........ww.',
  '.w............w.',
  '.w..kkkkkkkk..w.',
  '.w..kwwwwwwk..w.',
  '.w..kwwwwwwk..w.',
  '.w..kwwwwwwk..w.',
  '.w...kwwwwk...w.',
  '.w....kwwk....w.',
  '.w.....kk.....w.',
  '.w............w.',
  '.w............w.',
  '.ww..........ww.',
  '................',
  '................',
];

// The pitcher's mound: a raised ring of lighter clay with the white rubber on top.
const MOUND = [
  ...EMPTY.slice(0, 3),
  '.....dddddd.....',
  '...dddddddddd...',
  '..dddddddddddd..',
  '..ddddwwwwdddd..',
  '..ddddddddddDd..',
  '...ddddddddDD...',
  '.....DDDDDD.....',
  ...EMPTY.slice(0, 6),
];

// ---------- the polo grounds ----------

// A goal post, striped red and white.
const POLO_GOAL = [
  '.......kk.......',
  '......kwwk......',
  '......kppk......',
  '......kwwk......',
  '......kppk......',
  '......kwwk......',
  '......kppk......',
  '......kwwk......',
  '......kppk......',
  '......kwwk......',
  '......kppk......',
  '......kwwk......',
  '......kppk......',
  '.....kQwwQk.....',
  '.....kkkkkk.....',
  '................',
];

// The low white side boards that keep the ball on the field.
const POLO_BOARDS = [
  ...EMPTY.slice(0, 9),
  'kkkkkkkkkkkkkkkk',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'qqqqqqqqqqqqqqqq',
  'kkkkkkkkkkkkkkkk',
  '..N..........N..',
  '................',
];

// ---------- the playground ----------

// Wood chips.
const MULCH = [
  'nnNnonnonnnnnNnn',
  'oOonOnNnnnnNnoon',
  'onnnNnnoonNNnooN',
  'NnOnnNnonNNoNnNo',
  'ooNOoNnNoONnnNno',
  'nnnNnnnNnnoNNNnn',
  'nNOnnnnoonnnnoON',
  'ooNnNNNNnnnonnnn',
  'nnnnnnnNonnnnnNO',
  'oonnnnNnnOononoO',
  'NNnnnNoNnnNONNNN',
  'nonnnnnNOnOOOnnn',
  'nnoONoNNnNONNonN',
  'nNOnnONnnnONnNON',
  'nonnOooOnNNnnnno',
  'nnnOnooOnOooonnn',
];

// One bay of the swing set: a blue frame with a red seat on two chains.
const SWINGS = [
  '................',
  'kkkkkkkkkkkkkkkk',
  'kuuuuuuuuuuuuuuk',
  'kkkkkkkkkkkkkkkk',
  '.ku..q....q..uk.',
  '.ku..q....q..uk.',
  '.ku..q....q..uk.',
  'ku...q....q...uk',
  'ku...q....q...uk',
  'ku...q....q...uk',
  'ku..kkkkkkkk..uk',
  'ku..kppppppk..uk',
  'ku..kkkkkkkk..uk',
  'ku............uk',
  'kk............kk',
  '................',
];

// The slide: a yellow platform at the top, and the red chute running down to the chips.
const SLIDE_TOP = [
  '................',
  '...kkkkkkkkkk...',
  '...kffffffffk...',
  '...kffffffffk...',
  '...kkkkkkkkkk...',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
];
const SLIDE_BOTTOM = [
  '....kpPPPPpk....',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
  '....kpPPPPpk....',
  '....kppppppk....',
  '...kpppppppPk...',
  '...kkkkkkkkkk...',
  ...EMPTY.slice(0, 8),
];

// A seesaw: a yellow plank on a pivot, with a handle at each end.
const SEESAW = [
  ...EMPTY.slice(0, 4),
  '..kk........kk..',
  '..kq........qk..',
  '.kkkkkkkkkkkkkk.',
  '.kffffffffffffk.',
  '.kkkkkkkkkkkkkk.',
  '......kQQk......',
  '.....kQQQQk.....',
  '.....kkkkkk.....',
  ...EMPTY.slice(0, 4),
];

// ---------- the disc golf course ----------

// A basket: a yellow band on a pole, chains hanging into the cage below it.
const DISC_BASKET = [
  '................',
  '.....kkkkkk.....',
  '....kffffffk....',
  '.....kkkkkk.....',
  '.....q.qq.q.....',
  '....q..qq..q....',
  '....q..qq..q....',
  '...kkkkkkkkkk...',
  '...kffffffffk...',
  '...kQqQqQqQqk...',
  '....kkkkkkkk....',
  '.......qQ.......',
  '.......qQ.......',
  '.......qQ.......',
  '......kkkk......',
  '................',
];

// A concrete tee pad.
const TEE_PAD = [
  ...EMPTY.slice(0, 3),
  '..QQQQQQQQQQQQ..',
  '..QqqqqqqqqqqQ..',
  '..QqqqwqqqqqqQ..',
  '..QqqqqqqqqwqQ..',
  '..QqqqqqqqqqqQ..',
  '..QqwqqqqqqqqQ..',
  '..QqqqqqqwqqqQ..',
  '..QqqqqqqqqqqQ..',
  '..QqqqqqqqqqqQ..',
  '..QQQQQQQQQQQQ..',
  ...EMPTY.slice(0, 3),
];

// ---------- the snack stand: a blue shipping container ----------

const CONTAINER_ROOF = [
  'kkkkkkkkkkkkkkkk',
  ...Array(13).fill('uuUuuUuuUuuUuuUu'),
  'UUUUUUUUUUUUUUUU',
  'kkkkkkkkkkkkkkkk',
];
const CONTAINER_WALL = [
  ...Array(14).fill('UuuUuuUuuUuuUuuU'),
  'kkkkkkkkkkkkkkkk',
  'QQQQQQQQQQQQQQQQ',
];
// The serving window, with its roll-down shutter pulled shut over the counter.
const SHUTTER = [
  ...EMPTY.slice(0, 2),
  '.kkkkkkkkkkkkkk.',
  '.kqqqqqqqqqqqqk.',
  '.kQQQQQQQQQQQQk.',
  '.kqqqqqqqqqqqqk.',
  '.kQQQQQQQQQQQQk.',
  '.kqqqqqqqqqqqqk.',
  '.kQQQQQQQQQQQQk.',
  '.kqqqqqqqqqqqqk.',
  '.kkkkkkkkkkkkkk.',
  '.nnnnnnnnnnnnnn.',
  '.NNNNNNNNNNNNNN.',
  ...EMPTY.slice(0, 3),
];

// ---------- the synagogue: white clapboard, like the farmhouses ----------

// A round window over the doors, with a yellow Star of David in blue glass.
const STAR_WINDOW = [
  '................',
  '......kkkkk.....',
  '....kkwwwwwkk...',
  '...kkwbbfbbwkk..',
  '...kwbbfbfbbwk..',
  '..kwfffffffffwk.',
  '..kwbfbbbbbfbwk.',
  '..kwbbfbbbfbbwk.',
  '..kwbfbbbbbfbwk.',
  '..kwfffffffffwk.',
  '...kwbbfbfbbwk..',
  '...kkwbbfbbwkk..',
  '....kkwwwwwkk...',
  '......kkkkk.....',
  '................',
  '................',
];

// Tall blue double doors with brass handles.
const DOUBLE_DOORS = [
  '................',
  '...kkkkkkkkkk...',
  '...kuuukkuuuk...',
  '...kuUukkuUuk...',
  '...kuUukkuUuk...',
  '...kuuukkuuuk...',
  '...kuuukkuuuk...',
  '...kuufkkfuuk...',
  '...kuuukkuuuk...',
  '...kuUukkuUuk...',
  '...kuUukkuUuk...',
  '...kuuukkuuuk...',
  '...kkkkkkkkkk...',
  ...EMPTY.slice(0, 3),
];

// ---------- Tinicum Riverbank: the red covered bridge ----------

// Gray shingles, for the roof seen from above.
const SHINGLES = [
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'QQQQQQQQQQQQQQQQ',
  'qqqqqqqQqqqqqqqQ',
  'qqqqqqqQqqqqqqqQ',
  'QQQQQQQQQQQQQQQQ',
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'QQQQQQQQQQQQQQQQ',
  'qqqqqqqQqqqqqqqQ',
  'qqqqqqqQqqqqqqqQ',
  'QQQQQQQQQQQQQQQQ',
  'qqqQqqqqqqqQqqqq',
  'qqqQqqqqqqqQqqqq',
  'QQQQQQQQQQQQQQQQ',
  'qqqqqqqQqqqqqqqQ',
];
const RED_BOARDS = 'ppPpppPpppPpppPp';

// The roof in three rows: the north eave over the red wall, the ridge, and the south side
// coming down to the red boards you see from the front.
const COVERED_NORTH = ['kkkkkkkkkkkkkkkk', 'PPPPPPPPPPPPPPPP', 'kkkkkkkkkkkkkkkk', ...SHINGLES.slice(3)];
const COVERED_RIDGE = [...SHINGLES.slice(0, 7), 'kkkkkkkkkkkkkkkk', 'qqqqqqqqqqqqqqqq', ...SHINGLES.slice(9)];
const COVERED_SOUTH = [...SHINGLES.slice(0, 5), 'kkkkkkkkkkkkkkkk', ...Array(7).fill(RED_BOARDS), 'PPPPPPPPPPPPPPPP', 'kkkkkkkkkkkkkkkk', 'NNNNNNNNNNNNNNNN'];

// The east end, where the road goes in: red boards around a dark doorway, on a stone abutment.
const DOORWAY = 'ppPkHHHHHHHHkpPp';
const PORTAL_TOP = ['kkkkkkkkkkkkkkkk', 'qqqQqqqqqqqQqqqq', 'QQQQQQQQQQQQQQQQ', 'kkkkkkkkkkkkkkkk', ...Array(6).fill(RED_BOARDS), 'ppPkkkkkkkkkkpPp', ...Array(5).fill(DOORWAY)];
const PORTAL_MIDDLE = Array(16).fill(DOORWAY);
const PORTAL_BOTTOM = [...Array(10).fill(DOORWAY), 'ppPkkkkkkkkkkpPp', RED_BOARDS, 'kkkkkkkkkkkkkkkk', 'qqQqqqQqqqQqqqQq', 'QQQQQQQQQQQQQQQQ', 'qqqqQqqqqqqQqqqq'];

// ---------- Tinicum Riverbank: the steel truss bridge to Frenchtown ----------

// A side of the truss: top and bottom chords with X lattice between, over the road deck.
const TRUSS = [
  'kkkkkkkkkkkkkkkk',
  'tttttttttttttttt',
  'TTTTTTTTTTTTTTTT',
  'Tt....tTTt....tT',
  '.Tt..tT..Tt..tT.',
  '..TttT....TttT..',
  '..TttT....TttT..',
  '.Tt..tT..Tt..tT.',
  'Tt....tTTt....tT',
  'TTTTTTTTTTTTTTTT',
  'kkkkkkkkkkkkkkkk',
  ...EMPTY.slice(0, 5),
];

// An orange-and-white striped sawhorse.
const BARRICADE = [
  ...EMPTY.slice(0, 4),
  '.kkkkkkkkkkkkkk.',
  '.keeewwweeewwwk.',
  '.kewwweeewwweek.',
  '.kwwweeewwweeek.',
  '.kkkkkkkkkkkkkk.',
  '..kQk......kQk..',
  '..kQk......kQk..',
  '.kQQQk....kQQQk.',
  '.kkkkk....kkkkk.',
  ...EMPTY.slice(0, 3),
];

// The covered bridge's roof over whatever runs under it: the towpath (walk under it), the canal or the woods.
const UNDER = { Towpath: ['towpath', false], Water: ['water', true], Woods: ['tree', true] };
const COVERED = { North: COVERED_NORTH, Ridge: COVERED_RIDGE, South: COVERED_SOUTH };
const COVERED_DEFS = {};
for (const [part, over] of Object.entries(COVERED)) {
  for (const [under, [base, solid]] of Object.entries(UNDER)) COVERED_DEFS[`covered${part}${under}`] = { art: EMPTY, base, solid, over };
}

export const PARK_DEFS = {
  ...COVERED_DEFS,
  coveredPortalTop:    { art: PORTAL_TOP, solid: true },
  coveredPortalMiddle: { art: PORTAL_MIDDLE, solid: true },  // shut: give it sign text
  coveredPortalBottom: { art: PORTAL_BOTTOM, solid: true },
  trussNorth: { art: TRUSS, base: 'tarmac', solid: true },
  trussDeck:  { art: EMPTY, base: 'tarmacLine' },
  trussSouth: { art: flipY(TRUSS), base: 'tarmac', solid: true },
  barricade:  { art: BARRICADE, base: 'tarmac', solid: true },
  marshallDoor: { art: FARM_DEFS.leisterDoor.art, solid: true },  // no inside yet: give it sign text
  clay:       { art: CLAY, perch: true },
  base:       { art: stamp(CLAY, BASE), perch: true },
  homePlate:  { art: stamp(CLAY, HOME_PLATE), perch: true },
  mound:      { art: stamp(CLAY, MOUND), perch: true },
  poloGoal:   { art: POLO_GOAL, base: 'turf', solid: true },
  poloBoards: { art: POLO_BOARDS, base: 'turf', solid: true },
  mulch:      { art: MULCH, perch: true },
  swings:     { art: SWINGS, base: 'mulch', solid: true },
  slideTop:   { art: SLIDE_TOP, base: 'mulch', solid: true },
  slideBottom: { art: SLIDE_BOTTOM, base: 'mulch', solid: true },
  seesaw:     { art: SEESAW, base: 'mulch', solid: true },
  discBasket: { art: DISC_BASKET, base: 'turf', solid: true },
  teePad:     { art: TEE_PAD, base: 'turf' },
  containerRoof: { art: CONTAINER_ROOF, solid: true },
  containerWall: { art: CONTAINER_WALL, solid: true },
  containerShutter: { art: stamp(CONTAINER_WALL, SHUTTER), solid: true },  // shut: give it sign text
  starWindow: { art: stamp(FARM_DEFS.whiteSiding.art, STAR_WINDOW), solid: true, glow: 1 },
  synagogueDoor: { art: stamp(FARM_DEFS.whiteSidingBase.art, DOUBLE_DOORS), solid: true },  // shut: give it sign text
};
