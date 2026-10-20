// Story progress: what you've done (flags), which nemesis birds you've beaten,
// and how many of each region's birds you've photographed. It lives in
// game.progress and is saved with save.js (and online, like the journal).
import { REGIONS } from './data/regions.js';
import { FLAGS } from './data/flags.js';
import { NEMESES } from './data/nemeses.js';
import { VOYAGES } from './data/voyages.js';
import { MAP_IDS, getMap } from './maps/index.js';
import { saveProgress } from './save.js';

/** Every species found on the region's maps and voyages. */
export function regionSpecies(regionId) {
  const maps = MAP_IDS.map(getMap).filter((m) => m.region === regionId && m.birds);
  const voyages = Object.values(VOYAGES).filter((v) => v.region === regionId);
  return new Set([
    ...maps.flatMap((m) => m.birds.table),
    ...voyages.flatMap((v) => [...v.table, ...(v.rare ?? [])]),
  ]);
}

/** How many of the region's species are in the journal, out of how many. */
export function regionPhotos(game, regionId) {
  const species = [...regionSpecies(regionId)];
  return { have: species.filter((id) => game.journal[id]).length, total: species.length };
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

