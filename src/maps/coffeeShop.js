// Inside Homestead Coffee Roasters, in Upper Black Eddy: the big copper roaster
// turning in the corner, sacks of green beans on the shelves, an espresso
// machine on the counter and a few cafe tables. Talk to the barista across the
// counter to buy COFFEE (data/items.js), which makes you walk faster for a while.
// Tiles are in assets/parkTiles.js and storeTiles.js.
export default {
  name: 'HOMESTEAD COFFEE ROASTERS',
  region: 'rivershore',
  indoor: true, // left off the world map
  legend: {
    '#': 'storeWallTop',
    '-': 'storeWall',
    'W': 'storeWindow',
    'P': 'storePoster',
    'b': 'coffeeBags',
    'R': 'coffeeRoaster',
    'c': 'counter',
    'e': 'counterEspresso',
    'r': 'counterRegister',
    't': 'cafeTableIndoor',
    'p': 'storePlant',
  },
  rows: [
    '############',
    'bbb-W-P-W-bb',
    '____p____R__',
    'cecr________',
    '____________',
    '_t___t___t__',
    '____________',
    'p____m_____p',
  ],
  warps: [
    // The doormat. Arrive back outside, facing down.
    { x: 5, y: 7, to: 'back', facing: 'down' },
  ],
  // The barista stays behind the counter; face the counter in front of them to buy.
  npcs: [
    { id: 'barista', x: 2, y: 2, area: [2, 2, 2, 2], shop: ['coffee'], text: ['Fresh pot just went on! Want a cup for the road?'] },
  ],
  signs: [
    ...[0, 1, 2, 10, 11].map((x) => ({ x, y: 1, text: ['Burlap sacks of green coffee beans, stacked to the ceiling.', 'The tags say ETHIOPIA, GUATEMALA, SUMATRA.'] })),
    { x: 6, y: 1, text: ['A poster: BIRD-FRIENDLY COFFEE.', 'Grown in the shade of the forest, where our warblers spend the winter.'] },
    { x: 9, y: 2, text: ['A big copper COFFEE ROASTER. The drum turns slowly.', 'The whole barn smells like toasted nuts and chocolate.'] },
    ...[1, 5, 9].map((x) => ({ x, y: 5, text: ['A little cafe table. Someone left a field guide open to OSPREY.'] })),
  ],
};
