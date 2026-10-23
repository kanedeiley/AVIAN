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
//   wonTalk   optional: a DIALOGUE (data/dialogue.js) that follows `won`, like a phone call
//   scene     optional: 'river' for the river backdrop in the fight (default: the summit)
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
  // Erwinna's: at the north end of the towpath, past the barge, blocking the way north. HANNAH tells you about it.
  greatBlueHeron: {
    bird: 'greatBlueHeron',
    map: 'erwinna', x: 30, y: 2,
    region: 'plains',
    requires: { flags: ['metHannahErwinna'], species: 7 },
    film: 7,
    patience: 45,
    hits: 4,
    hitStars: 2,
    rage: 1.25,
    locked: [
      'A GREAT BLUE HERON stands on the towpath, tall as a fence post.',
      'It points its dagger of a bill at you and croaks. It isn\'t budging.',
    ],
    challenge: [
      'Your NEMESIS BIRD, the GREAT BLUE HERON, stares you down...',
      'Land 4 sharp photos (2 stars or better) before it loses patience. It stands still for ages, then strikes fast!',
    ],
    won: [
      'You photographed the GREAT BLUE HERON, the NEMESIS BIRD of the OPEN PLAINS!',
      'It unfolds its huge wings and glides off down the canal, croaking.',
      'The towpath north is clear. HANNAH will want to hear about this!',
    ],
    lost: [
      'The GREAT BLUE HERON lifted off with a deep croak... and landed right back on the towpath.',
      'It isn\'t going anywhere. Try again!',
    ],
  },
  // The RIVERSHORE's: on the platform at Milford Station, down from the Arctic, holding up the trains north.
  // Nobody mentions it before you get to Milford: the station agent tells you about it.
  gyrfalcon: {
    bird: 'gyrfalcon',
    map: 'milford', x: 12, y: 17,
    region: 'rivershore',
    requires: { flags: ['metMilfordAgent'], species: 12 },
    scene: 'river',
    film: 8,
    patience: 50,
    hits: 5,
    hitStars: 2,
    rage: 1.1,
    locked: [
      'A huge white falcon sits at the end of the platform, still as a statue.',
      'It turns its head and fixes you with one dark eye. You freeze.',
    ],
    challenge: [
      'Your NEMESIS BIRD, the GYRFALCON, stares you down from the platform...',
      'Land 5 sharp photos (2 stars or better) before it loses patience. It gets faster with every one!',
    ],
    won: [
      'You photographed the GYRFALCON, the NEMESIS BIRD of the RIVERSHORE!',
      'It spreads its pale wings and sweeps away north, up the tracks.',
      'Down the line, a train whistle blows. Then your phone buzzes...',
    ],
    wonTalk: 'hannahCall',
    lost: [
      'The GYRFALCON lifted off, circled the station... and landed right back on the platform.',
      'It isn\'t done with you. Try again!',
    ],
  },
};
