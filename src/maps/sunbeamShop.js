// Inside SUNBEAM, in Frenchtown: racks of shirts, hat stands and a counter.
// The clerk sells clothes (data/items.js) that you wear from your BAG; they
// go on over your look (assets/player.js). Tiles are in storeTiles.js and
// frenchtownTiles.js.
export default {
  name: 'SUNBEAM',
  region: 'rivershore',
  indoor: true, // left off the world map
  legend: {
    '#': 'storeWallTop',
    '-': 'storeWall',
    'W': 'storeWindow',
    'P': 'storePoster',
    'c': 'counter',
    'r': 'counterRegister',
    'R': 'clothesRack',
    'h': 'hatStand',
    'p': 'storePlant',
  },
  rows: [
    '############',
    '--W--P--W---',
    'hh__p_____hh',
    'crcc________',
    '____________',
    '_RR___RR__R_',
    '____________',
    'p____m_____p',
  ],
  warps: [
    // The doormat. Arrive back outside, facing down.
    { x: 5, y: 7, to: 'back', facing: 'down' },
  ],
  // The clerk stays behind the counter; face the counter in front of them to shop.
  npcs: [
    { id: 'sunbeamClerk', x: 2, y: 2, area: [2, 2, 2, 2], shop: ['beret', 'bucketHat', 'sunbeamTee', 'flannel', 'breton'], text: ['Hi! Wear it out, or wear it later!'] },
  ],
  signs: [
    { x: 5, y: 1, text: ['A poster: a man in a beret on a bicycle, crossing the bridge.', 'FRENCHTOWN: A LITTLE BIT OF PARIS ON THE DELAWARE.'] },
    ...[[0, 2], [1, 2], [10, 2], [11, 2]].map(([x, y]) => ({ x, y, text: ['Hats on pegs: berets, bucket hats, a straw sun hat. Ask at the counter.'] })),
    ...[1, 2, 6, 7, 10].map((x) => ({ x, y: 5, text: ['A rack of shirts: plaid flannels, striped sailor shirts and golden SUNBEAM tees.'] })),
  ],
};
