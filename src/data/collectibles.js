// Collectibles: odd little things hidden around the world. Each one is hidden
// on a tile of its map (it can be a solid one, tucked into bamboo or a hedge)
// and all that gives it away is its tell rising off that tile. Face it
// and press A to pick it up; it goes in game.progress.collectibles and on the
// COLLECTIBLES page of the journal.
//   name      shown in the journal's details, which has room for 15 letters
//   short     the journal list's name, which has room for about 10 letters
//   map, x, y where it's hidden
//   tell      what rises off its tile: 'stench' (the default), 'music', 'feathers', 'smoke', or one of DANIEL's things poking out of the snow: 'mitten', 'page', 'steam' or 'glint'
//   about     the journal's note on it, once you've found it: 4 lines of 14 letters
//   found     what you're told when you pick it up
// The art is in assets/collectibles.js, under the same id.
export const COLLECTIBLES = {
  jacobsDoobie: {
    name: "JACOB'S DOOBIE",
    short: 'DOOBIE',
    map: 'farm', x: 14, y: 26,
    about: 'Jacob swears he only set it down for a second.',
    found: [
      'Something in the bamboo smells... skunky.',
      "You found JACOB'S LOST DOOBIE!",
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  wyattsSoundboard: {
    name: "WYATT'S DJ DECK",
    short: 'SOUNDBOARD',
    map: 'van', x: 6, y: 1,
    tell: 'music',
    about: "Wyatt's van doubles as a beach rave on weekends.",
    found: [
      'Somebody left the music on in this cabinet...',
      "You found WYATT'S DJ SOUNDBOARD!",
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  hannahsJournal: {
    name: 'BIRD JOURNAL',
    short: 'JOURNAL',
    map: 'hannahHouse', x: 11, y: 2,
    tell: 'feathers',
    about: 'Tons of hand-drawn birds, every one by Hannah.',
    found: [
      'Feathers are poking out from under the paint rags...',
      "You found HANNAH'S BIRD JOURNAL!",
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  davidsCheeseburger: {
    name: "DAVID'S BURGER",
    short: 'BURGER',
    map: 'airport', x: 33, y: 11,
    tell: 'smoke',
    about: 'Famous with every pilot who has ever landed here.',
    found: [
      'The grill is still warm, and something smells amazing...',
      "You found DAVID'S FAMOUS CHEESEBURGER!",
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  // Up at Okemo, in a pocket of snow you can only get to off the kicker on Easy Street's side spur.
  danielsMittens: {
    name: "DANIEL'S MITTS",
    short: 'MITTENS',
    map: 'okemo', x: 4, y: 99,
    tell: 'mitten',
    about: 'Name tag sewn in the cuff: DANIEL. Still damp.',
    found: [
      'Something red is sticking up out of the snow...',
      "You found DANIEL'S LOST MITTENS!",
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  // DANIEL's trail (data/dialogue.js skiPatrol): each thing he dropped says a little more about
  // the bird he was after and where he went. The THERMOS and BINOCULARS both point north, to the bog.
  danielsNotebook: {
    name: 'NOTEBOOK PAGE',
    short: 'NOTEBOOK',
    map: 'ludlow', x: 15, y: 26,
    tell: 'page',
    about: 'A huge round face, yellow eyes. BIG. GRAY. SILENT.',
    found: [
      'A page is flapping in the pine by the frozen pond...',
      "You found a page from DANIEL'S NOTEBOOK!",
      'A sketch of an enormous round-faced owl. Under it: "BIG. GRAY. SILENT. Not a BARRED."',
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  danielsThermos: {
    name: 'WARM THERMOS',
    short: 'THERMOS',
    map: 'okemo', x: 47, y: 0,
    tell: 'steam',
    about: 'Still warm. Boot tracks lead north past the rope.',
    found: [
      'Something is steaming in the pines past the rope...',
      "You found DANIEL'S THERMOS! It's still a little warm.",
      'Boot tracks lead from it north, under the rope and into the trees.',
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
  danielsBinoculars: {
    name: 'BINOCULARS',
    short: 'BINOCULARS',
    map: 'okemo', x: 48, y: 8,
    tell: 'glint',
    about: 'Strap snapped. Taped on: HUNTS THE BOG AT DUSK.',
    found: [
      'Something is glinting in the pine at the top of THE GLADES...',
      "You found DANIEL'S BINOCULARS! The strap is snapped.",
      'A strip of tape on them, in pen: "NORTH OF THE SUMMIT. HUNTS THE BOG AT DUSK."',
      'New collectible! Open your journal and press RIGHT to see it.',
    ],
  },
};
