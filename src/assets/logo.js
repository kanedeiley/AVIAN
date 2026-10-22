// The AVIAN logo: a blue tit perched on a branch, facing left. It's the
// browser-tab icon (and home-screen icon) and sits atop the sign-in form.
import { makeSprite } from '../gfx/sprite.js';

const COLORS = {
  '.': null,
  k: '#202028',    // outline, eye, bill
  w: '#f8f8f8',    // face
  c: '#58c0f0',    // cap front, wing
  u: '#2858c0',    // cap back
  y: '#f8d030',    // belly
  Y: '#e0a020',    // belly shade
  x: '#b8a090',    // back
  r: '#a84830',    // wing bar, feet
  n: '#203070',    // tail
  g: '#58a840',    // branch
  G: '#307830',    // branch shade
};

const LOGO = [
  '........................',
  '.........kkkkk..........',
  '.......kkcccuukk........',
  '......kcccuuuuuuk.......',
  '.....kccwwwwcuuuk.......',
  '....kcwwwwwwwwuuuk......',
  '..kkkwwwkkwwwwwuuk......',
  'kkkkwwwwwkwwwwwuuk......',
  '..kkkwwwwwwwwwwxuk......',
  '....kxwwwwwwwwxxxkk.....',
  '....kxyyyyyyxxxxxxxk....',
  '....kyyyyyyyxxxrrrrck...',
  '....kyyyyyyyyxrccccccnk.',
  '....kyyyyyyyyrccccnnnnnk',
  '....kxyyyyyyyrccnnnnnnk.',
  '.....kxyyyyyyrnnnnnnnnnk',
  '.....kxYyyyyyynnnnkkkkk.',
  '......kxYYYYYYnnnk......',
  '.......kxxxxxxkkk.......',
  'g.......kkrkkrk.........',
  'gGgg....ggrggrggg.......',
  '..GGGgggGGrGGrGGGggg....',
  '.....GGG.......GGGGGgg..',
  '..................GG....',
];

/** The logo drawn `scale` screen pixels per art pixel, as a canvas. */
export function makeLogo(scale = 1) {
  const art = makeSprite(LOGO, COLORS, 'logo');
  const c = document.createElement('canvas');
  c.width = art.width * scale;
  c.height = art.height * scale;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(art, 0, 0, c.width, c.height);
  return c;
}

/** Use the logo as the page's tab icon and home-screen icon. */
export function setUpLogo() {
  const icon = (rel, scale) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = makeLogo(scale).toDataURL();
    document.head.append(link);
  };
  icon('icon', 2);              // 48x48: crisp at 16, 24 and 48 px tabs
  icon('apple-touch-icon', 8);  // 192x192

  // Sign-in form heading: the bird above the word.
  const logo = makeLogo(4);
  logo.className = 'logo';
  document.querySelector('#signin-form h1')?.prepend(logo);
}
