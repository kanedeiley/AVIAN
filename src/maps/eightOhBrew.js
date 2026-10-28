// EIGHT OH BREW, the speakeasy under the Ludlow Inn: down the stone steps
// beside the hotel. A dim stone cellar (`dim`: only its lanterns, candles, neon
// and the light down the stairs show the way) with shelves of bottles, a pink
// neon "802", a bar with taps and stools, candlelit tables and old barrels.
// Talk to the bartender across the bar to buy a BEER, which you drink right
// there (data/items.js `drink`): the room sways and glows for a while
// (gfx/tipsy.js). HANNAH unwinds here after a day on the slopes; the first time
// you come down she walks right over to say hello (npc `greets`,
// scenes/npcs.js). The stairs at the bottom go back up. Tiles are in
// assets/storeTiles.js (the rock ceiling is caveTiles.js's caveWall).
export default {
  name: 'EIGHT OH BREW',
  region: 'vermont',
  indoor: true, // left off the world map
  dim: 0.82, // how dark it is away from the lights (see Overworld.draw)
  legend: {
    '#': 'caveWall',
    '_': 'cellarFloor',
    'w': 'cellarWall',
    'L': 'cellarLantern',
    'B': 'bottleShelf',
    'N': 'neonSign',
    'c': 'barCounter',
    'T': 'tapCounter',
    'o': 'barStool',
    't': 'candleTable',
    'r': 'cellarBarrel',
    'U': 'stairsUp',
  },
  rows: [
    '##############',
    'wBBBLwNwLBBBww',
    '______________',
    'cTcTcTcc______',
    '_o_o_o_o______',
    '______________',
    '_t__t_____t_t_',
    '______________',
    'r_____U______r',
  ],
  warps: [
    // Up the stairs and out the cellar doors (not `back`: the doors are the only way in).
    { x: 6, y: 8, to: 'ludlow', toX: 16, toY: 11, facing: 'down' },
  ],
  npcs: [
    // The bartender stays behind the bar; face the bar in front of them to order.
    { id: 'bartender', x: 4, y: 2, area: [4, 2, 4, 2], shop: ['beer'], text: ['Welcome to EIGHT OH BREW. What\'ll it be?'] },
    // Hannah, after a day of skiing. She comes over the first time you walk in.
    { id: 'hannahSki', x: 10, y: 5, area: [8, 4, 13, 7], talk: 'hannahLudlow', sets: 'metHannahLudlow', greets: true },
  ],
  signs: [
    ...[1, 2, 3, 9, 10, 11].map((x) => ({ x, y: 1, text: ['Shelves of bottles, glowing amber and green in the neon light.'] })),
    { x: 6, y: 1, text: ['A pink neon sign: 802.', 'VERMONT\'s area code. Everybody down here just calls it EIGHT OH.'] },
    ...[1, 4, 10, 12].map((x) => ({ x, y: 6, text: ['A little table with a candle in a jar. Someone left a trail map on it.'] })),
    ...[4, 8].map((x) => ({ x, y: 1, text: ['An old iron lantern, flickering on the stone.'] })),
    ...[0, 13].map((x) => ({ x, y: 8, text: ['An oak barrel. Something in it smells like maple.'] })),
  ],
};
