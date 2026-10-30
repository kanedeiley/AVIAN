// EIGHT OH BREW, the speakeasy under the Ludlow Inn: down the stone steps
// beside the hotel. A dim stone cellar (`dim`: only its lanterns, candles, neon
// and the light down the stairs show the way) with shelves of bottles, a pink
// neon "802", a bar with taps and stools, candlelit tables and old barrels.
// Talk to the bartender across the bar to buy a BEER, which you drink right
// there (data/items.js `drink`): the room sways and glows for a while
// (gfx/tipsy.js). HANNAH unwinds here after a day on the slopes; the first time
// you come down she walks right over to say hello (npc `greets`,
// scenes/npcs.js). Once you've found DANIEL out on TAMARACK BOG, he's down here
// too, resting his ankle (data/dialogue.js danielBar), and once WYATT has joined
// HANNAH's club, he hangs out at the end of the bar (wyattBar). Once all three have
// joined, HANNAH calls the club's first meeting, a walk in BLACK RIVER WOODS, and
// after it the whole club throws a party down here, where HANNAH gives you a bus
// ticket to the WHITE MOUNTAINS and heads home. The stairs at the
// bottom go back up. Tiles are in assets/storeTiles.js (the rock ceiling is caveTiles.js's caveWall).
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
    // Hannah, after a day of skiing. She comes over the first time you walk in. Once DANIEL, WYATT and REESE have
    // all joined, she calls the club's first meeting and heads out to BLACK RIVER WOODS (and DANIEL and WYATT with her).
    { id: 'hannahSki', x: 10, y: 5, area: [8, 4, 13, 7], talk: 'hannahLudlow', sets: 'metHannahLudlow', greets: true, until: 'clubWalkCalled', leaves: { after: 'clubFormed', flag: 'clubWalkCalled' } },
    // DANIEL, once ski patrol has brought him down off the mountain: ankle up on a chair by the table in the corner.
    { id: 'daniel', name: 'DANIEL', x: 2, y: 6, area: [2, 6, 2, 6], talk: 'danielBar', after: 'foundDaniel', until: 'clubWalkCalled' },
    // WYATT, once he's joined HANNAH's club: hanging around the end of the bar.
    { id: 'wyatt', x: 12, y: 3, area: [10, 2, 13, 3], talk: 'wyattBar', after: 'wyattJoined', until: 'clubWalkCalled' },
    // After the walk, the whole club's down here for the party. HANNAH gives her toast and her news, hands you a
    // BUS TICKET to the WHITE MOUNTAINS, and goes home (she `leaves`, setting busTicket). The rest stay.
    { id: 'hannahSki', x: 7, y: 5, area: [6, 5, 8, 5], talk: 'hannahParty', after: 'clubWalkDone', until: 'busTicket', leaves: { after: 'clubWalkDone', flag: 'busTicket' } },
    { id: 'daniel', name: 'DANIEL', x: 2, y: 6, area: [2, 6, 2, 6], talk: 'danielParty', after: 'clubWalkDone' },
    { id: 'wyatt', x: 12, y: 3, area: [10, 2, 13, 3], talk: 'wyattParty', after: 'clubWalkDone' },
    { id: 'reese', name: 'REESE', x: 9, y: 7, area: [8, 7, 11, 7], talk: 'reeseParty', after: 'clubWalkDone' },
  ],
  signs: [
    ...[1, 2, 3, 9, 10, 11].map((x) => ({ x, y: 1, text: ['Shelves of bottles, glowing amber and green in the neon light.'] })),
    { x: 6, y: 1, text: ['A pink neon sign: 802.', 'VERMONT\'s area code. Everybody down here just calls it EIGHT OH.'] },
    ...[1, 4, 10, 12].map((x) => ({ x, y: 6, text: ['A little table with a candle in a jar. Someone left a trail map on it.'] })),
    ...[4, 8].map((x) => ({ x, y: 1, text: ['An old iron lantern, flickering on the stone.'] })),
    ...[0, 13].map((x) => ({ x, y: 8, text: ['An oak barrel. Something in it smells like maple.'] })),
  ],
};
