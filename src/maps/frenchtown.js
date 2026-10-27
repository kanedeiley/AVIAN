// Frenchtown, N.J., across the Delaware from Tinicum Riverbank: the end of
// the steel truss bridge (opened by beating ASA, see data/rivals.js). Along
// the river on the west side run a canal and its path; WYATT has parked his
// van across the path north (he moved here from Hannahville) and won't budge
// until you show him a photo of a PEREGRINE FALCON. The main road runs east
// from the bridge past the Frenchtown Inn to two roads north to Milford (both
// open once Wyatt has gone north, like the canal path), with houses between them, and on to the Citgo and the
// bridge over Nishisakawick Creek; across it are Frenchtown Park (a playground,
// benches and a fountain among flower beds), Napoli Pizza
// and KATHLEEN'S general store (the general store inside: maps/generalStore.js).
// South of the main road: Bridge Cafe, Cocina del Sol, and SUNBEAM, where you
// can buy hats and shirts (maps/sunbeamShop.js), around a loop road. Every other
// road out of town is closed for now. Shop fronts are storefront() props
// (assets/storeTiles.js). The rows were painted with a script.
export default {
  name: 'FRENCHTOWN',
  region: 'rivershore',
  trees: 'delaware', // oaks, maples, sycamores and hemlocks (assets/treeTiles.js)
  banks: true, // muddy river banks where the water meets land (assets/banks.js)
  legend: {
    't': 'towpath',
    'c': 'cattails',
    'n': 'benchGrass',
    'l': 'lampPostGrass',
    // the bridge from Pennsylvania
    'v': 'trussNorth',
    '=': 'trussDeck',
    'w': 'trussSouth',
    // roads, closed roads, the creek bridge
    '#': 'tarmac',
    '-': 'tarmacLine',
    '|': 'tarmacLineV',
    'x': 'barricade',
    'B': 'canalBridge',
    'p': 'porch',
    'b': 'canalBridgeSouth',
    // the Citgo
    'P': 'paving',
    'G': 'gasPump',
    // the Frenchtown Inn: slate roof, white clapboard
    'A': 'slateRidge',
    'C': 'slateChimney',
    'r': 'slateRoof',
    'E': 'slateEave',
    'z': 'whiteSiding',
    'Y': 'whiteWindow',
    'q': 'whiteSidingBase',
    'Q': 'whiteWindowBase',
    'm': 'marshallDoor',
    // the houses: fieldstone, yellow with a red roof, and a ranch
    's': 'fieldstone',
    'H': 'fieldstoneWindow',
    'D': 'fieldstoneDoor',
    '1': 'redRidge',
    '2': 'redRoof',
    '3': 'redEave',
    '4': 'yellowSiding',
    '5': 'yellowWindow',
    '6': 'yellowSidingBase',
    '7': 'yellowWindowBase',
    '8': 'cooperDoor',
    '(': 'ranchRidgeLeft',
    'R': 'ranchRidge',
    ')': 'ranchRidgeRight',
    'e': 'ranchEave',
    'W': 'ranchWall',
    'h': 'ranchWindow',
    'd': 'officeDoor',
    'f': 'railFence',
    // the playground in Frenchtown Park (assets/parkTiles.js)
    'u': 'mulch',
    'J': 'sand',
    'y': 'swings',
    'L': 'slideTop',
    'K': 'slideBottom',
    'k': 'seesaw',
  },
  rows: [
    '~~~~.~~ttTTTTTTT#|#TTTTTTTT#|#TTTT~~TTTTTTTTTTTTTT',
    '~~~~T~~tt.TTTTTT#|#........#|#....~~T...l.....T.TT',
    '~~~~T~~tt,TTTTTT#|#TAAAAA..#|#.T..~~.uuuuuLu.*.*.T',
    '~~~~c~~tt,TTTTTT#|#.rrrrrT.#|#....~~.uyyyuKu..o..T',
    '~~~~c~~tt,TTTTTT#|#.EEEEE..#|#....~~.uuuuuuun*.*.T',
    '~~~~.~~tt,TTTTTT#|#.sHsHs..#|#...T~~.uJJukuu.....T',
    '~~~~.~~tt,TTTTTT#|#.HsDsH..#|#T...~~.uJJuuuun.T..T',
    '~~~~T~~tt.TTTTTT#|#.**:::::#|#....~~T.......:::::T',
    '~~~~.~~tt,TTTTTT#|#ffffffff#|#....~~.S...........T',
    '~~~~.~~tt.TTTTTT#|#.11111..#|#...P~~..........T..T',
    '~~~~c~~tt,TTTTTT#|#.22222T.#|#...G~~.............T',
    '~~~~.~~tt,TTTTTT#|#T33333..#|#...P~~...........T.T',
    '~~~~c~~tt,TTT,TT#|#.45454.*#|#...G~~.............T',
    '~~~~c~~tt.T,T,TT#|#.67876..#|#PPPP~~.............T',
    '~~~~c~~tt.TTTTTT#|#.**:::::#######BB#############x',
    '~~~~T~~tt.,,TTTT#|#ffffffff###----pp-------------x',
    '~~~~c~~tt,......#|#.(RRRR).#######bb#############x',
    '~~~~c~~tt,AACAAA#|#.eeeeeeT#|#....~~S............T',
    '~~~~c~~tt,rrrrrr#|#TWhWWhW.#|#....~~........T....T',
    '~~~~.~~tt,EEEEEE#|#.WhdhWW.#|#....~~.............T',
    '~~~~c~~tt,zYzzYz#|#.**:::::#|#....~~..........T..T',
    '~~~~T~~ttSQqmqqQ#|#T.......#|#....~~.............T',
    'vvvvvvv#######################....~~PPPPPPP......T',
    '=======--------------------#-#....~~.............T',
    'wwwwwww#######################....~~.........T...T',
    '~~~~c~~tt....##...........##......~~.......*.....T',
    '~~~~.~~tt....##...........##.T.*..~~.............T',
    '~~~~T~~tt....##...........##......~~..T.......*..T',
    '~~~~T~~tt....##...........##....T.~~.............T',
    '~~~~T~~ttPPPP##PPPPPPPPPPP##......~~......T......T',
    '~~~~c~~tt....###############......~~.*.........T.T',
    '~~~~c~~tt.T..###############..T...~~....T........T',
    '~~~~T~~tt..*....T..*..T...##......~~.............T',
    '~~~~T~~STTTTTTTTTTTTTTTTTTxxTTTTTT~~TTTTTTTTTTTTTT',
  ],
  warps: [
    // The bridge back west, to Tinicum Riverbank.
    { x: 0, y: 23, to: 'riverbank', toX: 55, toY: 5, facing: 'left' },
    // Kathleen's: the general store inside. Arrive just above the doormat, facing up.
    { x: 39, y: 21, to: 'generalStore', toX: 5, toY: 8, facing: 'up' },
    // SunBeam's door.
    { x: 22, y: 28, to: 'sunbeamShop', toX: 5, toY: 6, facing: 'up' },
    // Wyatt's van door, while it's parked here.
    { x: 8, y: 7, to: 'van', toX: 5, toY: 3, facing: 'up', until: 'wyattWentNorth' },
    // The canal path north, to Milford: blocked by Wyatt's van until he's gone north.
    ...[7, 8].map((x) => ({
      x, y: 0, to: 'milford', toX: x, toY: 22, facing: 'up',
      locked: { flag: 'wyattWentNorth', tile: 'sign', text: ['CANAL PATH CLOSED', 'North to MILFORD. A tree is down across the path.'] },
    })),
    // The east road north, to Milford too, once Wyatt has gone north.
    ...[27, 28, 29].map((x) => ({
      x, y: 0, to: 'milford', toX: x, toY: 22, facing: 'up',
      locked: { flag: 'wyattWentNorth', tile: 'barricade', text: ['ROAD CLOSED', 'North: water main repair. Sorry for the mess!'] },
    })),
    // The west road north, to Milford (maps/milford.js). Barricaded (and off the world map) until Wyatt has gone north.
    ...[16, 17, 18].map((x) => ({
      x, y: 0, to: 'milford', toX: x, toY: 22, facing: 'up',
      locked: { flag: 'wyattWentNorth', tile: 'barricade', text: ['ROAD CLOSED', 'The road to MILFORD is being repaved.'] },
    })),
  ],
  props: [
    // Wyatt's van, across the canal path north, until you show him a peregrine.
    { x: 7, y: 6, id: 'sprinterVanTowpath', until: 'wyattWentNorth' },
    { x: 30, y: 9, id: 'citgoFront' },
    { x: 38, y: 9, id: 'napoliFront' },
    { x: 37, y: 18, id: 'kathleensFront' },
    { x: 9, y: 25, id: 'bridgeCafeFront' },
    { x: 15, y: 25, id: 'cocinaFront' },
    { x: 20, y: 25, id: 'sunbeamFront' },
  ],
  signs: [
    { x: 9, y: 21, text: ['FRENCHTOWN, N.J.', 'Shops, food and river views. West: the bridge back to PENNSYLVANIA.'] },
    { x: 7, y: 33, text: ['CANAL PATH CLOSED', 'The bank washed out south of here.'] },
    ...[14, 15, 16].map((y) => ({ x: 49, y, text: ['ROAD CLOSED', 'East: bridge work ahead.'] })),
    ...[26, 27].map((x) => ({ x, y: 33, text: ['ROAD CLOSED', 'South: detour. Use the river road.'] })),
    { x: 12, y: 21, text: ['FRENCHTOWN INN', 'Rooms by the river since 1838.', 'A sign on the door: NO VACANCY.'] },
    { x: 22, y: 6, text: ['Nobody answers. Someone upstairs is practicing piano. Badly.'] },
    { x: 22, y: 13, text: ['A doormat by the door: GO AWAY (BUT NICELY).'] },
    { x: 22, y: 19, text: ['Nobody\'s home. A cat watches you from the window.'] },
    { x: 31, y: 12, text: ['CITGO', 'Gas, coffee, and the best gas-station hoagies on the river.', 'The door is locked: BACK IN 10 MIN.'] },
    ...[10, 12].map((y) => ({ x: 33, y, text: ['A gas pump. $3.89 a gallon.', 'You don\'t have a car.'] })),
    { x: 37, y: 8, text: ['FRENCHTOWN PARK', 'Playground open dawn to dusk. Feed the birds, not the geese.'] },
    { x: 46, y: 3, text: ['A little fountain. A pigeon is taking a bath in it, very seriously.'] },
    { x: 40, y: 12, text: ['NAPOLI PIZZA', 'Closed. A handwritten note: BACK AT 4. TRY THE GARLIC KNOTS.'] },
    { x: 36, y: 17, text: ['NISHISAKAWICK CREEK', 'It tumbles down through town to the DELAWARE.'] },
    { x: 11, y: 28, text: ['BRIDGE CAFE', 'Closed for the day. Through the window: stools, a chalkboard menu, and a cat asleep on the counter.'] },
    { x: 17, y: 28, text: ['COCINA DEL SOL', 'Closed until dinner. It already smells like peppers and lime.'] },
  ],
  npcs: [
    // WYATT, by his van, hunting the RIVERSHORE's nemesis bird (data/dialogue.js). Show him a
    // PEREGRINE and he leaves: his van goes with him, and the canal path north is clear.
    // Kids on the playground in Frenchtown Park.
    { id: 'kidYellow', x: 39, y: 5, area: [37, 2, 43, 6], text: ['KID: The slide is SO fast. I went down it forty times.', 'Okay, eleven. But it felt like forty.'] },
    { id: 'kidRed', x: 42, y: 6, area: [37, 2, 43, 6], text: ['KID: There\'s a big gray bird on top of the Citgo sign.', 'Mom says it eats pigeons. I don\'t believe her.'] },
    { id: 'wyatt', x: 7, y: 9, area: [7, 8, 9, 11], talk: 'wyattFrenchtown', until: 'wyattWentNorth', leaves: { photo: 'peregrine', flag: 'wyattWentNorth' } },
  ],
  // Peregrines off the rooftops and the bridge, swallows and phoebes along the creek, waxwings in the park.
  birds: { count: 9, table: ['peregrine', 'peregrine', 'robin', 'barnSwallow', 'phoebe', 'cedarWaxwing', 'goldfinch', 'treeSwallow', 'killdeer'], rare: ['kingfisher'], rareChance: 0.2 },
};
