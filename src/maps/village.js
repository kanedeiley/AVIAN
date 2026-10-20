// A map is plain data:
//   name        shown in the banner when you arrive
//   rows        one string per row, one character per tile (see LEGEND in tiles.js)
//   legend      optional extra/overridden characters for this map only
//   warps       tiles that move you somewhere else when you step on them
//   signs       text shown when you face a tile and press A
//   encounters  wild creature table for `encounter` tiles (tall grass)
//
// Coordinates are (x, y) in tiles, counted from the top-left, starting at 0.

export default {
  name: 'WILLOW VILLAGE',
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
    'T...~~~~........:..*...T',
    'T...............:......T',
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
    { x: 16, y: 17, to: 'hannahville', toX: 17, toY: 0, facing: 'down' },
  ],
  signs: [
    { x: 11, y: 2, text: ['NORTH: Old Shrine', 'Few who enter remember the way back...'] },
  ],
  encounters: {
    rate: 0.12, // chance per step in tall grass
    table: ['sproutle', 'puddlefin', 'pebblit'],
  },
};
