// One shared palette: every pixel-art character maps to a color here.
// Keeping it shared means all art matches, and recoloring the whole game
// (night time, a different season...) is just editing this table.
export const PALETTE = {
  '.': null,       // transparent
  k: '#202028',    // outline / black
  w: '#f8f8f8',    // white

  g: '#88d058',    // grass
  G: '#58a840',    // grass shade
  h: '#307830',    // grass dark

  d: '#e0c088',    // dirt
  D: '#c09860',    // dirt shade

  b: '#4890e8',    // water
  B: '#3070c0',    // water deep
  c: '#b8e0f8',    // water shine / glass

  r: '#d05040',    // roof
  R: '#a03830',    // roof shade
  y: '#f0e0b0',    // wall
  Y: '#d0b880',    // wall shade
  q: '#a8a8b0',    // stone
  Q: '#787880',    // stone shade

  n: '#8a5a30',    // wood / hair
  N: '#5a3818',    // wood dark
  o: '#d8a868',    // floorboards
  O: '#b08048',    // floorboards shade

  s: '#f8d0a8',    // skin
  S: '#e0a878',    // skin shade
  p: '#e04040',    // red (cap, shirt, rug)
  P: '#a82828',    // red shade
  u: '#4060b0',    // blue (pants, blanket)
  U: '#283c80',    // blue shade
  f: '#f8e050',    // yellow (flowers, trim)
  e: '#d07040',    // terracotta (flower pots)
  E: '#984828',    // terracotta shade
};
