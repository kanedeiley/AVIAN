// A tunnel through the hill behind the Old Shrine. It's `dark`: you only see
// what your lantern, the crystals and the daylight at either end light up.
// The way in is on the west side; the passage climbs to an opening onto
// Eagle Peak at the top.
export default {
  name: 'ECHO CAVE',
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
    '####W.......c.~~~~..##',
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
  ],
  signs: [
    { x: 12, y: 4, text: ['The crystals glow a soft, steady blue.', 'Somewhere above, wind whistles through the rock.'] },
    { x: 14, y: 4, text: ['The water is perfectly still.', 'Your lantern stares back at you.'] },
  ],
};
