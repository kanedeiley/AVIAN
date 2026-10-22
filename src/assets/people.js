// People who wander a map like the puppies do (scenes/npcs.js). They're the
// player's drawings, by body and colors (personSprites in assets/player.js), in the same
// shape as DOG_SPRITES: `sitting` is them facing you, `left`/`right` the walk.
import { PALETTE } from './palette.js';
import { personSprites } from './player.js';

const PEOPLE = {
  // Long auburn hair, a teal top and a violet skirt.
  hannah: personSprites('hannah', 'female', { top: PALETTE.t, topShade: PALETTE.T, bottoms: PALETTE.v, hair: '#a0502c', hairShade: '#6a3018' }),
  // Wyatt lives in his van: a green beanie, a rust-red flannel and worn khakis.
  wyatt: personSprites('wyatt', 'male', { hat: '#3a6a48', hatShade: '#284a30', top: '#c05030', topShade: '#802818', bottoms: '#8a7a58', hair: PALETTE.n, hairShade: PALETTE.N }),
  // The pilot at Van Sant Airport: a brown leather cap and jacket, and jeans.
  // The shopkeeper at the general store: silver hair and a green apron.
  shopkeeper: personSprites('shopkeeper', 'female', { top: '#3a8a50', topShade: '#28603a', bottoms: '#6a5440', hair: '#d8d4cc', hairShade: '#a8a49c' }),
  pilot: personSprites('pilot', 'male', { hat: '#7a4a28', hatShade: '#4a2c18', top: '#8a5a30', topShade: '#5a3818', bottoms: '#4a68a0', hair: '#c8c8c8', hairShade: '#909098' }),
};

export const PEOPLE_SPRITES = {};
for (const [id, p] of Object.entries(PEOPLE)) {
  PEOPLE_SPRITES[id] = {
    sitting: p.down.stand,
    left: [p.left.stepA, p.left.stand],
    right: [p.right.stepA, p.right.stand],
  };
}
