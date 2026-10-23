// Tiles for Milford, N.J., up the river from Frenchtown: the railroad that runs
// north out of town (to VERMONT), where it crosses the road, the bumper at the
// end of the line, and the crossbuck by the crossing. Milford's shop fronts and
// its station are storefront() props (storeTiles.js).

const BLANK = '................';

// Two steel rails on wooden ties, running north and south.
const RAIL = '...wQ......wQ...';
const TIES = ['.NNwQNNNNNNwQNN.', '.nnwQnnnnnnwQnn.'];
const TRACK = [RAIL, ...TIES, RAIL, RAIL, ...TIES, RAIL, RAIL, ...TIES, RAIL, RAIL, ...TIES, RAIL];

// The rails set into the road where it crosses the tracks.
const CROSSING = Array(16).fill('...qk......qk...');

// The end of the line: the rails run into a striped buffer beam.
const BUMPER = [
  RAIL,
  ...TIES,
  RAIL,
  '.kkkkkkkkkkkkkk.',
  '.kppwwppwwppwwk.',
  '.kwwppwwppwwppk.',
  '.kkkkkkkkkkkkkk.',
  '..kNk......kNk..',
  '..kNk......kNk..',
  '.kNNNk....kNNNk.',
  '.kkkkk....kkkkk.',
  BLANK,
  BLANK,
  BLANK,
  BLANK,
];

// A railroad crossbuck: a white X on a wooden post.
const CROSSBUCK = [
  BLANK,
  '.kkk........kkk.',
  '.kwwk......kwwk.',
  '..kwwk....kwwk..',
  '...kwwk..kwwk...',
  '....kwwkkwwk....',
  '.....kwwwwk.....',
  '....kwwkkwwk....',
  '...kwwkNNkwwk...',
  '..kwwk.NN.kwwk..',
  '.kwwk..NN..kwwk.',
  '.kkk...NN...kkk.',
  '.......NN.......',
  '.......NN.......',
  '......kNNk......',
  '......kkkk......',
];

export const MILFORD_DEFS = {
  railTrack:        { art: TRACK, base: 'gravel', perch: true },
  railCrossing:     { art: CROSSING, base: 'tarmac', perch: true },
  railCrossingLine: { art: CROSSING, base: 'tarmacLine', perch: true },
  railBumper:       { art: BUMPER, base: 'gravel', solid: true },  // give it sign text
  crossbuck:        { art: CROSSBUCK, base: 'grass', solid: true }, // give it sign text
};
