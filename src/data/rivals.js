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
};
