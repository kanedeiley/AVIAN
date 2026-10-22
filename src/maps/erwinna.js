// Erwinna, an old smithing town on the canal, down the road east of Van Sant
// Airport. The road comes in from the airport (west) past the forge, the
// general store and a fieldstone house, and crosses the canal on a plank
// bridge to the towpath. South of the road are the inn and the lock tender's
// house; the lock is just past it, where HANNAH paints from a bench on the
// bank. Beyond the red-shale towpath, sycamores line the river. The GREAT BLUE HERON,
// the Open Plains' nemesis bird (data/nemeses.js), stands on the towpath by
// the lock, where the path squeezes past a sycamore, and won't let anyone by:
// the towpath south is the way on.
// Tiles are in assets/canalTiles.js; the rows were painted with a script.
export default {
  name: 'ERWINNA',
  region: 'plains',
  legend: {
    // the houses: fieldstone with slate roofs (farmTiles.js)
    'A': 'slateRidge',
    'C': 'slateChimney',
    'r': 'slateRoof',
    'E': 'slateEave',
    's': 'fieldstone',
    'H': 'fieldstoneWindow',
    'D': 'fieldstoneDoor',
    'G': 'fieldstoneDoorGreen',
    // the smithy
    'F': 'forge',
    'V': 'anvil',
    // the canal and the river bank
    '#': 'lockGate',
    '=': 'canalBridge',
    '_': 'canalBridgeSouth',
    'c': 'cattails',
    'B': 'boat',
    't': 'towpath',
    'Z': 'appleTree',
    // the town
    'b': 'benchGrass',
    'l': 'lampPostGrass',
  },
  rows: [
    'TTTTTTTTTTTTTTTTTTTTTTTTTTT~~~TTTT~~~~~~',
    'T,,,,,,,,,,.....,,.........~~~ttTT~~~~~~',
    'T.AAAACAA.......,,AACAAA.Z.~~~ttTT~~~~~~',
    'TTrrrrrrr..sssss,,rrrrrr..c~~~ttT.~~~~~~',
    'T.EEEEEEE..sssss,,EEEEEE..c~~~ttTT~~~~~~',
    'T.sHsssHs.Tsssss,,sHssHs.Zc~~~ttTT~~~~~~',
    'T.sFsDsHs..sssss,,sHsGHs..c~~~ttTT~~~~~~',
    'T.:::::::..P.:.P.....:....c~~BttTT~~~~~~',
    'T.::V::::..*.:.*..**.:.**.c~~~ttT.~~~~~~',
    'T.::::::,,,,.:.,,,,,.:.**.c~~~ttTT~~~~~~',
    'T....:..,,,,.:.,,,,,.:.**.c~~~ttTT~~~~~~',
    'T....:..,,,,.:.,,,,,.:....c~~~ttT.~~~~~~',
    'T.S..:..l....:...l...:..l..~~~ttTT~~~~~~',
    ':::::::::::::::::::::::::::===ttTT~~~~~~',
    ':::::::::::::::::::::::::::___ttTT~~~~~~',
    'T....:......l......:.l.....~~~ttST~~~~~~',
    'T.AACAAAAA.......AAAACA.T..~~~ttTT~~~~~~',
    'TTrrrrrrrr.,,,,..rrrrrr....###ttTT~~~~~~',
    'T.EEEEEEEE.,,,,T.EEEEEE....~~~ttTT~~~~~~',
    'T.sHsHHsHs.,,,,..sHssHs....~~~tTTT~~~~~~',
    'T.sHsDsHHs.,,,,..sHGssH....~~~ttTT~~~~~~',
    'T..b.:.b.*.,,,,....:......c~~~ttTT~~~~~~',
    'T.*.....*....*............c###ttT.~~~~~~',
    'T,,,,,,,,,*,,,,.*.......b.c~~~ttTT~~~~~~',
    'T,,,*,,,,,,,,,,...........c~~~ttTT~~~~~~',
    'TTTTTTTTTTTTTTTTTTTTTTTTTTT~~~STTT~~~~~~',
  ],
  warps: [
    // The road west, back to the airport driveway.
    { x: 0, y: 13, to: 'airport', toX: 39, toY: 13, facing: 'left' },
    { x: 0, y: 14, to: 'airport', toX: 39, toY: 14, facing: 'left' },
    // The general store's door. Arrive inside just above the doormat, facing up.
    { x: 13, y: 6, to: 'generalStore', toX: 5, toY: 8, facing: 'up' },
  ],
  props: [{ x: 11, y: 3, id: 'generalStoreFront' }],
  signs: [
    { x: 2, y: 12, text: ['ERWINNA', 'A canal town. Smiths, boatmen, and birders welcome.', 'West: VAN SANT AIRPORT.'] },
    { x: 3, y: 6, text: ['The coals in the forge glow orange.', 'You can feel the heat from here.'] },
    { x: 5, y: 6, text: ['ERWINNA FORGE', 'Horseshoes, hinges and hooks. Hand-forged since the canal was dug.'] },
    { x: 4, y: 8, text: ['A huge iron anvil, worn smooth in the middle by a hundred years of hammering.'] },
    { x: 21, y: 6, text: ['A date stone over the door says 1790.', 'Nobody answers, but a cat is asleep on the windowsill.'] },
    { x: 5, y: 20, text: ['THE ERWINNA INN', 'Rooms for boatmen and birders.', 'It smells like pot pie in there.'] },
    { x: 19, y: 20, text: ['LOCK TENDER', 'Ring the bell for passage. Mules have right of way.'] },
    { x: 29, y: 7, text: ['A long canal barge, painted green and red, tied up to the towpath.', 'The name on its stern: THE OLD SMITH.'] },
    { x: 32, y: 15, text: ['CANAL TOWPATH', 'South: the lock, and the long way down the river.'] },
    ...[27, 29].flatMap((x) => [17, 22].map((y) => ({ x, y, text: ['The lock gates are shut tight.', 'The water on one side sits a whole foot higher than the other.'] }))),
    { x: 30, y: 25, text: ['TOWPATH CLOSED', 'The bank washed out south of here. Repairs coming soon!'] },
  ],
  npcs: [
    { id: 'blacksmith', x: 6, y: 8, area: [2, 7, 8, 9], text: [
      'BLACKSMITH: Erwinna\'s been a smithing town since the canal came through.',
      'Every mule on that towpath wore my great-great-grandad\'s shoes. Every barge hung on his hinges.',
      'These days it\'s mostly gate latches and birdfeeder hooks. Bird folks come through here all the time now.',
      'That old heron down by the lock? It\'s stood there so long I could forge you a statue of it from memory.',
    ] },
    { id: 'lockTender', x: 24, y: 18, area: [23, 17, 26, 20], text: [
      'LOCK TENDER: See that heron on the towpath? It was there before I took this job, and it\'ll be there after.',
      'It won\'t let anybody by. Not boatmen, not mules, not me.',
      'Your friend with the paintbrush says it\'s the NEMESIS BIRD of the whole OPEN PLAINS. Sounds about right.',
      'That towpath runs a long way south, once the bank\'s fixed. For now... take it up with the heron.',
    ] },
    { id: 'mule', x: 31, y: 6, area: [30, 1, 31, 11], text: ['The canal mule flicks an ear at you.', 'It has pulled a lot of barges up and down this towpath, and it would like a carrot.'] },
    // Hannah came out here after you beat her nemesis bird (she left a note at home: maps/hannahHouse.js).
    { id: 'hannah', x: 23, y: 23, area: [22, 21, 25, 24], talk: 'hannahErwinna', sets: 'metHannahErwinna' },
  ],
  // Red-winged blackbirds in the cattails, phoebes under the bridge, swallows over the water, and now and then a kingfisher.
  birds: { count: 8, table: ['redWingedBlackbird', 'redWingedBlackbird', 'phoebe', 'phoebe', 'barnSwallow', 'goldfinch', 'killdeer'], rare: ['kingfisher'], rareChance: 0.25 },
};
