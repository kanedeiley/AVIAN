// Collectibles: odd little things hidden around the world. Each one is hidden
// on a tile of its map (it can be a solid one, tucked into bamboo or a hedge)
// and all that gives it away is its tell rising off that tile. Face it
// and press A to pick it up; it goes in game.progress.collectibles and on the
// COLLECTIBLES page of the journal.
//   name      shown in the journal's details, which has room for 15 letters
//   short     the journal list's name, which has room for about 10 letters
//   map, x, y where it's hidden
//   tell      what rises off its tile: 'stench' (the default), 'music', 'feathers' or 'smoke'
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
};
