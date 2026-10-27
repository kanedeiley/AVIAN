// Tinicum Park, up the canal towpath north of Erwinna: the first stop in the
// RIVERSHORE. The towpath runs up the west side between the canal (with a
// strip of woods beyond it) and a thicket, with clearings through it into the
// park. The Delaware River comes up from Erwinna along the bottom, behind a
// thicket, and runs up the east side, with more thicket between it and the
// park. Coming in from the south: the playground and the disc golf course,
// a woodsline, then the polo grounds and the first ball field, where HANNAH
// plays pickup ball now that you've beaten the GREAT BLUE HERON. Tinicum Creek
// runs straight across the middle, from under the towpath's stone bridge to
// the river, with a woodsline along each bank and a footbridge over it. North
// of the creek: the second ball field, a meadow, the snack stand (a shipping
// container, shut), the synagogue and the third ball field. The towpath goes
// on north to Tinicum Riverbank (maps/riverbank.js).
// Tiles are in assets/parkTiles.js; the rows were painted with a script.
export default {
  name: 'TINICUM PARK',
  region: 'rivershore',
  trees: 'delaware', // oaks, maples, sycamores and hemlocks (assets/treeTiles.js)
  banks: true, // muddy river banks where the water meets land (assets/banks.js)
  legend: {
    // the canal, towpath, creek and river bank
    't': 'towpath',
    'c': 'cattails',
    '%': 'stoneBridge',
    'n': 'benchGrass',
    // the ball fields
    'u': 'turf',
    'y': 'clay',
    'b': 'base',
    'h': 'homePlate',
    'o': 'mound',
    'w': 'chickenWire',  // the backstops
    // the polo grounds
    'g': 'poloGoal',
    '-': 'poloBoards',
    // the playground
    'm': 'mulch',
    'j': 'sand',
    'Y': 'swings',
    'L': 'slideTop',
    'l': 'slideBottom',
    'e': 'seesaw',
    // disc golf
    'k': 'discBasket',
    'p': 'teePad',
    // the snack stand
    'R': 'containerRoof',
    'C': 'containerWall',
    'O': 'containerShutter',
    // the synagogue
    'A': 'greyRidge',
    'r': 'greyRoof',
    'E': 'greyEave',
    's': 'whiteSiding',
    'X': 'starWindow',
    'H': 'whiteWindowBase',
    'D': 'synagogueDoor',
  },
  rows: [
    'TT~~~ttTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~~~',
    'TT~~~ttTTTT.......................uuuuuuuuuuuuuTTTT~~~~~~',
    'TT~~~ttTT,....AAAAA...............uuuuuuuuuuuuuTTTc~~~~~~',
    'TT~~~tt.......rrrrr...............uuuuuybyuuuuuTTTT~~~~~~',
    'TT~~~tt.......EEEEE........RRRR...uuuuyyyyyuuuuT,TT~~~~~~',
    'TT~~~ttTTT....ssXss........COOC...uuubyyoyybuuuTT,T~~~~~~',
    'TT~~~tt,T,T...HHDHH.......n....n..uuuuyyyyyuuuu,TTT~~~~~~',
    'TT~~~ttTTT...*..:..*..............unuuuyhyuuunuTTTc~~~~~~',
    'TT~~~ttTTT..uuuuuuuuuuuuu.............wwwww....TTTT~~~~~~',
    'TT~~~ttTT,..uuuuuuuuuuuuu.....................TTT,T~~~~~~',
    'TT~~~ttTTTT.uuuuuybyuuuuu...,,,,*,,,,,,,,,,,,,.TTTT~~~~~~',
    'TT~~~ttTTTT.uuuuyyyyyuuuu...,,,,,,,,,*,,,,,*,,.TTTT~~~~~~',
    'TT~~~tt.....uuubyyoyybuuu...,,,,,,*,,,,,,,,,,,.TTTT~~~~~~',
    'TT~~~tt.....uuuuyyyyyuuuu...,,,,,,,,T,,,,*,,,,.TTTT~~~~~~',
    'TT~~~ttTTT..unuuuyhyuuunu...,,*,,,,,,,,*,,,,,,.TTTT~~~~~~',
    'TT~~~ttTTT......wwwww.......,,,,,,,,,,,,,,,,T,.,TTc~~~~~~',
    'TT~~~ttTTT....................................TTTTT~~~~~~',
    'TT~~~ttTTTTTTTTTT.cTTTTTTTTTTT..TTTTTTT.cTTTTTTTTTc~~~~~~',
    'TT~~~%%~~~~~~~~~~~~~~~~~~~~~~~==~~~~~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~%%~~~~~~~~~~~~~~~~~~~~~~~==~~~~~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttSTTTTT.cTTTTTTT.c.TTTTT..TTTTTTTTTTT..TTTTTT~~~~~~',
    'TT~~~ttTTT.....................S...............TT,c~~~~~~',
    'TT~~~tt,,T......................uuuuuuuuuuuuu..TTTT~~~~~~',
    'TT~~~tt,TTT.-------uuu-------...uuuuuuuuuuuuu.TT,TT~~~~~~',
    'TT~~~tt.....uuuuuuuuuuuuuuuuu...uuuuuybyuuuuu.TTTTT~~~~~~',
    'TT~~~tt.....guuuuuuuuuuuuuuug...uuuuyyyyyuuuu..TTTc~~~~~~',
    'TT~~~ttTTT.Suuuuuuuuuuuuuuuuu...uuubyyoyybuuu.TTTTT~~~~~~',
    'TT~~~tt,TT..guuuuuuuuuuuuuuug...uuuuyyyyyuuuu..TTTT~~~~~~',
    'TT~~~ttTTTT.uuuuuuuuuuuuuuuuu...unuuuyhyuuunu..TTTT~~~~~~',
    'TT~~~ttTTT..-----------------.......wwwww......TTTT~~~~~~',
    'TT~~~ttTT,.....................................TTTT~~~~~~',
    'TT~~~ttTTTTTTTT...TTTTTTTT...TTTTTTTTTTT..TTTTTTT,T~~~~~~',
    'TT~~~ttTTT...................uuuuuuuuuuuuupuuu.TTTT~~~~~~',
    'TT~~~ttTTTT..mmjjjmmmmmmm...SupuuuTuuupuuuuuuT.T,Tc~~~~~~',
    'TT~~~ttTTT...mmjjjmmmmmmm....uuuuuuuuuuuuuuuuuTTT,c~~~~~~',
    'TT~~~tt.....nmmmmmmmmmemmn...uuuTuuuuuuuTuuuuuTTTTT~~~~~~',
    'TT~~~tt......mYYYmmLmmmmm....uuuuuuuuuuuuuuuuu.,,,T~~~~~~',
    'TT~~~ttSTTT..mmmmmmlmmmmm....uuuuuuukuuuuuuukuTTTTT~~~~~~',
    'TT~~~ttTTT......T..T.T.T..T..uuuuuuuuuuuuuuuuuTTTTT~~~~~~',
    'TT~~~ttTTTTTTTTTT,T,TT,TTTTT,T,TT,TTTTTTTTTTTTTTTTc~~~~~~',
    'TT~~~ttTTTTTT,TTTTT,TTT,TTT,T,,TTTTTTTT,TTTTTTTTTTT~~~~~~',
    'TT~~~tt,TTTTTT,,TTTTTTTTTTTTTTTTTTTTTT,,TTTTTTTTT,T~~~~~~',
    'TT~~~ttTTTTcc,TTcccTTcTccTTT,,cTT,ccTTTcTcTTTTTTTTT~~~~~~',
    'TT~~~ttTT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    'TT~~~ttTT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  warps: [
    // The towpath south, back down to Erwinna.
    { x: 5, y: 44, to: 'erwinna', toX: 30, toY: 1, facing: 'down' },
    { x: 6, y: 44, to: 'erwinna', toX: 31, toY: 1, facing: 'down' },
    // The towpath north, up to Tinicum Riverbank.
    { x: 5, y: 0, to: 'riverbank', toX: 5, toY: 28, facing: 'up' },
    { x: 6, y: 0, to: 'riverbank', toX: 6, toY: 28, facing: 'up' },
  ],
  signs: [
    { x: 7, y: 37, text: ['TINICUM PARK', 'Ball fields, polo, disc golf and a playground, between the canal and the river.', 'South: ERWINNA.'] },
    { x: 28, y: 33, text: ['DISC GOLF', 'Tee off from the concrete pads, and chain the basket in as few throws as you can.'] },
    { x: 36, y: 37, text: ['A disc golf basket.', 'Somebody\'s orange disc is still sitting in the chains.'] },
    { x: 11, y: 26, text: ['POLO GROUNDS', 'Matches every Saturday in summer.', 'At halftime, everybody walks out to stomp the divots back down.'] },
    { x: 31, y: 21, text: ['TINICUM PARK BALL FIELDS', 'Pickup games every weekend. Bring a glove!'] },
    { x: 7, y: 20, text: ['TINICUM CREEK', 'It runs down out of the hills, under the towpath, and out to the DELAWARE RIVER.'] },
    { x: 16, y: 6, text: ['The synagogue\'s tall blue doors are shut.', 'Over them, a round window with a Star of David catches the light.'] },
    ...[28, 29].map((x) => ({ x, y: 5, text: ['SNACK STAND', 'The shutter is rolled down and padlocked.', 'A hand-painted sign says: CLOSED. SEE YOU NEXT SEASON!'] })),
  ],
  npcs: [
    // Hannah came up here to play ball after you beat the heron (she was painting in maps/erwinna.js).
    // Once you've beaten the GYRFALCON in Milford she's gone north by train, to VERMONT (data/dialogue.js hannahCall).
    { id: 'hannah', x: 37, y: 26, area: [35, 24, 41, 28], talk: 'hannahTinicum', sets: 'metHannahTinicum', until: 'gyrfalcon' },
    { id: 'ballplayer', x: 38, y: 23, area: [33, 22, 43, 23], text: [
      'BALLPLAYER: Your friend HANNAH throws harder than anybody out here.',
      'Then a bird flies over, and she stops the whole game to look at it.',
    ] },
    { id: 'kidRed', x: 17, y: 35, area: [13, 33, 24, 37], text: ['KID: Watch me! I can swing all the way over the top bar!', '...I can\'t really. But I almost can.'] },
    { id: 'kidYellow', x: 21, y: 34, area: [13, 33, 24, 37], text: [
      'KID: There\'s a bird with a blue back and an orange tummy that sits on the backstop.',
      'My grandpa says it\'s a BLUEBIRD, and seeing one is good luck.',
    ] },
    { id: 'poloPony', x: 16, y: 26, area: [13, 24, 27, 28], text: ['A polo pony, out to graze between matches.', 'Its tail is braided up tight, and its nose is covered in grass.'] },
    { id: 'poloPonyGrey', x: 24, y: 27, area: [13, 24, 27, 28], text: ['A dapple-grey polo pony.', 'It snorts at you and goes back to the clover.'] },
  ],
  // Bluebirds on the backstops, swallows over the fields, orioles up in the sycamores, sandpipers bobbing along the creek. Now and then a green heron, or an osprey over the river.
  birds: { count: 10, table: ['easternBluebird', 'easternBluebird', 'treeSwallow', 'treeSwallow', 'oriole', 'robin', 'killdeer', 'spottedSandpiper', 'goldfinch'], rare: ['greenHeron', 'osprey'], rareChance: 0.25 },
};
