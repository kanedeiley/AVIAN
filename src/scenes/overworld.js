// Walking around a map: grid movement, collisions, warps, signs, wild encounters.
import { TILE, VIEW_W, VIEW_H, STEP_TIME } from '../config.js';
import { getMap } from '../maps/index.js';
import { TILES } from '../assets/tiles.js';
import { PLAYER } from '../assets/player.js';
import { input } from '../input.js';
import { drawBox, drawText, drawDialog, paginate } from '../gfx/ui.js';
import { BattleScene } from './battle.js';

const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const TURN_DELAY = 0.09; // a quick tap turns in place instead of walking

export class Overworld {
  constructor(game, mapId, x, y, facing = 'down') {
    this.game = game;
    this.time = 0;
    this.player = { x, y, facing, moving: false, progress: 0, dx: 0, dy: 0, steps: 0, walking: false, turnTimer: 0 };
    this.loadMap(mapId, x, y, facing);
  }

  loadMap(id, x, y, facing) {
    this.map = getMap(id);
    Object.assign(this.player, { x, y, facing, moving: false, progress: 0 });
    this.bannerTime = 2;
  }

  tileAt(x, y) {
    if (x < 0 || y < 0 || x >= this.map.width || y >= this.map.height) return null;
    return TILES[this.map.grid[y][x]];
  }

  isBlocked(x, y) {
    const tile = this.tileAt(x, y);
    return !tile || tile.solid;
  }

  update(dt) {
    this.time += dt;
    this.bannerTime = Math.max(0, this.bannerTime - dt);
    const p = this.player;

    // While a text box is open, A/B only advance it.
    if (this.dialog) {
      if (input.wasPressed('a') || input.wasPressed('b')) {
        this.dialog.page++;
        if (this.dialog.page >= this.dialog.pages.length) this.dialog = null;
      }
      return;
    }

    if (p.moving) {
      p.progress += dt / STEP_TIME;
      if (p.progress < 1) return;
      p.x += p.dx;
      p.y += p.dy;
      p.moving = false;
      p.progress = 0;
      p.steps++;
      if (this.onStep()) return;
      // otherwise fall through so held keys keep walking without a hitch
    }

    // A: read whatever is in front of you.
    if (input.wasPressed('a')) {
      const [dx, dy] = DIRS[p.facing];
      const sign = this.map.signs.find((s) => s.x === p.x + dx && s.y === p.y + dy);
      if (sign) {
        this.dialog = { pages: paginate(sign.text), page: 0 };
        p.walking = false;
        return;
      }
    }

    const dir = input.dir();
    if (!dir) {
      p.walking = false;
      return;
    }
    if (dir !== p.facing && !p.walking) {
      p.facing = dir;
      p.turnTimer = TURN_DELAY;
      return;
    }
    p.facing = dir;
    if (p.turnTimer > 0) {
      p.turnTimer -= dt;
      return;
    }

    p.walking = true;
    const [dx, dy] = DIRS[dir];
    if (this.isBlocked(p.x + dx, p.y + dy)) return;
    Object.assign(p, { moving: true, dx, dy, progress: 0 });
  }

  /** Called after each completed step. Returns true if it started a transition. */
  onStep() {
    const p = this.player;
    const warp = this.map.warps.find((w) => w.x === p.x && w.y === p.y);
    if (warp) {
      this.game.transition(() => this.loadMap(warp.to, warp.toX, warp.toY, warp.facing ?? p.facing));
      return true;
    }

    const tile = this.tileAt(p.x, p.y);
    const enc = this.map.encounters;
    if (tile.encounter && enc && Math.random() < enc.rate) {
      const creature = enc.table[Math.floor(Math.random() * enc.table.length)];
      this.game.transition(() => this.game.setScene(new BattleScene(this.game, creature, this)));
      return true;
    }
    return false;
  }

  frameOf(tile) {
    const { sprites, frameTime } = tile;
    return sprites.length === 1 ? sprites[0] : sprites[Math.floor(this.time / frameTime) % sprites.length];
  }

  draw(ctx) {
    const p = this.player;
    const t = p.moving ? p.progress : 0;
    const px = (p.x + p.dx * t) * TILE;
    const py = (p.y + p.dy * t) * TILE;

    // Camera follows the player, clamped to the map; small maps are centered.
    const camX = Math.round(cameraAxis(px, this.map.width * TILE, VIEW_W));
    const camY = Math.round(cameraAxis(py, this.map.height * TILE, VIEW_H));

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    const x0 = Math.max(0, Math.floor(camX / TILE));
    const y0 = Math.max(0, Math.floor(camY / TILE));
    const x1 = Math.min(this.map.width, Math.ceil((camX + VIEW_W) / TILE));
    const y1 = Math.min(this.map.height, Math.ceil((camY + VIEW_H) / TILE));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        ctx.drawImage(this.frameOf(TILES[this.map.grid[y][x]]), x * TILE - camX, y * TILE - camY);
      }
    }

    // Player
    const frames = PLAYER[p.facing];
    let sprite = frames.stand;
    if (p.moving && p.progress < 0.5) sprite = p.steps % 2 ? frames.stepB : frames.stepA;
    ctx.drawImage(sprite, Math.round(px - camX), Math.round(py - camY));

    // Tall grass hides the player's feet
    const onNext = p.moving && p.progress > 0.5;
    const fx = onNext ? p.x + p.dx : p.x;
    const fy = onNext ? p.y + p.dy : p.y;
    const under = this.tileAt(fx, fy);
    if (under?.coversFeet) {
      ctx.drawImage(this.frameOf(under), 0, 10, TILE, 6, fx * TILE - camX, fy * TILE - camY + 10, TILE, 6);
    }

    if (this.bannerTime > 0) {
      const w = this.map.name.length * 8 + 16;
      drawBox(ctx, 4, 4, w, 20);
      drawText(ctx, this.map.name, 12, 10);
    }

    if (this.dialog) {
      const { pages, page } = this.dialog;
      drawDialog(ctx, pages[page], page < pages.length - 1, this.time);
    }
  }
}

function cameraAxis(playerPx, mapPx, viewPx) {
  if (mapPx <= viewPx) return (mapPx - viewPx) / 2;
  const centered = playerPx + TILE / 2 - viewPx / 2;
  return Math.max(0, Math.min(mapPx - viewPx, centered));
}
