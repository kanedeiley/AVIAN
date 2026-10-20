// Inside the Leisters' farmhouse: the kitchen along the back wall (left), the
// hutch and the wood stove, the long farm table, and a rocking chair on a
// braided rug by the bookshelf. Boots and coats by the back door (right).
// Tiles are in assets/farmTiles.js.
export default {
  name: "THE LEISTERS' HOUSE",
  region: 'valley',
  indoor: true, // left off the world map
  legend: {
    '#': 'beams',
    '-': 'leisterWall',
    'W': 'leisterWindow',
    'K': 'leisterHooks',
    'U': 'leisterHutch',
    'P': 'leisterPipe',
    'R': 'leisterFridgeTop',
    '_': 'planks',
    'r': 'leisterFridge',
    'c': 'leisterCounter',
    's': 'leisterSink',
    'o': 'leisterOven',
    'u': 'hutch',
    'S': 'woodStove',
    'B': 'bookshelf',
    'b': 'boots',
    'l': 'farmTableLeft',
    'L': 'tablePie',
    'E': 'tableEggs',
    'i': 'farmTableRight',
    'h': 'chair',
    'g': 'braidedRug',
    'z': 'rockingChair',
    'm': 'doormat',
  },
  rows: [
    '##############',
    'R-W--U-W-P-W-K',
    'rcsocu___S__Bb',
    '______________',
    '_lLEi___ggggg_',
    '_hhhh___ggzgg_',
    '________ggggg_',
    '______________',
    '_______m______',
  ],
  warps: [
    // The doormat. Arrive outside on the porch, just below the front door.
    { x: 7, y: 8, to: 'farm', toX: 30, toY: 7, facing: 'down' },
  ],
  signs: [
    { x: 0, y: 2, text: ['A drawing is stuck to the fridge: a horse, two goats, and a very big chicken.'] },
    { x: 2, y: 2, text: ['A deep farmhouse sink. A colander of just-picked green beans sits in it.'] },
    { x: 3, y: 2, text: ['Something is simmering. It smells like apples and cinnamon.'] },
    { x: 5, y: 2, text: ['Jars of peach jam and strawberry preserves.', 'Every lid says LEISTER in marker.'] },
    { x: 9, y: 2, text: ['The wood stove crackles. A kettle hums on top.'] },
    { x: 12, y: 2, text: ['Seed catalogs, a goat care guide, and a well-thumbed field guide to valley birds.'] },
    { x: 13, y: 1, text: ['A plaid barn jacket and a straw hat.', 'The boots underneath are caked in mud.'] },
    { x: 2, y: 4, text: ['A warm apple pie, cooling. Someone has already sneaked a slice.'] },
    { x: 3, y: 4, text: ['A basket of fresh eggs, still warm from the coop.', 'Brown ones, white ones, and one pale blue one!'] },
  ],
};
