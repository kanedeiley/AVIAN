// Story progress: who you are (your name and look, from the intro), what you've
// done (flags), which nemesis birds you've beaten, which collectibles you've
// found, what's in your bag, and how many of each region's birds you've photographed. It lives in
// game.progress and is saved with save.js (and online, like the journal).
import { REGIONS } from './data/regions.js';
import { FLAGS } from './data/flags.js';
import { NEMESES } from './data/nemeses.js';
import { VOYAGES } from './data/voyages.js';
import { COLLECTIBLES } from './data/collectibles.js';
import { ITEMS } from './data/items.js';
import { MAP_IDS, getMap } from './maps/index.js';
import { saveProgress, saveMoney } from './save.js';

/** Every species found on the region's maps and voyages. */
export function regionSpecies(regionId) {
  const maps = MAP_IDS.map(getMap).filter((m) => m.region === regionId && m.birds);
  const voyages = Object.values(VOYAGES).filter((v) => v.region === regionId);
  return new Set([
    ...maps.flatMap((m) => [...m.birds.table, ...(m.birds.rare ?? [])]),
    ...voyages.flatMap((v) => [...v.table, ...(v.rare ?? [])]),
  ]);
}

/** How many of the region's species are in the journal, out of how many. */
export function regionPhotos(game, regionId) {
  const species = [...regionSpecies(regionId)];
  return { have: species.filter((id) => game.journal[id]).length, total: species.length };
}

/** The name you gave HANNAH in the intro. */
export function playerName(game) {
  return game.progress.player?.name || 'BIRDER';
}

export function beatNemesis(game, id) {
  return Boolean(game.progress.nemeses[id]);
}

/** Hints for each requirement of a nemesis you haven't met yet; empty when you're ready. */
export function nemesisNeeds(game, id) {
  const { requires, region } = NEMESES[id];
  const needs = (requires.flags ?? []).filter((f) => !game.progress.flags[f]).map((f) => FLAGS[f]);
  const { have } = regionPhotos(game, region);
  if (have < (requires.species ?? 0)) {
    needs.push(`Photograph ${requires.species} kinds of ${REGIONS[region].name} birds (you have ${have}).`);
  }
  return needs;
}

/** The nemesis perched on this map that you haven't beaten yet, if any: { id, ...entry }. */
export function nemesisOn(game, mapId) {
  const found = Object.entries(NEMESES).find(([id, n]) => n.map === mapId && !beatNemesis(game, id));
  return found ? { id: found[0], ...found[1] } : null;
}

/** False while a `locked` warp is still shut (see maps/village.js). */
export function warpOpen(game, warp) {
  return !warp.locked || beatNemesis(game, warp.locked.nemesis);
}

export function setFlag(game, flag) {
  if (game.progress.flags[flag]) return;
  game.progress.flags[flag] = true;
  saveProgress(game.progress);
}

/** Record a nemesis as beaten, with the stars of your best photo of it. */
export function recordNemesis(game, id, stars) {
  game.progress.nemeses[id] = Math.max(game.progress.nemeses[id] ?? 0, stars);
  saveProgress(game.progress);
}

/** The collectibles still hidden on this map: [{ id, ...entry }]. */
export function collectiblesOn(game, mapId) {
  return Object.entries(COLLECTIBLES)
    .filter(([id, c]) => c.map === mapId && !game.progress.collectibles[id])
    .map(([id, c]) => ({ id, ...c }));
}

export function collect(game, id) {
  game.progress.collectibles[id] = true;
  saveProgress(game.progress);
}

/** How many of an item (data/items.js) are in your bag. */
export function itemCount(game, id) {
  return game.progress.items[id] ?? 0;
}

/** Why you can't buy one more of an item right now, or null if you can. */
export function cantBuy(game, id) {
  const item = ITEMS[id];
  const have = itemCount(game, id);
  if (item.kind === 'tool' && have) return `You already have ${item.name}.`;
  if (item.kind === 'supply' && have >= item.max) return `Your bag can't hold any more ${item.name}.`;
  if (game.money < item.price) return `You need $${item.price - game.money} more.`;
  return null;
}

/** Pay for one of an item and put it in your bag (check cantBuy first). */
export function buyItem(game, id) {
  game.money -= ITEMS[id].price;
  game.progress.items[id] = itemCount(game, id) + 1;
  saveMoney(game.money);
  saveProgress(game.progress);
}

/** Use up one of a supply. */
export function spendItem(game, id) {
  game.progress.items[id] = Math.max(0, itemCount(game, id) - 1);
  saveProgress(game.progress);
}
