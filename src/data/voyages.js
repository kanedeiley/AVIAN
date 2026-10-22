// Bird-watching voyages: boat trips you book from a map's `voyages` list.
//   name      shown in the booking dialog and as a habitat in the journal
//   region    the region its birds count toward (data/regions.js)
//   price     the fare in dollars, checked against game.money before you board
//   stops     how many times the boat stops; each stop you pick one bird to photograph
//   flock     how many birds are around the boat at once
//   table     which species turn up (repeat an id to make it more common)
//   rare      species that only turn up now and then
//   rareChance  the chance each new bird is picked from `rare` instead
//   pitch     what the captain says before you book (each string is a page or two)
export const VOYAGES = {
  bay: {
    name: 'BAY TOUR',
    region: 'valley',
    price: 100, // about 3 good photos of new birds: something to save up for
    stops: 3,
    flock: 5,
    table: ['gull', 'gull', 'tern', 'tern', 'puffin', 'cormorant', 'pelican'],
    rare: ['albatross'],
    rareChance: 0.08,
    pitch: [
      'CAPTAIN: Ahoy! Fancy a bird-watching trip?',
      'We make a few stops out on the bay.',
      'At each stop, pick ONE bird to photograph. Choose well!',
    ],
  },
};
