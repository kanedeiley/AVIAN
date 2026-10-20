// Collectibles: odd little things hidden around the world. Each one is hidden
// on a tile of its map (it can be a solid one, tucked into bamboo or a hedge)
// and all that gives it away is the stink rising off that tile. Face it
// and press A to pick it up; it goes in game.progress.collectibles and on the
// COLLECTIBLES page of the journal.
//   name      shown in the journal's details and when you find it
//   short     the journal list's name, which has room for about 10 letters
//   map, x, y where it's hidden
//   about     the journal's note on it, once you've found it
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
};
