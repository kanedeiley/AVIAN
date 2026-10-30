// TAMARACK BOG, the backcountry past the ski patrol's rope line on the north
// side of the Okemo summit (maps/okemo.js): a trail winds up through the
// spruces to a wide frozen bog of snow and dead sedge, with frozen pools and
// bare gray snags. DANIEL is holed up in a log lean-to off the trail with a
// twisted ankle (until ski patrol brings him down: npc `leaves`), and out on
// the bog, the bird he came for: the GREAT GRAY OWL, VERMONT's nemesis
// (data/nemeses.js). The rope only comes down once you've worked out where he
// went (data/dialogue.js skiPatrol). Tiles are in assets/ludlowTiles.js. A
// first draft for Kane to redo from a sketch; the rows were painted with a script.
const ROWS = [
    'pppppppppppppppppppppppppppppppppppppppp',
    'pppppppppppppppppppppppppppppppppppppppp',
    'ppppppppppppppppssggsgggsgsgpppppppppppp',
    'ppppppppppppsgsggsssggggsssssssspppppppp',
    'ppppppppsgssssgsgXgggggsXsssgssggppppppp',
    'pppppppggsggiiisggssgggssgsgssgggsgsgppp',
    'pppppppgggsiiiiigsgsgggsssgXsgsssXsssppp',
    'pppppppgsssgiiiggssgssssgssgssssgsgggppp',
    'pppppssggsgsgsssggggssssgggsgiiigggXgppp',
    'pppppgssgXsgggssssgpgggsssgssiiigssspppp',
    'ppppppssggsssggssgsggigggssggiiigggspppp',
    'pppppppssgsssgssgsggiiisggsgsggggggspppp',
    'ppppppppggsXgsggsggsgigggsgsXgggpppppppp',
    'pppppppppppppgspgggsggsgsggsgsggpppppppp',
    'ppsppppppppppppggsgsggggggpppppsppppppsp',
    'ppsppppppppppppppppssssppppppppppppppppp',
    'ppppsspppsspspppppssppspsppppppspspppppp',
    'pppppppppppspspppsspppspppsppppssppspppp',
    'ppppppspppppspsppssspppppspppppsppsppppp',
    'ppsppsAZssssppppsspppppppppppppppppppppp',
    'pppppsssssFsppspssppspsppppspppppppppppp',
    'pppppssssssssssssspppppppppppppsspppsppp',
    'pspppssssssspppppsspppppppppppspppsppppp',
    'ppspppppspppsppsppsspspppppppppppppspspp',
    'psssppsppppppppppppsspppppppsspppppppppp',
    'pppppppppppppspppsppssssppppppssspsppppp',
    'pppsppppspppppppppppsspppsppppppsssppppp',
    'pppppppppppppppppppsssSpppsppppspppppppp',
    'pspppppppsppppppppppssspppsppppspppppppp',
    'ppppppppppppppppppppsspppppppppppppppppp',
];

// The frozen pools: every ice tile gets the same sign.
const ICE = ROWS.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'i' ? [{ x, y }] : [])));

export default {
  name: 'TAMARACK BOG',
  region: 'vermont',
  legend: {
    's': 'snow',
    'p': 'snowyPine',
    'g': 'bogGrass',
    'i': 'ice',
    'X': 'snag',
    'A': 'leanToW',
    'Z': 'leanToE',
    'F': 'campfire',
    'S': 'signSnow',
  },
  rows: ROWS,
  warps: [
    // Back south under the rope, onto the Okemo summit.
    ...[20, 21].map((x) => ({ x, y: 29, to: 'okemo', toX: x + 24, toY: 1, facing: 'down' })),
  ],
  npcs: [
    // DANIEL, by his campfire, until you find him and ski patrol takes him down (he's at EIGHT OH BREW after).
    { id: 'daniel', name: 'DANIEL', x: 6, y: 20, area: [6, 20, 6, 20], talk: 'danielBog', leaves: { flag: 'foundDaniel' }, until: 'foundDaniel' },
  ],
  signs: [
    { x: 22, y: 27, text: ['BACKCOUNTRY', 'No ski patrol past this point. TAMARACK BOG is north.'] },
    { x: 6, y: 19, text: ['A log lean-to, roofed with spruce boughs and snow.'] },
    { x: 7, y: 19, text: ['A log lean-to, roofed with spruce boughs and snow.'] },
    { x: 10, y: 20, text: ['A little campfire, burned down low. Somebody\'s been keeping it going.'] },
    ...ICE.map(({ x, y }) => ({ x, y, text: ['A frozen pool in the bog. Dark water moves under the ice.', 'Better not.'] })),
  ],
  // Boreal birds of the spruce bog. The owl isn't one of them: it's the nemesis, on its snag.
  birds: {
    count: 8,
    table: ['borealChickadee', 'borealChickadee', 'canadaJay', 'canadaJay', 'blackBackedWoodpecker', 'whiteWingedCrossbill', 'redpoll'],
    rare: ['spruceGrouse', 'northernShrike'],
    rareChance: 0.25,
  },
};
