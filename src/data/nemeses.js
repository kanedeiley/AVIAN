// Nemesis birds: in birding, the bird that always gets away. Here they're the
// bosses. Each one sits on its perch on a map, blocking the way, and won't let
// you near until you've met its requirements. Then face it and press A for a
// harder photo fight (scenes/nemesis.js): land `hits` sharp photos before it
// runs out of patience or you run out of film. Every hit makes it faster.
//   bird      the species (data/birds.js); it never shows up as an ordinary bird
//   map, x, y where it perches (drawn 2x, feet on that tile)
//   region    whose birds count toward `requires.species` (data/regions.js)
//   requires  flags: story flags you need (data/flags.js)
//             species: how many of the region's species you've photographed
//   film      shots you get
//   patience  seconds before it flies off
//   hits      photos of at least `hitStars` stars needed to win
//   rage      after each hit its speed is multiplied (and its pauses divided) by this
//   locked    what you see while you don't meet the requirements yet
//   challenge what it does when you're ready (followed by a yes/no)
//   won, lost what you're told after the fight
export const NEMESES = {
  baldEagle: {
    bird: 'baldEagle',
    map: 'mountain', x: 12, y: 1,
    region: 'valley',
    requires: { flags: ['metHannah'], species: 8 },
    film: 6,
    patience: 40,
    hits: 3,
    hitStars: 2,
    rage: 1.3,
    locked: [
      'A huge BALD EAGLE glares down from the summit.',
      'It spreads its wings and screeches. You can\'t get any closer.',
    ],
    challenge: [
      'Your NEMESIS BIRD, the BALD EAGLE, watches you closely...',
      'Land 3 sharp photos (2 stars or better) before it loses patience. Each one makes it faster!',
    ],
    won: [
      'You photographed your NEMESIS BIRD, the BALD EAGLE!',
      'It soars off over the valley. HANNAH will want to hear about this!',
      'Its last screech booms down through the mountain. Deep in ECHO CAVE, loose rock rumbles and falls away...',
    ],
    lost: [
      'The BALD EAGLE soared away into the clouds.',
      'It will be back on its perch soon. Try again!',
    ],
  },
};
