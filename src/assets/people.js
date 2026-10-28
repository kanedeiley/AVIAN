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
  // Upper Black Eddy: ASA COOPER, your rival (a bucket hat, a khaki birding vest, scruffy dark hair),
  // his mom, and the barista at Homestead Coffee Roasters.
  asa: personSprites('asa', { hair: 'short', hat: 'sunhat', legs: 'pants' }, { hat: '#b8a878', hatShade: '#8a7a50', top: '#6a7040', topShade: '#4a5028', bottoms: '#4a4a40', hair: '#2a2018', hairShade: '#181008' }),
  mrsCooper: personSprites('mrsCooper', 'female', { top: '#e890a8', topShade: '#b86078', bottoms: '#58709a', hair: '#8a6a40', hairShade: '#5a4428' }),
  barista: personSprites('barista', { hair: 'long', hat: 'beanie', legs: 'pants' }, { hat: '#a04830', hatShade: '#702c18', top: '#6a4a30', topShade: '#4a3020', bottoms: '#303038', hair: '#e8c860', hairShade: '#b89838' }),
  // The clerk at SunBeam in Frenchtown, in a SunBeam tee and a bucket hat.
  sunbeamClerk: personSprites('sunbeamClerk', { hair: 'long', hat: 'bucket', legs: 'pants' }, { hat: '#8a7a58', hatShade: '#6a5a40', top: '#f8b028', topShade: '#c87c10', bottoms: '#4060b0', hair: '#303038', hairShade: '#18181f' }),
  // The station agent at Milford Station: a navy conductor's cap and vest.
  stationAgent: personSprites('stationAgent', 'male', { hat: '#283c60', hatShade: '#182840', top: '#304878', topShade: '#203058', bottoms: '#404050', hair: '#c8c8c8', hairShade: '#909098' }),
  // Hannah in Ludlow, after a day on the slopes: a navy beanie and a raspberry ski jacket.
  hannahSki: personSprites('hannahSki', { hair: 'long', hat: 'beanie', legs: 'pants' }, { hat: '#283c80', hatShade: '#182850', top: '#d04078', topShade: '#982850', bottoms: '#303038', hair: '#a0502c', hairShade: '#6a3018' }),
  // The bartender at Eight Oh Brew: a black vest and short brown hair.
  bartender: personSprites('bartender', { hair: 'short', hat: 'none', legs: 'pants' }, { top: '#303038', topShade: '#18181f', bottoms: '#404050', hair: '#5a3818', hairShade: '#3a2410' }),
  // The ski tech at Ludlow's SKI SHOP: an orange beanie and a teal shell jacket.
  skiTech: personSprites('skiTech', { hair: 'short', hat: 'beanie', legs: 'pants' }, { hat: '#e88030', hatShade: '#b05818', top: '#3a9088', topShade: '#286060', bottoms: '#303038', hair: '#e8c860', hairShade: '#b89838' }),
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
