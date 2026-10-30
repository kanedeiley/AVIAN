// Rivals: other birders who challenge you to a photo duel. Not nemesis birds:
// a rival picks a bird, sets a record, and dares you to beat it. The bird sits
// on its perch on a map, blocking the way like a nemesis, and the fight is the
// same photo battle (scenes/nemesis.js), but a win is saved in
// game.progress.rivals and never counts as a nemesis.
//   name      the rival, shown in the fight ("ASA's challenge!")
//   bird      the species they dare you to photograph (data/birds.js)
//   map, x, y where the bird perches (drawn 2x, feet on that tile)
//   scene     'river' for the river backdrop in the fight (default: the summit)
//   speed, hop, pause, focusTime  optional: instead of the bird's own (data/birds.js), for this
//             fight only. Keep speed under the camera's 100 px/s, or it can't be kept in frame.
//   region, requires, film, patience, hits, hitStars, rage, locked, challenge,
//   won, lost: as for a nemesis (data/nemeses.js)
export const RIVALS = {
  // ASA COOPER, in Upper Black Eddy. His osprey fishes off the end of the Coopers'
  // dock. Beat his record and he tells the bridge crew the nest on the Frenchtown
  // bridge has fledged, so they can finish it (the gates in maps/riverbank.js).
  asa: {
    name: 'ASA',
    bird: 'osprey',
    scene: 'river',
    map: 'blackEddy', x: 38, y: 12,
    region: 'rivershore',
    requires: { flags: ['metAsa'], species: 9 },
    // Busy with its fish, it's far calmer than an osprey out on the river (speed 115, too fast to
    // follow): slow enough to keep in frame, with long sits. Even after 3 hits it's slower than the camera.
    speed: 60,
    hop: 80,
    pause: [1.2, 2.4],
    focusTime: 1.2,
    film: 7,
    patience: 45,
    hits: 4,
    hitStars: 2,
    rage: 1.15,
    locked: [
      'An OSPREY grips the end of the dock, a fish in its talons. It stares right through you.',
      'This is ASA\'s bird. Better talk to him first.',
    ],
    challenge: [
      'ASA: Four sharp shots before it flies. That\'s my record.',
      'ASA: Beat it.',
      'Land 4 sharp photos (2 stars or better) before the OSPREY loses patience!',
    ],
    won: [
      'You beat ASA\'s record! The OSPREY drops its fish, shrieks, and flaps off upriver.',
      'ASA is staring at your camera with his mouth open.',
    ],
    lost: [
      'The OSPREY flew off with its fish... then circled back to the dock.',
      'ASA: Not four. Again.',
    ],
  },
  // WYATT, in VERMONT, still sore that you beat him to the GYRFALCON. A PILEATED WOODPECKER drums
  // on the dead snag behind his van at the bottom of OKEMO: beat his record and he'll hear HANNAH
  // out about her club (data/dialogue.js wyattOkemo; his npc `leaves` to EIGHT OH BREW).
  wyatt: {
    name: 'WYATT',
    bird: 'pileatedWoodpecker',
    map: 'okemo', x: 54, y: 138,
    region: 'vermont',
    requires: { flags: ['metWyattOkemo'], species: 10 },
    // Busy with its snag, it sits longer than a pileated out in the woods, but it still hops a lot.
    speed: 70,
    hop: 70,
    pause: [0.8, 1.8],
    focusTime: 1.3,
    film: 7,
    patience: 45,
    hits: 4,
    hitStars: 2,
    rage: 1.15,
    locked: [
      'A PILEATED WOODPECKER hammers at the dead snag. The whole parking lot echoes with it.',
      'This is WYATT\'s bird. Better talk to him first.',
    ],
    challenge: [
      'WYATT: Four sharp shots. That\'s the record. Took me all week.',
      'WYATT: Loser buys the cocoa.',
      'Land 4 sharp photos (2 stars or better) before the PILEATED WOODPECKER loses patience!',
    ],
    won: [
      'You beat WYATT\'s record! The PILEATED WOODPECKER gives one last drumroll and bounds off into the pines.',
      'WYATT is staring at your camera, shaking his head and grinning.',
    ],
    lost: [
      'The PILEATED WOODPECKER swooped off into the pines... then came right back to its snag.',
      'WYATT: Ha! The record stands. Run it back?',
    ],
  },
};
