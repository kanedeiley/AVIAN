// Bird species. Each one's movement numbers decide how hard it is to photograph.
//   colors     [body, wing, belly] for the shared bird sprite (assets/birds.js)
//   speed      px/s while hopping along the branch
//   hop        how far one hop can go (px)
//   pause      [min, max] seconds it sits still between hops
//   patience   seconds before it gets bored and flies off
//   focusTime  seconds the viewfinder must stay on it to fill the focus meter
//   skittish   how fast it notices you sneaking up on the map (1 = normal)
export const BIRDS = {
  robin:     { name: 'ROBIN',     colors: ['#8a6a50', '#5a4030', '#e07040'], speed: 45,  hop: 50, pause: [0.6, 1.6], patience: 12, focusTime: 1.0, skittish: 0.8 },
  bluejay:   { name: 'BLUE JAY',  colors: ['#4870d0', '#283c80', '#e8e8f0'], speed: 70,  hop: 70, pause: [0.4, 1.0], patience: 10, focusTime: 1.2, skittish: 1.0 },
  goldfinch: { name: 'GOLDFINCH', colors: ['#f8d830', '#404048', '#f8f0a0'], speed: 95,  hop: 80, pause: [0.2, 0.6], patience: 8,  focusTime: 1.4, skittish: 1.3 },
  wren:      { name: 'WREN',      colors: ['#a07850', '#6a4a30', '#e0c8a0'], speed: 110, hop: 40, pause: [0.1, 0.4], patience: 9,  focusTime: 1.3, skittish: 1.2 },
  cardinal:  { name: 'CARDINAL',  colors: ['#d83030', '#902020', '#e85050'], speed: 55,  hop: 60, pause: [0.8, 1.8], patience: 14, focusTime: 1.0, skittish: 0.9 },
  gull:      { name: 'GULL',      colors: ['#f0f0f0', '#a8a8b8', '#f8f8f8'], speed: 60,  hop: 90, pause: [0.5, 1.4], patience: 10, focusTime: 1.1, skittish: 0.7 },
};
