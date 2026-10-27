// Upper Black Eddy, up the towpath north of Tinicum Riverbank. The canal and
// towpath run up the west side; the road to Milford crosses the top of the map
// to the Milford bridge over the Delaware (barricaded until WYATT has gone north,
// flag wyattWentNorth; then it's open to Milford, maps/milford.js). South of the road:
// HOMESTEAD COFFEE ROASTERS, a red barn by the towpath where you can buy
// COFFEE (maps/coffeeShop.js), and the COOPERS' yellow house, with its flowery
// backyard running down to a dock on the river. That's where ASA, your rival,
// keeps watch on the ospreys, and where one perches on the end of the dock
// for his challenge (data/rivals.js). Thick woods fill the south, around a
// fenced pasture. North, the towpath is closed. The rows were painted with a script.
export default {
  name: 'UPPER BLACK EDDY',
  region: 'rivershore',
  trees: 'delaware', // oaks, maples, sycamores and hemlocks (assets/treeTiles.js)
  banks: true, // muddy river banks where the water meets land (assets/banks.js)
  legend: {
    't': 'towpath',
    'c': 'cattails',
    // the road to Milford and the Milford bridge
    '#': 'tarmac',
    '-': 'tarmacLine',
    'x': 'barricade',
    'v': 'trussNorth',
    '=': 'trussDeck',
    'w': 'trussSouth',
    // Homestead Coffee Roasters: a red barn with a grey roof
    'q': 'greyRidge',
    'Q': 'greyRoof',
    'u': 'greyEave',
    'b': 'barnWall',
    'B': 'barnWindow',
    'K': 'roasterSign',
    'd': 'roasterDoor',
    'P': 'paving',
    'O': 'cafeTable',
    // the Coopers' house: yellow clapboard and a slate roof
    'A': 'slateRidge',
    'C': 'slateChimney',
    'r': 'slateRoof',
    'E': 'slateEave',
    'y': 'yellowSiding',
    'Y': 'yellowWindow',
    'J': 'yellowSidingBase',
    'k': 'yellowWindowBase',
    'G': 'cooperDoor',
    'g': 'gravel',
    // the backyard
    '1': 'pinkBed',
    '2': 'violetBed',
    '3': 'yellowBed',
    '5': 'pinkBush',
    '6': 'violetBush',
    '7': 'whiteBush',
    'o': 'fountain',
    'p': 'porch',
    // the pasture
    'f': 'railFence',
    'F': 'railFenceSide',
    'h': 'hayBale',
  },
  rows: [
    'TT~~~STTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt...T.............T..*......T.~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.S....*...T............T..STT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt#############################vvvvvvvvvvvvvvvvvvvvv',
    'TT~~~tt-----------------------------=====================',
    'TT~~~tt#############################wwwwwwwwwwwwwwwwwwwww',
    'TT~~~tt.........:..g..............TT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.........:..g*........**.**cT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..qqqqqqq:..g.AACAAAA.6*..1.T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.TQQQQQQQ:..g.rrrrrrr.35*..TT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..uuuuuuu:T.g.EEEEEEE.33321..~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.TbBbKbBb:..g.yYyyyYy.*.o.1cT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt..bBbdbBb:..g.JkJGJkJ.3.*.1ppppp~~~~~~~~~~~~~~~~~~',
    'TT~~~tt:PPOPPPOPP..gggggg....1.*7*cc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt:PPPPPPPPP....**...**..111..c~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt.......................**16T.~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt......................*2*22T.~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,TTTTTTT,TTTT..TTTTTTTTTTTTcc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTTTTTTTTTT..T,TTTTTTTTTTcc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTfffffffff..ffffffffff,TTT~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTF,,,,,,,,,,,,,,,,,,,F,T.T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~tt,TTTF,,,,,,,,,.,,,,,h,,,FTT.T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTF,,,h,,,,,,,,,,,,,,,FTT..~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTF,,,,,,,,,,,,,,,,,,,FTT..~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTT,F,,,,,,.,,,,,,,,,,,,FTTc.~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTF,,,,,,,,,,,,h,,,,,,FTTTc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTF,,,,,,,,,,,,,,,,.,,FTT.T~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTT,F,,,,,,,,,,,,,,,,,,,FTT..~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTfffffffffffffffffffffTTcc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTT,TTTTTTTTTT,TTTTTTT,TTTTcc~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTTTTTTTTTTTTTTT,TTT,TTTT.c~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~~~~~~~~~~~~~~~~~~',
  ],
  warps: [
    // The towpath south, back down to Tinicum Riverbank.
    { x: 5, y: 31, to: 'riverbank', toX: 5, toY: 1, facing: 'down' },
    { x: 6, y: 31, to: 'riverbank', toX: 6, toY: 1, facing: 'down' },
    // Homestead Coffee Roasters. Arrive inside just above the doormat, facing up.
    { x: 12, y: 12, to: 'coffeeShop', toX: 5, toY: 6, facing: 'up' },
    // The far end of the Milford bridge: Milford, N.J. Barricaded (and off the world map) until Wyatt has gone north.
    {
      x: 56, y: 4, to: 'milford', toX: 1, toY: 14, facing: 'right',
      locked: { flag: 'wyattWentNorth', tile: 'barricade', text: ['A barricade at the far end: INSPECTION. NO CROSSING.'] },
    },
  ],
  // Barricades across the Milford bridge, until Wyatt has gone north.
  gates: [3, 4, 5].map((y) => ({
    x: 35, y,
    locked: { flag: 'wyattWentNorth', tile: 'barricade', text: ['A barricade blocks the MILFORD BRIDGE.', 'A clipboard zip-tied to it says: INSPECTION. NO CROSSING.'] },
  })),
  signs: [
    { x: 5, y: 0, text: ['TOWPATH CLOSED', 'The towpath north is closed for repairs.'] },
    { x: 8, y: 2, text: ['UPPER BLACK EDDY', 'East: the bridge to MILFORD, N.J. South: the towpath to TINICUM.'] },
    { x: 33, y: 2, until: 'wyattWentNorth', text: ['MILFORD BRIDGE', 'CLOSED. Bridge inspection in progress.'] },
    { x: 33, y: 2, after: 'wyattWentNorth', text: ['MILFORD BRIDGE', 'OPEN. Inspection passed!', 'Across the river: MILFORD, N.J.'] },
    { x: 12, y: 11, text: ['HOMESTEAD COFFEE ROASTERS', 'Roasted in the barn, poured on the porch.'] },
    { x: 24, y: 12, text: ['THE COOPERS', 'A hand-lettered card in the window: OSPREY NEST MONITOR. DO NOT KNOCK BEFORE 9.'] },
    { x: 31, y: 11, text: ['A stone birdbath. A goldfinch flicks water everywhere and doesn\'t care who sees.'] },
  ],
  npcs: [
    // ASA, the rival: his lines change as you go (data/dialogue.js). His osprey is on the dock.
    { id: 'asa', x: 31, y: 13, area: [29, 7, 33, 16], talk: 'asa', sets: 'metAsa' },
    { id: 'mrsCooper', x: 25, y: 14, area: [20, 14, 27, 16], text: [
      'MRS. COOPER: Oh! A visitor. You must be here for ASA.',
      'He\'s been out back with those ospreys since April. Doesn\'t even come in for supper.',
      'He\'s a good boy. He just thinks talking scares the birds.',
    ] },
    { id: 'goat', x: 16, y: 24, area: [12, 20, 30, 27], text: ['A goat. It is chewing something that is definitely not grass.'] },
    { id: 'goatBrown', x: 26, y: 22, area: [12, 20, 30, 27], text: ['A brown-and-white goat. It bleats at you, then at a hay bale.'] },
  ],
  // Waxwings and bluebirds along the road, buntings in the pasture, swallows over the river.
  birds: { count: 8, table: ['cedarWaxwing', 'easternBluebird', 'indigoBunting', 'indigoBunting', 'treeSwallow', 'goldfinch', 'robin', 'oriole'], rare: ['kingfisher'], rareChance: 0.2 },
};
