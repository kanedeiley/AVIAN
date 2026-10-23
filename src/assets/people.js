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
  // Erwinna's blacksmith: bare-headed, short gray hair, a leather apron over a white shirt.
  blacksmith: personSprites('blacksmith', { hair: 'short', hat: 'none', legs: 'pants' }, { top: '#6a4a30', topShade: '#4a3020', bottoms: '#3a3a48', hair: '#888890', hairShade: '#5a5a64' }),
  // The lock tender: a navy cap and jacket, and canvas trousers.
  lockTender: personSprites('lockTender', 'male', { hat: '#283c60', hatShade: '#182840', top: '#304878', topShade: '#203058', bottoms: '#b0a078', hair: '#202028', hairShade: '#101018' }),
  // Tinicum Park: a ballplayer in a red cap and white uniform, and two kids on the playground.
  ballplayer: personSprites('ballplayer', 'male', { hat: PALETTE.p, hatShade: PALETTE.P, top: '#f0f0f0', topShade: '#c8c8d0', bottoms: '#e8e8e8', hair: '#3a2818', hairShade: '#241810' }),
  kidRed: personSprites('kidRed', { hair: 'short', hat: 'cap', legs: 'shorts' }, { hat: '#4870d0', hatShade: '#283c80', top: PALETTE.p, topShade: PALETTE.P, bottoms: '#4a68a0', hair: '#e8c860', hairShade: '#b89838' }),
  kidYellow: personSprites('kidYellow', { hair: 'long', hat: 'none', legs: 'shorts' }, { top: '#f0c030', topShade: '#b88a18', bottoms: '#58a040', hair: '#303038', hairShade: '#18181f' }),
  // Tinicum Riverbank: BLAIR MARSHALL, an older gent with brown hair, and his wife DIANE, a redhead.
  blair: personSprites('blair', { hair: 'short', hat: 'none', legs: 'pants' }, { top: '#4a6a48', topShade: '#344c32', bottoms: '#8a7a58', hair: '#6a4a30', hairShade: '#4a3020' }),
  diane: personSprites('diane', 'female', { top: '#7890c8', topShade: '#5068a0', bottoms: '#8a5a8a', hair: '#c84828', hairShade: '#8a2c18' }),
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
