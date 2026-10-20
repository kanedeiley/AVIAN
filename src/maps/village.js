// A map is plain data:
//   name        shown in the banner when you arrive
//   region      which part of the world it's in (data/regions.js); its birds count toward that region
//   rows        one string per row, one character per tile (see LEGEND in tiles.js)
//   legend      optional extra/overridden characters for this map only
//   warps       tiles that move you somewhere else when you step on them
//   signs       text shown when you face a tile and press A
//   birds       how many birds are out on the map at once, and which species
//   indoor      true for maps you reach through a door; they're left off the world map
//   dark        true for caves: only your lantern and tiles with `glow` light the map
//   npcs        characters who wander a box of tiles and talk when you press A (see scenes/npcs.js)
//
// Coordinates are (x, y) in tiles, counted from the top-left, starting at 0.

export default {
  name: 'WILLOW VILLAGE',
  region: 'valley',
  rows: [
    'TTTTTTTTTTTT:TTTTTTTTTTT',
    'T...........:..........T',
    'T..RRRR....S:......,,,,T',
    'T..RRRR.....:.....,,,,,T',
    'T.PWHDWP....:...*..,,,,T',
    'T....:......:.......,,,T',
    'T....:::::::::::::....,T',
    'T..*.........:.........T',
    'T............:.........T',
    'T...~~~~.....:....*....T',
    'T..~~~~~~....:.........T',
    'T..~~~~~~....::::......T',
    'T.S.~~~~........:..*...T',
    ':::::::::::::::::......T',
    'T.,,,,.....*....:...,,,T',
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
