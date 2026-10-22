// Van Sant Airport, a grass airstrip out on the Open Plains, between Lark
// Meadow (west) and Erwinna (east). The gravel driveway comes in from the meadow (west) past the office
// to the taxiway, which runs up the east side and along the fronts of the
// three hangars. The mown runway crosses the whole field below the driveway,
// with tall grass on both sides, and grassy hills close it in north and south.
// Tiles are in assets/airportTiles.js; the rows were painted with a script.
export default {
  name: 'VAN SANT AIRPORT',
  region: 'plains',
  legend: {
    // the hills
    '^': 'hill',
    'v': 'hillFace',
    '>': 'hillEdgeE',
    '/': 'hillFaceE',
    'n': 'hillLip',
    'Y': 'hillTree',
    // the driveway, taxiway and runway
    'g': 'gravel',
    '#': 'tarmac',
    '-': 'tarmacLine',
    '|': 'tarmacLineV',
    'u': 'turf',
    'm': 'runwayMarker',
    '[': 'threshold',
    'x': 'windsock',
    // the hangars
    'q': 'greyRidge',
    'Q': 'greyRoof',
    'e': 'greyEave',
    'w': 'hangarWall',
    'd': 'hangarDoorTop',
    'D': 'hangarDoor',
    '0': 'hangarInsideTop',
    '1': 'hangarInside',
    // the office
    '(': 'ranchRidgeLeft',
    'r': 'ranchRidge',
    ')': 'ranchRidgeRight',
    'E': 'ranchEave',
    'W': 'ranchWall',
    'H': 'ranchWindow',
    'O': 'officeDoor',
    'B': 'grill',  // David's cheeseburger is hidden on it (data/collectibles.js)
  },
  rows: [
    '^^^^^^Y^^^^^^^^>TqqqqqqqTTqqqqqqqTqqqqqqq',
    '^^Y^^^^^^^Y^^^^>TQQQQQQQ..QQQQQQQ.QQQQQQQ',
    '^^^^^^^^^^^^^^^>.eeeeeee..eeeeeee.eeeeeee',
    '^^^^^^^^Y^^^^Y^>.wdddddw..wdddddw.w00000w',
    '^^^Y^^^^^^^^^^^>.wDDDDDw..wDDDDDw.w11111w',
    '^^^^^^^^^^^^^^^>.---------------------##T',
    '^^^^^Y^^^^^Y^^^>.####################|##T',
    '^Y^^^^^^^^^^^^^>....................#|##T',
    'vvvvvvvvvvvvvvv/..*..............*..#|##T',
    'T.........................(rrrr)....#|##T',
    'T,,,,,*,,,,,,,,,.....x....EEEEEE....#|##T',
    'T,,,,,,,,,,,*,,,.......*..WHWWHW.B*.#|##T',
    'T,S,,,,,,,,,,,,,.*.......*WHOHWW*...#|##T',
    'ggggggggggggggggggggggggggggggggggggggggg',
    'ggggggggggggggggggggggggggggggggggggggggg',
    'T..............*...............*........T',
    'Tu[uumuuuumuuuumuuuumuuuumuuuumuuuumuu[uT',
    'Tu[uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu[uT',
    'Tu[uumuuuumuuuumuuuumuuuumuuuumuuuumuu[uT',
    'T...*...................*...............T',
    'T,,,,,,,,,,,,,,,,,,*,,,,,,,,,,,,,,,,,,,,T',
    'T,,,,,,*,,,,,,,,,,,,,,,,,,,,,,,,,,*,,,,,T',
    'T,,,,,,,,,,,,,,,,,,,,,,,,,,,*,,,,,,,,,,,T',
    'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
    '^^^Y^^^^^^^^^^Y^^^^^^^^^^^Y^^^^^^^^^^Y^^^',
    '^^^^^^^^^Y^^^^^^^^^^Y^^^^^^^^^^Y^^^^^^^^^',
    '^^^^^^Y^^^^^^^^^^Y^^^^^^^^^^^^^^^^Y^^^^^^',
  ],
  warps: [
    // The driveway west, back to the gate of Lark Meadow.
    { x: 0, y: 13, to: 'pasture', toX: 22, toY: 9, facing: 'left' },
    { x: 0, y: 14, to: 'pasture', toX: 22, toY: 9, facing: 'left' },
    // The driveway east, on down the road to Erwinna.
    { x: 40, y: 13, to: 'erwinna', toX: 1, toY: 13, facing: 'right' },
    { x: 40, y: 14, to: 'erwinna', toX: 1, toY: 14, facing: 'right' },
  ],
  // Parked on the taxiway in front of Hangar 2.
  props: [{ id: 'biplane', x: 27, y: 5 }],
  signs: [
    { x: 2, y: 12, text: ['VAN SANT AIRPORT', 'Grass runway. Gliders, biplanes, and lots of birds.', 'West: LARK MEADOW. East: ERWINNA.'] },
    { x: 20, y: 4, text: ['HANGAR 1', 'The big doors are locked. Through the windows: the long white wing of a glider.'] },
    { x: 29, y: 4, text: ['HANGAR 2', 'Locked. It smells like engine oil and fresh paint in there.'] },
    { x: 37, y: 4, text: ['HANGAR 3', 'The doors are rolled open. Nothing inside but a toolbox, and a mud nest up in the rafters.'] },
    { x: 28, y: 12, text: ['A note is taped to the office door:', 'OUT FLYING. BACK BY SUNDOWN.'] },
    { x: 21, y: 10, text: ['The windsock points east.', 'The wind is coming in from the west today, over the hills.'] },
    // the biplane, from in front and from each side
    { x: 27, y: 6, text: ['A bright red biplane, polished till it shines.', 'There are two open cockpits. The front one is just your size.'] },
    { x: 28, y: 6, text: ['A bright red biplane, polished till it shines.', 'There are two open cockpits. The front one is just your size.'] },
    { x: 29, y: 6, text: ['A bright red biplane, polished till it shines.', 'There are two open cockpits. The front one is just your size.'] },
  ],
  npcs: [
    { id: 'pilot', x: 19, y: 8, area: [17, 7, 25, 12], text: [
      'PILOT: Welcome to VAN SANT! Watch yourself on the runway. Planes land right on the grass here.',
      'The kestrels hover over the runway all day, hunting mice in the tall grass.',
      'And the killdeer nest right on the gravel. If one fakes a broken wing at you, it has eggs nearby!',
      'Someday I\'ll take you up in the biplane. Birds look different from up there.',
      'Your friend HANNAH came through this morning, headed east to ERWINNA with her paints. Said something about a heron.',
    ] },
  ],
  birds: { count: 8, table: ['killdeer', 'killdeer', 'meadowlark', 'barnSwallow', 'barnSwallow', 'bobolink', 'goldfinch'], rare: ['kestrel'], rareChance: 0.2 },
};
