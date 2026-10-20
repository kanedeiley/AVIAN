// Interiors are just smaller maps. Anything outside the grid draws as black.
export default {
  name: 'YOUR HOUSE',
  region: 'valley',
  indoor: true, // left off the world map
  rows: [
    '#########',
    '#########',
    'b_______t',
    '_________',
    '___rrr___',
    '___rrr___',
    '_________',
    '____m____',
  ],
  warps: [
    // The doormat. Arrive outside just below the door, facing down.
    { x: 4, y: 7, to: 'village', toX: 5, toY: 5, facing: 'down' },
  ],
};
