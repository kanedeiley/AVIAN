// The player's walk cycle. Each direction has a standing frame and two step
// frames that alternate (left foot, right foot). Right is just mirrored left.

import { PALETTE } from './palette.js';
import { makeSprite, mirror } from '../gfx/sprite.js';

const DOWN = [
  '.....kkkkkk.....',
  '....kppppppk....',
  '...kppwwppppk...',
  '...kPPPPPPPPk...',
  '..kkkkkkkkkkkk..',
  '...knssssssnk...',
  '...kskssssksk...',
  '...kssssssssk...',
  '....kssSSssk....',
  '...kkppppppkk...',
  '..ksppppppppsk..',
  '...kPPPPPPPPk...',
  '...kuuuuuuuuk...',
  '...kuuukkuuuk...',
  '...kkkk..kkkk...',
  '................',
];

const UP = [
  '.....kkkkkk.....',
  '....kppppppk....',
  '...kppppppppk...',
  '...kppppppppk...',
  '...kPPPPPPPPk...',
  '...knnnnnnnnk...',
  '...knnnnnnnnk...',
  '...kNnnnnnnNk...',
  '....knnnnnnk....',
  ...DOWN.slice(9),
];

// Legs for a front/back step: one foot lifted.
const STEP_LEGS = [
  '...kuuuk.kuuk...',
  '...kkkk..kuuk...',
  '.........kkk....',
];

const LEFT = [
  '......kkkkk.....',
  '.....kpppppk....',
  '....kpppwwppk...',
  '....kPPPPPPPk...',
  '..kkkkkkkPPPk...',
  '....ksssnnnnk...',
  '....kskssnnnk...',
  '....ksssssnnk...',
  '.....ksssssk....',
  '.....kkppppk....',
  '....kpppsspk....',
  '....kppppPPk....',
  '.....kuuuuk.....',
  '.....kuuuuk.....',
  '....kkkkkk......',
  '................',
];

const LEFT_STEP = [
  ...LEFT.slice(0, 12),
  '.....kuuuuk.....',
  '....kuuk.kuk....',
  '...kkkk..kkk....',
  '................',
];

const DOWN_STEP = [...DOWN.slice(0, 13), ...STEP_LEGS];
const UP_STEP = [...UP.slice(0, 13), ...STEP_LEGS];

const s = (rows) => makeSprite(rows, PALETTE, 'player');

export const PLAYER = {
  down:  { stand: s(DOWN),          stepA: s(DOWN_STEP),      stepB: s(mirror(DOWN_STEP)) },
  up:    { stand: s(UP),            stepA: s(UP_STEP),        stepB: s(mirror(UP_STEP)) },
  left:  { stand: s(LEFT),          stepA: s(LEFT_STEP),      stepB: s(LEFT_STEP) },
  right: { stand: s(mirror(LEFT)),  stepA: s(mirror(LEFT_STEP)), stepB: s(mirror(LEFT_STEP)) },
};
