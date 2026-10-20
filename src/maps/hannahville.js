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
  name: 'HANNAHVILLE',
  rows: [
    'TTTTTTTTTT~~TTTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTT~~TTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTT~~TTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTT~~TTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTTT~~TTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTTT~~TTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTT~~~TTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTT~~TTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTTT~~TTTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTTTT~~TTTTTT:TTTTTTTTTTTTTTTT',
    'TTTTTTT~~~TTTTTTT:TTTTTTTTTTTTTTTT',
    'TTTTTT~~~TTTTTTT:::TTTTTTTTTTTTTTT',
    'TTTTT~~TTTTTTTT:::::TTTTTTTTTTTTTT',
    'TTT~~~TT......*:::::*.......TTTTTT',
    'T~~~TT.,,,,...*:::::*....,,,TTTTTT',
    '~~TTTT,,,,,,..*:::::*...,,,,TTTTTT',
    'TTTTTT,,,,,,,.B:::::F..,,,,,TTTTTT',
    'TTTTTT,,,,,,,..:::::...,,,,,TTTTTT',
    'TTTTTT,,,,,,,..:::::...,,,,,TTTTTT',
    'TTTTTT,,,,,,,..:::::...,,,,,TTTTTT',
  ],
  warps: [
    // The house door. Arrive inside just above the mat, facing up.
    { x: 17, y: 0, to: 'village', toX: 16, toY: 17, facing: 'up' },
    // The gap in the top tree line. Arrive on the shrine's entrance path.
  ],
  signs: [
    { x: 14, y: 16, text: ['HANNAHVILLE BOUTIQUE', 'Fresh looks for every trainer!'] },
    { x: 20, y: 16, text: ['FLYER: Lost creature!', 'Last seen in the tall grass. If found, please return it to Hannahville.'] },
  ],
  encounters: {
    rate: 0.12, // chance per step in tall grass
    table: ['sproutle', 'puddlefin', 'pebblit'],
  },
};
