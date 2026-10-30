// BLACK RIVER WOODS, north of LUDLOW up a footpath between the creek and the houses (maps/ludlow.js),
// where the VERMONT CHAPTER of HANNAH's bird club holds its first meeting: a guided walk. The footpath
// comes up to a little trailhead clearing, and a shoveled trail runs west to a thicket of mountain ash,
// north and east across a beaver meadow full of snags, down into the hemlocks and over the frozen
// BLACK RIVER, and out to an OVERLOOK with a campfire, where you can see the WHITE MOUNTAINS far off to the east. Each member waits at a stop with a bird to show you (a zone of
// just that bird: WYATT's waxwings, REESE's merlin, DANIEL's saw-whet owl), and HANNAH waits at the
// overlook (data/dialogue.js walk*). The way in only opens once HANNAH has called the meeting. A first
// draft for Kane to redo from a sketch; the rows were painted with a script.
const ROWS = [
  'pppppppppppppppppppppppppppppppppppppppp',
  'pppppppppppppppppppppppppppppppppppppppp',
  'pppppppppppppppppssssssspppppppppppppppp',
  'pppppppppppppppssXgssssgsspppppppppppppp',
  'ppppppppppppppssgssssgssgssppppppppppppp',
  'ppppppp,,,,,,,,ssssssssssX,,,,,,,,pppppp',
  'ppppppp,,,,,,,,ssgsgssgXss,,,,,,,,pppppp',
  'ppppppp,,ppppppssssssssssspppppp,,pppppp',
  'ppppppp,,ppppppppssssssspppppppp,,pppppp',
  'ppppppp,,ppppppppppppppppppppppp,,pppppp',
  'ppppppp,,pppppppppppppppppppppss,,sppppp',
  'ppppppp,,ppppppppppppppppppppsss,,sspppp',
  'pppppss,,sppppppppppppppppppsspssssssppp',
  'ppppsss,,sspppppppppppppppppsssssssssppp',
  'pppsssssssssppppppppppppppppsssssspssppp',
  'pppssssssssspppppppppppppppppssssssspppp',
  'pppsssssssssppppppppppppppppppss,,sppppp',
  'ppppsssssssppppppppppppppppppppp,,pppppp',
  'pppppsss,,,,,,,,ppppiiiiiiiiiiii,,iiiiii',
  'pppppppp,,,,,,,,pppppppppppppppp,,pppppp',
  'pppppppppppppp,,pppppppppppppppp,,pppppp',
  'pppppppppppppp,,ppppppppppppppps,,sspppp',
  'pppppppppppppp,,pppppppppppppsss,,sssspp',
  'ppppppppppppss,,ssppppppppppsssssssssssp',
  'ppppppppppppss,,SsppppppppppsssFssssssSp',
  'ppppppppppppss,,ssppppppppppsssssssssssp',
  'ppppppppppppss,,sspppppppppppssssssssspp',
  'pppppppppppppp,,pppppppppppppppssssspppp',
  'pppppppppppppp,,pppppppppppppppppppppppp',
  'pppppppppppppp,,pppppppppppppppppppppppp',
];

export default {
  name: 'BLACK RIVER WOODS',
  region: 'vermont',
  legend: {
    's': 'snow',
    'p': 'snowyPine',
    ',': 'shoveled',
    'g': 'bogGrass',
    'i': 'ice',
    'X': 'snag',
    'F': 'campfire',
    'S': 'signSnow',
  },
  rows: ROWS,
  warps: [
    // South, back down the footpath into Ludlow.
    ...[14, 15].map((x) => ({ x, y: 29, to: 'ludlow', toX: x + 10, toY: 1, facing: 'down' })),
  ],
  // The whole club is out here from the time HANNAH calls the meeting until it's over (then it's a party
  // at EIGHT OH BREW). HANNAH leaves once you've seen every member's bird: she sets walkBirdsSeen.
  npcs: [
    { id: 'wyatt', x: 7, y: 15, area: [5, 14, 9, 16], talk: 'wyattWalk', after: 'clubWalkCalled', until: 'clubWalkDone' },
    { id: 'reese', name: 'REESE', x: 20, y: 5, area: [18, 5, 22, 6], talk: 'reeseWalk', after: 'clubWalkCalled', until: 'clubWalkDone' },
    { id: 'daniel', name: 'DANIEL', x: 32, y: 13, area: [32, 13, 32, 13], talk: 'danielWalk', after: 'clubWalkCalled', until: 'clubWalkDone' },
    { id: 'hannahSki', x: 34, y: 23, area: [33, 22, 36, 25], talk: 'hannahWalk', after: 'clubWalkCalled', until: 'clubWalkDone', leaves: { after: 'walkBirdsSeen', flag: 'clubWalkDone' } },
  ],
  signs: [
    { x: 16, y: 24, text: ['A sign in HANNAH\'s handwriting, with a bird doodled on it:', 'BIRD CLUB WALK! Follow the trail. Every member has a bird to show you. Meet me at the OVERLOOK! -H'] },
    { x: 38, y: 24, text: ['OVERLOOK', 'Past the treetops, far off to the east, a line of white peaks: the WHITE MOUNTAINS.'] },
    { x: 31, y: 24, text: ['The club\'s campfire, crackling away. Somebody brought marshmallows.'] },
    ...ROWS.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'i' ? [{ x, y, text: ['The BLACK RIVER, frozen over. You can hear it running under the ice.'] }] : []))),
  ],
  // Woods birds all along the trail, and at each stop, the bird that member came to show you.
  birds: {
    count: 6,
    table: ['chickadee', 'chickadee', 'junco', 'canadaJay', 'downyWoodpecker', 'hermitThrush', 'ruffedGrouse', 'redpoll'],
    rare: ['pileatedWoodpecker', 'barredOwl'],
    rareChance: 0.15,
    zones: [
      { area: [2, 11, 12, 18], count: 2, table: ['bohemianWaxwing'] },
      { area: [13, 1, 27, 8], count: 2, table: ['merlin'] },
      { area: [27, 10, 37, 16], count: 2, table: ['sawWhetOwl'] },
    ],
  },
};
