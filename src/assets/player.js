// People: the player and NPCs like Hannah share these drawings. There are two
// bodies: 'male' (a cap) and 'female' (no hat, long hair, a skirt). Each
// direction has a standing frame and two step frames that alternate (left foot,
// right foot). Right is just mirrored left.
//
// In the art: 1 hat, 2 hat shade, 3 top, 4 top shade (belt), 5 trousers or
// skirt, 6 hair, 7 hair shade; personSprites() fills those in. k is the
// outline and eyes, s/S skin, i cheeks, w the cap's shine.

import { PALETTE } from './palette.js';
import { makeSprite, mirror } from '../gfx/sprite.js';

// ---------- male: a cap, a slim shirt and trousers ----------

const M_DOWN = [
  '......kkkk......',
  '.....k1111k.....',
  '....k1ww111k....',
  '....k222222k....',
  '...kkkkkkkkkk...',
  '....k6ssss6k....',
  '....kskssksk....',
  '....kssssssk....',
  '.....ksSSsk.....',
  '....kk3333kk....',
  '...ks333333sk...',
  '....k444444k....',
  '....k555555k....',
  '....k55kk55k....',
  '....kkk..kkk....',
  '................',
];

const M_UP = [
  '......kkkk......',
  '.....k1111k.....',
  '....k111111k....',
  '....k111111k....',
  '....k222222k....',
  '....k666666k....',
  '....k666666k....',
  '....k766667k....',
  '.....k6666k.....',
  ...M_DOWN.slice(9),
];

// Legs for a front/back step: one foot lifted.
const M_STEP_LEGS = [
  '....k55kk55k....',
  '....kkkkk55k....',
  '........kkkk....',
];

const M_LEFT = [
  '......kkkk......',
  '.....k1111k.....',
  '.....k1ww11k....',
  '.....k22222k....',
  '...kkkkk222k....',
  '.....kss666k....',
  '.....ksks66k....',
  '.....kssss6k....',
  '......ksssk.....',
  '......k333k.....',
  '......k3s3k.....',
  '......k444k.....',
  '......k555k.....',
  '......k555k.....',
  '.....kkkkk......',
  '................',
];

const M_LEFT_STEP = [
  ...M_LEFT.slice(0, 13),
  '.....k5k.k5k....',
  '....kkk..kkk....',
  '................',
];

// ---------- female: long hair, no hat, a fitted top and a skirt ----------

const F_DOWN = [
  '......kkkk......',
  '....kk6666kk....',
  '...k66666666k...',
  '...k66ssss66k...',
  '...k6skssks6k...',
  '...k6issssi6k...',
  '...k66sSSs66k...',
  '...k66kssk66k...',
  '...k6k3333k6k...',
  '....ks3333sk....',
  '.....k4444k.....',
  '....k555555k....',
  '...k55555555k...',
  '.....kskksk.....',
  '.....kk..kk.....',
  '................',
];

const F_UP = [
  '......kkkk......',
  '....kk6666kk....',
  '...k66666666k...',
  '...k66666666k...',
  '...k66666666k...',
  '...k76666667k...',
  '...k76666667k...',
  '...k77666677k...',
  '...k3k6666k3k...',
  '....ks6666sk....',
  '.....k4774k.....',
  ...F_DOWN.slice(11),
];

const F_STEP_LEGS = [
  '.....kk.ksk.....',
  '.........kk.....',
  '................',
];

const F_LEFT = [
  '......kkkk......',
  '.....k6666k.....',
  '....k6666666k...',
  '....kss66666k...',
  '....ksk66666k...',
  '....kis66666k...',
  '.....ks66667k...',
  '......ks6667k...',
  '......k33667k...',
  '......k3s37k....',
  '......k444k.....',
  '.....k5555k.....',
  '....k55555k.....',
  '......kssk......',
  '.....kkkk.......',
  '................',
];

const F_LEFT_STEP = [
  ...F_LEFT.slice(0, 13),
  '.....ksk.ksk....',
  '....kk...kk.....',
  '................',
];

const BODIES = {
  male: { down: M_DOWN, up: M_UP, stepLegs: M_STEP_LEGS, left: M_LEFT, leftStep: M_LEFT_STEP },
  female: { down: F_DOWN, up: F_UP, stepLegs: F_STEP_LEGS, left: F_LEFT, leftStep: F_LEFT_STEP },
};

// The player's colors: a red cap and shirt, blue trousers, brown hair.
const DEFAULT_COLORS = {
  hat: PALETTE.p, hatShade: PALETTE.P,
  top: PALETTE.p, topShade: PALETTE.P,
  bottoms: PALETTE.u,
  hair: PALETTE.n, hairShade: PALETTE.N,
};

/**
 * The walk cycle as sprites: { down, up, left, right } each { stand, stepA, stepB }.
 * `body` is 'male' or 'female'; `colors` overrides any of DEFAULT_COLORS, e.g.
 * personSprites('hannah', 'female', { top: '#3a9088', hair: '#8a4a28' }).
 */
export function personSprites(name, body = 'male', colors = {}) {
  const art = BODIES[body];
  if (!art) throw new Error(`${name}: unknown body "${body}" (male or female)`);
  const c = { ...DEFAULT_COLORS, ...colors };
  const palette = { ...PALETTE, 1: c.hat, 2: c.hatShade, 3: c.top, 4: c.topShade, 5: c.bottoms, 6: c.hair, 7: c.hairShade };
  const s = (rows) => makeSprite(rows, palette, name);
  const downStep = [...art.down.slice(0, 13), ...art.stepLegs];
  const upStep = [...art.up.slice(0, 13), ...art.stepLegs];
  return {
    down:  { stand: s(art.down),        stepA: s(downStep),            stepB: s(mirror(downStep)) },
    up:    { stand: s(art.up),          stepA: s(upStep),              stepB: s(mirror(upStep)) },
    left:  { stand: s(art.left),        stepA: s(art.leftStep),        stepB: s(art.leftStep) },
    right: { stand: s(mirror(art.left)), stepA: s(mirror(art.leftStep)), stepB: s(mirror(art.leftStep)) },
  };
}

export const PLAYER = personSprites('player', 'male');
