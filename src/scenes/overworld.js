// Walking around a map: grid movement, collisions, warps, signs, boats you can
// book a voyage on (see voyage.js), the birds you sneak up on (see fieldBirds.js),
// the nemesis bird guarding its perch (see nemesis.js), and the collectibles
// hidden around (see data/collectibles.js). Outdoors the light follows the
// real time of day and weather (time.js, gfx/lighting.js), and beds and
// benches let you rest until it's another time of day.
import { TILE, VIEW_W, VIEW_H, STEP_TIME } from '../config.js';
import { getMap } from '../maps/index.js';
import { TILES } from '../assets/tiles.js';
import { PLAYER } from '../assets/player.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { TELLS } from '../assets/collectibles.js';
import { input } from '../input.js';
import { drawBox, drawText, drawTinyText, drawDialog, paginate } from '../gfx/ui.js';
import { PhotoScene } from './photo.js';
import { FieldBirds } from './fieldBirds.js';
import { Npcs } from './npcs.js';
import { WorldMapScene } from './worldMap.js';
import { JournalScene } from './journal.js';
import { VoyageScene } from './voyage.js';
import { NemesisScene } from './nemesis.js';
import { VOYAGES } from '../data/voyages.js';
import { DIALOGUE } from '../data/dialogue.js';
import { saveMoney, saveLocation } from '../save.js';
import { nemesisNeeds, nemesisOn, setFlag, collectiblesOn, collect } from '../progress.js';
import { timeUntil } from '../time.js';
import { drawLighting, tintPanes, drawClock } from '../gfx/lighting.js';

const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const TURN_DELAY = 0.09; // a quick tap turns in place instead of walking
const LANTERN = 4.5;     // tiles your lantern lights up on a `dark` map
const DARKNESS = 'rgba(10,8,20,0.9)';
const NEMESIS_FLAP = [3, 0.4]; // the nemesis on its perch flaps for 0.4s every 3s
const REST_UNTIL = ['dawn', 'dusk', 'night']; // what a bed or bench lets you rest until
const REST_DARK = 0.85;        // how dark the screen gets while you rest

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
    this.nemesis = nemesisOn(this.game, id);
    this.collectibles = collectiblesOn(this.game, id);
    this.rememberLocation();
    this.npcs = new Npcs(this);
    this.birds = new FieldBirds(this);
    this.bannerTime = 2;
    this.rest = null;
    // Every tile with `glow` is a light: on a dark map (see drawDarkness), and outdoors at night.
    // Indoors, the `pane`s of the windows show the sky outside.
    this.lights = [];
    this.panes = [];
    this.map.grid.forEach((row, ty) => row.forEach((id, tx) => {
      const { glow, flicker, lit = 1 } = TILES[id];
      const seed = ((tx * 7 + ty * 13) % 10) / 10; // a fixed number per tile, 0-0.9
      if (glow && ((tx * 5 + ty * 3) % 10) / 10 < lit) this.lights.push({ x: (tx + 0.5) * TILE, y: (ty + 0.5) * TILE, r: glow * TILE, flicker, seed });
      if (TILES[id].pane && this.map.indoor) this.panes.push({ x: tx * TILE, y: ty * TILE, w: TILE, h: TILE });
    }));
  }

  tileAt(x, y) {
    if (x < 0 || y < 0 || x >= this.map.width || y >= this.map.height) return null;
    return TILES[this.map.grid[y][x]];
  }

  isBlocked(x, y) {
    const tile = this.tileAt(x, y);
    return !tile || tile.solid || this.npcs.occupies(x, y) || this.nemesisAt(x, y);
  }

  /** True if the (not yet beaten) nemesis perches on this tile. */
  nemesisAt(x, y) {
    const n = this.nemesis;
    return Boolean(n && n.x === x && n.y === y && !this.game.progress.nemeses[n.id]);
  }

  update(dt) {
    this.time += dt;
    this.bannerTime = Math.max(0, this.bannerTime - dt);
    const p = this.player;
    if (this.rest) return this.updateRest(dt);
    this.birds.update(dt);
    this.npcs.update(dt);

    // While a text box is open, A/B only advance it. A yes/no question
    // (`onYes`, and optionally `onNo`) on the last page: A says yes, B says no.
    if (this.dialog) {
      if (input.wasPressed('a') || input.wasPressed('b')) {
        const d = this.dialog;
        if (d.onYes && d.page === d.pages.length - 1) {
          this.dialog = null;
          if (input.wasPressed('a')) d.onYes();
          else d.onNo?.();
          return;
        }
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

    // M: the world map. J: the journal.
    if (input.wasPressed('map') || input.wasPressed('journal')) {
      const Screen = input.wasPressed('map') ? WorldMapScene : JournalScene;
      p.walking = false;
      this.game.transition(() => this.game.setScene(new Screen(this.game, this)));
      return;
    }

    // A: read the sign in front of you, or photograph the bird in front of you.
    if (input.wasPressed('a')) {
      const [dx, dy] = DIRS[p.facing];
      const sign = this.map.signs.find((s) => s.x === p.x + dx && s.y === p.y + dy);
      if (sign) {
        this.dialog = { pages: paginate(sign.text), page: 0 };
        p.walking = false;
        return;
      }
      const ship = this.propAt(p.x + dx, p.y + dy);
      if (ship?.voyage) {
        this.offerVoyage(ship.voyage);
        p.walking = false;
        return;
      }
      const item = this.collectibles.find((c) => c.x === p.x + dx && c.y === p.y + dy);
      if (item) {
        collect(this.game, item.id);
        this.collectibles = this.collectibles.filter((c) => c !== item);
        this.dialog = { pages: paginate(item.found), page: 0 };
        p.walking = false;
        return;
      }
      const npc = this.npcs.at(p.x + dx, p.y + dy);
      if (npc) {
        this.npcs.listen(npc);
        // Pick the lines before setting the flag, so a first meeting says hello.
        const text = npc.talk ? DIALOGUE[npc.talk](this.game) : npc.text;
        if (npc.sets) setFlag(this.game, npc.sets);
        this.dialog = { pages: paginate(text), page: 0 };
        p.walking = false;
        return;
      }
      if (this.nemesisAt(p.x + dx, p.y + dy)) {
        this.offerNemesis();
        p.walking = false;
        return;
      }
      if (this.tileAt(p.x + dx, p.y + dy)?.rest) {
        const { phase } = this.game;
        this.offerRest(REST_UNTIL.filter((t) => t !== phase).sort((a, b) => timeUntil(a) - timeUntil(b)));
        p.walking = false;
        return;
      }
      const bird = this.birds.target(dx, dy);
      if (bird) {
        p.walking = false;
        this.game.transition(() => {
          this.birds.remove(bird);
          this.game.setScene(new PhotoScene(this.game, bird.id, this, bird.alert));
        });
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

  /** The big prop (see maps/index.js) covering this tile, if any. */
  propAt(x, y) {
    return this.map.props.find((o) => x >= o.x && x < o.x + o.w && y >= o.y && y < o.y + o.h) ?? null;
  }

  /** The captain's pitch, the fare, and a yes/no to board. Boarding pays the fare. */
  offerVoyage(id) {
    const voyage = VOYAGES[id];
    const { money } = this.game;
    const fare = voyage.price > 0 ? `The fare is $${voyage.price}. You have $${money}.` : 'The fare is $0 today!';
    if (money < voyage.price) {
      this.dialog = { pages: paginate([...voyage.pitch, fare, 'Come back when you have enough money.']), page: 0 };
      return;
    }
    const pages = paginate([...voyage.pitch, fare]);
    pages.push([`Board the ${voyage.name}?`, 'A:YES  B:NO']);
    this.dialog = {
      pages, page: 0,
      onYes: () => {
        this.game.money -= voyage.price;
        saveMoney(this.game.money);
        this.game.transition(() => this.game.setScene(new VoyageScene(this.game, id, this)));
      },
    };
  }

  /** Face the nemesis: it tells you what you still need, or asks if you're ready to fight. */
  offerNemesis() {
    const n = this.nemesis;
    const needs = nemesisNeeds(this.game, n.id);
    if (needs.length) {
      this.dialog = { pages: paginate([...n.locked, 'To get close, you need to:', ...needs]), page: 0 };
      return;
    }
    const pages = paginate(n.challenge);
    pages.push(['Face your NEMESIS BIRD?', 'A:YES  B:NO']);
    this.dialog = {
      pages, page: 0,
      onYes: () => this.game.transition(() => this.game.setScene(new NemesisScene(this.game, n.id, this))),
    };
  }

  /**
   * Ask whether to rest until each of `targets` in turn (soonest first); B
   * moves on to the next. Time is never skipped: resting just waits, with the
   * screen dimmed, until the real clock gets there (or you press B).
   */
  offerRest(targets) {
    const [target, ...others] = targets;
    this.dialog = {
      pages: [[`Rest until ${target.toUpperCase()}? ~${formatWait(timeUntil(target), false)}`, 'A:YES  B:NO']],
      page: 0,
      onYes: () => (this.rest = { target, time: 0 }),
      onNo: others.length ? () => this.offerRest(others) : null,
    };
  }

  updateRest(dt) {
    this.rest.time += dt;
    if (input.wasPressed('b') || this.game.phase === this.rest.target) {
      // Wake up to a fresh set of birds for the new time of day.
      this.game.transition(() => {
        this.rest = null;
        this.birds = new FieldBirds(this);
      });
    }
  }

  drawRest(ctx) {
    const { target, time } = this.rest;
    ctx.fillStyle = `rgba(8,8,24,${Math.min(REST_DARK, time)})`;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    // Z's drifting up from the player, one after another.
    for (let i = 0; i < 3; i++) {
      const t = (time * 0.5 + i / 3) % 1;
      const x = VIEW_W / 2 + 8 + t * 16 + Math.sin(t * 6) * 3;
      drawText(ctx, i % 2 ? 'z' : 'Z', Math.round(x), Math.round(VIEW_H / 2 - 16 - t * 32), '#f8f8f8');
    }
    drawDialog(ctx, [`Resting until ${target.toUpperCase()}`, `${formatWait(timeUntil(target), true)}  B:WAKE UP`]);
  }

  /** The nemesis on its perch, drawn in front of (`front`) or behind the player's row. */
  drawNemesis(ctx, camX, camY, front) {
    const n = this.nemesis;
    if (!n || !this.nemesisAt(n.x, n.y) || n.y >= this.player.y !== front) return;
    const [every, flapFor] = NEMESIS_FLAP;
    const flapping = this.time % every < flapFor && Math.floor(this.time * 12) % 2;
    const sprite = BIRD_SPRITES[n.bird][this.player.x < n.x ? 'left' : 'right'][flapping ? 'flap' : 'perched'];
    // Twice the size of an ordinary bird, centered on its tile with its feet (row 12) near the bottom.
    const x = n.x * TILE - camX - TILE / 2;
    const y = n.y * TILE - camY + 14 - 26;
    ctx.drawImage(sprite, Math.round(x), Math.round(y), 32, 32);
  }

  /** Called after each completed step. Returns true if it started a transition. */
  onStep() {
    const p = this.player;
    const warp = this.map.warps.find((w) => w.x === p.x && w.y === p.y);
    if (warp) {
      this.game.transition(() => this.loadMap(warp.to, warp.toX, warp.toY, warp.facing ?? p.facing));
      return true;
    }
    this.rememberLocation();
    return false;
  }

  /** Save where you're standing, so the next visit starts here (never on a warp: loadMap saves where it lands). */
  rememberLocation() {
    const p = this.player;
    this.game.location = { map: this.map.id, x: p.x, y: p.y, facing: p.facing, at: Date.now() };
    saveLocation(this.game.location);
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
    const { phase, weather } = this.game;
    if (this.panes.length) tintPanes(ctx, phase, this.panes.map((r) => ({ ...r, x: r.x - camX, y: r.y - camY })));

    this.npcs.draw(ctx, camX, camY, false, this.time);
    this.birds.draw(ctx, camX, camY, false, this.time);
    this.drawNemesis(ctx, camX, camY, false);

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

    this.npcs.draw(ctx, camX, camY, true, this.time);
    this.birds.draw(ctx, camX, camY, true, this.time);
    this.drawNemesis(ctx, camX, camY, true);
    // Collectibles stay hidden: all you see is their tell (stink, music) rising off them, over whatever's in front.
    for (const c of this.collectibles) TELLS[c.tell ?? 'stench'](ctx, c.x * TILE - camX, c.y * TILE - camY, this.time);

    if (this.map.dark) {
      // The lantern flickers a little.
      const r = LANTERN * TILE + Math.sin(this.time * 9) * 1.5 + Math.sin(this.time * 23) * 0.8;
      const lantern = { x: px + TILE / 2, y: py + TILE / 2, r };
      drawDarkness(ctx, [lantern, ...this.lights].map((l) => ({ ...l, x: l.x - camX, y: l.y - camY })));
    } else if (!this.map.indoor) {
      // Caves keep their own darkness, and indoors the light never changes.
      const lights = this.lights.map((l) => ({ ...l, x: l.x - camX, y: l.y - camY }));
      drawLighting(ctx, phase, { weather, time: this.time, lights, camX, camY });
    }

    const target = !this.dialog && !this.rest && this.birds.target(...DIRS[p.facing]);
    if (target) {
      this.birds.drawTarget(ctx, target, camX, camY);
      drawBox(ctx, 4, VIEW_H - 22, 80, 18);
      drawText(ctx, 'A: PHOTO', 12, VIEW_H - 17);
    }

    // The banner says where you are, and in small print the time of day and weather.
    if (this.bannerTime > 0) {
      const when = weather === 'clear' ? phase : `${phase}, ${weather}`;
      const w = Math.max(this.map.name.length * 8, when.length * 4) + 16;
      drawBox(ctx, 4, 4, w, 28);
      drawText(ctx, this.map.name, 12, 9);
      drawTinyText(ctx, when, 12, 20);
    }
    drawClock(ctx, phase);

    if (this.rest) return this.drawRest(ctx);
    if (this.dialog) {
      const { pages, page } = this.dialog;
      drawDialog(ctx, pages[page], page < pages.length - 1, this.time);
    }
  }
}

/** A wait in ms as '1H 20M' or, with `seconds`, a countdown like '1:20:05'. */
function formatWait(ms, seconds) {
  const s = Math.ceil(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60;
  if (seconds) return `${h}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  return h ? `${h}H ${m}M` : `${Math.max(1, m)}M`;
}

let shade = null; // reused offscreen canvas for drawDarkness

/** Cover the screen in darkness, with soft holes cut out at each light ({ x, y, r } in screen px). */
function drawDarkness(ctx, lights) {
  shade ??= Object.assign(document.createElement('canvas'), { width: VIEW_W, height: VIEW_H });
  const s = shade.getContext('2d');
  s.globalCompositeOperation = 'source-over';
  s.clearRect(0, 0, VIEW_W, VIEW_H);
  s.fillStyle = DARKNESS;
  s.fillRect(0, 0, VIEW_W, VIEW_H);
  s.globalCompositeOperation = 'destination-out';
  for (const { x, y, r } of lights) {
    if (x + r < 0 || y + r < 0 || x - r > VIEW_W || y - r > VIEW_H) continue;
    const g = s.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.6, 'rgba(0,0,0,0.95)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    s.fillStyle = g;
    s.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.drawImage(shade, 0, 0);
}

function cameraAxis(playerPx, mapPx, viewPx) {
  if (mapPx <= viewPx) return (mapPx - viewPx) / 2;
  const centered = playerPx + TILE / 2 - viewPx / 2;
  return Math.max(0, Math.min(mapPx - viewPx, centered));
}
