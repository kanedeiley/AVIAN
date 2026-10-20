// Map registry. To add a map: create the file, import it, add it to MAPS.
import village from './village.js';
import house from './house.js';
import shrine from './shrine.js';
import hannahville from './hannahville.js';
import { TILES, LEGEND } from '../assets/tiles.js';

const MAPS = { village, house, shrine, hannahville };
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

  return (cache[id] = {
    id, ...raw, grid, width, height: grid.length,
    warps: raw.warps ?? [],
    signs: raw.signs ?? [],
  });
}
