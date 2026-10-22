// Inside a general store: shelves of film, seed and field guides behind the
// counter, shelving units down the middle, and a bike on display. Tiles are
// in storeTiles.js. Talk to the shopkeeper across the counter to buy things.
// Reusable for any store in the world: point a door warp at it, and the
// doormat's `back` warp takes you out the door you came in by.
export default {
  name: 'GENERAL STORE',
  region: 'valley',
  indoor: true, // left off the world map
  legend: {
    '#': 'storeWallTop',
    '-': 'storeWall',
    'W': 'storeWindow',
    'P': 'storePoster',
    '1': 'shelfOptics',
    '2': 'shelfSeed',
    '3': 'shelfBooks',
    '4': 'shelfMixed',
    'A': 'shelvingOptics',
    'B': 'shelvingSeed',
    'c': 'counter',
    'r': 'counterRegister',
    'j': 'counterJar',
    'k': 'bikeDisplay',
    's': 'seedSacks',
    'o': 'seedBarrel',
    'p': 'storePlant',
  },
  rows: [
    '############',
    '1234-W-P-W-2',
    '____p_____k_',
    'crcj________',
    '____________',
    '_AB___AB__s_',
    '____________',
    'o_________so',
    '____________',
    'p____m_____p',
  ],
  warps: [
    // The doormat. Arrive back outside wherever you came in, facing down.
    { x: 5, y: 9, to: 'back', facing: 'down' },
  ],
  // The shopkeeper stays behind the register; face the counter in front of her to shop.
  npcs: [
    { id: 'shopkeeper', x: 2, y: 2, area: [2, 2, 2, 2], shop: ['binoculars', 'bike', 'birdseed'], text: ['Welcome in! Everything a birder needs.'] },
  ],
  signs: [
    { x: 7, y: 1, text: ['A poster: THE NORTHERN CARDINAL.', 'Bright red, and fond of sunflower seeds.'] },
    { x: 10, y: 2, text: ['A shiny red BICYCLE with a price tag: $150.', 'Ask at the counter!'] },
    { x: 1, y: 5, text: ['Binoculars, rolls of film and field guides.'] },
    { x: 2, y: 5, text: ['Jars of seed: sunflower, thistle and millet.'] },
    { x: 6, y: 5, text: ['Binoculars, rolls of film and field guides.'] },
    { x: 7, y: 5, text: ['Jars of seed: sunflower, thistle and millet.'] },
    { x: 10, y: 5, text: ['Sacks of BIRDSEED. Buy a handful at the counter.'] },
    { x: 10, y: 7, text: ['Sacks of BIRDSEED. Buy a handful at the counter.'] },
    { x: 0, y: 7, text: ['A barrel of sunflower seeds. A sign says: FOR THE BIRDS, NOT FOR YOU.'] },
    { x: 11, y: 7, text: ['A barrel of sunflower seeds. A sign says: FOR THE BIRDS, NOT FOR YOU.'] },
  ],
};
