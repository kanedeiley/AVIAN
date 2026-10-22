// Tiles for Erwinna, the old smithing town on the canal east of Van Sant
// Airport: fieldstone walls (the houses wear the farm's slate roofs, see
// farmTiles.js), white sash windows with green shutters, plank doors, the
// smithy's forge and anvil, the canal's lock gates and bridge, and cattails
// along the banks. Art that comes in more than one color uses 'x' for the
// main color and 'z' for its shade, and recolor() fills them in.
import { recolor, stamp } from '../gfx/sprite.js';
import { COAST_DEFS } from './coastTiles.js';

// ---------- the houses ----------

// Rough fieldstone in grays and tans, laid in uneven courses.
const FIELDSTONE = [
  'qqqqqQYYYYYQqqqq',
  'qwqqqQYdYYYQqqqq',
  'qqqqqQYYYYYQqqwq',
  'QQQQQQQQQQQQQQQQ',
  'YYQqqqqqqQYYYYYQ',
  'YdQqqqqwqQYYYdYQ',
  'YYQqqqqqqQYYYYYQ',
  'QQQQQQQQQQQQQQQQ',
  'qqqqQddddYQqqqqq',
  'qqwqQddddYQqqqwq',
  'qqqqQdYYYYQqqqqq',
  'QQQQQQQQQQQQQQQQ',
  'YYYYQqqqqqqQYYYY',
  'YdYYQqqwqqqQYYdY',
  'YYYYQqqqqqqQYYYY',
  'QQQQQQQQQQQQQQQQ',
];

// A white-trimmed sash window between green shutters, with a stone sill.
const SASH_WINDOW = [
  '................',
  '.kkkkkkkkkkkkkk.',
  '.ktkwwwwwwwwktk.',
  '.kTkwccwcccwkTk.',
  '.ktkwcwwccbwktk.',
  '.kTkwccwcbbwkTk.',
  '.ktkwwwwwwwwktk.',
  '.kTkwcccwccwkTk.',
  '.ktkwccbwcbwktk.',
  '.kTkwcbbwbbwkTk.',
  '.ktkwwwwwwwwktk.',
  '.kkkkkkkkkkkkkk.',
  '..QQQQQQQQQQQQ..',
  '................',
  '................',
  '................',
];

// A paneled plank door under a little glass fanlight, on a stone step.
const PLANK_DOOR = [
  '................',
  '...kkkkkkkkkk...',
  '...kwwwwwwwwk...',
  '...kwcwcwcwck...',
  '...kwwwwwwwwk...',
  '...kkkkkkkkkk...',
  '...kxxxxxxxxk...',
  '...kxzzxxzzxk...',
  '...kxzzxxzzxk...',
  '...kxxxxxxxxk...',
  '...kxxxxxxfxk...',
  '...kxzzxxzzxk...',
  '...kxzzxxzzxk...',
  '...kxxxxxxxxk...',
  '...kxxxxxxxxk...',
  '..QQQQQQQQQQQQ..',
];

// ---------- the smithy ----------

// The forge: an open stone hearth with the flue going up the back and coals glowing.
const FORGE = [
  'qqqqqQYYYYYQqqqq',
  'QQQkkkkkkkkkkQQQ',
  'YQkFFFFFFFFFFkQY',
  'YkFFFFFFFFFFFFkY',
  'QkFFFFFHHFFFFFkQ',
  'qkFFFFHHHHFFFFkq',
  'qkFFFFFHHFFFFFkq',
  'qkFFFFFHHFFFFFkq',
  'QkFFFFFFFFFFFFkQ',
  'YkFFFFfFFfFFFFkY',
  'YkFFFfpfpfpfFFkY',
  'YkFFfpPpfpPpfFkY',
  'kkkkkkkkkkkkkkkk',
  'qqqqqqqqqqqqqqqq',
  'QQQQQQQQQQQQQQQQ',
  'YYYYQqqqqqqQYYYY',
];

// A big iron anvil, its horn pointing west.
const ANVIL = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '...kkkkkkkkkkk..',
  '.kkqqqqqqqqqqqk.',
  'kQQQQQQQQQQQQQk.',
  '.kkkkQQQQQQkkk..',
  '.....kQQQQk.....',
  '.....kQQQQk.....',
  '....kQQQQQQk....',
  '...kQQQQQQQQk...',
  '...kkkkkkkkkk...',
  '................',
  '................',
];

// ---------- the canal ----------

// A lock gate: a heavy timber beam across the canal, with the gate below it holding the water back.
const LOCK_GATE = [
  '................',
  '................',
  '................',
  'kkkkkkkkkkkkkkkk',
  'nnnnnnnnnnnnnnnn',
  'nNnnnnNnnnnnNnnn',
  'NNNNNNNNNNNNNNNN',
  'kkkkkkkkkkkkkkkk',
  'NkNNNkNNNkNNNkNN',
  'NkNNNkNNNkNNNkNN',
  'NkNNNkNNNkNNNkNN',
  'kkkkkkkkkkkkkkkk',
  'cwc..cwc...cwc..',
  '................',
  '................',
  '................',
];

// The bridge over the canal: planks running across, with a stone parapet on the `top` or bottom edge.
const DECK = [
  'nnnNnnnnnnnNnnnn',
  'nnnNnnnnnnnNnnnn',
  'NNNNNNNNNNNNNNNN',
  'nnnnnnnNnnnnnnnN',
  'nnnnnnnNnnnnnnnN',
  'NNNNNNNNNNNNNNNN',
  'nnNnnnnnnnNnnnnn',
  'nnNnnnnnnnNnnnnn',
  'NNNNNNNNNNNNNNNN',
  'nnnnnNnnnnnnnNnn',
  'nnnnnNnnnnnnnNnn',
  'NNNNNNNNNNNNNNNN',
  'nnnNnnnnnnnNnnnn',
  'nnnNnnnnnnnNnnnn',
  'NNNNNNNNNNNNNNNN',
  'nnnnnnnNnnnnnnnN',
];
const PARAPET = [
  'kkkkkkkkkkkkkkkk',
  'qqqqQqqqqqqQqqqq',
  'qqqqQqqqqqqQqqqq',
  'QQQQQQQQQQQQQQQQ',
  'kkkkkkkkkkkkkkkk',
  ...Array(11).fill('................'),
];
const PARAPET_SOUTH = [...Array(11).fill('................'), ...PARAPET.slice(0, 5).reverse()];

// The towpath: packed red shale, the color of the soil all along the river, with a few pale pebbles.
const TOWPATH = [
  'eeeeeeeeeeeeeeee',
  'eeEeeeeeeeeeMeee',
  'eeeeeeeeeEeeeeee',
  'eeeeMeeeeeeeeEee',
  'eeeeeEeeeeeeeeee',
  'eeeeeeeeeeeMeeee',
  'eEeeeeeeeeeEeeee',
  'eeeeeeeMeeeeeeee',
  'eeeeeeeeEeeeeeeE',
  'eeeEeeeeeeeeeeee',
  'eeeeeeeeeeeeeEee',
  'eMeeeeeeeeeeeeee',
  'eeeeeeEeeeeMeeee',
  'eEeeeeeeeeeeeEee',
  'eeeeeeeeeeEeeeee',
  'eeeeMeeeeeeeeeee',
];

// Cattails: tall reeds with brown heads, thick enough to hide in.
const CATTAILS = [
  '................',
  '...N.......N....',
  '...n...N...n..N.',
  '...n...n...n..n.',
  '...N...n..hN..n.',
  '..hG...N..Gh..N.',
  '..GG..hG..GG.hG.',
  '.hGh..GG.hGh.GG.',
  '.GhG.hGh.GhG.GhG',
  'hGGh.GhGhGGhhGhG',
  'GhGGhGGhGhGGGhGh',
  'hGhGGhGhGGhGhGGh',
  'GhGhGGhGhGhGGhGh',
  'hGGhGhGGhGGhGhGG',
  'GhGGhGhGhGhGGhGh',
  'hhhhhhhhhhhhhhhh',
];

const RED_DOOR = { x: 'p', z: 'P' };
const GREEN_DOOR = { x: 't', z: 'T' };

export const CANAL_DEFS = {
  fieldstone:       { art: FIELDSTONE, solid: true },
  fieldstoneWindow: { art: stamp(FIELDSTONE, SASH_WINDOW), solid: true, glow: 1, lit: 0.6 },
  // Doors with no inside yet: give them sign text.
  fieldstoneDoor:      { art: stamp(FIELDSTONE, recolor(PLANK_DOOR, RED_DOOR)), solid: true },
  fieldstoneDoorGreen: { art: stamp(FIELDSTONE, recolor(PLANK_DOOR, GREEN_DOOR)), solid: true },
  forge:  { frames: [FORGE, recolor(FORGE, { f: 'p', p: 'f', P: 'e' })], frameTime: 0.3, solid: true, glow: 2.5, flicker: true },
  anvil:  { art: ANVIL, base: 'dirt', solid: true },
  lockGate:       { art: LOCK_GATE, base: 'water', solid: true },
  canalBridge:    { art: stamp(DECK, PARAPET) },
  canalBridgeSouth: { art: stamp(DECK, PARAPET_SOUTH) },
  towpath:    { art: TOWPATH, perch: true },
  cattails:   { art: CATTAILS, base: 'grass', perch: true, cover: true, coversFeet: true },
  benchGrass: { ...COAST_DEFS.bench, base: 'grass' },
};
