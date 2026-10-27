// Trees of the Delaware valley, for the woods along the river in Pennsylvania
// and New Jersey: a white oak, a sugar maple, a sycamore (they line the river
// banks) and an eastern hemlock (Pennsylvania's state tree).
//
// The leaves are drawn in placeholder shades, '1' (sunlit) to '4' (deepest
// shadow), and each tree's GREEN swap fills them in. For fall, give each tree
// a second swap (oranges, reds, golds; the hemlock stays green) and bake both.
//
// A map with `trees: '<mix>'` turns its plain 'tree' tiles into a mix of these,
// picked by position, so the woods don't need repainting (see maps/index.js).
import { recolor } from '../gfx/sprite.js';

// Broad and lumpy, with dark gaps between the lobes and a thick, forked trunk.
const OAK = [
  '....333...333...',
  '..3322233322233.',
  '.322112222211223',
  '.321111222111123',
  '3222112432211223',
  '3222224442222223',
  '3211222342212243',
  '3211122222111223',
  '.32222433222243.',
  '.33224443322443.',
  '..3443N44N4433..',
  '...33.NnnN.33...',
  '......NnnN......',
  '......NnnN......',
  '.....NnnnnN.....',
  '....NN.NN.NN....',
];

// A dense, rounded crown on a slim trunk.
const MAPLE = [
  '.....333333.....',
  '...3311122233...',
  '..321111222223..',
  '.32111122232223.',
  '.32111222222223.',
  '3221122232222233',
  '3222222222223233',
  '3222322222222233',
  '3222222223222243',
  '.32232222222243.',
  '.33222222222443.',
  '..334422244433..',
  '....3344N4433...',
  '.......Nn.......',
  '......NnnN......',
  '......NNNN......',
];

// A high, clumpy crown on a tall trunk, its pale, peeling branches forking out underneath.
const SYCAMORE = [
  '...3333..3333...',
  '.33211233211123.',
  '3221112222111223',
  '3211122232211223',
  '3222222222222223',
  '3221122242211223',
  '3211222442111223',
  '.3222243w4222243',
  '..3443wq.qw3443.',
  '...33..wqw..33..',
  '.......qw.......',
  '.......wQ.......',
  '.......Qw.......',
  '.......qQ.......',
  '......wQqw......',
  '......QqQQ......',
];

// Drooping tiers of short needles, the top leaning over.
const HEMLOCK = [
  '........3.......',
  '.......323......',
  '......32223.....',
  '.......3223.....',
  '.....3221223....',
  '....322222223...',
  '......322223....',
  '....3221222223..',
  '...322222221223.',
  '.....332222233..',
  '...3221222222223',
  '..32222222122223',
  '.322222222222223',
  '..333333NN33333.',
  '........NN......',
  '.......NNNN.....',
];

// Summer leaves.
const GREEN = {
  oak:      { 1: 'g', 2: 'G', 3: 'h', 4: '@' },
  maple:    { 1: '%', 2: 'g', 3: 'h', 4: '@' },
  sycamore: { 1: 'g', 2: 'G', 3: 'h', 4: '@' },
  hemlock:  { 1: 'G', 2: '&', 3: '@' },
};

export const TREE_DEFS = {
  oak:      { art: recolor(OAK, GREEN.oak), base: 'grass', solid: true },
  maple:    { art: recolor(MAPLE, GREEN.maple), base: 'grass', solid: true },
  sycamore: { art: recolor(SYCAMORE, GREEN.sycamore), base: 'grass', solid: true },
  hemlock:  { art: recolor(HEMLOCK, GREEN.hemlock), base: 'grass', solid: true },
};

// How many of each tree (by weight) a map's woods are made of. 'tree' is the
// plain round one from tiles.js.
export const TREE_MIXES = {
  // Mixed hardwoods with the odd hemlock, like the hills along the river.
  delaware:  { tree: 3, oak: 3, maple: 3, sycamore: 1, hemlock: 1 },
  // Right down by the water, more sycamores.
  riverside: { tree: 2, oak: 2, maple: 2, sycamore: 3, hemlock: 1 },
};
