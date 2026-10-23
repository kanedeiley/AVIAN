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
//   times      optional: the phases of the day it's out on the map (see time.js); default all
//   weather    optional: the weather it's out in ('clear', 'overcast', 'rain', 'fog'); default any
export const BIRDS = {
  robin:     { name: 'ROBIN',     shape: 'songbird', colors: { body: '#8a6a50', wing: '#5a4030', belly: '#e07040', head: '#403830', face: '#f8f8f8' }, speed: 45,  hop: 50, pause: [0.6, 1.6], patience: 12, focusTime: 1.0, skittish: 0.8, times: ['dawn', 'morning', 'afternoon', 'dusk'] },
  bluejay:   { name: 'BLUE JAY',  shape: 'crested',  colors: { body: '#4870d0', wing: '#283c80', belly: '#e8e8f0', face: '#f8f8f8', bill: '#202028' }, speed: 70,  hop: 70, pause: [0.4, 1.0], patience: 10, focusTime: 1.2, skittish: 1.0, times: ['morning', 'midday', 'afternoon'] },
  goldfinch: { name: 'GOLDFINCH', shape: 'tiny',     colors: { body: '#f8d830', wing: '#404048', belly: '#f8f0a0', head: '#202028', face: '#f8d830', bill: '#f0a060' }, speed: 95,  hop: 80, pause: [0.2, 0.6], patience: 8,  focusTime: 1.4, skittish: 1.3, times: ['morning', 'midday', 'afternoon'], weather: ['clear', 'overcast'] },
  wren:      { name: 'WREN',      shape: 'tiny',     colors: { body: '#a07850', wing: '#6a4a30', belly: '#e0c8a0', face: '#e0c8a0', bill: '#c0a080' }, speed: 110, hop: 40, pause: [0.1, 0.4], patience: 9,  focusTime: 1.3, skittish: 1.2 },
  cardinal:  { name: 'CARDINAL',  shape: 'crested',  colors: { body: '#d83030', wing: '#902020', belly: '#e85050', face: '#202028', bill: '#f08040' }, speed: 55,  hop: 60, pause: [0.8, 1.8], patience: 14, focusTime: 1.0, skittish: 0.9, times: ['dawn', 'morning', 'dusk'] },
  gull:      { name: 'GULL',      shape: 'seabird',  colors: { body: '#f0f0f0', wing: '#a8a8b8', belly: '#f8f8f8' }, speed: 60,  hop: 90, pause: [0.5, 1.4], patience: 10, focusTime: 1.1, skittish: 0.7 },
  // Seabirds: only seen from the boat (data/voyages.js).
  tern:      { name: 'TERN',      shape: 'seabird',  colors: { body: '#e8e8f0', wing: '#b8b8c8', belly: '#f8f8f8', head: '#202028', bill: '#e04040' }, speed: 100, hop: 90, pause: [0.2, 0.6], patience: 8,  focusTime: 1.4, skittish: 1.2, weather: ['clear', 'overcast'] },
  puffin:    { name: 'PUFFIN',    shape: 'auk',      colors: { body: '#202028', wing: '#303038', belly: '#f8f8f8', head: '#202028', face: '#f0f0f0', bill: '#f07830' }, speed: 75,  hop: 50, pause: [0.3, 1.0], patience: 9,  focusTime: 1.3, skittish: 1.1, times: ['dawn', 'morning', 'midday', 'afternoon', 'dusk'] },
  cormorant: { name: 'CORMORANT', shape: 'upright',  colors: { body: '#283038', wing: '#181c20', belly: '#485058', bill: '#e0a040' }, speed: 50,  hop: 60, pause: [0.8, 2.0], patience: 12, focusTime: 1.1, skittish: 0.9 },
  pelican:   { name: 'PELICAN',   shape: 'pelican',  colors: { body: '#d8d0c0', wing: '#706858', belly: '#f0e8d8', head: '#f8f8f8', face: '#f0e8d8', bill: '#f0b050' }, speed: 35,  hop: 70, pause: [1.0, 2.2], patience: 14, focusTime: 0.9, skittish: 0.6 },
  albatross: { name: 'ALBATROSS', shape: 'seabird',  colors: { body: '#f8f8f8', wing: '#383840', belly: '#f0f0f0', bill: '#f0c0a0' }, speed: 120, hop: 110, pause: [0.1, 0.4], patience: 7, focusTime: 1.6, skittish: 1.4, weather: ['overcast', 'rain', 'fog'] },
  // Mountain birds: only on Eagle Peak.
  raven:     { name: 'RAVEN',     shape: 'corvid',   colors: { body: '#404058', wing: '#2a2a3c', belly: '#5a5a74', bill: '#202028' }, speed: 65,  hop: 70, pause: [0.5, 1.4], patience: 10, focusTime: 1.2, skittish: 1.1 },
  ptarmigan: { name: 'PTARMIGAN', shape: 'grouse',   colors: { body: '#f0f0f0', wing: '#c8c0b0', belly: '#f8f8f8', face: '#e04040', bill: '#202028' }, speed: 40,  hop: 40, pause: [0.8, 2.0], patience: 13, focusTime: 1.0, skittish: 0.7, times: ['dawn', 'morning', 'midday', 'afternoon', 'dusk'] },
  eagle:     { name: 'EAGLE',     shape: 'upright',  colors: { body: '#7a5028', wing: '#4a3018', belly: '#a87838', head: '#c09040', bill: '#f0c030' }, speed: 120, hop: 100, pause: [0.2, 0.6], patience: 7, focusTime: 1.6, skittish: 1.5, times: ['morning', 'midday', 'afternoon', 'dusk'], weather: ['clear', 'overcast'] },
  // Grassland birds: out east on the Open Plains, past Echo Cave.
  meadowlark: { name: 'MEADOWLARK', shape: 'songbird', colors: { body: '#a88858', wing: '#705838', belly: '#f8d830', face: '#202028', bill: '#c0a080' }, speed: 55, hop: 60, pause: [0.6, 1.6], patience: 12, focusTime: 1.1, skittish: 0.9, times: ['dawn', 'morning', 'midday', 'afternoon'] },
  bobolink:   { name: 'BOBOLINK',   shape: 'songbird', colors: { body: '#202028', wing: '#f0f0f0', belly: '#202028', head: '#202028', face: '#f0e0a0', bill: '#404048' }, speed: 80, hop: 70, pause: [0.3, 0.9], patience: 9, focusTime: 1.3, skittish: 1.2, times: ['morning', 'midday', 'afternoon'], weather: ['clear', 'overcast'] },
  killdeer:   { name: 'KILLDEER',   shape: 'tiny',     colors: { body: '#a08058', wing: '#786040', belly: '#f8f8f8', face: '#202028', bill: '#202028' }, speed: 120, hop: 90, pause: [0.3, 1.0], patience: 8, focusTime: 1.3, skittish: 1.3 },
  kestrel:    { name: 'KESTREL',    shape: 'upright',  colors: { body: '#c06838', wing: '#5878a8', belly: '#f0d8b8', head: '#7890c0', face: '#f8f8f8', bill: '#e0c030' }, speed: 110, hop: 100, pause: [0.2, 0.6], patience: 7, focusTime: 1.5, skittish: 1.4, times: ['morning', 'midday', 'afternoon'], weather: ['clear', 'overcast'] },
  barnSwallow: { name: 'BARN SWALLOW', shape: 'songbird', colors: { body: '#2848a0', wing: '#183070', belly: '#f0c8a0', face: '#c05830', bill: '#202028' }, speed: 130, hop: 100, pause: [0.1, 0.4], patience: 7, focusTime: 1.5, skittish: 1.2, times: ['dawn', 'morning', 'midday', 'afternoon', 'dusk'] },
  // Canal birds: along the water and in the cattails at Erwinna. (REDWING is the red-winged blackbird.)
  redWingedBlackbird: { name: 'REDWING', shape: 'songbird', colors: { body: '#202028', wing: '#d83828', belly: '#282830', head: '#202028', face: '#202028', bill: '#383840' }, speed: 70, hop: 60, pause: [0.4, 1.2], patience: 10, focusTime: 1.2, skittish: 1.0, times: ['dawn', 'morning', 'midday', 'afternoon', 'dusk'] },
  phoebe:     { name: 'PHOEBE',     shape: 'songbird', colors: { body: '#6a6658', wing: '#4a463e', belly: '#f0ecd0', head: '#3a3832', bill: '#202028' }, speed: 85, hop: 50, pause: [0.3, 1.0], patience: 9, focusTime: 1.3, skittish: 1.1 },
  kingfisher: { name: 'KINGFISHER', shape: 'crested',  colors: { body: '#4878a8', wing: '#2c5480', belly: '#f0f0f0', face: '#f8f8f8', bill: '#202028' }, speed: 125, hop: 110, pause: [0.2, 0.6], patience: 7, focusTime: 1.5, skittish: 1.4, times: ['morning', 'midday', 'afternoon'] },
  // River birds: out on the RIVERSHORE, starting at Tinicum Park.
  easternBluebird: { name: 'BLUEBIRD', shape: 'songbird', colors: { body: '#4878d8', wing: '#3058b0', belly: '#e08848', face: '#4878d8', bill: '#202028' }, speed: 60, hop: 60, pause: [0.6, 1.6], patience: 11, focusTime: 1.1, skittish: 0.9, times: ['dawn', 'morning', 'midday', 'afternoon'] },
  treeSwallow: { name: 'TREE SWALLOW', shape: 'songbird', colors: { body: '#2a6890', wing: '#1c3c58', belly: '#f8f8f8', face: '#2a6890', bill: '#202028' }, speed: 135, hop: 100, pause: [0.1, 0.4], patience: 7, focusTime: 1.5, skittish: 1.2, times: ['dawn', 'morning', 'midday', 'afternoon', 'dusk'] },
  oriole:     { name: 'ORIOLE',     shape: 'songbird', colors: { body: '#202028', wing: '#303038', belly: '#f08828', head: '#202028', bill: '#808088' }, speed: 75, hop: 70, pause: [0.4, 1.2], patience: 9, focusTime: 1.3, skittish: 1.1, times: ['morning', 'midday', 'afternoon'], weather: ['clear', 'overcast'] },
  spottedSandpiper: { name: 'SANDPIPER', shape: 'tiny', colors: { body: '#8a7858', wing: '#6a5a40', belly: '#f8f0e0', face: '#f8f0e0', bill: '#e8a060' }, speed: 115, hop: 80, pause: [0.2, 0.7], patience: 8, focusTime: 1.4, skittish: 1.3 },
  greenHeron: { name: 'GREEN HERON', shape: 'heron', colors: { body: '#3a5a48', wing: '#2a4a3a', belly: '#8a4a38', head: '#203028', face: '#203028', bill: '#e0a030' }, speed: 90, hop: 70, pause: [1.0, 2.6], patience: 10, focusTime: 1.4, skittish: 1.2, times: ['dawn', 'morning', 'afternoon', 'dusk'] },
  cedarWaxwing: { name: 'WAXWING', shape: 'crested', colors: { body: '#b89870', wing: '#7a6a58', belly: '#e8d8a0', face: '#202028', bill: '#202028' }, speed: 70, hop: 60, pause: [0.5, 1.4], patience: 10, focusTime: 1.2, skittish: 1.0, times: ['morning', 'midday', 'afternoon'] },
  indigoBunting: { name: 'INDIGO BUNTING', shape: 'tiny', colors: { body: '#3048c0', wing: '#202c80', belly: '#4058d0', face: '#3048c0', bill: '#808898' }, speed: 95, hop: 70, pause: [0.3, 0.9], patience: 9, focusTime: 1.3, skittish: 1.2, times: ['morning', 'midday', 'afternoon'], weather: ['clear', 'overcast'] },
  // Frenchtown's peregrines hunt pigeons off the bridge and the rooftops. WYATT wants a photo of one.
  peregrine:  { name: 'PEREGRINE', shape: 'upright', colors: { body: '#506070', wing: '#384858', belly: '#e8e4dc', head: '#283038', face: '#283038', bill: '#f0c030' }, speed: 95, hop: 90, pause: [0.4, 1.2], patience: 8, focusTime: 1.4, skittish: 1.3, times: ['dawn', 'morning', 'midday', 'afternoon', 'dusk'] },
  osprey:     { name: 'OSPREY',     shape: 'upright',  colors: { body: '#4a3a2c', wing: '#38281c', belly: '#f8f8f8', head: '#f8f8f8', face: '#383030', bill: '#303038' }, speed: 115, hop: 100, pause: [0.3, 0.8], patience: 7, focusTime: 1.6, skittish: 1.4, times: ['morning', 'midday', 'afternoon'], weather: ['clear', 'overcast'] },
  // Nemesis birds: never out on the map, only fought at their perch (data/nemeses.js).
  baldEagle: { name: 'BALD EAGLE', shape: 'upright', colors: { body: '#4a3020', wing: '#302014', belly: '#5a3a24', head: '#f8f8f8', bill: '#f0c030' }, speed: 70, hop: 90, pause: [0.6, 1.4], patience: 40, focusTime: 1.4, skittish: 1 },
  // Stands perfectly still for ages, then strikes: long pauses, long hops.
  greatBlueHeron: { name: 'BLUE HERON', shape: 'heron', colors: { body: '#7888a0', wing: '#566880', belly: '#c8ccd8', head: '#f0f0f0', face: '#202028', bill: '#e8b840' }, speed: 65, hop: 90, pause: [1.0, 2.4], patience: 45, focusTime: 1.6, skittish: 1 },
};
