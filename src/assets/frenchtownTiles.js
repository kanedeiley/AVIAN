// Tiles for Frenchtown, across the river from Tinicum: the gas pumps at the
// Citgo, and inside SunBeam, a rack of shirts and a hat stand. Frenchtown's
// shop fronts are storefront() props (storeTiles.js).

const BLANK = '................';

// A red gas pump with its hose hooked on the side, on a concrete island.
const GAS_PUMP = [
  BLANK,
  '.....kkkkkk.....',
  '....kppppppk....',
  '....kpwwwwpk....',
  '....kpwkkwpk....',
  '....kpwwwwpk....',
  '....kppppppk..k.',
  '....kppppppk.kk.',
  '....kpkkkkpk.k..',
  '....kpkqqkpkk...',
  '....kpkkkkpk....',
  '....kppppppk....',
  '...kkkkkkkkkk...',
  '...kqqqqqqqqk...',
  '...kkkkkkkkkk...',
  BLANK,
];

// A rack of shirts on hangers.
const CLOTHES_RACK = [
  BLANK,
  '.kkkkkkkkkkkkkk.',
  '.kqqqqqqqqqqqqk.',
  '.kkkkkkkkkkkkkk.',
  '.kppk.kuuk.kaak.',
  '.kppk.kuuk.kaak.',
  '.kPPk.kUUk.kAAk.',
  '.kkkk.kkkk.kkkk.',
  '.k............k.',
  '.k............k.',
  '.k............k.',
  '.k............k.',
  '.k............k.',
  'kkk..........kkk',
  BLANK,
  BLANK,
];

// A hat stand: a beret on top, a bucket hat and a sun-yellow cap on the pegs.
const HAT_STAND = [
  BLANK,
  '......kkkk......',
  '.....kPPPPk.....',
  '....kkkkkkkk....',
  '.......kk.......',
  '...kkkkkkkkkk...',
  '..kYYYYkkaaaak..',
  '.kkkkkk..kkkkkk.',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.......kk.......',
  '.....kkkkkk.....',
  '.....kqqqqk.....',
  '.....kkkkkk.....',
];

export const FRENCHTOWN_DEFS = {
  gasPump:     { art: GAS_PUMP, base: 'paving', solid: true },
  clothesRack: { art: CLOTHES_RACK, base: 'floor', solid: true },
  hatStand:    { art: HAT_STAND, base: 'floor', solid: true },
};
