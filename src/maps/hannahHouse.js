// Inside Hannah's ranch house: the kitchen along the back wall (left), the
// living room in the middle, the art corner (right), and the puppies' beds,
// bowls and toys near the door. Plants everywhere. Tiles are in houseTiles.js.
export default {
  name: "HANNAH'S HOUSE",
  region: 'valley',
  indoor: true, // left off the world map
  legend: {
    '#': 'cottageWallTop',
    '-': 'cottageWall',
    'W': 'cottageWindow',
    'A': 'cottagePainting',
    'a': 'cottageFrames',
    'h': 'plantShelf',
    'H': 'potsAndPans',
    'R': 'fridgeTop',
    'r': 'fridge',
    'k': 'cuttingBoard',
    'f': 'fruitAndMail',
    's': 'kitchenSink',
    'o': 'stove',
    '_': 'cottageFloor',
    '[': 'sofaLeft',
    ']': 'sofaRight',
    'c': 'coffeeTable',
    'u': 'cozyRug',
    'O': 'roundRug',
    'M': 'monstera',
    'F': 'fiddleLeaf',
    'p': 'littlePlants',
    'b': 'dogBed',
    'y': 'dogToys',
    'w': 'foodBowls',
    'E': 'easel',
    'e': 'artTable',
    '*': 'paintSplats',
    'C': 'canvases',
    'm': 'mat',
  },
  rows: [
    '##############',
    'RHWHh-A-WhaWAh',
    'rksofFpFp_CepM',
    'p____M[]p_*_Ep',
    'p____ucuu__*_p',
    '_____uuuu____F',
    'bO_y______y___',
    'b_w______p____',
    'Mp__p__m___ppM',
  ],
  warps: [
    // The doormat. Arrive outside on the porch, just below the front door.
    { x: 7, y: 8, to: 'hannahville', toX: 7, toY: 28, facing: 'down' },
  ],
  // Hannah, painting in her art corner. Talking to her starts the hunt for the BALD EAGLE.
  // Once you've photographed it she's off to Erwinna (maps/erwinna.js), and leaves a note.
  npcs: [
    { id: 'hannah', x: 11, y: 4, area: [9, 3, 12, 5], talk: 'hannah', sets: 'metHannah', until: 'baldEagle' },
  ],
  signs: [
    { x: 4, y: 2, text: ['A pile of mail and a bowl of lemons.', 'One envelope says: HANNAH - BIRD CLUB.'] },
    { x: 3, y: 2, text: ['Something is simmering. It smells like basil.'] },
    { x: 12, y: 3, text: ['A half-finished painting of a cardinal in a lemon tree.'] },
    { x: 6, y: 4, text: ['Two mugs, a sketchbook, and a tiny plant in a teacup.'] },
    { x: 10, y: 2, after: 'baldEagle', text: ['A note is tucked into the stack of canvases:', 'Gone painting in ERWINNA, down the road past VAN SANT AIRPORT. Come find me by the canal! - H'] },
  ],
};
