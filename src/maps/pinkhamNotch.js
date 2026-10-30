// PINKHAM NOTCH, in the WHITE MOUNTAINS of New Hampshire: where the bus east from LUDLOW
// (maps/ludlow.js) lets you off, after HANNAH sends you on in honor of the club. Just a start for
// now: the road through the notch (snowbanks at both ends), the NOTCH LODGE (shut), the bus back to
// Ludlow, and the trail north toward MOUNT WASHINGTON, snowed shut. A stub for Kane to build out.
const ROWS = [
  'ppppppppppppppppppppppppppppbbbppppp',
  'ppppppppppppppppppppppppppppsssppppp',
  'pssssssssssssssspssssssssssssssssssp',
  'pspsssssssssssssssssssspssssssssspsp',
  'pssssssssssssssssssssssssssssssssssp',
  'pssssssssssssssssssssssssssssssssssp',
  'pssssssssssssssssssssssssssssssssssp',
  'pssssssssssssssssssssssssssSsssssssp',
  'p,,,l,,,,,,,l,,,,,,,lS,,,,,,,,,,l,,p',
  'b----------------------------------b',
  'b----------------------------------b',
  'b----------------------------------b',
  'p,S,l,,,,,,,l,,,,,,,l,,,,,,,,,,,l,,p',
  'psspsssssssssssssssssssssssssssssssp',
  'pssssssssssssspsssssssssspsssssssssp',
  'psssssssspssssssssssssssssssssspsssp',
  'psssssssssssssssssspsssssssssssssssp',
  'pssssspssssssssssssssssssssssssssssp',
  'pppppppppppppppppppppppppppppppppppp',
  'pppppppppppppppppppppppppppppppppppp',
];

export default {
  name: 'PINKHAM NOTCH',
  region: 'whiteMountains',
  legend: {
    's': 'snow',
    'p': 'snowyPine',
    '-': 'plowedRoadEW',
    ',': 'shoveled',
    'b': 'snowbank',
    'l': 'lampPostSnow',
    'S': 'signSnow',
  },
  rows: ROWS,
  warps: [
    // The bus back west to Ludlow.
    { x: 25, y: 10, to: 'ludlow', toX: 45, toY: 16, facing: 'down', bus: 'LUDLOW' },
  ],
  props: [
    { x: 4, y: 3, id: 'notchLodgeFront' },
    { x: 22, y: 9, id: 'mountainBus' },
  ],
  signs: [
    { x: 7, y: 6, text: ['NOTCH LODGE', 'A note on the door: OPENING SOON. HOT SOUP, BUNKS AND TRAIL REPORTS.'] },
    { x: 21, y: 8, text: ['BUS STOP', 'West to LUDLOW, VERMONT.'] },
    { x: 27, y: 7, text: ['TUCKERMAN RAVINE TRAIL', 'North to MOUNT WASHINGTON. CLOSED: AVALANCHE DANGER.'] },
    ...[28, 29, 30].map((x) => ({ x, y: 0, text: ['The trail is buried in snow, waist deep.', 'Not today.'] })),
    { x: 2, y: 12, text: ['PINKHAM NOTCH', 'WHITE MOUNTAIN NATIONAL FOREST, NEW HAMPSHIRE.'] },
    ...[9, 10, 11].flatMap((y) => [0, 35].map((x) => ({ x, y, text: ['A snowbank across the road.', 'The plows haven\'t gotten past the notch yet.'] }))),
  ],
  birds: { count: 8, table: ['chickadee', 'chickadee', 'borealChickadee', 'canadaJay', 'canadaJay', 'raven', 'junco', 'redpoll'], rare: ['spruceGrouse'], rareChance: 0.15 },
};
