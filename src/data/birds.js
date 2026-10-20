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
  // Seabirds: only seen from the boat (data/voyages.js).
  tern:      { name: 'TERN',      colors: ['#e8e8f0', '#b8b8c8', '#202028'], speed: 100, hop: 90, pause: [0.2, 0.6], patience: 8,  focusTime: 1.4, skittish: 1.2 },
  puffin:    { name: 'PUFFIN',    colors: ['#202028', '#303038', '#f8f8f8'], speed: 75,  hop: 50, pause: [0.3, 1.0], patience: 9,  focusTime: 1.3, skittish: 1.1 },
  cormorant: { name: 'CORMORANT', colors: ['#283038', '#181c20', '#485058'], speed: 50,  hop: 60, pause: [0.8, 2.0], patience: 12, focusTime: 1.1, skittish: 0.9 },
  pelican:   { name: 'PELICAN',   colors: ['#d8d0c0', '#706858', '#f0e8d8'], speed: 35,  hop: 70, pause: [1.0, 2.2], patience: 14, focusTime: 0.9, skittish: 0.6 },
  albatross: { name: 'ALBATROSS', colors: ['#f8f8f8', '#383840', '#f0f0f0'], speed: 120, hop: 110, pause: [0.1, 0.4], patience: 7, focusTime: 1.6, skittish: 1.4 },
};
