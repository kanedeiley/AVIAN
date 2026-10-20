// Map registry. To add a map: create the file, import it, add it to MAPS.
import village from './village.js';
import house from './house.js';
import shrine from './shrine.js';
import hannahville from './hannahville.js';
import hannahHouse from './hannahHouse.js';
import cave from './cave.js';
import mountain from './mountain.js';
import { TILES, LEGEND } from '../assets/tiles.js';
import { PROPS } from '../assets/coastTiles.js';
import { VOYAGES } from '../data/voyages.js';

const MAPS = { village, house, shrine, hannahville, hannahHouse, cave, mountain };
export const MAP_IDS = Object.keys(MAPS);
const cache = {};

/** Load a map by id, turning its character rows into a grid of tile ids. */
export function getMap(id) {
  if (cache[id]) return cache[id];
  const raw = MAPS[id];
  if (!raw) throw new Error(`No map called "${id}"`);

  const legend = { ...LEGEND, ...raw.legend };
  const width = raw.rows[0].length;
  const grid = raw.rows.map((row, y) => {
    if (row.length !== width) throw new Error(`Map "${id}": row ${y} is ${row.length} wide, expected ${width}`);
    return [...row].map((ch, x) => {
      const tileId = legend[ch];
      if (!TILES[tileId]) throw new Error(`Map "${id}": unknown tile '${ch}' at ${x},${y}`);
      return tileId;
    });
  });

  const inside = (x, y) => x >= 0 && y >= 0 && x < width && y < grid.length;

  // Big props are stamped over the grid; each tile of one is its own tile id.
  const props = (raw.props ?? []).map((p) => {
    const at = `Map "${id}": prop "${p.id}" at ${p.x},${p.y}`;
    const parts = PROPS[p.id];
    if (!parts) throw new Error(`${at} is not in PROPS (assets/coastTiles.js)`);
    const w = parts[0].length, h = parts.length;
    if (!inside(p.x, p.y) || !inside(p.x + w - 1, p.y + h - 1)) throw new Error(`${at} (${w}x${h}) doesn't fit on the map`);
    if (p.voyage && !VOYAGES[p.voyage]) throw new Error(`${at} books unknown voyage "${p.voyage}"`);
    parts.forEach((row, dy) => row.forEach((tileId, dx) => (grid[p.y + dy][p.x + dx] = tileId)));
    return { ...p, w, h };
  });

  for (const w of raw.warps ?? []) {
    const at = `Map "${id}": warp at ${w.x},${w.y}`;
    if (!inside(w.x, w.y)) throw new Error(`${at} is outside the map (${width}x${grid.length})`);
    if (TILES[grid[w.y][w.x]].solid) throw new Error(`${at} is on a solid tile, so it can never be stepped on`);
    const dest = MAPS[w.to];
    if (!dest) throw new Error(`${at} goes to unknown map "${w.to}"`);
    const row = dest.rows[w.toY];
    if (!row || w.toX < 0 || w.toX >= row.length) throw new Error(`${at} lands outside map "${w.to}" at ${w.toX},${w.toY}`);
  }

  for (const s of raw.signs ?? []) {
    if (!inside(s.x, s.y)) throw new Error(`Map "${id}": sign at ${s.x},${s.y} is outside the map`);
  }

  for (const n of raw.npcs ?? []) {
    const at = `Map "${id}": npc "${n.id}" at ${n.x},${n.y}`;
    if (!inside(n.x, n.y)) throw new Error(`${at} is outside the map`);
    if (TILES[grid[n.y][n.x]].solid) throw new Error(`${at} starts on a solid tile`);
  }

  return (cache[id] = {
    id, ...raw, grid, width, height: grid.length,
    warps: raw.warps ?? [],
    signs: raw.signs ?? [],
    npcs: raw.npcs ?? [],
    props,
  });
}
