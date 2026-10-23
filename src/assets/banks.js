// River banks: on a map with `banks: true`, every plain water tile that touches
// land gets a strip of muddy bank drawn along that side (and a little corner
// where land only touches it diagonally), so grass doesn't stop dead at the
// water. Bridges, docks, boats and the like count as water, not land.
import { PALETTE } from './palette.js';
import { makeSprite, mirror, flipY } from '../gfx/sprite.js';
import { TILES } from './tiles.js';

const BLANK = '................';

// Land to the west: wet sand and mud along the left edge, with a line of foam where it meets the water.
const WIDTHS = [3, 4, 4, 3, 3, 4, 5, 4, 3, 3, 4, 4, 3, 4, 3, 3];
const WEST = WIDTHS.map((w, y) => {
  const mud = [...'J'.repeat(w)];
  if (y % 4 === 1) mud[w - 1] = 'D';
  return (mud.join('') + 'c').padEnd(16, '.');
});
const transpose = (rows) => rows.map((_, y) => rows.map((r) => r[y]).join(''));
const NORTH = transpose(WEST);

// Land only to the north-west, diagonally: a little rounded corner.
const CORNER_NW = ['JJc.'.padEnd(16, '.'), 'Jc..'.padEnd(16, '.'), 'c...'.padEnd(16, '.'), ...Array(13).fill(BLANK)];

const sprite = (art, name) => makeSprite(art, PALETTE, `bank ${name}`);
const SIDES = {
  W: sprite(WEST, 'W'), E: sprite(mirror(WEST), 'E'),
  N: sprite(NORTH, 'N'), S: sprite(flipY(NORTH), 'S'),
};
const CORNERS = {
  NW: sprite(CORNER_NW, 'NW'), NE: sprite(mirror(CORNER_NW), 'NE'),
  SW: sprite(flipY(CORNER_NW), 'SW'), SE: sprite(flipY(mirror(CORNER_NW)), 'SE'),
};

// Tiles over or in the water: no bank against these.
const WATERY = new Set(['water', 'lilyPads', 'bridge', 'stoneBridge', 'canalBridge', 'canalBridgeSouth', 'trussNorth', 'trussDeck', 'trussSouth', 'porch']);
const watery = (id) => WATERY.has(id) || TILES[id].base === 'water';

/** The bank pieces to draw on each water tile of `map` (from getMap): [{ x, y, sprites }]. */
export function findBanks(map) {
  const banks = [];
  // Off the edge of the map counts as water, so banks don't run along the border.
  const land = (x, y) => x >= 0 && y >= 0 && x < map.width && y < map.height && !watery(map.grid[y][x]);
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (map.grid[y][x] !== 'water') continue;
      const n = land(x, y - 1), s = land(x, y + 1), w = land(x - 1, y), e = land(x + 1, y);
      const sprites = [];
      if (n) sprites.push(SIDES.N);
      if (s) sprites.push(SIDES.S);
      if (w) sprites.push(SIDES.W);
      if (e) sprites.push(SIDES.E);
      if (!n && !w && land(x - 1, y - 1)) sprites.push(CORNERS.NW);
      if (!n && !e && land(x + 1, y - 1)) sprites.push(CORNERS.NE);
      if (!s && !w && land(x - 1, y + 1)) sprites.push(CORNERS.SW);
      if (!s && !e && land(x + 1, y + 1)) sprites.push(CORNERS.SE);
      if (sprites.length) banks.push({ x, y, sprites });
    }
  }
  return banks;
}
