// Time of day and weather. Both come straight from the real clock, so every
// device agrees and nothing needs saving.
//
// The day is cut into 12 segments of 2 hours, and each segment belongs to one
// of 6 phases (spawn tables and lighting only care about the phase). Weather
// is picked once per calendar day from a seed made of the date.
//
// Dev shortcut: ?hour=18.5 pretends it's that time, ?weather=rain forces the weather.
// For testing, TIME_SPEED in .env runs the clock faster and cycles through every
// weather, one per in-game day (see .env.example).
import { BIRDS } from './data/birds.js';
import { TIME_SPEED } from './cloudConfig.js';

export const PHASES = ['dawn', 'morning', 'midday', 'afternoon', 'dusk', 'night'];
export const WEATHERS = ['clear', 'overcast', 'rain', 'fog'];

// Which phase each 2-hour segment (0 = midnight to 2am) belongs to, lined up
// with a real day rather than two segments each: dawn 4-8, morning 8-12,
// midday 12-14, afternoon 14-18, dusk 18-22, night 22-4.
const SEGMENT_PHASES = [
  'night', 'night', 'dawn', 'dawn', 'morning', 'morning',
  'midday', 'afternoon', 'afternoon', 'dusk', 'dusk', 'night',
];
const SEGMENT_MS = 2 * 60 * 60 * 1000;
const WEATHER_WEIGHTS = { clear: 5, overcast: 3, rain: 2, fog: 1 };
const GOLDEN_HOUR = ['dawn', 'dusk'];

const params = new URLSearchParams(globalThis.location?.search ?? '');
const fakeWeather = WEATHERS.includes(params.get('weather')) ? params.get('weather') : null;
// ?hour= sets what the clock reads when the page loads; it keeps ticking (TIME_SPEED times as fast) from there.
const speed = TIME_SPEED > 0 ? TIME_SPEED : 1;
const loaded = Date.now();
const start = params.has('hour') ? new Date().setHours(0, Math.round(Number(params.get('hour')) * 60), 0, 0) : loaded;

function now() {
  return new Date(start + (Date.now() - loaded) * speed);
}

function segmentAt(date) {
  return Math.floor((date.getHours() + date.getMinutes() / 60) / 2);
}

/** The phase right now: 'dawn', 'morning', 'midday', 'afternoon', 'dusk' or 'night'. */
export function currentPhase() {
  return SEGMENT_PHASES[segmentAt(now())];
}

/** Today's weather: 'clear', 'overcast', 'rain' or 'fog'. The same all day, on every device. */
export function currentWeather() {
  if (fakeWeather) return fakeWeather;
  const d = now();
  if (speed !== 1) {
    // Testing: each in-game day (counted from local noon, so it's whole days) gets the next weather.
    const day = Math.floor(new Date(d).setHours(12, 0, 0, 0) / 86400000);
    return WEATHERS[day % WEATHERS.length];
  }
  const random = mulberry32(d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate());
  let roll = random() * Object.values(WEATHER_WEIGHTS).reduce((a, b) => a + b);
  for (const [weather, weight] of Object.entries(WEATHER_WEIGHTS)) {
    if ((roll -= weight) < 0) return weather;
  }
  return 'clear';
}

/** True at dawn and dusk, when rare birds are commoner and photos pay more. */
export function isGoldenHour(phase = currentPhase()) {
  return GOLDEN_HOUR.includes(phase);
}

/** What photo payouts are multiplied by in this phase. */
export function phaseMultiplier(phase = currentPhase()) {
  return isGoldenHour(phase) ? 1.5 : 1;
}

/** Milliseconds until the clock is next in `phase` (0 if it already is). */
export function timeUntil(phase) {
  const date = now();
  let segment = segmentAt(date);
  if (SEGMENT_PHASES[segment] === phase) return 0;
  const intoSegment = (date.getHours() % 2) * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
  let ms = SEGMENT_MS - intoSegment;
  for (segment = (segment + 1) % 12; SEGMENT_PHASES[segment] !== phase; segment = (segment + 1) % 12) ms += SEGMENT_MS;
  return ms;
}

/** True if this species is out in this phase and weather (no `times`/`weather` = always). */
export function isOut(id, phase, weather) {
  const { times, weather: weathers } = BIRDS[id];
  return (!times || times.includes(phase)) && (!weathers || weathers.includes(weather));
}

/**
 * Pick a species from a spawn table ({ table, rare, rareChance }), keeping to
 * the birds that are out right now. If none of them are, any bird in the list
 * will do, so a map is never empty. At golden hour rare birds turn up twice as often.
 */
export function pickSpecies({ table, rare = [], rareChance = 0 }, phase = currentPhase(), weather = currentWeather()) {
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const out = (list) => list.filter((id) => isOut(id, phase, weather));
  const rareOut = out(rare);
  if (rareOut.length && Math.random() < rareChance * (isGoldenHour(phase) ? 2 : 1)) return pick(rareOut);
  const tableOut = out(table);
  return pick(tableOut.length ? tableOut : table);
}

/** A small seeded random number generator: the same seed always gives the same numbers. */
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
