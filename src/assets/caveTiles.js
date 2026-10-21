// Tiles for Echo Cave (the tunnel behind the Old Shrine) and Eagle Peak above
// it: dark rock, crystals and a still pool underground; cliffs, pines, boulders
// and snow on the mountain. Tiles with `glow` light up the dark in a `dark` map
// (see Overworld.drawDarkness).
import { recolor, shiftX } from '../gfx/sprite.js';

// ---------- underground ----------

const CAVE_FLOOR = [
  'FFFFFFFFFFFFFFFF',
  'FFFFFFFHFFFFFFFF',
  'FFHFFFFFFFFFFFFF',
  'FFFFFFFFFFFFCFFF',
  'FFFFFFFFFFFFFFFF',
  'FFFFFHFFFFFFFFFF',
  'FFFFFFFFFFFHFFFF',
  'FCFFFFFFFFFFFFFF',
  'FFFFFFFFFFFFFFFF',
  'FFFFFFFFCFFFFFHF',
  'FFFHFFFFFFFFFFFF',
  'FFFFFFFFFFFFFFFF',
  'FFFFFFFFFFHFFFFF',
  'FFFFFCFFFFFFFFFF',
  'FHFFFFFFFFFFFFFF',
  'FFFFFFFFFFFFFFFF',
];

// Solid rock: the cave's ceiling, seen from above.
const CAVE_ROCK = [
  'kHHkkHHHkkkHHHHk',
  'HCCHkHCCHkHCCCCH',
  'HCKCHHCKCHHCKCCH',
  'HCCCHHCCCHHCCCHk',
  'kHHHkkHHHkkHHHkk',
  'kkHHHHkkHHHHHkkk',
  'kHCCCCHHCCCKCHkk',
  'HCKCCCHHCKCCCCHk',
  'HCCCCHkHCCCCCHkk',
  'kHHHHkkkHHHHHkkk',
  'HHkkHHHHkkkHHHHk',
  'CCHHCCKCHkHCCKCH',
  'CKCHCCCCHkHCCCCH',
  'CCCHHCCHkkkHCCHk',
  'HHHkkHHkkHHkHHkk',
  'kkkkkkkkkHHkkkkk',
];

// The rock face along the north side of a passage.
const CAVE_WALL = [
  'CCCKCCCCCCKCCCCC',
  'CKKCCCCCCKKCCCCC',
  'CCCCCHCCCCCCCHCC',
  'CCCCHCCCCCCCHCCC',
  'HCCCCCCKCCCCCCCH',
  'CCCCCCKKCCCCCCCC',
  'CCHCCCCCCCCHCCCC',
  'CHCCCCCCCCHCCCCC',
  'CCCCKCCCCCCCCKCC',
  'CCCKKCCCCCCCKKCC',
  'CCCCCCCHCCCCCCCC',
  'HCCCCCHCCCCCCCHC',
  'CHCCCCCCCHCCCCCH',
  'HHHHHHHHHHHHHHHH',
  'kkkkkkkkkkkkkkkk',
  'HHHHHHHHHHHHHHHH',
];

const STALAGMITE = [
  '................',
  '................',
  '.......kk.......',
  '......kKCk......',
  '......kKCk......',
  '.....kKCCHk.....',
  '.....kKCCHk.....',
  '....kKCCCCHk....',
  '....kKCCCCHk....',
  '...kKCCCCCCHk...',
  '...kKCCCCCHHk...',
  '..kKCCCCCCCCHk..',
  '..kKCCCCCCCHHk..',
  '.kHHHHHHHHHHHHk.',
  '..kkkkkkkkkkkk..',
  '................',
];

const CRYSTALS = [
  '................',
  '.......k........',
  '......kck.......',
  '......kck...k...',
  '..k..kcuuk.kck..',
  '.kck.kcuuk.kcuk.',
  '.kcukkcuUk.kcuk.',
  '.kcuUkcuUkkcuUk.',
  '..kuUkcuUkcuUk..',
  '..kuUkkuUkcuUk..',
  '...kUkkuUkkuUk..',
  '..kkkHkkkkHkkk..',
  '.HHHHHHHHHHHHHH.',
  '................',
  '................',
  '................',
];

const POOL = [
  'UUUUUUUUUUUUUUUU',
  'UUUUUUUUUUUUUUUU',
  'UUuuUUUUUUUUUUUU',
  'UUUUuuUUUUUUUUUU',
  'UUUUUUUUUUUUUUUU',
  'UUUUUUUUUUUuuUUU',
  'UUUUUUUUUUUUUuuU',
  'UUUUUUUUUUUUUUUU',
  'UUUUUUUUUUUUUUUU',
  'UUUUUuuUUUUUUUUU',
  'UUUUUUUuuUUUUUUU',
  'UUUUUUUUUUUUUUUU',
  'kUUUUUUUUUUUUUUk',
  'UuuUUUUUUUUUUUUU',
  'UUUuuUUUUUUUUUUU',
  'UUUUUUUUUUUUUUUU',
];

// Daylight spilling in through an opening; the map puts a warp on it.
const DAYLIGHT = [
  'FFDDDDDDDDDDDDFF',
  'FDDDddddddddDDDF',
  'FDDdddyyyyddDDDF',
  'DDdddyyyyyydddDD',
  'DDddyyyyyyyyddDD',
  'DdddyyyyyyyydddD',
  'DddyyyyyyyyyyddD',
  'DddyyyyyyyyyyddD',
  'DddyyyyyyyyyyddD',
  'DdddyyyyyyyydddD',
  'DDddyyyyyyyyddDD',
  'DDdddyyyyyydddDD',
  'FDDdddyyyyddDDDF',
  'FDDDddddddddDDDF',
  'FFDDDDDDDDDDDDFF',
  'FFFFFFFFFFFFFFFF',
];

// ---------- mountainside ----------

const CLIFF = [
  'qqqqQqqqqqqqQqqq',
  'qwqqQqqqqwqqQqqq',
  'qqqQQqqqqqqQQqqq',
  'QQQQkQQQQQQQkQQQ',
  'qqqqqqqqQqqqqqqq',
  'qqwqqqqqQqqqwqqq',
  'qqqqqqqQQqqqqqqq',
  'QQQQQQQQkQQQQQQQ',
  'qqqQqqqqqqqqqqQq',
  'qwqQqqqqqwqqqqQq',
  'qqQQqqqqqqqqqQQq',
  'QQQkQQQQQQQQQQkQ',
  'qqqqqqqQqqqqqqqq',
  'qqqqwqqQqqqqwqqq',
  'qqqqqqQQqqqqqqqq',
  'QQQQQQQkQQQQQQQQ',
];

// A dark opening in a cliff; the map puts a warp on it.
const CAVE_MOUTH = [
  'qqqqQqqqqqqqQqqq',
  'qwqqQqqqqwqqQqqq',
  'qqqQQQQQQQQQQqqq',
  'QQQQkkkkkkkkQQQQ',
  'qqQkkkkkkkkkkQqq',
  'qqQkkkkkkkkkkQqq',
  'qQkkkkkkkkkkkkQq',
  'qQkkkkkkkkkkkkQq',
  'qQkkkkkkkkkkkkQq',
  'QQkkkkkkkkkkkkQQ',
  'qQkkkkkkkkkkkkQq',
  'qQkkkkkkkkkkkkQq',
  'qQkHkkkkkkkkHkQq',
  'QQkHHkkkkkkHHkQQ',
  'qQDDDDDDDDDDDDQq',
  'qQddddddddddddQq',
];

const BOULDER = [
  '................',
  '................',
  '................',
  '.....kkkkkk.....',
  '...kkqqqqqQkk...',
  '..kqqwwqqqqQQk..',
  '..kqwqqqqqqqQk..',
  '.kqqqqqqqqqqQQk.',
  '.kqqqqqqqqqQQQk.',
  '.kqqqqqqqqQQQQk.',
  '.kQqqqqqqQQQQQk.',
  '..kQQQQQQQQQQk..',
  '...kkkkkkkkkk...',
  '..hhhhhhhhhhhh..',
  '................',
  '................',
];

const PINE = [
  '.......kk.......',
  '......kGGk......',
  '.....kGGhGk.....',
  '....kGGhhGGk....',
  '.....khGGhk.....',
  '....kGGhhGGk....',
  '...kGGhhhhGGk...',
  '....khGGGGhk....',
  '...kGGhhhhGGk...',
  '..kGGhhhhhhGGk..',
  '.kGGhhhhhhhhGGk.',
  '..kkkhhhhhhkkk..',
  '.....kkNNkk.....',
  '.......NN.......',
  '......kNNk......',
  '................',
];

const SNOW = [
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwWwwwwww',
  'wwWwwwwwwwwwwwww',
  'wwwwwwwwwwwwwcww',
  'wwwwwwwwwwwwwwww',
  'wwwwwWwwwwwwwwww',
  'wwwwwwwwwwwwWwww',
  'wcwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwWwwwwWw',
  'wwwWwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwcwwwww',
  'wwwwwWwwwwwwwwww',
  'wWwwwwwwwwwwwWww',
  'wwwwwwwwwwwwwwww',
];

// A pile of stones marking the summit.
const CAIRN = [
  '................',
  '.......kk.......',
  '......kqqk......',
  '......kQQk......',
  '.....kqqqqk.....',
  '.....kQQQQk.....',
  '....kqqwqqqk....',
  '....kQQQQQQk....',
  '...kqqqqqwqqk...',
  '...kQQQQQQQQk...',
  '..kqqwqqqqqqqk..',
  '..kQQQQQQQQQQk..',
  '...kkkkkkkkkk...',
  '..WWWWWWWWWWWW..',
  '................',
  '................',
];

// Loose rock piled up in a passage, with a little daylight leaking through.
const ROCKFALL = [
  '..kkkk....kkkk..',
  '.kKCCHk..kKCCHk.',
  'kKCCCCHkkKCCCCHk',
  'kCCCCCHkKCCCCCHk',
  '.kHHHHkyykHHHHk.',
  'kkkkKkkdyykkKkkk',
  'kKCCCCHkkKCCCCHk',
  'kCCCCCCHKCCCCCHk',
  'kCCCCCCHkCCCCCHk',
  '.kHHCCHkykHHHHkk',
  'kkKkkkkdykKCCCHk',
  'kKCCCHkkkCCCCCCk',
  'kCCCCCHkKCCCCCHk',
  'kCCCCCHkCCCCCCHk',
  '.kHHHHk.kHHHHHk.',
  '..kkkk...kkkkk..',
];

export const CAVE_DEFS = {
  caveFloor:  { art: CAVE_FLOOR },
  caveRock:   { art: CAVE_ROCK, solid: true },
  caveWall:   { art: CAVE_WALL, solid: true },
  stalagmite: { art: STALAGMITE, base: 'caveFloor', solid: true },
  crystals:   { frames: [CRYSTALS, recolor(CRYSTALS, { c: 'w', u: 'c' })], frameTime: 0.5, base: 'caveFloor', solid: true, glow: 1.5 },
  cavePool:   { frames: [POOL, shiftX(POOL, 3)], frameTime: 0.7, solid: true },
  daylight:   { art: DAYLIGHT, glow: 3 },
  rockfall:   { art: ROCKFALL, base: 'caveFloor', solid: true },  // blocks a locked warp (see maps/index.js)

  cliff:      { art: CLIFF, solid: true },
  caveMouth:  { art: CAVE_MOUTH },
  boulder:    { art: BOULDER, base: 'grass', solid: true },
  pine:       { art: PINE, base: 'grass', solid: true },
  snow:       { art: SNOW, perch: true },
  snowyPine:  { art: recolor(PINE, { G: 'w', h: 'G' }), base: 'snow', solid: true },
  cairn:      { art: CAIRN, base: 'snow', solid: true },
};
