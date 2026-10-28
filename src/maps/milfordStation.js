// Inside MILFORD STATION: a waiting room with benches, the departures board,
// the clock and the ticket windows. The glass doors in the back wall open onto
// the platform, where the train north to LUDLOW, VT leaves from (a `train`
// warp: see Overworld.onStep and scenes/train.js). They're barred until the
// GYRFALCON is gone from the platform. The doormat goes back out to Milford.
// (Not a `back` warp: arriving by train, the way you came in is Ludlow.)
// Tiles are in assets/storeTiles.js.
export default {
  name: 'MILFORD STATION',
  region: 'rivershore',
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
    '-W-B--D-K-TTW-',
    '______________',
    '______________',
    '_nnn______nnn_',
    '______________',
    '_nnn______nnn_',
    '______________',
    'p_____m______p',
  ],
  warps: [
    // Through the glass doors and onto the train north.
    {
      x: 6, y: 1, to: 'ludlowStation', toX: 6, toY: 2, facing: 'down', train: 'LUDLOW',
      locked: { nemesis: 'gyrfalcon', tile: 'platformDoorsShut', text: ['The doors to the platform are barred.', 'A note: NO BOARDING UNTIL THE FALCON MOVES ON.'] },
    },
    // The doormat, back out the front door.
    { x: 6, y: 8, to: 'milford', toX: 11, toY: 22, facing: 'down' },
  ],
  signs: [
    { x: 3, y: 1, until: 'gyrfalcon', text: ['DEPARTURES', 'LUDLOW, VT ...... DELAYED', 'Someone has scrawled underneath: FALCON.'] },
    { x: 3, y: 1, after: 'gyrfalcon', text: ['DEPARTURES', 'LUDLOW, VT ...... ON TIME', 'Board through the doors to the platform.'] },
    { x: 8, y: 1, text: ['The station clock. It\'s been two minutes fast since 1962.'] },
    ...[10, 11].map((x) => ({ x, y: 1, text: ['TICKETS', 'The window is shut. A note: TICKETS NORTH ARE FREE THIS WEEK, TO MAKE UP FOR THE DELAYS.'] })),
    { x: 1, y: 1, text: ['Through the window: the rails, running north up the river.'] },
    { x: 12, y: 1, text: ['Through the window: the platform, and the bumper at the end of the line.'] },
  ],
};
