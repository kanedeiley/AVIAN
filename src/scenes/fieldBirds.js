// Birds out on the map. They hop around on `perch` tiles and notice you when
// you move nearby: each one has an `alert` level (0-1) that rises while you
// walk close to it (less in `cover` tiles like tall grass) and settles while
// you stand still. At full alert it flies off. Get within camera range while
// it's calm, face it and press A to start the photo minigame; a calmer bird
// sticks around longer there.
import { TILE } from '../config.js';
import { BIRDS } from '../data/birds.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { TILES } from '../assets/tiles.js';
import { drawText } from '../gfx/ui.js';

const NOTICE = 5;          // tiles: birds only react to you inside this distance
const RANGE = 2;           // tiles: how close you need to be to raise the camera
const ALERT_RATE = 1.2;    // alert gained per second walking at the edge of NOTICE (doubles right next to it)
const CALM_RATE = 0.4;     // alert lost per second while you're still or out of range
const COVER = 0.35;        // walking through cover is only this noticeable
const NERVOUS = 0.5;       // above this a bird shows '?' and only hops away from you
const HOP_TIME = 0.25;     // seconds for one hop between tiles
const IDLE = [1.5, 4];     // seconds between hops
const FLY_TIME = 1.2;      // seconds a startled bird takes to fly off screen
const RESPAWN = [6, 12];   // seconds until a new bird shows up after one leaves
const SPAWN_DIST = 6;      // new birds never appear closer than this to you
const STEPS = [[0, -1], [0, 1], [-1, 0], [1, 0]];

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

export class FieldBirds {
  /** `world` is the Overworld; its map's `birds` field says how many and which species. */
  constructor(world) {
    this.world = world;
    this.config = world.map.birds;
    this.birds = [];
    this.respawns = [];
    if (!this.config) return;

    const { map } = world;
    const taken = new Set([...map.warps, ...map.signs].map((t) => `${t.x},${t.y}`));
    this.perches = [];
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        if (TILES[map.grid[y][x]].perch && !taken.has(`${x},${y}`)) this.perches.push({ x, y });
      }
    }
    for (let i = 0; i < this.config.count; i++) this.spawn();
  }

  /** The player's position in tiles, part way between tiles while walking. */
  playerPos() {
    const p = this.world.player;
    const t = p.moving ? p.progress : 0;
    return { x: p.x + p.dx * t, y: p.y + p.dy * t };
  }

  isFree(x, y) {
    const p = this.world.player;
    if (x === p.x && y === p.y) return false;
    if (p.moving && x === p.x + p.dx && y === p.y + p.dy) return false;
    if (this.world.npcs?.occupies(x, y)) return false;
    return !this.birds.some((b) => b.x === x && b.y === y);
  }

  spawn() {
    const pos = this.playerPos();
    const spots = this.perches.filter((s) => this.isFree(s.x, s.y) && Math.hypot(s.x - pos.x, s.y - pos.y) >= SPAWN_DIST);
    if (!spots.length) return this.respawns.push(rand(...RESPAWN)); // try again later
    const { x, y } = pick(spots);
    const id = pick(this.config.table);
    this.birds.push({
      id, species: BIRDS[id], x, y, fromX: x, fromY: y,
      hop: 1, idle: rand(...IDLE), facing: Math.random() < 0.5 ? -1 : 1,
      alert: 0, flying: false, flyTime: 0,
    });
  }

  /** Take a bird off the map (it flew away or was photographed); another comes later. */
  remove(bird) {
    this.birds = this.birds.filter((b) => b !== bird);
    this.respawns.push(rand(...RESPAWN));
  }

  update(dt) {
    if (!this.config) return;

    this.respawns = this.respawns.map((t) => t - dt);
    for (const t of this.respawns) if (t <= 0) this.spawn();
    this.respawns = this.respawns.filter((t) => t > 0);

    const pos = this.playerPos();
    const p = this.world.player;
    const inCover = this.world.tileAt(p.x, p.y)?.cover;

    for (const b of [...this.birds]) {
      if (b.flying) {
        b.flyTime += dt;
        if (b.flyTime >= FLY_TIME) this.remove(b);
        continue;
      }

      if (b.hop < 1) {
        b.hop = Math.min(1, b.hop + dt / HOP_TIME);
      } else if ((b.idle -= dt) <= 0) {
        b.idle = rand(...IDLE);
        this.hop(b, pos);
      }

      const dist = Math.hypot(b.x - pos.x, b.y - pos.y);
      if (p.moving && dist <= NOTICE) {
        const near = 1 + (NOTICE - dist) / NOTICE;
        b.alert += dt * ALERT_RATE * near * (inCover ? COVER : 1) * b.species.skittish;
        if (dist < 1.5) b.alert = 1; // walking right up to a bird always spooks it
      } else {
        b.alert = Math.max(0, b.alert - dt * CALM_RATE);
      }

      if (b.alert >= 1) {
        b.alert = 1;
        b.flying = true;
        b.facing = Math.sign(b.x - pos.x) || b.facing;
      }
    }
  }

  /** Hop to a free neighboring perch. Nervous birds only hop away from you. */
  hop(b, pos) {
    const dist = (x, y) => Math.hypot(x - pos.x, y - pos.y);
    const options = STEPS
      .map(([dx, dy]) => ({ x: b.x + dx, y: b.y + dy }))
      .filter(({ x, y }) => this.world.tileAt(x, y)?.perch && this.isFree(x, y))
      .filter(({ x, y }) => b.alert < NERVOUS || dist(x, y) > dist(b.x, b.y));
    if (!options.length) return;
    const to = pick(options);
    if (to.x !== b.x) b.facing = Math.sign(to.x - b.x);
    Object.assign(b, { fromX: b.x, fromY: b.y, x: to.x, y: to.y, hop: 0 });
  }

  /** The calm bird the player could photograph right now, if any. */
  target(dx, dy) {
    const p = this.world.player;
    if (p.moving) return null;
    return this.birds.find((b) => {
      if (b.flying || b.hop < 1) return false;
      const along = (b.x - p.x) * dx + (b.y - p.y) * dy;
      const side = Math.abs(dx ? b.y - p.y : b.x - p.x);
      return along >= 1 && along <= RANGE && side <= 1;
    }) ?? null;
  }

  /** Draw birds in front of (`front`) or behind the player's row. */
  draw(ctx, camX, camY, front, time) {
    const py = this.world.player.y;
    for (const b of this.birds) {
      if (b.y >= py !== front) continue;
      const { x, y } = this.screenPos(b, camX, camY);
      const flapping = b.flying || b.hop < 1;
      const pose = flapping && Math.floor(time * 12) % 2 ? 'flap' : 'perched';
      ctx.drawImage(BIRD_SPRITES[b.id][b.facing < 0 ? 'left' : 'right'][pose], x, y);

      // A bird sitting in tall grass is partly hidden, like the player's feet.
      const tile = this.world.tileAt(b.x, b.y);
      if (!flapping && tile.coversFeet) {
        ctx.drawImage(this.world.frameOf(tile), 0, 10, TILE, 6, x, y + 10, TILE, 6);
      }

      if (b.flying) drawText(ctx, '!', x + 5, y - 6);
      else if (b.alert > NERVOUS) drawText(ctx, '?', x + 5, y - 6);
    }
  }

  screenPos(b, camX, camY) {
    let x = b.fromX + (b.x - b.fromX) * b.hop;
    let y = b.fromY + (b.y - b.fromY) * b.hop;
    let lift = Math.sin(Math.PI * b.hop) * 4;
    if (b.flying) {
      const t = b.flyTime / FLY_TIME;
      x += b.facing * t * 4;
      lift += t * 6 * TILE;
    }
    return { x: Math.round(x * TILE - camX), y: Math.round(y * TILE - camY - lift) };
  }

  /** Viewfinder corners around a bird you can photograph. */
  drawTarget(ctx, b, camX, camY) {
    const { x, y } = this.screenPos(b, camX, camY);
    ctx.fillStyle = '#f8f8f8';
    const l = x - 2, t = y + 1, r = x + TILE + 2, btm = y + TILE;
    for (const [cx, cy, sx, sy] of [[l, t, 1, 1], [r, t, -1, 1], [l, btm, 1, -1], [r, btm, -1, -1]]) {
      ctx.fillRect(sx > 0 ? cx : cx - 4, sy > 0 ? cy : cy - 1, 4, 1);
      ctx.fillRect(sx > 0 ? cx : cx - 1, sy > 0 ? cy : cy - 4, 1, 4);
    }
  }
}
