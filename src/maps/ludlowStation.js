// Inside LUDLOW STATION, Vermont: the end of the line north from Milford.
// The same kind of waiting room as Milford's: benches, the departures board,
// the clock and the ticket windows, with the glass doors in the back wall out
// to the platform for the train back south (a `train` warp: see
// Overworld.onStep and scenes/train.js). The doormat goes out to snowy Ludlow
// (not a `back` warp: arriving by train, the way you came in is Milford).
// Tiles are in assets/storeTiles.js.
export default {
  name: 'LUDLOW STATION',
  region: 'vermont',
  indoor: true, // left off the world map
  legend: {
    '#': 'storeWallTop',
    '-': 'storeWall',
    'W': 'storeWindow',
    'B': 'departures',
    'D': 'platformDoors',
    'K': 'stationClock',
    'T': 'ticketWindow',
    'n': 'benchFloor',
    'p': 'storePlant',
  },
  rows: [
    '##############',
    '-W-TT-D-K-B-W-',
    '______________',
    '______________',
    '_nnn______nnn_',
    '______________',
    '_nnn______nnn_',
    '______________',
    'p_____m______p',
  ],
  warps: [
    // Through the glass doors and onto the train back south.
    { x: 6, y: 1, to: 'milfordStation', toX: 6, toY: 2, facing: 'down', train: 'MILFORD' },
    // The doormat, out the front door into the snow.
    { x: 6, y: 8, to: 'ludlow', toX: 42, toY: 23, facing: 'down' },
  ],
  signs: [
    { x: 10, y: 1, text: ['DEPARTURES', 'MILFORD, N.J. ...... ON TIME', 'Board through the doors to the platform.'] },
    { x: 8, y: 1, text: ['The station clock. Right on time.'] },
    ...[3, 4].map((x) => ({ x, y: 1, text: ['TICKETS', 'The window is shut. A note: TICKETS SOUTH ARE FREE THIS WEEK, TO MAKE UP FOR THE DELAYS.'] })),
    ...[1, 12].map((x) => ({ x, y: 1, text: ['Through the window: snow coming down, and white mountains all the way to the sky.'] })),
  ],
};
