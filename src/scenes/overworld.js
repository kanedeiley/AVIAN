// Walking around a map: grid movement, collisions, warps, signs, boats you can
// book a voyage on (see voyage.js), trains you ride to another station (see
// train.js), the birds you sneak up on (see fieldBirds.js),
// the nemesis bird (or a rival's bird) guarding its perch (see nemesis.js), and the collectibles
// hidden around (see data/collectibles.js). Outdoors the light follows the
// real time of day and weather (time.js, gfx/lighting.js), and beds and
// benches let you rest until it's another time of day. Shopkeepers sell
// gear (scenes/shop.js), which you use from your bag: see useItem().
import { TILE, VIEW_W, VIEW_H, STEP_TIME } from '../config.js';
import { getMap, doorTo } from '../maps/index.js';
import { TILES } from '../assets/tiles.js';
import { findBanks } from '../assets/banks.js';
import { lookSprites } from '../assets/player.js';
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
import { TrainScene } from './train.js';
import { NemesisScene } from './nemesis.js';
import { ShopScene, BagScene } from './shop.js';
import { VOYAGES } from '../data/voyages.js';
import { DIALOGUE } from '../data/dialogue.js';
import { ITEMS } from '../data/items.js';
import { ITEM_SPRITES, BIKE_SPRITES, SLIDE_SPRITES } from '../assets/items.js';
import { saveMoney, saveLocation } from '../save.js';
import { perchNeeds, perchOn, perchBeaten, toggleWear, setFlag, collectiblesOn, collect, warpOpen, spendItem, shown } from '../progress.js';
import { timeUntil } from '../time.js';
import { drawLighting, tintPanes, drawClock, snowyWeather } from '../gfx/lighting.js';
import { REGIONS } from '../data/regions.js';
import { drawTipsy } from '../gfx/tipsy.js';

const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const TURN_DELAY = 0.09; // a quick tap turns in place instead of walking
const LANTERN = 4.5;     // tiles your lantern lights up on a `dark` map
const DARKNESS = 'rgba(10,8,20,0.9)';
const DIM_GLOW = 2.5;  // tiles of light around you in a `dim` room
const PERCH_FLAP = [3, 0.4]; // a nemesis (or rival's bird) on its perch flaps for 0.4s every 3s
const REST_UNTIL = ['dawn', 'dusk', 'night']; // what a bed or bench lets you rest until
const REST_DARK = 0.85;        // how dark the screen gets while you rest
const SLIDE_START = 1;         // times walking speed, the first step down a slope
const SLIDE_ACCEL = 0.1;       // faster with each step after that, up to the gear's `top`
const SLIDE_SLOW = 0.6;        // holding up: you dig in and ease down to this crawl
const SLIDE_BRAKE = 0.3;       // speed lost per step while you hold up
const MOGUL_SPEED = 1.1;       // moguls slow you to this, at most
const JUMP_SPEED = 1.3;        // how fast you have to be going to get air off a jump
const AIR_HEIGHT = 12;         // px you fly up off a jump
const AIR_SLOW = 0.6;          // the jump covers two tiles in one step, so it goes at this share of your speed
const CRASH_TIME = 1;          // seconds you tumble in the snow after a wipeout, before you get up
const SHOUT_TIME = 1.2;        // seconds WIPEOUT! (or a trick's name) floats up over you
const GEAR_WALK = 0.75;        // walking in ski boots, off the slopes
const GEAR_LIFT = 2;           // px you stand up on your skis
const TIPSY_FADE = 3;          // seconds a beer takes to come on (and to wear off)
const STUMBLE = 0.2;           // chance a step lurches sideways while fully tipsy
const SPIN = ['down', 'left', 'up', 'right']; // the way you face, turn by turn, spinning in the air
const SIDEWAYS = { up: ['left', 'right'], down: ['left', 'right'], left: ['up', 'down'], right: ['up', 'down'] };

export class Overworld {
  constructor(game, mapId, x, y, facing = 'down', back = null) {
    this.game = game;
    this.time = 0;
    this.back = back; // where a `back` warp takes you: the tile you took your last warp from
    this.riding = false; // on your bike
    this.gear = null;    // skis on your feet (data/items.js `slide`), or null
    this.slide = { speed: 0, air: false, trick: false, snap: false, crash: 0, shout: null }; // sliding down a slope: see slideStep
    this.inUse = {};     // item id -> seconds until it wears off (binoculars)
    this.player = { x, y, facing, moving: false, progress: 0, dx: 0, dy: 0, steps: 0, walking: false, turnTimer: 0 };
    this.loadMap(mapId, x, y, facing);
  }

  loadMap(id, x, y, facing) {
    this.map = getMap(id);
    if (this.map.indoor) this.riding = false; // you leave your bike at the door
    if (this.map.indoor || !REGIONS[this.map.region].snowy) this.gear = null; // and you carry your skis inside
    this.slide.speed = 0;
    this.snowy = Boolean(REGIONS[this.map.region].snowy); // winter: snowfall, and photos in the snow
    Object.assign(this.player, { x, y, facing, moving: false, progress: 0 });
    this.perch = perchOn(this.game, id); // a nemesis bird, or a rival's (data/rivals.js)
    this.goneProps = this.map.props.filter((o) => !shown(this.game, o)); // props only there `after`/`until` something
    this.banks = this.map.banks ? findBanks(this.map) : []; // muddy edges where water meets land (assets/banks.js)
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
    const lock = this.lockAt(x, y);
    if (lock) return TILES[lock.tile];
    // A prop that isn't there right now (`after`/`until`): what's under it.
    const gone = this.goneProps.find((o) => x >= o.x && x < o.x + o.w && y >= o.y && y < o.y + o.h);
    return TILES[gone ? gone.under[y - gone.y][x - gone.x] : this.map.grid[y][x]];
  }

  /** The `locked` part of a warp (or a gate) on this tile that's still shut, if any. */
  lockAt(x, y) {
    const warp = this.map.warps.find((w) => w.locked && w.x === x && w.y === y);
    if (warp) return !warpOpen(this.game, warp) ? warp.locked : null;
    const gate = this.map.gates.find((g) => g.x === x && g.y === y);
    return gate && !warpOpen(this.game, gate) ? gate.locked : null;
  }

  isBlocked(x, y) {
    const tile = this.tileAt(x, y);
    return !tile || tile.solid || this.npcs.occupies(x, y) || this.perchAt(x, y);
  }

  /** True if the (not yet beaten) nemesis or rival's bird perches on this tile. */
  perchAt(x, y) {
    const n = this.perch;
    return Boolean(n && n.x === x && n.y === y && !perchBeaten(this.game, n));
  }

  update(dt) {
    this.time += dt;
    this.bannerTime = Math.max(0, this.bannerTime - dt);
    this.tickItems(dt);
    if (this.slide.shout && (this.slide.shout.time -= dt) <= 0) this.slide.shout = null;
    const p = this.player;
    if (this.rest) return this.updateRest(dt);
    this.birds.update(dt);
    this.npcs.update(dt);
    // Someone walking over to say hello: wait for them (see Npcs.greet).
    if (this.npcs.greeter && !this.dialog) {
      p.walking = false;
      return;
    }
    // Wiped out: tumble in the snow for a moment, then get up beside whatever you hit.
    if (this.slide.crash) {
      p.walking = false;
      if ((this.slide.crash = Math.max(0, this.slide.crash - dt)) === 0) this.getUp();
      return;
    }

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
        if (this.dialog.page >= this.dialog.pages.length) {
          this.dialog = null;
          d.then?.(); // anything that happens once you've read it all
        }
      }
      return;
    }

    if (p.moving) {
      // In the air off a jump, A does a spin; skiing along, it snaps a bird at the next tile.
      if (this.slide.air && input.wasPressed('a')) this.slide.trick = true;
      else if (this.slide.speed && input.wasPressed('a')) this.slide.snap = true;
      p.progress += (dt / STEP_TIME) * this.speed();
      if (p.progress < 1) return;
      if (this.slide.air) this.land();
      p.x += p.dx;
      p.y += p.dy;
      p.moving = false;
      p.progress = 0;
      p.steps++;
      if (this.onStep()) return;
      // otherwise fall through so held keys keep walking without a hitch
    }

    // I: your bag (no fade: it opens over the map).
    if (input.wasPressed('bag')) {
      p.walking = false;
      this.game.setScene(new BagScene(this.game, this));
      return;
    }

    // M: the world map. J: the journal.
    if (input.wasPressed('map') || input.wasPressed('journal')) {
      const Screen = input.wasPressed('map') ? WorldMapScene : JournalScene;
      p.walking = false;
      this.game.transition(() => this.game.setScene(new Screen(this.game, this)));
      return;
    }

    // Skiing past a bird, A snaps the nearest one, whichever way it is (and you stop to take it).
    if (this.slide.speed && (this.slide.snap || input.wasPressed('a'))) {
      this.slide.snap = false;
      const bird = this.birds.nearest(this.photoRange());
      if (bird) {
        this.slide.speed = 0;
        p.walking = false;
        this.game.transition(() => {
          this.birds.remove(bird);
          this.game.setScene(new PhotoScene(this.game, bird.id, this, bird.alert, 'snow'));
        });
        return;
      }
    }

    // A: read the sign in front of you, or photograph the bird in front of you.
    if (input.wasPressed('a')) {
      const [dx, dy] = DIRS[p.facing];
      const sign = this.map.signs.find((s) => s.x === p.x + dx && s.y === p.y + dy && shown(this.game, s)) ?? this.lockAt(p.x + dx, p.y + dy);
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
      // Shopkeepers stand behind a `counter`: you talk to them across it.
      const npc = this.npcs.at(p.x + dx, p.y + dy) ?? (this.tileAt(p.x + dx, p.y + dy)?.counter ? this.npcs.at(p.x + 2 * dx, p.y + 2 * dy) : null);
      if (npc?.shop) {
        this.npcs.listen(npc);
        p.walking = false;
        this.game.setScene(new ShopScene(this.game, this, npc.shop, npc.text));
        return;
      }
      if (npc) {
        this.talkTo(npc);
        return;
      }
      if (this.perchAt(p.x + dx, p.y + dy)) {
        this.offerPerch();
        p.walking = false;
        return;
      }
      if (this.tileAt(p.x + dx, p.y + dy)?.rest) {
        const { phase } = this.game;
        this.offerRest(REST_UNTIL.filter((t) => t !== phase).sort((a, b) => timeUntil(a) - timeUntil(b)));
        p.walking = false;
        return;
      }
      const bird = this.birds.target(dx, dy, this.photoRange());
      if (bird) {
        p.walking = false;
        this.game.transition(() => {
          this.birds.remove(bird);
          this.game.setScene(new PhotoScene(this.game, bird.id, this, bird.alert, this.snowy ? 'snow' : 'field'));
        });
        return;
      }
    }

    // Skis on a slope: you slide downhill on your own.
    if (this.slideStep()) return;

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
    let [dx, dy] = DIRS[dir];
    // Tipsy, now and then a step lurches off to one side.
    if (Math.random() < STUMBLE * this.tipsy()) {
      const lurch = DIRS[SIDEWAYS[dir][Math.floor(Math.random() * 2)]];
      if (!this.isBlocked(p.x + lurch[0], p.y + lurch[1])) [dx, dy] = lurch;
    }
    if (this.isBlocked(p.x + dx, p.y + dy)) return;
    Object.assign(p, { moving: true, dx, dy, progress: 0 });
  }

  /** Talk to an NPC: their lines (`talk` or `text`), and any flag they give you. */
  talkTo(npc) {
    const p = this.player;
    this.npcs.listen(npc);
    // Pick the lines before setting the flag, so a first meeting says hello.
    const text = npc.talk ? DIALOGUE[npc.talk](this.game) : npc.text;
    if (npc.sets) setFlag(this.game, npc.sets);
    this.dialog = { pages: paginate(text), page: 0 };
    // Someone who `leaves` once you show them a photo of a bird: after they've had their say,
    // the screen fades, their flag is set, and they're gone (and anything that was there `until` it).
    const { leaves } = npc;
    if (leaves && this.game.journal[leaves.photo] && !this.game.progress.flags[leaves.flag]) {
      this.dialog.then = () => this.game.transition(() => {
        setFlag(this.game, leaves.flag);
        this.loadMap(this.map.id, p.x, p.y, p.facing);
      });
    }
    p.walking = false;
  }

  /** How tipsy you are (a `tipsy` item like beer), 0 to 1: it comes on over a couple of seconds and fades at the end. */
  tipsy() {
    const id = Object.keys(this.inUse).find((i) => ITEMS[i].tipsy);
    if (!id) return 0;
    const left = this.inUse[id];
    return Math.max(0, Math.min(1, left / TIPSY_FADE, (ITEMS[id].lasts - left) / TIPSY_FADE));
  }

  /**
   * On a `slope` tile with skis on, take the next step downhill (south), steering with
   * left/right; holding up digs in and slows you to a crawl. Speed builds up step by step to the
   * gear's `top`. Skis can `sidestep` around a tree. Off a `jump` with some speed, you fly two tiles in one step (A in the air: a
   * spin); `moguls` slow you down. Nowhere to go: a WIPEOUT (and you walk off it). Returns true if
   * it took the step.
   */
  slideStep() {
    const p = this.player;
    const s = this.slide;
    const gear = this.gear && ITEMS[this.gear].slide;
    const here = this.tileAt(p.x, p.y);
    if (!gear || !here?.slope) {
      s.speed = 0;
      return false;
    }
    const dir = input.dir();
    const braking = dir === 'up';
    const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
    // Off a jump: two tiles at once, if there's somewhere to land.
    const air = here.jump && s.speed >= JUMP_SPEED && !braking;
    const down = air ? 2 : 1;
    const tries = [...(dx ? [[dx, down]] : []), [0, down], ...(air ? [[0, 1]] : []), ...(dx && gear.sidestep ? [[dx, 0]] : [])];
    const step = tries.find(([sx, sy]) => !this.isBlocked(p.x + sx, p.y + sy));
    if (!step) {
      if (!s.speed) return false; // standing still: walk your way out of it
      this.shout(s.speed > SLIDE_START ? 'WIPEOUT!' : 'OOF!');
      Object.assign(s, { speed: 0, crash: CRASH_TIME });
      p.walking = false;
      return true;
    }
    s.speed = braking ? Math.max(SLIDE_SLOW, s.speed - SLIDE_BRAKE) : Math.min(gear.top, Math.max(SLIDE_START, s.speed + SLIDE_ACCEL));
    if (this.tileAt(p.x + step[0], p.y + step[1])?.moguls) s.speed = Math.min(s.speed, MOGUL_SPEED);
    s.air = step[1] === 2;
    s.trick = false;
    // You face downhill, or the way you turn.
    p.facing = step[0] < 0 ? 'left' : step[0] > 0 ? 'right' : 'down';
    p.walking = true;
    Object.assign(p, { moving: true, dx: step[0], dy: step[1], progress: 0 });
    return true;
  }

  /** Back on the snow after a jump: say so if you pulled off a spin. */
  land() {
    this.slide.air = false;
    if (this.slide.trick) this.shout(Math.random() < 0.5 ? '360!' : 'SPIN!');
    this.slide.trick = false;
  }

  /** Words that float up over you for a moment: WIPEOUT!, or a trick. */
  /** Up out of the snow after a wipeout: step aside onto the nearest open bit of the run, so you can carry on down. */
  getUp() {
    const p = this.player;
    const open = (x, y) => this.tileAt(x, y)?.slope && !this.isBlocked(x, y) && !this.isBlocked(x, y + 1);
    const dx = [1, -1, 2, -2, 3, -3].find((d) => open(p.x + d, p.y));
    if (dx) p.x += dx;
    p.facing = 'down';
  }

  /** A wipeout's mess at (x, y) on screen: a burst of snow, and your skis thrown off to one side. `t` runs 0-1. */
  drawCrash(ctx, x, y, t) {
    const skis = SLIDE_SPRITES[this.gear]?.right;
    if (skis) ctx.drawImage(skis, x + 4 + Math.round(Math.min(t, 0.4) * 20), y + 2);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.3;
      const r = 3 + t * 16;
      const sx = Math.round(x + 8 + Math.cos(a) * r), sy = Math.round(y + 12 + Math.sin(a) * r * 0.6 - t * 6);
      ctx.fillStyle = `rgba(104,112,140,${(1 - t) * 0.7})`;
      ctx.fillRect(sx + 1, sy + 1, 2, 2);
      ctx.fillStyle = `rgba(248,248,248,${1 - t})`;
      ctx.fillRect(sx, sy, 2, 2);
    }
  }

  shout(text) {
    this.slide.shout = { text, time: SHOUT_TIME };
  }

  /** How much faster than walking you're going: on the bike, sliding downhill, clomping in ski boots, or on foot with a coffee in you. */
  speed() {
    if (this.riding) return ITEMS.bike.speed;
    if (this.slide.speed) return this.slide.speed * (this.slide.air ? AIR_SLOW : 1);
    if (this.gear) return GEAR_WALK;
    return this.inUse.coffee ? ITEMS.coffee.walk : 1;
  }

  /** How far away (in tiles) you can photograph a bird: farther with binoculars. */
  photoRange() {
    return this.inUse.binoculars ? ITEMS.binoculars.range : undefined;
  }

  /** Count down items in use; say so when one wears off. */
  tickItems(dt) {
    for (const [id, left] of Object.entries(this.inUse)) {
      if ((this.inUse[id] = left - dt) > 0) continue;
      delete this.inUse[id];
      if (ITEMS[id].wornOff && !this.dialog) this.dialog = { pages: paginate(ITEMS[id].wornOff), page: 0 };
    }
  }

  /** Use an item from your bag (scenes/shop.js); returns what to tell you about it. */
  useItem(id) {
    const item = ITEMS[id];
    const p = this.player;
    if (item.ride) {
      if (this.map.indoor) return ['No riding indoors!'];
      this.riding = !this.riding;
      if (this.riding) this.gear = null;
      return [this.riding ? `You hop on your ${item.name}. Birds will hear you coming!` : `You get off your ${item.name}.`];
    }
    if (item.slide) {
      if (this.gear === id) {
        this.gear = null;
        return [`You take off your ${item.name}.`];
      }
      if (this.map.indoor || !this.snowy) return [`You need snow for your ${item.name}! Try the slopes at OKEMO.`];
      this.gear = id;
      this.riding = false;
      return [`${item.name} on! Now find a slope.`];
    }
    if (item.wear) {
      // Clothes go on over that part of your look (assets/player.js); use them again to take them off.
      return [toggleWear(this.game, id) ? `You put on the ${item.name}. Looking good!` : `You take off the ${item.name}.`];
    }
    if (this.inUse[id] || (item.feeds && this.birds.seed)) return [item.busy];
    if (item.feeds) {
      if (!this.map.birds) return ['There are no birds around here to feed.'];
      // On the ground in front of you, where you can see it (or at your feet, if that's blocked).
      const [dx, dy] = DIRS[p.facing];
      const open = !this.isBlocked(p.x + dx, p.y + dy);
      this.birds.scatterSeed(open ? p.x + dx : p.x, open ? p.y + dy : p.y, item.lasts);
    } else {
      this.inUse[id] = item.lasts;
    }
    if (item.kind === 'supply') spendItem(this.game, id);
    return item.used;
  }

  /** The big prop (see maps/index.js) covering this tile, if any. */
  propAt(x, y) {
    return this.map.props.find((o) => x >= o.x && x < o.x + o.w && y >= o.y && y < o.y + o.h && !this.goneProps.includes(o)) ?? null;
  }

  /** The captain's pitch, the fare, and a yes/no to board. Boarding pays the fare. */
  offerVoyage(id) {
    const voyage = VOYAGES[id];
    const { money } = this.game;
    const fare = voyage.price > 0 ? `The fare is $${voyage.price}. You have $${money}.` : 'The fare is $0 today!';
    if (money < voyage.price) {
      this.dialog = { pages: paginate([...voyage.pitch, fare, 'Good bird photos pay! Come back when you\'ve saved up.']), page: 0 };
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

  /** Face the nemesis (or rival's bird): it tells you what you still need, or asks if you're ready to fight. */
  offerPerch() {
    const n = this.perch;
    const needs = perchNeeds(this.game, n);
    if (needs.length) {
      this.dialog = { pages: paginate([...n.locked, 'To get close, you need to:', ...needs]), page: 0 };
      return;
    }
    const pages = paginate(n.challenge);
    pages.push([n.kind === 'rival' ? `Take ${n.name}'s challenge?` : 'Face your NEMESIS BIRD?', 'A:YES  B:NO']);
    this.dialog = {
      pages, page: 0,
      onYes: () => this.game.transition(() => this.game.setScene(new NemesisScene(this.game, n, this))),
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

  /** Under the clock: each item in use, with the seconds it has left. */
  drawItemTimers(ctx) {
    Object.entries(this.inUse).forEach(([id, left], i) => {
      const x = VIEW_W - 48, y = 28 + i * 24;
      drawBox(ctx, x, y, 44, 20);
      ctx.drawImage(ITEM_SPRITES[id], x + 2, y + 2);
      const secs = String(Math.ceil(left));
      drawText(ctx, secs, x + 40 - secs.length * 8, y + 6, left < 10 && Math.floor(this.time * 4) % 2 ? '#c03030' : undefined);
    });
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

  /** The nemesis (or rival's bird) on its perch, drawn in front of (`front`) or behind the player's row. */
  drawPerch(ctx, camX, camY, front) {
    const n = this.perch;
    if (!n || !this.perchAt(n.x, n.y) || n.y >= this.player.y !== front) return;
    const [every, flapFor] = PERCH_FLAP;
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
    const warp = this.map.warps.find((w) => w.x === p.x && w.y === p.y && shown(this.game, w));
    if (warp) {
      const facing = warp.facing ?? p.facing;
      const to = warp.to === 'back' ? this.wayBack(facing) : { map: warp.to, x: warp.toX, y: warp.toY };
      // Remember the tile you stepped onto the warp from, so a shared interior can send you back out the right door.
      const back = warp.to !== 'back' ? { map: this.map.id, x: p.x - p.dx, y: p.y - p.dy } : this.back;
      const go = () => {
        this.back = back;
        this.loadMap(to.map, to.x, to.y, facing);
      };
      // A `train` warp asks first, then rides (scenes/train.js) before you get off at the other end.
      if (warp.train) {
        p.walking = false;
        this.dialog = {
          pages: [[`Board the train to ${warp.train}?`, 'A:YES  B:NO']],
          page: 0,
          // A ride to or from a snowy region goes through the snow.
          onYes: () => this.game.transition(() => this.game.setScene(new TrainScene(this.game, warp.train, this, go, this.snowy || Boolean(REGIONS[getMap(warp.to).region].snowy)))),
        };
        return true;
      }
      // A warp that `ask`s first (the chairlift): yes takes you, no leaves you standing there.
      if (warp.ask) {
        p.walking = false;
        this.slide.speed = 0;
        this.dialog = { pages: [[warp.ask, 'A:YES  B:NO']], page: 0, onYes: () => this.game.transition(go) };
        return true;
      }
      this.game.transition(go);
      return true;
    }
    this.rememberLocation();
    return false;
  }

  /**
   * Where a `back` warp lands: the tile you came in from. Without one (an old
   * save, or a ?map= dev start), one step out of the first door into this map.
   */
  wayBack(facing) {
    if (this.back) return this.back;
    const door = doorTo(this.map.id);
    if (!door) throw new Error(`Map "${this.map.id}" has a 'back' warp, but no door leads into it`);
    const [dx, dy] = DIRS[facing];
    return { map: door.map, x: door.x + dx, y: door.y + dy };
  }

  /** Save where you're standing, so the next visit starts here (never on a warp: loadMap saves where it lands). */
  rememberLocation() {
    const p = this.player;
    this.game.location = { map: this.map.id, x: p.x, y: p.y, facing: p.facing, back: this.back, at: Date.now() };
    saveLocation(this.game.location);
  }

  /** Your walk cycle in the look you picked in the intro (rebuilt if it changes, e.g. signing in loads another). */
  playerSprites() {
    const look = this.game.progress.player?.look;
    if (!this.sprites || this.spritesLook !== look) {
      this.sprites = lookSprites(look);
      this.spritesLook = look;
    }
    return this.sprites;
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
    // A wipeout shakes the screen for a moment.
    const crash = this.slide.crash ? 1 - this.slide.crash / CRASH_TIME : null; // 0-1 through the tumble
    const shake = crash !== null && crash < 0.35 ? Math.round(Math.sin(this.time * 70) * 2) : 0;
    const camX = Math.round(cameraAxis(px, this.map.width * TILE, VIEW_W)) + shake;
    const camY = Math.round(cameraAxis(py, this.map.height * TILE, VIEW_H));

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    const x0 = Math.max(0, Math.floor(camX / TILE));
    const y0 = Math.max(0, Math.floor(camY / TILE));
    const x1 = Math.min(this.map.width, Math.ceil((camX + VIEW_W) / TILE));
    const y1 = Math.min(this.map.height, Math.ceil((camY + VIEW_H) / TILE));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        ctx.drawImage(this.frameOf(this.tileAt(x, y)), x * TILE - camX, y * TILE - camY);
      }
    }
    for (const b of this.banks) {
      if (b.x < x0 || b.x >= x1 || b.y < y0 || b.y >= y1) continue;
      for (const s of b.sprites) ctx.drawImage(s, b.x * TILE - camX, b.y * TILE - camY);
    }
    const { phase } = this.game;
    const weather = this.snowy ? snowyWeather(this.game.weather) : this.game.weather;
    if (this.panes.length) tintPanes(ctx, phase, this.panes.map((r) => ({ ...r, x: r.x - camX, y: r.y - camY })));

    this.npcs.draw(ctx, camX, camY, false, this.time);
    this.birds.draw(ctx, camX, camY, false, this.time);
    this.drawPerch(ctx, camX, camY, false);

    // Player. Spinning off a jump, you turn all the way around.
    // Wiping out, you tumble head over heels, then sit up.
    const tumbling = crash !== null && crash < 0.6;
    const spin = tumbling ? SPIN[Math.floor(crash * 12) % 4]
      : this.slide.air && this.slide.trick ? SPIN[Math.floor(p.progress * 8) % 4] : p.facing;
    const frames = this.playerSprites()[spin];
    let sprite = frames.stand;
    if (p.moving && p.progress < 0.5 && !this.riding && !this.slide.speed) sprite = p.steps % 2 ? frames.stepB : frames.stepA;
    // Skis go under your feet, and you stand up on them a little. Facing you, the ski tips come out in front of your boots.
    // In the air you rise and fall over your shadow; on moguls you bounce.
    const air = this.slide.air ? Math.round(Math.sin(p.progress * Math.PI) * AIR_HEIGHT)
      : tumbling ? Math.round(Math.sin((crash / 0.6) * Math.PI) * 6) : 0;
    const bump = p.moving && this.slide.speed && this.tileAt(p.x + p.dx, p.y + p.dy)?.moguls ? Math.round(Math.abs(Math.sin(p.progress * Math.PI * 2)) * 2) : 0;
    if (air) {
      ctx.fillStyle = 'rgba(40,48,80,0.25)';
      ctx.fillRect(Math.round(px - camX) + 3, Math.round(py - camY) + 13, 10, 3);
    }
    if (crash !== null) this.drawCrash(ctx, Math.round(px - camX), Math.round(py - camY), crash);
    // Mid-wipeout your skis have come off: they're lying in the snow beside you.
    const gear = this.gear && crash === null && SLIDE_SPRITES[this.gear][spin];
    const tipsFront = spin === 'down';
    const gx = Math.round(px - camX), gy = Math.round(py - camY) - air - bump;
    if (gear && !tipsFront) ctx.drawImage(gear, gx, gy);
    const lift = (this.gear ? GEAR_LIFT : 0) + air + bump;
    // People are taller than a tile: feet on the tile, head over the one above.
    ctx.drawImage(sprite, Math.round(px - camX), Math.round(py - camY) - (sprite.height - TILE) - lift);
    if (gear && tipsFront) ctx.drawImage(gear, gx, gy);
    if (this.riding) ctx.drawImage(BIKE_SPRITES[p.facing], Math.round(px - camX), Math.round(py - camY));

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
    this.drawPerch(ctx, camX, camY, true);

    // Overhead: things you walk under, like a covered bridge, go over everyone. You can see yourself through them.
    const overhead = this.tileAt(fx, fy)?.overSprite;
    if (overhead) ctx.globalAlpha = 0.55;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const over = this.tileAt(x, y).overSprite;
        if (over) ctx.drawImage(over, x * TILE - camX, y * TILE - camY);
      }
    }
    ctx.globalAlpha = 1;
    // Collectibles stay hidden: all you see is their tell (stink, music) rising off them, over whatever's in front.
    for (const c of this.collectibles) TELLS[c.tell ?? 'stench'](ctx, c.x * TILE - camX, c.y * TILE - camY, this.time);

    if (this.map.dark) {
      // The lantern flickers a little.
      const r = LANTERN * TILE + Math.sin(this.time * 9) * 1.5 + Math.sin(this.time * 23) * 0.8;
      const lantern = { x: px + TILE / 2, y: py + TILE / 2, r };
      drawDarkness(ctx, [lantern, ...this.lights].map((l) => ({ ...l, x: l.x - camX, y: l.y - camY })));
    } else if (this.map.dim) {
      // A dim room (a cellar bar): only its lamps, candles and neon light it, and a little glow around you so you can see your feet.
      const you = { x: px + TILE / 2, y: py + TILE / 2, r: DIM_GLOW * TILE };
      const lights = this.lights.map((l) => ({ ...l, r: l.flicker ? l.r + Math.sin(this.time * 11 + l.seed * 20) * 1.5 : l.r }));
      drawDarkness(ctx, [you, ...lights].map((l) => ({ ...l, x: l.x - camX, y: l.y - camY })), `rgba(14,6,4,${this.map.dim})`);
      drawWarmth(ctx, lights.map((l) => ({ ...l, x: l.x - camX, y: l.y - camY })));
    } else if (!this.map.indoor) {
      // Caves keep their own darkness, and indoors the light never changes.
      const lights = this.lights.map((l) => ({ ...l, x: l.x - camX, y: l.y - camY }));
      drawLighting(ctx, phase, { weather, time: this.time, lights, camX, camY });
    }
    const tipsy = this.tipsy();
    if (tipsy) drawTipsy(ctx, tipsy, this.time);
    const { shout } = this.slide;
    if (shout) {
      const x = Math.round(px - camX) + 8 - shout.text.length * 4, y = Math.round(py - camY) - 30 - Math.round((SHOUT_TIME - shout.time) * 8);
      drawText(ctx, shout.text, x + 1, y + 1, '#202028');
      drawText(ctx, shout.text, x, y, '#f8f8f8');
    }

    const target = !this.dialog && !this.rest && this.birds.target(...DIRS[p.facing], this.photoRange());
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
    this.drawItemTimers(ctx);

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
function drawDarkness(ctx, lights, darkness = DARKNESS) {
  shade ??= Object.assign(document.createElement('canvas'), { width: VIEW_W, height: VIEW_H });
  const s = shade.getContext('2d');
  s.globalCompositeOperation = 'source-over';
  s.clearRect(0, 0, VIEW_W, VIEW_H);
  s.fillStyle = darkness;
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

/** A soft amber glow around each light in a dim room, so lamplight looks warm, not just bright. */
function drawWarmth(ctx, lights) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const { x, y, r } of lights) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(120,60,10,0.35)');
    g.addColorStop(1, 'rgba(120,60,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.restore();
}

function cameraAxis(playerPx, mapPx, viewPx) {
  if (mapPx <= viewPx) return (mapPx - viewPx) / 2;
  const centered = playerPx + TILE / 2 - viewPx / 2;
  return Math.max(0, Math.min(mapPx - viewPx, centered));
}
