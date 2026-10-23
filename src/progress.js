// Story progress: who you are (your name and look, from the intro), what you've
// done (flags), which nemesis birds and rivals you've beaten, which collectibles you've
// found, what's in your bag, and how many of each region's birds you've photographed. It lives in
// game.progress and is saved with save.js (and online, like the journal).
import { REGIONS } from './data/regions.js';
import { FLAGS } from './data/flags.js';
import { NEMESES } from './data/nemeses.js';
import { RIVALS } from './data/rivals.js';
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

/** True once you've beaten a rival's challenge (data/rivals.js). */
export function beatRival(game, id) {
  return Boolean(game.progress.rivals[id]);
}

/** True once `id` is done: a nemesis or rival you've beaten, or a story flag you've reached (data/flags.js). */
export function done(game, id) {
  return beatNemesis(game, id) || beatRival(game, id) || Boolean(game.progress.flags[id]);
}

/** False for a map's npc, sign, prop or warp that's only there `after` (or `until`) something is done (see done()). */
export function shown(game, thing) {
  return (!thing.after || done(game, thing.after)) && (!thing.until || !done(game, thing.until));
}

/** Hints for each requirement of a perched bird (a nemesis or a rival's) you haven't met yet; empty when you're ready. */
export function perchNeeds(game, perch) {
  const { requires, region } = perch;
  const needs = (requires.flags ?? []).filter((f) => !game.progress.flags[f]).map((f) => FLAGS[f]);
  const { have } = regionPhotos(game, region);
  if (have < (requires.species ?? 0)) {
    needs.push(`Photograph ${requires.species} kinds of ${REGIONS[region].name} birds (you have ${have}).`);
  }
  return needs;
}

/**
 * The bird perched on this map that you haven't beaten yet, if any: a nemesis,
 * or a rival's bird. { id, kind: 'nemesis' or 'rival', ...entry }.
 */
export function perchOn(game, mapId) {
  const nemesis = Object.entries(NEMESES).find(([id, n]) => n.map === mapId && !beatNemesis(game, id));
  if (nemesis) return { id: nemesis[0], kind: 'nemesis', ...nemesis[1] };
  const rival = Object.entries(RIVALS).find(([id, r]) => r.map === mapId && !beatRival(game, id));
  return rival ? { id: rival[0], kind: 'rival', ...rival[1] } : null;
}

/** True once the perched bird (from perchOn) is beaten. */
export function perchBeaten(game, perch) {
  return perch.kind === 'rival' ? beatRival(game, perch.id) : beatNemesis(game, perch.id);
}

/** False while a `locked` warp (or a map's gate) is still shut: until its `nemesis` or `rival` is beaten (see maps/village.js). */
export function warpOpen(game, warp) {
  return !warp.locked || done(game, warp.locked.nemesis ?? warp.locked.rival);
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

/** Record a rival's challenge as beaten, with the stars of your best photo. */
export function recordRival(game, id, stars) {
  game.progress.rivals[id] = Math.max(game.progress.rivals[id] ?? 0, stars);
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

/** True while you're wearing clothes `id` (data/items.js `wear`). */
export function wearing(game, id) {
  const look = game.progress.player?.look ?? {};
  return Object.entries(ITEMS[id].wear).every(([key, value]) => look[key] === value);
}

/**
 * Put clothes `id` on, or take them off if you're wearing them. Your own look
 * (from the LOOK screen) is kept in `player.plain` for each part a piece of
 * clothing covers, so taking it off puts back what you had on before.
 * Returns true if they're on now.
 */
export function toggleWear(game, id) {
  const player = game.progress.player ?? { name: 'BIRDER' };
  const look = { ...player.look };
  const plain = { ...player.plain };
  const on = !wearing(game, id);
  for (const [key, value] of Object.entries(ITEMS[id].wear)) {
    if (on) {
      // Only remember it if it's your own, not other clothes you're swapping out.
      const bought = Object.values(ITEMS).some((item) => item.wear?.[key] === look[key]);
      if (!bought && key in look) plain[key] = look[key];
      look[key] = value;
    } else if (key in plain) {
      look[key] = plain[key];
    } else {
      delete look[key]; // back to the default look
    }
  }
  game.progress.player = { ...player, look, plain };
  saveProgress(game.progress);
  return on;
}

/** Use up one of a supply. */
export function spendItem(game, id) {
  game.progress.items[id] = Math.max(0, itemCount(game, id) - 1);
  saveProgress(game.progress);
}
