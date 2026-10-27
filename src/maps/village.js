// A map is plain data:
//   name        shown in the banner when you arrive
//   region      which part of the world it's in (data/regions.js); its birds count toward that region
//   rows        one string per row, one character per tile (see LEGEND in tiles.js)
//   legend      optional extra/overridden characters for this map only
//   warps       tiles that move you somewhere else when you step on them; a `locked` warp
//               ({ nemesis, rival or flag, tile, text }) is covered by `tile` (solid, `text` when
//               you face it) and left off the world map until that nemesis or rival is beaten,
//               or that story flag is set
//   gates       like locked warps that go nowhere: { x, y, locked } (a barricade until then)
//   signs       text shown when you face a tile and press A
//   birds       how many birds are out on the map at once, and which species (`table`), plus
//               optional `rare` ones picked `rareChance` of the time (doubled at dawn and dusk)
//   indoor      true for maps you reach through a door; they're left off the world map
//               (species' `times` and `weather` in data/birds.js decide who's out right now)
//   dark        true for caves: only your lantern and tiles with `glow` light the map
//   npcs        characters who wander a box of tiles and talk when you press A (see scenes/npcs.js)
//   props       big multi-tile objects stamped over the rows (maps/index.js)
//   banks       true to draw muddy banks where water meets land (assets/banks.js)
//   trees       a mix of trees (TREE_MIXES in assets/treeTiles.js) to turn the map's plain trees into
//
// Any npc, sign, prop or warp can have `after: <id>` or `until: <id>` to only be there
// once (or until) that id is done: a nemesis or rival you've beaten, or a story flag.
// Coordinates are (x, y) in tiles, counted from the top-left, starting at 0.

export default {
  name: 'WILLOW VILLAGE',
  region: 'valley',
  legend: {
    'i': 'lampPostGrass', // lamp posts along the paths
  },
  rows: [
    'TTTTTTTTTTTT:TTTTTTTTTTT',
    'T...........:..........T',
    'T..RRRR....S:......,,,,T',
    'T..RRRR.....:.....,,,,,T',
    'T.PWHDWP....:...*..,,,,T',
    'T....:.....i:.......,,,T',
    'T....:::::::::::::....,T',
    'T..*.........:.........T',
    'T............:.........T',
    'T...~~~~.....:....*....T',
    'T..~~~~~~....:i........T',
    'T..~~~~~~....::::......T',
    'T.S.~~~~.......i:..*...T',
    ':::::::::::::::::......T',
    'T.,,,,.....*....:i..,,,T',
    'T,,,,,,.........:..,,,,T',
    'T,,,,,,,........:.,,,,,T',
    'TTTTTTTTTTTTTTTT:TTTTTTT',
  ],
  warps: [
    // The house door. Arrive inside just above the mat, facing up.
    { x: 5, y: 4, to: 'house', toX: 4, toY: 6, facing: 'up' },
    // The gap in the top tree line. Arrive on the shrine's entrance path.
    { x: 12, y: 0, to: 'shrine', toX: 7, toY: 8, facing: 'up' },
    { x: 16, y: 17, to: 'hannahville', toX: 20, toY: 0, facing: 'down' },
    // The lane west, to the Leister family farm.
    { x: 0, y: 13, to: 'farm', toX: 42, toY: 35, facing: 'left' },
  ],
  signs: [
    { x: 11, y: 2, text: ['NORTH: Old Shrine', 'Few who enter remember the way back...'] },
    { x: 2, y: 12, text: ['WEST: Leister Family Farm', 'Fresh eggs! Mind the goats.'] },
  ],
  birds: { count: 4, table: ['robin', 'bluejay', 'wren'] },
};
