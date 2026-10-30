// Map registry. To add a map: create the file, import it, add it to MAPS.
import village from './village.js';
import house from './house.js';
import shrine from './shrine.js';
import hannahville from './hannahville.js';
import hannahHouse from './hannahHouse.js';
import cave from './cave.js';
import mountain from './mountain.js';
import van from './van.js';
import farm from './farm.js';
import leisterHouse from './leisterHouse.js';
import grandparentsHouse from './grandparentsHouse.js';
import pasture from './pasture.js';
import airport from './airport.js';
import generalStore from './generalStore.js';
import erwinna from './erwinna.js';
import tinicum from './tinicum.js';
import riverbank from './riverbank.js';
import blackEddy from './blackEddy.js';
import coffeeShop from './coffeeShop.js';
import frenchtown from './frenchtown.js';
import sunbeamShop from './sunbeamShop.js';
import milford from './milford.js';
import milfordStation from './milfordStation.js';
import ludlowStation from './ludlowStation.js';
import ludlow from './ludlow.js';
import eightOhBrew from './eightOhBrew.js';
import okemo from './okemo.js';
import skiShop from './skiShop.js';
import tamarackBog from './tamarackBog.js';
import blackRiverWoods from './blackRiverWoods.js';
import pinkhamNotch from './pinkhamNotch.js';
import { TILES, LEGEND } from '../assets/tiles.js';
import { PROPS } from '../assets/coastTiles.js'; // storefronts too (storeTiles.js)
import { VOYAGES } from '../data/voyages.js';
import { REGIONS } from '../data/regions.js';
import { NEMESES } from '../data/nemeses.js';
import { RIVALS } from '../data/rivals.js';
import { FLAGS } from '../data/flags.js';
import { BIRDS } from '../data/birds.js';
import { COLLECTIBLES } from '../data/collectibles.js';
import { ITEMS } from '../data/items.js';
import { COLLECTIBLE_SPRITES, TELLS } from '../assets/collectibles.js';

const MAPS = { village, house, shrine, hannahville, hannahHouse, cave, mountain, van, farm, leisterHouse, grandparentsHouse, pasture, airport, generalStore, erwinna, tinicum, riverbank, blackEddy, coffeeShop, frenchtown, sunbeamShop, milford, milfordStation, ludlowStation, ludlow, eightOhBrew, okemo, skiShop, tamarackBog, blackRiverWoods, pinkhamNotch };
export const MAP_IDS = Object.keys(MAPS);
const cache = {};

/** True if this map exists and (x, y) is a tile on it you can stand on. */
export function canStand(id, x, y) {
  if (!MAPS[id]) return false;
  const map = getMap(id);
  return x >= 0 && y >= 0 && x < map.width && y < map.height && !TILES[map.grid[y][x]].solid;
}

/** The first door on an outdoor map that leads into map `id`, as { map, x, y }, or null. */
export function doorTo(id) {
  for (const mapId of MAP_IDS) {
    const map = getMap(mapId);
    const door = !map.indoor && map.warps.find((w) => w.to === id);
    if (door) return { map: mapId, x: door.x, y: door.y };
  }
  return null;
}

/** An npc, sign, prop or warp that's only there `after` (or `until`) something is done has to name a real nemesis, rival or flag. */
function checkShown(thing, at) {
  for (const key of ['after', 'until']) {
    if (thing[key] && !NEMESES[thing[key]] && !RIVALS[thing[key]] && !FLAGS[thing[key]]) {
      throw new Error(`${at} is there ${key} unknown nemesis, rival or flag "${thing[key]}" (see data/nemeses.js, rivals.js, flags.js)`);
    }
  }
}

/** A `locked` warp or gate opens when its `nemesis` or `rival` is beaten, or its `flag` is set: it has to name a real one. */
function checkLock(locked, at) {
  const known = locked.nemesis ? NEMESES[locked.nemesis] : locked.rival ? RIVALS[locked.rival] : FLAGS[locked.flag];
  if (!known) {
    const what = locked.nemesis ? `nemesis "${locked.nemesis}"` : locked.rival ? `rival "${locked.rival}"` : `flag "${locked.flag}"`;
    throw new Error(`${at} is locked by unknown ${what} (see data/nemeses.js, rivals.js, flags.js)`);
  }
  if (!TILES[locked.tile]) throw new Error(`${at} is locked with unknown tile "${locked.tile}"`);
}

/** Load a map by id, turning its character rows into a grid of tile ids. */
export function getMap(id) {
  if (cache[id]) return cache[id];
  const raw = MAPS[id];
  if (!raw) throw new Error(`No map called "${id}"`);

  if (!REGIONS[raw.region]) throw new Error(`Map "${id}": unknown region "${raw.region}" (see data/regions.js)`);
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
    if (p.voyage && !REGIONS[VOYAGES[p.voyage].region]) throw new Error(`${at}: voyage "${p.voyage}" has unknown region "${VOYAGES[p.voyage].region}"`);
    checkShown(p, at);
    // A prop that's only there some of the time remembers what's under it (see Overworld.tileAt).
    const under = p.after || p.until ? parts.map((row, dy) => row.map((_, dx) => grid[p.y + dy][p.x + dx])) : null;
    parts.forEach((row, dy) => row.forEach((tileId, dx) => (grid[p.y + dy][p.x + dx] = tileId)));
    return { ...p, w, h, under };
  });

  for (const w of raw.warps ?? []) {
    const at = `Map "${id}": warp at ${w.x},${w.y}`;
    if (!inside(w.x, w.y)) throw new Error(`${at} is outside the map (${width}x${grid.length})`);
    if (TILES[grid[w.y][w.x]].solid) throw new Error(`${at} is on a solid tile, so it can never be stepped on`);
    if (w.to === 'back') {
      // Goes back out the way you came in (see Overworld.onStep), so any number of doors can share this map.
      if (!raw.indoor) throw new Error(`${at} goes 'back', but only indoor maps can have a way back out`);
    } else {
      const dest = MAPS[w.to];
      if (!dest) throw new Error(`${at} goes to unknown map "${w.to}"`);
      const row = dest.rows[w.toY];
      if (!row || w.toX < 0 || w.toX >= row.length) throw new Error(`${at} lands outside map "${w.to}" at ${w.toX},${w.toY}`);
    }
    if (w.locked) checkLock(w.locked, at);
    checkShown(w, at);
  }

  // Gates: like a locked warp that goes nowhere. A barricade (or whatever `locked.tile` is) until its nemesis or rival is beaten.
  for (const g of raw.gates ?? []) {
    const at = `Map "${id}": gate at ${g.x},${g.y}`;
    if (!inside(g.x, g.y)) throw new Error(`${at} is outside the map`);
    checkLock(g.locked, at);
  }

  for (const s of raw.signs ?? []) {
    if (!inside(s.x, s.y)) throw new Error(`Map "${id}": sign at ${s.x},${s.y} is outside the map`);
    checkShown(s, `Map "${id}": sign at ${s.x},${s.y}`);
  }

  for (const n of raw.npcs ?? []) {
    const at = `Map "${id}": npc "${n.id}" at ${n.x},${n.y}`;
    if (!inside(n.x, n.y)) throw new Error(`${at} is outside the map`);
    if (TILES[grid[n.y][n.x]].solid) throw new Error(`${at} starts on a solid tile`);
    for (const item of n.shop ?? []) if (!ITEMS[item]) throw new Error(`${at} sells unknown item "${item}" (see data/items.js)`);
    checkShown(n, at);
    if (n.leaves) checkShown({ after: n.leaves.after }, `${at} leaves`);
  }

  const perches = [...Object.entries(NEMESES).map(([k, n]) => [`nemesis "${k}"`, n]), ...Object.entries(RIVALS).map(([k, r]) => [`rival "${k}"`, r])];
  for (const [who, n] of perches) {
    if (n.map !== id) continue;
    const at = `Map "${id}": ${who} at ${n.x},${n.y}`;
    if (!inside(n.x, n.y)) throw new Error(`${at} is outside the map`);
    if (TILES[grid[n.y][n.x]].solid) throw new Error(`${at} perches on a solid tile`);
    if (!BIRDS[n.bird]) throw new Error(`${at} is unknown bird "${n.bird}" (see data/birds.js)`);
    if (!REGIONS[n.region]) throw new Error(`${at} has unknown region "${n.region}"`);
    for (const f of n.requires.flags ?? []) if (!FLAGS[f]) throw new Error(`${at} requires unknown flag "${f}" (see data/flags.js)`);
  }

  for (const [cid, c] of Object.entries(COLLECTIBLES)) {
    if (c.map !== id) continue;
    const at = `Map "${id}": collectible "${cid}" at ${c.x},${c.y}`;
    if (!inside(c.x, c.y)) throw new Error(`${at} is outside the map`);
    if (!COLLECTIBLE_SPRITES[cid]) throw new Error(`${at} has no art in assets/collectibles.js`);
    if (c.tell && !TELLS[c.tell]) throw new Error(`${at} has unknown tell "${c.tell}" (see TELLS in assets/collectibles.js)`);
  }

  return (cache[id] = {
    id, ...raw, grid, width, height: grid.length,
    warps: raw.warps ?? [],
    gates: raw.gates ?? [],
    signs: raw.signs ?? [],
    npcs: raw.npcs ?? [],
    props,
  });
}
