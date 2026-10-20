// Characters who wander around part of a map: Hannah and her puppies.
// They come from the map's `npcs` list:
//   { id, name, x, y, area: [x0, y0, x1, y1], text: ['...'] }
// `id` picks the sprites (assets/dogs.js or assets/people.js) and `area` is the
// box of tiles they wander in. Instead of `text`, `talk` names a function in
// data/dialogue.js whose lines change as you progress, and `sets` is a story
// flag (data/flags.js) you earn by talking to them. They block the player like any solid tile. Face one and press A
// to say hi: it sits and looks at you while you talk.
import { TILE } from '../config.js';
import { DOG_SPRITES } from '../assets/dogs.js';
import { PEOPLE_SPRITES } from '../assets/people.js';

const STEP_TIME = 0.3;   // seconds to walk one tile
const IDLE = [0.8, 3];   // seconds between moves
const SIT_CHANCE = 0.3;  // chance to sit down instead of moving
const LISTEN_TIME = 2;   // seconds it keeps sitting after you talk to it
const STEPS = [[0, -1], [0, 1], [-1, 0], [1, 0]];

const SPRITES = { ...DOG_SPRITES, ...PEOPLE_SPRITES };

const rand = (a, b) => a + Math.random() * (b - a);

export class Npcs {
  constructor(world) {
    this.world = world;
    this.list = (world.map.npcs ?? []).map((n) => ({
      ...n, fromX: n.x, fromY: n.y, step: 1, idle: rand(...IDLE),
      facing: Math.random() < 0.5 ? 'left' : 'right', sitting: true, listening: 0,
    }));
  }

  /** True if an NPC is on this tile or walking onto/off it. */
  occupies(x, y) {
    return this.list.some((n) => (n.x === x && n.y === y) || (n.step < 1 && n.fromX === x && n.fromY === y));
  }

  /** The NPC standing still on this tile, if any. */
  at(x, y) {
    return this.list.find((n) => n.x === x && n.y === y && n.step >= 1) ?? null;
  }

  /** Start talking to an NPC: it sits and looks at you for a bit. */
  listen(n) {
    n.sitting = true;
    n.listening = LISTEN_TIME;
  }

  update(dt) {
    const world = this.world;
    const p = world.player;
    const playerOn = (x, y) => (x === p.x && y === p.y) || (p.moving && x === p.x + p.dx && y === p.y + p.dy);

    for (const n of this.list) {
      if (n.step < 1) {
        n.step = Math.min(1, n.step + dt / STEP_TIME);
        continue;
      }
      if (world.dialog || n.listening > 0) {
        n.listening = Math.max(0, n.listening - dt);
        continue;
      }
      if ((n.idle -= dt) > 0) continue;
      n.idle = rand(...IDLE);
      if (Math.random() < SIT_CHANCE) {
        n.sitting = true;
        continue;
      }

      const [x0, y0, x1, y1] = n.area;
      const options = STEPS
        .map(([dx, dy]) => ({ x: n.x + dx, y: n.y + dy, dx }))
        .filter(({ x, y }) => x >= x0 && x <= x1 && y >= y0 && y <= y1)
        .filter(({ x, y }) => world.tileAt(x, y) && !world.tileAt(x, y).solid)
        .filter(({ x, y }) => !this.occupies(x, y) && !playerOn(x, y));
      if (!options.length) continue;
      const to = options[Math.floor(Math.random() * options.length)];
      if (to.dx) n.facing = to.dx < 0 ? 'left' : 'right';
      Object.assign(n, { fromX: n.x, fromY: n.y, x: to.x, y: to.y, step: 0, sitting: false });
    }
  }

  /** Draw NPCs in front of (`front`) or behind the player's row. */
  draw(ctx, camX, camY, front, time) {
    const py = this.world.player.y;
    for (const n of this.list) {
      if (n.y >= py !== front) continue;
      const sprites = SPRITES[n.id];
      const walking = n.step < 1;
      const sprite = n.sitting ? sprites.sitting : sprites[n.facing][walking ? Math.floor(time * 8) % 2 : 0];
      // Bigger sprites (Libby) are centered on the tile with their feet on its bottom edge.
      const x = (n.fromX + (n.x - n.fromX) * n.step) * TILE - camX - (sprite.width - TILE) / 2;
      const y = (n.fromY + (n.y - n.fromY) * n.step) * TILE - camY - (sprite.height - TILE);
      ctx.drawImage(sprite, Math.round(x), Math.round(y));
    }
  }
}
