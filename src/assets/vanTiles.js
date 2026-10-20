// Tiles for the inside of Wyatt's Sprinter van on Hannahville beach: one short
// lane of checkered floor between blue cabinets with grey counters, a little
// stove, a sink by the door, red walls, the cab seats and dashboard at the
// front (right), and the bed across the back (left).
import { stamp, flipY } from '../gfx/sprite.js';
import { bigProp } from './coastTiles.js';

// Black and white checkered floor tiles.
const FLOOR = [
  'wwwwHHHHwwwwHHHH',
  'wwwwHHHHwwwwHHHH',
  'wwwwHHHHwwwwHHHH',
  'wwwwHHHHwwwwHHHH',
  'HHHHwwwwHHHHwwww',
  'HHHHwwwwHHHHwwww',
  'HHHHwwwwHHHHwwww',
  'HHHHwwwwHHHHwwww',
  'wwwwHHHHwwwwHHHH',
  'wwwwHHHHwwwwHHHH',
  'wwwwHHHHwwwwHHHH',
  'wwwwHHHHwwwwHHHH',
  'HHHHwwwwHHHHwwww',
  'HHHHwwwwHHHHwwww',
  'HHHHwwwwHHHHwwww',
  'HHHHwwwwHHHHwwww',
];

// The van's inside wall, red panels, as seen along the top and bottom of the map.
const WALL = [
  'kkkkkkkkkkkkkkkk',
  'rrrrrrrrrrrrrrrr',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'RRRRRRRNRRRRRRRN',
  'NNNNNNNNNNNNNNNN',
  'NNNNNNNNNNNNNNNN',
  'kkkkkkkkkkkkkkkk',
];

// A little window with cream curtains, painted over the wall.
const WINDOW = [
  '................',
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '..kyyccccccYyk..',
  '..kyycwccccyyk..',
  '..kYyccwcccyYk..',
  '..kyycccwccyyk..',
  '..kyyccccccYyk..',
  '..kkkkkkkkkkkk..',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// A cabinet along the top wall: a grey counter, then two blue doors.
// The ones along the bottom wall are the same, upside down.
const CABINET = [
  'QQQQQQQQQQQQQQQQ',
  'qqqqqqqqqqqqqqqq',
  'qqqQqqqqqqqqQqqq',
  'qqqqqqqqqqqqqqqq',
  'qqqqqqQqqqqqqqqq',
  'kkkkkkkkkkkkkkkk',
  'kuuuuuukkuuuuuuk',
  'kuuuuuukkuuuuuuk',
  'kuuuuuukkuuuuuuk',
  'kuuuuwukkuwuuuuk',
  'kuuuuuukkuuuuuuk',
  'kuuuuuukkuuuuuuk',
  'kuuuuuukkuuuuuuk',
  'kUUUUUUkkUUUUUUk',
  'kkkkkkkkkkkkkkkk',
  '................',
];

// A steel basin and tap (beside the door, along the bottom), and a two-burner
// stove with a red kettle, painted over the counter.
const SINK = [
  '......kwk.......',
  '...kkkkwkkkk....',
  '...kCKKKKKCk....',
  '...kCKKcKKCk....',
  '...kCCCCCCCk....',
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
];
const STOVE = [
  '................',
  '..kkkk....kkkk..',
  '..kppk....kQQk..',
  '..kPPk....kQQk..',
  '..kkkk....kkkk..',
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
];

// A cab seat seen from above, facing the windshield.
const SEAT = [
  '................',
  '...kkkk.........',
  '..kCCCCk........',
  '..kCKKCkkkkkkk..',
  '..kCKKCkKKKKKKk.',
  '..kCKKCkKKKKKKk.',
  '..kCKKCkKKKKKKk.',
  '..kCKKCkKKKKKKk.',
  '..kCKKCkKKKKKKk.',
  '..kCKKCkKKKKKKk.',
  '..kCKKCkCCCCCCk.',
  '..kCKKCkkkkkkk..',
  '..kCCCCk........',
  '...kkkk.........',
  '................',
  '................',
];

// The dashboard (with a couple of stickers) and the windshield.
const DASH = [
  'KCCCCCkccccwccck',
  'KCCCCCkcccwcccck',
  'KCCCCCkccwccccck',
  'KCpCCCkcwcccccck',
  'KCCCCCkwccccccck',
  'KCCCCCkcccccccck',
  'KCCCCCkcccccccck',
  'KCCCCCkcccccccwk',
  'KCCCCCkccccccwck',
  'KCCCCCkcccccwcck',
  'KCCCCCkccccwccck',
  'KCCfCCkcccwcccck',
  'KCCCCCkccwccccck',
  'KCCCCCkcwcccccck',
  'KCCCCCkwccccccck',
  'KCCCCCkcccccccck',
];
const STEERING_WHEEL = [
  '................',
  '................',
  '................',
  '.kkkk...........',
  'k....k..........',
  'k....k..........',
  'k....k..........',
  'k....k..........',
  '.kkkk...........',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
];

// The open side door: the floor ends in a step, with sand outside.
const STEP = [
  'QkwwHHHHwwwwHHkQ',
  'QkwwHHHHwwwwHHkQ',
  'QkwwHHHHwwwwHHkQ',
  'QkwwHHHHwwwwHHkQ',
  'QkHHwwwwHHHHwwkQ',
  'QkHHwwwwHHHHwwkQ',
  'QkHHwwwwHHHHwwkQ',
  'QkNNNNNNNNNNNNkQ',
  'QkNNNNNNNNNNNNkQ',
  'QkjjjjJjjjjjjjkQ',
  'QkjjJjjjjjjjjjkQ',
  'QkJjjjjjjjjjjJkQ',
  'QkjjjjjjjjjJjjkQ',
  'QkjjjjjjjJjjjjkQ',
  'QkjjjjjJjjjjjjkQ',
  'QkjjjJjjjjjjjjkQ',
];

// The bed across the back of the van, 2x3 tiles: pillows against the back
// doors and a plaid blanket with a paperback left on it. Cut by bigProp().
const BED = [
  '................................',
  '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.',
  '.kNNNNNNNNNNNNNNNNNNNNNNNNNNNNk.',
  '.kNwwwwwwwwwktttttTtttttTttttNk.',
  '.kNwwwwwwwwwUtttttTtttttTttttNk.',
  '.kNwkkkkkkwwUtttttTtttttTttttNk.',
  '.kNwkyyyykwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwkyyyYkwwUtttttTtttttTttttNk.',
  '.kNwkyyYykwwUtttttTtttttTttttNk.',
  '.kNwkyYyykwwUtttttTtttttTttttNk.',
  '.kNwkYyyykwwUtttttTtttttTttttNk.',
  '.kNwkyyyykwwUtttttTtttttTttttNk.',
  '.kNwkyyyYkwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwkyyYykwwUtttttTtttttTttttNk.',
  '.kNwkyYyykwwUtttttTtppptTttttNk.',
  '.kNwkYyyykwwUtttttTtPPPtTttttNk.',
  '.kNwkyyyykwwUtttttTtppptTttttNk.',
  '.kNwkyyyYkwwUtttttTtttttTttttNk.',
  '.kNwkyyYykwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwkyYyykwwUtttttTtttttTttttNk.',
  '.kNwkkkkkkwwUtttttTtttttTttttNk.',
  '.kNwwwwwwwwwUtttttTtttttTttttNk.',
  '.kNwwwwwwwwwUtttttTtttttTttttNk.',
  '.kNwwwwwwwwwUtttttTtttttTttttNk.',
  '.kNwwwwwwwwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwwwwwwwwwUtttttTtttttTttttNk.',
  '.kNwkkkkkkwwUtttttTtttttTttttNk.',
  '.kNwkyyyYkwwUtttttTtttttTttttNk.',
  '.kNwkyyYykwwUtttttTtttttTttttNk.',
  '.kNwkyYyykwwUtttttTtttttTttttNk.',
  '.kNwkYyyykwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwkyyyykwwUtttttTtttttTttttNk.',
  '.kNwkyyyYkwwUtttttTtttttTttttNk.',
  '.kNwkyyYykwwUtttttTtttttTttttNk.',
  '.kNwkyYyykwwUtttttTtttttTttttNk.',
  '.kNwkYyyykwwUtttttTtttttTttttNk.',
  '.kNwkyyyykwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwkyyyYkwwUtttttTtttttTttttNk.',
  '.kNwkyyYykwwUtttttTtttttTttttNk.',
  '.kNwkyYyykwwUtttttTtttttTttttNk.',
  '.kNwkYyyykwwUtttttTtttttTttttNk.',
  '.kNwkkkkkkwwUtttttTtttttTttttNk.',
  '.kNwwwwwwwwwUTTTTTTTTTTTTTTTTNk.',
  '.kNwwwwwwwwwUtttttTtttttTttttNk.',
  '.kNwwwwwwwwwktttttTtttttTttttNk.',
  '.kNNNNNNNNNNNNNNNNNNNNNNNNNNNNk.',
  '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.',
  '................................',
];

export const VAN_DEFS = {
  vanFloor: { art: FLOOR },
  vanWall: { art: WALL, solid: true },
  vanWindow: { art: stamp(WALL, WINDOW), solid: true },
  vanCabinet: { art: CABINET, base: 'vanFloor', solid: true },
  vanSink: { art: stamp(CABINET, SINK), base: 'vanFloor', solid: true },
  vanStove: { art: stamp(CABINET, STOVE), base: 'vanFloor', solid: true },
  vanCabinetLow: { art: flipY(CABINET), base: 'vanFloor', solid: true },
  vanSinkLow: { art: flipY(stamp(CABINET, SINK)), base: 'vanFloor', solid: true },
  vanSeat: { art: SEAT, base: 'vanFloor', solid: true },
  vanDash: { art: DASH, solid: true },
  vanDashWheel: { art: stamp(DASH, STEERING_WHEEL), solid: true },
  vanStep: { art: STEP }, // walkable: the map puts the exit warp on it
};

bigProp('vanBed', BED, { base: 'vanFloor', solid: true }, {}, VAN_DEFS);
