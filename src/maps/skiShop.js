// Inside the SKI SHOP in Ludlow: racks of skis on the walls, a counter, and
// the ski tech behind it, who sells SKIS (data/items.js `slide`). Put them on
// from your BAG in the snow, then head west up the road to OKEMO and point
// them downhill. Tiles are in assets/storeTiles.js.
export default {
  name: 'SKI SHOP',
  region: 'vermont',
  indoor: true, // left off the world map
  legend: {
    '#': 'storeWallTop',
    '-': 'storeWall',
    'W': 'storeWindow',
    'S': 'skiRack',
    'P': 'storePoster',
    'c': 'counter',
    'r': 'counterRegister',
    'p': 'storePlant',
  },
  rows: [
    '############',
    'SSS-W-P-WSSS',
    '____________',
    'crcc________',
    '____________',
    '____________',
    '____________',
    'p____m_____p',
  ],
  warps: [
    // The doormat. Arrive back outside, facing down.
    { x: 5, y: 7, to: 'back', facing: 'down' },
  ],
  // The ski tech stays behind the counter; face the counter in front of them to shop.
  npcs: [
    { id: 'skiTech', x: 2, y: 2, area: [2, 2, 2, 2], shop: ['skis'], text: ['Headed up to OKEMO? You\'ll want some SKIS!'] },
  ],
  signs: [
    ...[0, 1, 2, 9, 10, 11].map((x) => ({ x, y: 1, text: ['A rack of skis: red, blue and teal. Ask at the counter.'] })),
    { x: 6, y: 1, text: ['A poster: OKEMO MOUNTAIN. West up the road from Ludlow.', 'Hold UP on the slopes to stop. Steer around the trees!'] },
  ],
};
