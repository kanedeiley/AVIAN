// People who wander a map like the puppies do (scenes/npcs.js). They're the
// player's drawings, by body and colors (personSprites in assets/player.js), in the same
// shape as DOG_SPRITES: `sitting` is them facing you, `left`/`right` the walk.
import { PALETTE } from './palette.js';
import { personSprites } from './player.js';

const PEOPLE = {
  // Long auburn hair, a teal top and a violet skirt.
  hannah: personSprites('hannah', 'female', { top: PALETTE.t, topShade: PALETTE.T, bottoms: PALETTE.v, hair: '#a0502c', hairShade: '#6a3018' }),
};

export const PEOPLE_SPRITES = {};
for (const [id, p] of Object.entries(PEOPLE)) {
  PEOPLE_SPRITES[id] = {
    sitting: p.down.stand,
    left: [p.left.stepA, p.left.stand],
    right: [p.right.stepA, p.right.stand],
  };
}
