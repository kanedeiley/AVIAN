// A tunnel through the hill behind the Old Shrine. It's `dark`: you only see
// what your lantern, the crystals and the daylight at either end light up.
// The way in is on the west side; the passage climbs to an opening onto
// Eagle Peak at the top. A short passage east, past the pool, is blocked by
// a rockfall until you've beaten the Bald Eagle; then it opens onto
// Lark Meadow (maps/pasture.js).
export default {
  name: 'ECHO CAVE',
  region: 'valley',
  dark: true,
  legend: {
    '#': 'caveRock',
    'W': 'caveWall',
    '.': 'caveFloor',
    'i': 'stalagmite',
    'c': 'crystals',
    '~': 'cavePool',
    'L': 'daylight',
  },
  rows: [
    '#################L####',
    '###########WWWWWW.W###',
    '#######WWWW.......cW##',
    '#####WW..i.....~~...##',
    '####W.......c.~~~~...L',
    '###W..i.......~~~.i.##',
    '##W.....###.........##',
    '#W....c.WW#..i....####',
    'W.........W.......####',
    'L....i.........c.#####',
    '##.......i...#########',
    '###c....##############',
    '######################',
  ],
  warps: [
    // Back out to the shrine clearing.
    { x: 0, y: 9, to: 'shrine', toX: 13, toY: 4, facing: 'left' },
    // Up and out onto the mountain, just above the cave mouth.
    { x: 17, y: 0, to: 'mountain', toX: 10, toY: 20, facing: 'up' },
    // East, out to the pasture: buried under loose rock until the Bald Eagle's screech shakes it loose.
    {
      x: 21, y: 4, to: 'pasture', toX: 1, toY: 4, facing: 'right',
      locked: {
        nemesis: 'baldEagle',
        tile: 'rockfall',
        text: ['Loose rock is piled up to the ceiling here.', 'A thin draft blows through the cracks. It smells like fresh-cut grass.'],
      },
    },
  ],
  signs: [
    { x: 12, y: 4, text: ['The crystals glow a soft, steady blue.', 'Somewhere above, wind whistles through the rock.'] },
    { x: 14, y: 4, text: ['The water is perfectly still.', 'Your lantern stares back at you.'] },
  ],
};
