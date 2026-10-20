// Bird species. Each one's movement numbers decide how hard it is to photograph.
//   shape      which body drawing to use (SHAPES in assets/birds.js)
//   colors     body, wing, belly, and optionally head (defaults to body), face
//              (mask, cheeks, bib; defaults to head) and bill (also the feet; yellow)
//   speed      px/s while hopping along the branch
//   hop        how far one hop can go (px)
//   pause      [min, max] seconds it sits still between hops
//   patience   seconds before it gets bored and flies off
//   focusTime  seconds the viewfinder must stay on it to fill the focus meter
//   skittish   how fast it notices you sneaking up on the map (1 = normal)
export const BIRDS = {
  robin:     { name: 'ROBIN',     shape: 'songbird', colors: { body: '#8a6a50', wing: '#5a4030', belly: '#e07040', head: '#403830', face: '#f8f8f8' }, speed: 45,  hop: 50, pause: [0.6, 1.6], patience: 12, focusTime: 1.0, skittish: 0.8 },
  bluejay:   { name: 'BLUE JAY',  shape: 'crested',  colors: { body: '#4870d0', wing: '#283c80', belly: '#e8e8f0', face: '#f8f8f8', bill: '#202028' }, speed: 70,  hop: 70, pause: [0.4, 1.0], patience: 10, focusTime: 1.2, skittish: 1.0 },
  goldfinch: { name: 'GOLDFINCH', shape: 'tiny',     colors: { body: '#f8d830', wing: '#404048', belly: '#f8f0a0', head: '#202028', face: '#f8d830', bill: '#f0a060' }, speed: 95,  hop: 80, pause: [0.2, 0.6], patience: 8,  focusTime: 1.4, skittish: 1.3 },
  wren:      { name: 'WREN',      shape: 'tiny',     colors: { body: '#a07850', wing: '#6a4a30', belly: '#e0c8a0', face: '#e0c8a0', bill: '#c0a080' }, speed: 110, hop: 40, pause: [0.1, 0.4], patience: 9,  focusTime: 1.3, skittish: 1.2 },
  cardinal:  { name: 'CARDINAL',  shape: 'crested',  colors: { body: '#d83030', wing: '#902020', belly: '#e85050', face: '#202028', bill: '#f08040' }, speed: 55,  hop: 60, pause: [0.8, 1.8], patience: 14, focusTime: 1.0, skittish: 0.9 },
  gull:      { name: 'GULL',      shape: 'seabird',  colors: { body: '#f0f0f0', wing: '#a8a8b8', belly: '#f8f8f8' }, speed: 60,  hop: 90, pause: [0.5, 1.4], patience: 10, focusTime: 1.1, skittish: 0.7 },
  // Seabirds: only seen from the boat (data/voyages.js).
  tern:      { name: 'TERN',      shape: 'seabird',  colors: { body: '#e8e8f0', wing: '#b8b8c8', belly: '#f8f8f8', head: '#202028', bill: '#e04040' }, speed: 100, hop: 90, pause: [0.2, 0.6], patience: 8,  focusTime: 1.4, skittish: 1.2 },
  puffin:    { name: 'PUFFIN',    shape: 'auk',      colors: { body: '#202028', wing: '#303038', belly: '#f8f8f8', head: '#202028', face: '#f0f0f0', bill: '#f07830' }, speed: 75,  hop: 50, pause: [0.3, 1.0], patience: 9,  focusTime: 1.3, skittish: 1.1 },
  cormorant: { name: 'CORMORANT', shape: 'upright',  colors: { body: '#283038', wing: '#181c20', belly: '#485058', bill: '#e0a040' }, speed: 50,  hop: 60, pause: [0.8, 2.0], patience: 12, focusTime: 1.1, skittish: 0.9 },
  pelican:   { name: 'PELICAN',   shape: 'pelican',  colors: { body: '#d8d0c0', wing: '#706858', belly: '#f0e8d8', head: '#f8f8f8', face: '#f0e8d8', bill: '#f0b050' }, speed: 35,  hop: 70, pause: [1.0, 2.2], patience: 14, focusTime: 0.9, skittish: 0.6 },
  albatross: { name: 'ALBATROSS', shape: 'seabird',  colors: { body: '#f8f8f8', wing: '#383840', belly: '#f0f0f0', bill: '#f0c0a0' }, speed: 120, hop: 110, pause: [0.1, 0.4], patience: 7, focusTime: 1.6, skittish: 1.4 },
  // Mountain birds: only on Eagle Peak.
  raven:     { name: 'RAVEN',     shape: 'corvid',   colors: { body: '#404058', wing: '#2a2a3c', belly: '#5a5a74', bill: '#202028' }, speed: 65,  hop: 70, pause: [0.5, 1.4], patience: 10, focusTime: 1.2, skittish: 1.1 },
  ptarmigan: { name: 'PTARMIGAN', shape: 'grouse',   colors: { body: '#f0f0f0', wing: '#c8c0b0', belly: '#f8f8f8', face: '#e04040', bill: '#202028' }, speed: 40,  hop: 40, pause: [0.8, 2.0], patience: 13, focusTime: 1.0, skittish: 0.7 },
  eagle:     { name: 'EAGLE',     shape: 'upright',  colors: { body: '#7a5028', wing: '#4a3018', belly: '#a87838', head: '#c09040', bill: '#f0c030' }, speed: 120, hop: 100, pause: [0.2, 0.6], patience: 7, focusTime: 1.6, skittish: 1.5 },
};
