// Tiles for Van Sant Airport, the grass airstrip out on the Open Plains: the
// taxiway, the mown runway with its marker tires, the hangars, the windsock,
// the grassy hills around it, a red biplane parked out front, and a grill.
import { COAST_DEFS, bigProp } from './coastTiles.js';


const TARMAC = [
  'QQQQQQKQQQQQQQQQ',
  'QQqQQQQQQQQQKQQQ',
  'QQQQQQQQQQQQQQQQ',
  'QQQQKQQQQQqQQQQQ',
  'QQQQQQQQQQQQQQQK',
  'QKQQQQQQqQQQQQQQ',
  'QQQQQQQQQQQQQQQQ',
  'QQQQQQQKQQQQQqQQ',
  'QQQqQQQQQQQQQQQQ',
  'QQQQQQQQQQKQQQQQ',
  'QQQQQKQQQQQQQQQQ',
  'QqQQQQQQQQQQQKQQ',
  'QQQQQQQQqQQQQQQQ',
  'QQQKQQQQQQQQQQQQ',
  'QQQQQQQQQQQQQqQQ',
  'QQQQQQKQQQQQQQQQ',
];

// A yellow taxi line, along the bottom edge of a tile, and down the right edge.
const LINE_H = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  'ffffffffffffffff',
  'ffffffffffffffff',
];

const LINE_V = [
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
  '..............ff',
];

// The runway: grass mown short, in stripes.
const TURF = [
  'gggggggggggggggg',
  'ggggGggggggggggg',
  'gggggggggggGgggg',
  'gggggggggggggggg',
  'ggGgggggggggggGg',
  'gggggggGgggggggg',
  'gggggggggggggggg',
  'gggggggggggggggg',
  'GGGGGGGGGGGGGGGG',
  'GGGgGGGGGGGGGGGG',
  'GGGGGGGGGgGGGGGG',
  'GGGGGGGGGGGGGGgG',
  'GgGGGGGGGGGGGGGG',
  'GGGGGGGgGGGGGGGG',
  'GGGGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGGGG',
];

// An old tire painted white, marking the runway's edge.
const MARKER = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '....kkkkkkkk....',
  '..kkwwwwwwwwkk..',
  '.kwwwwkkkkwwwwk.',
  '.kwwkk....kkwwk.',
  '.kQwwkkkkkkwwQk.',
  '..kkQwwwwwwQkk..',
  '....kkkkkkkk....',
  '................',
  '................',
  '................',
  '................',
];

// White bars painted across each end of the runway.
const THRESHOLD = [
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
  '.ww..ww..ww..ww.',
];

// Corrugated metal, the front corners of a hangar.
const HANGAR_WALL = [
  'QQQQQQQQQQQQQQQQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'qqqQqqqQqqqQqqqQ',
  'QQQQQQQQQQQQQQQQ',
  'kkkkkkkkkkkkkkkk',
];

// Big sliding doors, one panel per tile: windows along the top...
const HANGAR_DOOR_TOP = [
  'kkkkkkkkkkkkkkkk',
  'kqqqqqqqqqqqqqqk',
  'kqkkkkkqqkkkkkqk',
  'kqkcbbkqqkcbbkqk',
  'kqkbbbkqqkbbbkqk',
  'kqkkkkkqqkkkkkqk',
  'kqqqqqqqqqqqqqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
];

// ...and the rail along the bottom.
const HANGAR_DOOR = [
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kqqQqqQqqQqqQqqk',
  'kQQQQQQQQQQQQQQk',
  'kkkkkkkkkkkkkkkk',
];

// An open hangar: dark inside, with the rafters showing...
const HANGAR_INSIDE_TOP = [
  'kkkkkkkkkkkkkkkk',
  'HHHHHHHHHHHHHHHH',
  'HHHkHHHHHHHkHHHH',
  'HHHkHHHHHHHkHHHH',
  'HHHkkkkkkkkkHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
];

// ...and a concrete floor.
const HANGAR_INSIDE = [
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'FFFFFFFFFFFFFFFF',
  'FFFFFHFFFFFFFFFF',
  'FFFFFFFFFFFFHFFF',
  'FFFFFFFFFFFFFFFF',
  'FFHFFFFFFFFFFFFF',
  'FFFFFFFFFFFFFFFF',
  'FFFFFFFFFHFFFFFF',
  'FFFFFFFFFFFFFFFF',
  'FFFFFFFFFFFFFFHF',
  'FFFFHFFFFFFFFFFF',
  'FFFFFFFFFFFFFFFF',
  'QQQQQQQQQQQQQQQQ',
];

// The windsock: flying straight out, then sagging when the wind drops.
const WINDSOCK = [
  '................',
  '..kkk...........',
  '..kqk.kkkkkk....',
  '..kqkkeeewwwkkk.',
  '..kqkeeeewwweeek',
  '..kqkeeeewwweeek',
  '..kqkkeeewwwkkk.',
  '..kqk.kkkkkk....',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '.kkqkk..........',
  '.kQQQk..........',
];

const WINDSOCK_SAG = [
  '................',
  '..kkk...........',
  '..kqkkkkk.......',
  '..kqkeeekkk.....',
  '..kqkeeeewwkk...',
  '..kqkkeeewwwekk.',
  '..kqk.kkkwwweek.',
  '..kqk....kkkkek.',
  '..kqk.......kk..',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '..kqk...........',
  '.kkqkk..........',
  '.kQQQk..........',
];

// A grassy hill, too steep to climb.
const HILL = [
  'GGGGGGGGGGGGGGGG',
  'GGGgggGGGGGGGGGG',
  'GGgggggGGGGGGGGG',
  'GGGhhhGGGGGgggGG',
  'GGGGGGGGGGgggggG',
  'GGGGGGGGGGGhhhGG',
  'GGGGGGGGGGGGGGGG',
  'GgggGGGGGGGGGGGG',
  'gggggGGGGgggGGGG',
  'GhhhGGGGgggggGGG',
  'GGGGGGGGGhhhGGGG',
  'GGGGGGGGGGGGGGGG',
  'GGGGGgggGGGGGGgg',
  'GGGGgggggGGGGggg',
  'GGGGGhhhGGGGGGhh',
  'GGGGGGGGGGGGGGGG',
];

// The hill's south edge, where it drops off in an earth bank.
const HILL_FACE = [
  'GGGGGGGGGGGGGGGG',
  'GGGgggGGGGGGGGGG',
  'GGgggggGGGGGGGGG',
  'GGGhhhGGGGGgggGG',
  'GGgGGGGGGgGGGGGG',
  'hGhhGhhGhGhhGhhG',
  'khkkhkkkkhkkkhkk',
  'NDDNDDDNDDDDNDDN',
  'DDdDDNDDdDDDNDdD',
  'DNDDDNDDDDNDDDND',
  'DDDdDNDDDdDDNDDD',
  'NDDDDDDNDDDDNDDN',
  'DDNDDdDDDNDDDDDD',
  'DDDDNDDDDDDNDDdD',
  'NNNNNNNNNNNNNNNN',
  'GGGGGGGGGGGGGGGG',
];

// Its east edge, and the corner where the east edge meets the bank.
const HILL_EDGE_E = [
  'GGGGGGGGGGGGGhGg',
  'GGGgggGGGGGGGhGg',
  'GGgggggGGGGGGhGg',
  'GGGhhhGGGGGgghGg',
  'GGGGGGGGGGggghGg',
  'GGGGGGGGGGGhhhGg',
  'GGGGGGGGGGGGGhGg',
  'GgggGGGGGGGGGhGg',
  'gggggGGGGgggGhGg',
  'GhhhGGGGggggghGg',
  'GGGGGGGGGhhhGhGg',
  'GGGGGGGGGGGGGhGg',
  'GGGGGgggGGGGGhGg',
  'GGGGgggggGGGGhGg',
  'GGGGGhhhGGGGGhGg',
  'GGGGGGGGGGGGGhGg',
];

const HILL_FACE_E = [
  'GGGGGGGGGGGGGhGg',
  'GGGgggGGGGGGGhGg',
  'GGgggggGGGGGGhGg',
  'GGGhhhGGGGGgghGg',
  'GGgGGGGGGgGGGhGg',
  'hGhhGhhGhGhhGhGg',
  'khkkhkkkkhkkkhGg',
  'NDDNDDDNDDDDNNhg',
  'DDdDDNDDdDDDNNhg',
  'DNDDDNDDDDNDDNhg',
  'DDDdDNDDDdDDNNhg',
  'NDDDDDDNDDDDNNhg',
  'DDNDDdDDDNDDDNhg',
  'DDDDNDDDDDDNDNhg',
  'NNNNNNNNNNNNNNhg',
  'GGGGGGGGGGGGGGGg',
];

// The north edge of a hill that rises away from you.
const HILL_LIP = [
  'gggggggggggggggg',
  'GgGGgGGGgGGgGGGg',
  'hGhhGhhhGhhGhhhG',
  'GGGhhhGGGGGgggGG',
  'GGGGGGGGGGgggggG',
  'GGGGGGGGGGGhhhGG',
  'GGGGGGGGGGGGGGGG',
  'GgggGGGGGGGGGGGG',
  'gggggGGGGgggGGGG',
  'GhhhGGGGgggggGGG',
  'GGGGGGGGGhhhGGGG',
  'GGGGGGGGGGGGGGGG',
  'GGGGGgggGGGGGGgg',
  'GGGGgggggGGGGggg',
  'GGGGGhhhGGGGGGhh',
  'GGGGGGGGGGGGGGGG',
];

// A kettle grill by the office, where David cooks his famous cheeseburgers.
const GRILL = [
  '................',
  '.......kk.......',
  '....kkkkkkkk....',
  '...kCCCCCCCCk...',
  '..kCKKCCCCCCCk..',
  '..kCKCCCCCCCCk..',
  '.kkkkkkkkkkkkkk.',
  '.kqqqqqqqqqqqqk.',
  '..kCCCCCCCCCCk..',
  '...kCCCCCCCCk...',
  '....kkkkkkkk....',
  '....k..kk..k....',
  '...k...kk...k...',
  '...k...kk...k...',
  '..kk..kkkk..kk..',
  '................',
];

// A red biplane, nose to the east. Cut into tiles by bigProp().
const BIPLANE = [
  '................................................',
  '................................................',
  '................................................',
  '......................kkkkkkkkkkkkkkkkkkkkk.....',
  '......................kwwwwwwwwwwwwwwwwwwwk.....',
  '......kkkk............kpppppppppppppppppppk..kk.',
  '.....kppppk...........kpppppppppppppppppppk..Nn.',
  '....kpppppk...........kPPPPPPPPPPPPPPPPPPPk..Nn.',
  '...kppppppk.........kkkkkkkkkkkkkkkkkkkkkkk..Nn.',
  '...kwwwwwwk.kkkkkkkkkc...kq..........kq......Nn.',
  '...kppppppk.kCCCCCCkkc...kq..........kq......Nn.',
  '...kppppppk.kCCCCCCkkc...kq..........kq.kkkkkNn.',
  '...kkkkkkkkkkCCCCCCkkkkkkkkkkkkkkkkkkkkkkqqQkNn.',
  '...kppppppppppppppppppppppppppppppppppppkqqQkkkk',
  '...kppppppppppppppppppppppppppppppppppppkqqQkQQk',
  '...kwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwkqqQkQQk',
  '...kPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPkqqQkQQk',
  '...kPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPkqqQkkkk',
  '....kPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPkqqQkNn.',
  '......kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkNn.',
  '....kkkk..............kpppppppppppppppppk....Nn.',
  '....kCCk..............kkkkkkkkkkkkkkkkkkk....Nn.',
  '....kCCk......................k....k.........Nn.',
  '....kkkk......................k....k.........Nn.',
  '.............................kkkkkkkk........Nn.',
  '............................kCCCCCCCCk.......kk.',
  '............................kCCqqqqCCk..........',
  '............................kCCqQQqCCk..........',
  '............................kCCqQQqCCk..........',
  '............................kCCqqqqCCk..........',
  '............................kCCCCCCCCk..........',
  '.............................kkkkkkkk...........',
];

export const AIRPORT_DEFS = {
  tarmac:       { art: TARMAC, perch: true },
  tarmacLine:   { art: LINE_H, base: 'tarmac', perch: true },
  tarmacLineV:  { art: LINE_V, base: 'tarmac', perch: true },
  turf:         { art: TURF, perch: true },
  runwayMarker: { art: MARKER, base: 'turf', solid: true },
  threshold:    { art: THRESHOLD, base: 'turf', perch: true },
  hangarWall:   { art: HANGAR_WALL, solid: true },
  hangarDoorTop: { art: HANGAR_DOOR_TOP, solid: true },
  hangarDoor:   { art: HANGAR_DOOR, solid: true },  // give it sign text
  hangarInsideTop: { art: HANGAR_INSIDE_TOP, solid: true },
  hangarInside: { art: HANGAR_INSIDE, solid: true },
  windsock:     { frames: [WINDSOCK, WINDSOCK_SAG], frameTime: 0.8, base: 'grass', solid: true },
  hill:         { art: HILL, solid: true },
  hillFace:     { art: HILL_FACE, solid: true },
  hillEdgeE:    { art: HILL_EDGE_E, solid: true },
  hillFaceE:    { art: HILL_FACE_E, solid: true },
  hillLip:      { art: HILL_LIP, solid: true },
  // The airport office is the ranch house's siding and windows, with a door that's locked for now.
  officeDoor:   { ...COAST_DEFS.ranchDoor, solid: true },  // give it sign text
  grill:        { art: GRILL, base: 'grass', solid: true },
};

bigProp('biplane', BIPLANE, { base: 'tarmac', solid: true }, {}, AIRPORT_DEFS);
