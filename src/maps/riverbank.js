// Tinicum Riverbank, up the towpath north of Tinicum Park. The canal and
// towpath run up the west side; BRIDGE STREET crosses the map near the top.
// At the west edge the street goes over the canal on the red covered bridge,
// and the towpath runs right under it (its roof is `over` art: assets/parkTiles.js).
// East, the street runs out to the steel truss bridge over the Delaware to
// Frenchtown, closed for construction for now. A spur of towpath climbs from
// the towpath up through the woodsline to the street. South of the street,
// past the woods, a gravel lane runs down to two houses: a fieldstone one, and
// BLAIR and DIANE MARSHALL's white one with its garden. North, the towpath is closed.
// The rows were painted with a script.
export default {
  name: 'TINICUM RIVERBANK',
  region: 'rivershore',
  legend: {
    // the canal and towpath
    't': 'towpath',
    'c': 'cattails',
    // the red covered bridge: its roof over the woods, the canal and the towpath (north eave, ridge, south side)
    '1': 'coveredNorthWoods',
    '2': 'coveredNorthWater',
    '3': 'coveredNorthTowpath',
    '4': 'coveredRidgeWoods',
    '5': 'coveredRidgeWater',
    '6': 'coveredRidgeTowpath',
    '7': 'coveredSouthWoods',
    '8': 'coveredSouthWater',
    '9': 'coveredSouthTowpath',
    '<': 'coveredPortalTop',
    '[': 'coveredPortalMiddle',
    '>': 'coveredPortalBottom',
    // Bridge Street and the truss bridge
    '#': 'tarmac',
    '-': 'tarmacLine',
    'x': 'barricade',
    'v': 'trussNorth',
    '=': 'trussDeck',
    'w': 'trussSouth',
    // the lane and yards
    'g': 'gravel',
    'M': 'ruralMailbox',
    'C': 'crops',
    'Z': 'appleTree',
    // the fieldstone house
    'A': 'slateRidge',
    'r': 'slateRoof',
    'E': 'slateEave',
    's': 'fieldstone',
    'H': 'fieldstoneWindow',
    'D': 'fieldstoneDoor',
    // the Marshalls' house
    'o': 'redRidge',
    'R': 'redRoof',
    'F': 'redEave',
    'z': 'whiteSiding',
    'Y': 'whiteWindow',
    'q': 'whiteSidingBase',
    'Q': 'whiteWindowBase',
    'm': 'marshallDoor',
  },
  rows: [
    'TT~~~STTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..T,T,TT,..T.......*..T....cc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..TTT,,TT....*..T........T.TT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..TTTTTTTS..........*.....STT~~~~~~~~~~~~~~~~~~~~~',
    '1122233<##########################x#vvvvvvvvvvvvvvvvvvvvv',
    '4455566[--------------------------x-=====================',
    '7788899>##########################x#wwwwwwwwwwwwwwwwwwwww',
    'TT~~~tt.,TttTTTT........MgM.......TT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..Ttt,T,T.........g.........c~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tttttttTTTT.T.......g....T...Tc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tttttttTTTT.........g........Tc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttS,TTTTTTT.........g........cT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.,TTTTTTT..AAAAA..g..........~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.,,TTTTTT..rrrrr..g..T.....Tc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,..........EEEEE..g........T.~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,,.........ssHss..g.Z.......T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..TTTTTTT..HsDsH..g.....T..TT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,.TTTTTTT....gggggg.........T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..TTTTTTT..*...*..g...T....cc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,.TTTTTTT.........g........cc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..TTTTTTT..ooooo..g.........T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.,,TTTTTT..RRRRR..g.CCCCC...T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,,.........FFFFF..g.CCCCC..cT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,,.........zzYzz..g.CCCCC..Tc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,.T,TTTTT..QqmqQ..g........cc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,.T,T,TTT.*..gggggg.........c~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,,TTTTTTT.*.......g......T.TT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..TTTTTTT..................c.~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,.,TTTTTT...................c~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~~~~~~~~~~~~~~~~~~',
  ],
  warps: [
    // The towpath south, back down to Tinicum Park.
    { x: 5, y: 29, to: 'tinicum', toX: 5, toY: 1, facing: 'down' },
    { x: 6, y: 29, to: 'tinicum', toX: 6, toY: 1, facing: 'down' },
  ],
  signs: [
    { x: 5, y: 0, text: ['TOWPATH CLOSED', 'A washout up ahead. The towpath north is closed until further notice.'] },
    ...[4, 5, 6].map((y) => ({ x: 7, y, text: ['THE RED COVERED BRIDGE', 'It carries BRIDGE STREET over the canal. The towpath runs right underneath.', 'A rope is strung across the doorway: WET PAINT.'] })),
    { x: 16, y: 3, text: ['BRIDGE STREET', 'East: the bridge to FRENCHTOWN. West: the red covered bridge.'] },
    { x: 33, y: 3, text: ['UHLERSTOWN-FRENCHTOWN BRIDGE', 'CLOSED FOR CONSTRUCTION.', 'Across the river: FRENCHTOWN, N.J.'] },
    ...[4, 5, 6].map((y) => ({ x: 34, y, text: ['A striped barricade blocks the bridge.', 'Past it, the steel deck runs out over the DELAWARE, but nobody\'s working on it today.'] })),
    { x: 7, y: 11, text: ['CANAL TOWPATH', 'East: up to BRIDGE STREET. South: TINICUM PARK.'] },
    { x: 24, y: 7, text: ['The mailbox says MARSHALL.'] },
    { x: 26, y: 7, text: ['A rusty mailbox. The name painted on it wore off long ago.'] },
    { x: 20, y: 16, text: ['Nobody answers.', 'A wind chime made of old spoons clinks by the door.'] },
    { x: 20, y: 24, text: ['THE MARSHALLS', 'A welcome mat, a pair of muddy garden boots, and a pot of mums by the door.'] },
  ],
  npcs: [
    { id: 'blair', x: 23, y: 26, area: [17, 26, 32, 28], text: [
      'BLAIR: Afternoon! BLAIR MARSHALL. That\'s my wife DIANE in the garden.',
      'Our son just moved out to PITTSBURGH. Got himself a good job out there.',
      'Three rivers, he says, so he\'ll feel right at home. I told him one river was plenty for anybody.',
      'Five hours down the turnpike. Diane\'s already got the first visit planned.',
    ] },
    { id: 'diane', x: 29, y: 24, area: [26, 20, 32, 25], text: [
      'DIANE: Hi, hon! I\'m DIANE. Has Blair told you? Our son moved to PITTSBURGH!',
      'He keeps sending us pictures of the bridges out there. Four hundred and forty-six of them, he says. More than Venice!',
      'I told him we\'ve got two good bridges right here. Well... one and a half, until they finish the big one.',
      'I miss him. But he calls every Sunday, and he\'s started feeding the birds on his balcony. Takes after his mother.',
    ] },
  ],
  // Swallows over the water, phoebes under the bridges, waxwings in the trees along the lane, and an osprey now and then.
  birds: { count: 8, table: ['treeSwallow', 'treeSwallow', 'phoebe', 'cedarWaxwing', 'cedarWaxwing', 'easternBluebird', 'robin', 'oriole', 'spottedSandpiper'], rare: ['osprey', 'kingfisher'], rareChance: 0.25 },
};
