// The world map: every outdoor map drawn small, in place, with a blinking
// "you are here". Maps are placed by following the warps on their edges (a
// warp on the bottom row of one map puts the map it leads to directly below
// it), so a new map shows up here as soon as it's connected to the others.
// Maps marked `indoor` are left off; inside one, the marker sits on its door.
// Maps you can only reach through a `locked` warp that's still shut stay off too.
// Maps that aren't joined edge to edge (like Vermont, a train ride away) go on
// pages of their own: A flips through the pages you can get to.
import { VIEW_W, VIEW_H } from '../config.js';
import { MAP_IDS, getMap, doorTo } from '../maps/index.js';
import { REGIONS } from '../data/regions.js';
import { TILES } from '../assets/tiles.js';
import { input } from '../input.js';
import { drawBox, drawText } from '../gfx/ui.js';
import { warpOpen, shown } from '../progress.js';

const CELL = 4;        // screen px per map tile; each tile is shown as 2x2 colors
const PAN_SPEED = 120; // px/s
const TOP = 24;        // the title bar's height
const INK = '#283050';

/**
 * The world map's pages, home first: each is the outdoor maps joined edge to
 * edge, as each map's top-left corner in world tiles. Only maps you can get to
 * from home through open warps (doors and trains too) are on them.
 */
export function layoutWorld(game) {
  const home = MAP_IDS.find((id) => !getMap(id).indoor);
  const open = reachable(game, home);
  const pages = [];
  for (const id of MAP_IDS) {
    if (open.has(id) && !getMap(id).indoor && !pages.some((page) => page[id])) pages.push(layoutPage(game, id));
  }
  return pages;
}

/** Every map you can get to from `root` through open warps. */
function reachable(game, root) {
  const seen = new Set([root]);
  const queue = [root];
  while (queue.length) {
    for (const w of getMap(queue.shift()).warps) {
      if (w.to === 'back' || seen.has(w.to) || !warpOpen(game, w)) continue;
      seen.add(w.to);
      queue.push(w.to);
    }
  }
  return seen;
}

/** Each outdoor map's top-left corner in world tiles, found by walking the open edge warps out from `root`. */
function layoutPage(game, root) {
  const placed = { [root]: { x: 0, y: 0 } };
  const queue = [root];
  while (queue.length) {
    const id = queue.shift();
    const a = getMap(id);
    const at = placed[id];
    for (const w of a.warps) {
      const b = getMap(w.to);
      if (placed[w.to] || b.indoor || !warpOpen(game, w)) continue;
      let pos = null;
      if (w.y === a.height - 1) pos = { x: at.x + w.x - w.toX, y: at.y + a.height };
      else if (w.y === 0) pos = { x: at.x + w.x - w.toX, y: at.y - b.height };
      else if (w.x === 0) pos = { x: at.x - b.width, y: at.y + w.y - w.toY };
      else if (w.x === a.width - 1) pos = { x: at.x + a.width, y: at.y + w.y - w.toY };
      if (!pos) continue;
      placed[w.to] = pos;
      queue.push(w.to);
    }
  }
  return placed;
}

// Each tile's look shrunk to 2x2 colors: the average of each 8x8 quarter.
const tileColors = {};
function colorsOf(id) {
  if (tileColors[id]) return tileColors[id];
  const sprite = TILES[id].overSprite ?? TILES[id].sprites[0];
  const data = sprite.getContext('2d').getImageData(0, 0, 16, 16).data;
  const quarters = [];
  for (const [qx, qy] of [[0, 0], [8, 0], [0, 8], [8, 8]]) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = qy; y < qy + 8; y++) {
      for (let x = qx; x < qx + 8; x++) {
        const i = (y * 16 + x) * 4;
        if (data[i + 3] === 0) continue;
        r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
      }
    }
    quarters.push(n ? `rgb(${r / n | 0},${g / n | 0},${b / n | 0})` : '#000');
  }
  return (tileColors[id] = quarters);
}

/** A map's locked warps and gates. */
const locksOf = (map) => [...map.warps.filter((w) => w.locked), ...map.gates];

/** Which locked warps and gates are open (and props are gone), as a string to tell when the world needs drawing again. */
function openLocks(game) {
  return MAP_IDS.flatMap((id) => [
    ...locksOf(getMap(id)).filter((w) => warpOpen(game, w)).map((w) => `${id}:${w.x},${w.y}`),
    ...getMap(id).props.filter((o) => !shown(game, o)).map((o) => `${id}:${o.id}`),
  ]).join(' ');
}

/** Draw the whole world once into a canvas, CELL px per tile (a shut locked warp as its `tile`). */
function renderWorld(layout, game) {
  const ids = Object.keys(layout);
  const minX = Math.min(...ids.map((id) => layout[id].x));
  const minY = Math.min(...ids.map((id) => layout[id].y));
  const maxX = Math.max(...ids.map((id) => layout[id].x + getMap(id).width));
  const maxY = Math.max(...ids.map((id) => layout[id].y + getMap(id).height));
  const canvas = document.createElement('canvas');
  canvas.width = (maxX - minX) * CELL;
  canvas.height = (maxY - minY) * CELL;
  const ctx = canvas.getContext('2d');
  const half = CELL / 2;
  for (const id of ids) {
    const map = getMap(id);
    const ox = layout[id].x - minX;
    const oy = layout[id].y - minY;
    const locks = locksOf(map).filter((w) => !warpOpen(game, w));
    const gone = map.props.filter((o) => !shown(game, o));
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const lock = locks.find((w) => w.x === x && w.y === y);
        const prop = gone.find((o) => x >= o.x && x < o.x + o.w && y >= o.y && y < o.y + o.h);
        const id = lock ? lock.locked.tile : prop ? prop.under[y - prop.y][x - prop.x] : map.grid[y][x];
        colorsOf(id).forEach((color, q) => {
          ctx.fillStyle = color;
          ctx.fillRect((ox + x) * CELL + (q % 2) * half, (oy + y) * CELL + (q >> 1) * half, half, half);
        });
      }
    }
  }
  return { canvas, minX, minY };
}

// Maps don't change while playing, so build it once, and again only when a locked warp opens.
let world = null; // { open, pages: [{ layout, canvas, minX, minY }] }

export class WorldMapScene {
  constructor(game, returnTo) {
    this.game = game;
    this.returnTo = returnTo;
    this.time = 0;
    const open = openLocks(game);
    if (world?.open !== open) {
      world = { open, pages: layoutWorld(game).map((layout) => ({ layout, ...renderWorld(layout, game) })) };
    }

    // Where the player is in world tiles, and on which page. Indoors, that's the door that leads in.
    const { map, player } = returnTo;
    const pageOf = (id) => world.pages.findIndex((page) => page.layout[id]);
    let at = { mapId: map.id, x: player.x, y: player.y };
    if (pageOf(map.id) < 0) {
      // A shared interior (like the general store) has many doors: use the one you came in by.
      const door = returnTo.back && pageOf(returnTo.back.map) >= 0 ? returnTo.back : doorTo(map.id);
      at = door && pageOf(door.map) >= 0 ? { mapId: door.map, x: door.x, y: door.y } : null;
    }
    this.herePage = at ? pageOf(at.mapId) : -1;
    const page = world.pages[this.herePage];
    this.here = at && {
      name: getMap(at.mapId).name,
      x: (page.layout[at.mapId].x - page.minX + at.x) * CELL,
      y: (page.layout[at.mapId].y - page.minY + at.y) * CELL,
    };
    this.showPage(Math.max(0, this.herePage));
  }

  /** Turn to page `i`, centered on the player if they're on it (or else on its first map). */
  showPage(i) {
    this.pageIndex = i;
    this.page = world.pages[i];
    const { layout, minX, minY } = this.page;
    const [first] = Object.keys(layout);
    const middle = { x: (layout[first].x - minX + getMap(first).width / 2) * CELL, y: (layout[first].y - minY + getMap(first).height / 2) * CELL };
    const at = i === this.herePage ? this.here : middle;
    this.camX = at.x - VIEW_W / 2;
    this.camY = at.y - (VIEW_H + TOP) / 2 + TOP;
    this.clampCamera();
  }

  clampCamera() {
    const { width, height } = this.page.canvas;
    const viewH = VIEW_H - TOP;
    this.camX = width <= VIEW_W ? (width - VIEW_W) / 2 : Math.max(0, Math.min(width - VIEW_W, this.camX));
    this.camY = height <= viewH ? (height - viewH) / 2 : Math.max(0, Math.min(height - viewH, this.camY));
  }

  update(dt) {
    this.time += dt;
    if (input.wasPressed('b') || input.wasPressed('map')) {
      this.game.transition(() => this.game.setScene(this.returnTo));
      return;
    }
    if (input.wasPressed('a') && world.pages.length > 1) this.showPage((this.pageIndex + 1) % world.pages.length);
    if (input.isDown('left')) this.camX -= PAN_SPEED * dt;
    if (input.isDown('right')) this.camX += PAN_SPEED * dt;
    if (input.isDown('up')) this.camY -= PAN_SPEED * dt;
    if (input.isDown('down')) this.camY += PAN_SPEED * dt;
    this.clampCamera();
  }

  draw(ctx) {
    ctx.fillStyle = '#183048';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    const ox = Math.round(-this.camX);
    const oy = Math.round(TOP - this.camY);
    const page = this.page;
    ctx.drawImage(page.canvas, ox, oy);

    // Map names, along the top edge of each map.
    for (const [id, pos] of Object.entries(page.layout)) {
      const map = getMap(id);
      const w = map.name.length * 8 + 8;
      const x = Math.round(ox + (pos.x - page.minX + map.width / 2) * CELL - w / 2);
      const y = Math.round(oy + (pos.y - page.minY) * CELL + 2);
      ctx.fillStyle = 'rgba(248,248,248,0.8)';
      ctx.fillRect(x, y, w, 12);
      drawText(ctx, map.name, x + 4, y + 2);
    }

    // You are here: a blinking marker.
    if (this.here && this.pageIndex === this.herePage && Math.floor(this.time * 3) % 2 === 0) {
      const x = ox + this.here.x;
      const y = oy + this.here.y;
      ctx.fillStyle = INK;
      ctx.fillRect(x - 2, y - 2, CELL + 4, CELL + 4);
      ctx.fillStyle = '#e04040';
      ctx.fillRect(x - 1, y - 1, CELL + 2, CELL + 2);
    }

    // The title: where you are, or on another page, its region. With more than one page, a dot for each.
    drawBox(ctx, 0, 0, VIEW_W, TOP);
    const name = this.pageIndex === this.herePage ? this.here.name : REGIONS[getMap(Object.keys(page.layout)[0]).region].name;
    drawText(ctx, this.herePage < 0 && this.pageIndex === 0 ? 'WORLD' : `WORLD - ${name}`, 8, 8);
    if (world.pages.length > 1) {
      world.pages.forEach((_, i) => {
        const x = VIEW_W - 10 - (world.pages.length - i) * 6;
        ctx.fillStyle = INK;
        ctx.fillRect(x, 10, 4, 4);
        if (i !== this.pageIndex) {
          ctx.fillStyle = '#f8f8f8';
          ctx.fillRect(x + 1, 11, 2, 2);
        }
      });
    }
  }
}
