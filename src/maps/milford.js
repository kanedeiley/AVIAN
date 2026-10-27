// Milford, N.J., up the river from Frenchtown, across from Upper Black Eddy.
// The Milford bridge comes in over the Delaware from Upper Black Eddy on the
// west (opened, along with the road north out of Frenchtown, once WYATT has
// gone north: flag wyattWentNorth). The main road runs east from it over the
// railroad, past the BARBER SHOP and DESCENDENTS BREW, across the bridge over
// Nishisakawick Creek and on to a barricade (closed east); a road north (closed)
// branches off by the Citgo. The road from Frenchtown comes up from the south
// into the middle of town. West of it, the railroad (north to VERMONT) ends at
// a bumper by MILFORD STATION, where the RIVERSHORE's nemesis bird, the
// GYRFALCON, sits on the platform holding up the trains (data/nemeses.js); the
// station agent tells you about it. Beat it and HANNAH calls from the train
// north (data/dialogue.js hannahCall). East of the road: a yellow house, and
// past the creek, a fieldstone house and a meadow. The canal and its path run
// south along the river to Frenchtown. Its columns line up with Frenchtown's
// below: river 0-3, canal 5-6, path 7-8, the road from Frenchtown 16-18, the
// east road 27-29 (closed north, open south to Frenchtown), the creek 34-35. Rail tiles are in
// assets/milfordTiles.js; shop fronts and the station are storefront() props
// (assets/storeTiles.js). The rows were painted with a script.
export default {
  name: 'MILFORD',
  region: 'rivershore',
  trees: 'delaware', // oaks, maples, sycamores and hemlocks (assets/treeTiles.js)
  banks: true, // muddy river banks where the water meets land (assets/banks.js)
  legend: {
    't': 'towpath',
    'c': 'cattails',
    'l': 'lampPostGrass',
    // the Milford bridge, from Upper Black Eddy
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
    // the railroad, and the station's platform and plaza
    'g': 'gravel',
    'R': 'railTrack',
    'X': 'railCrossing',
    'Z': 'railCrossingLine',
    'Y': 'railBumper',
    'K': 'crossbuck',
    'P': 'paving',
    'L': 'lampPostPaving',
    'n': 'bench',
    // the Citgo
    'G': 'gasPump',
    // the houses: yellow with a red roof, and fieldstone with a slate roof
    '1': 'redRidge',
    '2': 'redRoof',
    '3': 'redEave',
    '4': 'yellowSiding',
    '5': 'yellowWindow',
    '6': 'yellowSidingBase',
    '7': 'yellowWindowBase',
    '8': 'cooperDoor',
    'A': 'slateRidge',
    'C': 'slateChimney',
    'r': 'slateRoof',
    'E': 'slateEave',
    's': 'fieldstone',
    'H': 'fieldstoneWindow',
    'D': 'fieldstoneDoor',
  },
  rows: [
    '~~~~cTTTTgRgTTTTTTTTTTTTTTTxxxTTTT~~TTTTTTTTTTTTTT',
    '~~~~.TTTTgRg.....T.:.....T.#|#....~~.............T',
    '~~~~c,TTTgRg.T.....:.......#|#....~~.........T...T',
    '~~~~cTTTTgRg.......:...T...#|#....~~...T.........T',
    '~~~~cTTTTgRg...*...:.......#|#.T..~~..........*..T',
    '~~~~.TT,TgRg.......:::::...#|#....~~.*......T....T',
    '~~~~.TTTTgRgT......:......T#|#....~~...........T.T',
    '~~~~cTTTTgRg..*....:..*....#|#....~~.............T',
    '~~~~TT,,TgRg.......:.......#|#....~~.PPPPPPP.....T',
    '~~~~cTT,TgRg.......l.......#|#..T.~~.PPPPPPP.....T',
    '~~~~TTTTTgRg...............#|#....~~.PPPPPGP.....T',
    '~~~~cTTTTgRg...............#|#T...~~.PPPPPPP.....T',
    '~~~~cTTTSgRgK..............#|#....~~.PPPPPGP.....T',
    'vvvvvvv###X#######################BB#############x',
    '=======---Z-----------------------pp-------------x',
    'wwwwwww###X#######################bb#############x',
    '~~~~.~~ttgRgPPPL#|#......gg#|#,,.,~~,,.,,........T',
    '~~~~T~~ttgYgPPPP#|#.11111gg#|#,.,,~~.T,,,.AACAA,.T',
    '~~~~T~~ttPPPPPPP#|#*22222gg#|#.,,.~~,....,rrrrr.TT',
    '~~~~T~~ttPPPPPPn#|#.33333gg#|#,,.,~~..*..,EEEEE.,T',
    '~~~~c~~ttPPPPPPP#|#T45454gg#|#,.,,~~,..T.,sHsHs..T',
    '~~~~.~~ttPPPPPPP#|#.67876gg#|#.,,.~~,,,,,.HsDsH,.T',
    '~~~~c~~ttPPPPPPP#|#.**ggggg#|#,,.,~~,.,,T*,.:,.*,T',
    '~~~~T~~ttTTTTTTT#|#TTTTTTTT#|#TTTT~~TTTTTTTTTTTTTT',
  ],
  warps: [
    // The Milford bridge west, back over the river to Upper Black Eddy.
    { x: 0, y: 14, to: 'blackEddy', toX: 55, toY: 4, facing: 'left' },
    // The road south, back down to Frenchtown.
    ...[16, 17, 18].map((x) => ({ x, y: 23, to: 'frenchtown', toX: x, toY: 1, facing: 'down' })),
    // The east road south, back down to Frenchtown's east road.
    ...[27, 28, 29].map((x) => ({ x, y: 23, to: 'frenchtown', toX: x, toY: 1, facing: 'down' })),
    // The canal path south, back down to Frenchtown, where Wyatt's van used to be.
    ...[7, 8].map((x) => ({ x, y: 23, to: 'frenchtown', toX: x, toY: 1, facing: 'down' })),
  ],
  props: [
    { x: 13, y: 9, id: 'barberFront' },
    { x: 21, y: 9, id: 'descendentsFront' },
    { x: 38, y: 9, id: 'citgoFront' },
    { x: 9, y: 18, id: 'milfordStationFront' },
  ],
  signs: [
    { x: 8, y: 12, text: ['MILFORD, N.J.', 'West: the bridge to UPPER BLACK EDDY, PA. South: the road to FRENCHTOWN.'] },
    { x: 12, y: 12, text: ['RAILROAD CROSSING', 'Look both ways. The tracks run north up the river, all the way to VERMONT.'] },
    ...[27, 28, 29].map((x) => ({ x, y: 0, text: ['ROAD CLOSED', 'North: rockslide on the river road. Crews are working on it.'] })),
    ...[13, 14, 15].map((y) => ({ x: 49, y, text: ['ROAD CLOSED', 'East: road work ahead. Local traffic only.'] })),
    { x: 15, y: 12, text: ['MILFORD BARBER SHOP', 'Through the window: one chair, one barber, and one customer asleep under a hot towel.'] },
    { x: 24, y: 12, text: ['DESCENDENTS BREW', 'Closed. A chalkboard by the door: OPEN AT 4. TRIVIA THURSDAY.'] },
    { x: 39, y: 12, text: ['CITGO', 'A sign on the locked door: BACK SOON. GONE TO SEE THE FALCON.'] },
    ...[10, 12].map((y) => ({ x: 42, y, text: ['A gas pump. $3.79 a gallon.', 'You still don\'t have a car.'] })),
    { x: 10, y: 17, text: ['END OF THE LINE', 'The rails run north from here, up the river and on to VERMONT.'] },
    { x: 11, y: 21, until: 'gyrfalcon', text: ['MILFORD STATION', 'Trains north to VERMONT.', 'A note on the door: NO BOARDING UNTIL THE FALCON MOVES ON. PLEASE DO NOT DISTURB IT.'] },
    { x: 11, y: 21, after: 'gyrfalcon', text: ['MILFORD STATION', 'Trains north to VERMONT. Now boarding!'] },
    { x: 22, y: 21, text: ['Nobody\'s home. A pumpkin on the step has a falcon carved into it.'] },
    { x: 44, y: 21, until: 'gyrfalcon', text: ['A sign in the window: BIRDERS, THE FALCON IS AT THE STATION. PLEASE STOP KNOCKING.'] },
    { x: 44, y: 21, after: 'gyrfalcon', text: ['A sign in the window: THE FALCON IS GONE. THANK YOU FOR NOT KNOCKING.'] },
  ],
  npcs: [
    // The station agent tells you about the GYRFALCON on the platform; you need to talk to them before you can face it.
    { id: 'stationAgent', x: 13, y: 22, area: [10, 22, 15, 22], talk: 'stationAgent', sets: 'metMilfordAgent' },
  ],
  // Cliff swallows under the bridge, peregrines off it, sandpipers on the creek, waxwings and bluebirds around town.
  birds: { count: 9, table: ['cliffSwallow', 'cliffSwallow', 'peregrine', 'treeSwallow', 'phoebe', 'cedarWaxwing', 'robin', 'easternBluebird', 'spottedSandpiper'], rare: ['kingfisher'], rareChance: 0.2 },
};
