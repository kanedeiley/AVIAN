// A bird-watching voyage (data/voyages.js). The boat sails out and makes a few
// stops. At each stop a flock gathers around the boat, some bobbing on the
// water and some gliding overhead; birds come and go while you watch. Press
// left/right to pick one and A to photograph it (the usual photo minigame, on
// the ocean backdrop). You only get one bird per stop, so choose well: the
// panel says when a species isn't in your journal yet. A bird showing '?' is
// about to leave and is restless in the photo too. B heads back early.
import { VIEW_W } from '../config.js';
import { BIRDS } from '../data/birds.js';
import { VOYAGES } from '../data/voyages.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { input } from '../input.js';
import { drawBox, drawText, drawDialog, paginate } from '../gfx/ui.js';
import { drawOcean, drawWater } from '../gfx/ocean.js';
import { PhotoScene } from './photo.js';
import { pickSpecies } from '../time.js';
import { drawLighting, tintSky } from '../gfx/lighting.js';

const HORIZON = 44;
const SEA_BOTTOM = 116;
const RAIL_Y = 106;        // the boat's railing along the bottom of the view
const SAIL_TIME = 2;       // seconds sailing between stops
const SAIL_SPEED = 60;     // how fast the water slides by while sailing (px/s)
const STAY = [10, 22];     // seconds a bird hangs around the boat
const RESTLESS = 4;        // with this little time left it shows '?' and is jumpy in the photo
const REFILL = [1.5, 4];   // seconds until a new bird joins after one leaves
const ARRIVE_TIME = 1.2;
const LEAVE_TIME = 1.2;
const FLYING = 0.35;       // share of birds gliding overhead instead of floating
const NEW_COLOR = '#d05040';

const rand = (a, b) => a + Math.random() * (b - a);

export class VoyageScene {
  /** `returnTo` is the Overworld, left standing on the pier. */
  constructor(game, voyageId, returnTo) {
    this.game = game;
    this.returnTo = returnTo;
    this.voyage = VOYAGES[voyageId];
    this.time = 0;
    this.drift = 0;
    this.stop = 0;   // stops finished so far
    this.birds = [];
    this.selected = null;
    this.startSailing();
  }

  startSailing() {
    this.phase = 'sail'; // 'sail' -> 'watch' (-> 'confirm') -> ... -> 'end'
    this.phaseTime = 0;
    this.birds = [];
    this.selected = null;
    this.refill = null;
  }

  arrive() {
    this.phase = 'watch';
    for (let i = 0; i < this.voyage.flock; i++) this.spawn(i * 0.5);
  }

  /** Back from the photo minigame: on to the next stop, or home. */
  resume() {
    this.stop++;
    if (this.stop < this.voyage.stops) this.startSailing();
    else this.end(['That was the last stop!', 'The boat heads back to the pier.']);
  }

  end(lines) {
    this.phase = 'end';
    this.dialog = { pages: paginate(lines), page: 0 };
  }

  spawn(delay = 0) {
    const id = pickSpecies(this.voyage, this.game.phase, this.game.weather);
    const flying = Math.random() < FLYING;
    const depth = Math.random();
    const scale = flying ? (Math.random() < 0.5 ? 1 : 2) : depth > 0.55 ? 2 : 1;
    // y is where its feet are; keep fliers' heads below the top of the view.
    const y = flying ? rand(6, 16) + 13 * scale : HORIZON + 14 + depth * 44;
    // Try a few spots so birds don't land on top of each other.
    let x = rand(24, VIEW_W - 24);
    for (let i = 0; i < 10 && this.birds.some((b) => Math.abs(b.x - x) < 20 && Math.abs(b.y - y) < 12); i++) {
      x = rand(24, VIEW_W - 24);
    }
    const vx = (flying ? rand(25, 45) : rand(3, 8)) * (Math.random() < 0.5 ? -1 : 1);
    this.birds.push({
      id, flying, x, y, scale, vx, facing: Math.sign(vx), phase: rand(0, 6),
      state: 'arrive', t: 0, delay, stay: rand(...STAY),
    });
  }

  selectable(b) {
    return b.state === 'here';
  }

  update(dt) {
    this.time += dt;
    this.phaseTime += dt;
    this.drift += dt * (this.phase === 'sail' ? SAIL_SPEED : 4);
    if (this.phase === 'sail' && this.phaseTime >= SAIL_TIME) this.arrive();
    if (this.phase === 'end') return this.updateEnd();
    if (this.phase === 'confirm') return this.updateConfirm();

    this.updateBirds(dt);
    if (this.phase !== 'watch') return;

    if (!this.selected || !this.selectable(this.selected)) this.selectNearest();
    if (input.wasPressed('left')) this.cycle(-1);
    if (input.wasPressed('right')) this.cycle(1);

    if (input.wasPressed('b')) {
      this.phase = 'confirm';
      return;
    }
    const b = this.selected;
    if (input.wasPressed('a') && b) {
      const alert = b.stay < RESTLESS ? 0.5 : 0;
      this.game.transition(() => {
        this.birds = this.birds.filter((other) => other !== b);
        this.game.setScene(new PhotoScene(this.game, b.id, this, alert, 'ocean'));
      });
    }
  }

  updateBirds(dt) {
    for (const b of this.birds) {
      if (b.delay > 0) {
        b.delay -= dt;
        continue;
      }
      b.t += dt;
      if (b.state === 'arrive' && b.t >= ARRIVE_TIME) Object.assign(b, { state: 'here', t: 0 });
      if (b.state === 'here' && (b.stay -= dt) <= 0) Object.assign(b, { state: 'leave', t: 0 });

      // Paddle or glide back and forth, turning at the edges.
      b.x += b.vx * dt;
      const edge = b.flying ? 12 : 20;
      if ((b.x < edge && b.vx < 0) || (b.x > VIEW_W - edge && b.vx > 0)) b.vx = -b.vx;
      b.facing = Math.sign(b.vx);
    }

    const before = this.birds.length;
    this.birds = this.birds.filter((b) => !(b.state === 'leave' && b.t >= LEAVE_TIME));
    if (this.phase !== 'watch') return;
    if (this.birds.length < before && this.refill === null) this.refill = rand(...REFILL);
    if (this.refill !== null && (this.refill -= dt) <= 0) {
      this.refill = null;
      if (this.birds.length < this.voyage.flock) this.spawn();
      if (this.birds.length < this.voyage.flock) this.refill = rand(...REFILL);
    }
  }

  /** Select the bird closest to the last selection (or the middle of the view). */
  selectNearest() {
    const from = this.selected?.x ?? VIEW_W / 2;
    const options = this.birds.filter((b) => this.selectable(b));
    options.sort((a, b) => Math.abs(a.x - from) - Math.abs(b.x - from));
    this.selected = options[0] ?? null;
  }

  /** Move the selection to the next bird left (-1) or right (1), wrapping around. */
  cycle(dir) {
    const options = this.birds.filter((b) => this.selectable(b)).sort((a, b) => a.x - b.x);
    if (!options.length) return;
    const i = options.indexOf(this.selected);
    this.selected = options[(i + dir + options.length) % options.length];
  }

  updateConfirm() {
    if (input.wasPressed('a')) this.end(['The boat turns for home.']);
    else if (input.wasPressed('b')) this.phase = 'watch';
  }

  updateEnd() {
    if (!input.wasPressed('a') && !input.wasPressed('b')) return;
    this.dialog.page++;
    if (this.dialog.page >= this.dialog.pages.length) {
      this.dialog.page = this.dialog.pages.length - 1;
      this.game.transition(() => this.game.setScene(this.returnTo));
    }
  }

  // ---------- drawing ----------

  /** Where a bird is on screen: its feet's x/y, after bobbing, arriving or leaving. */
  screenPos(b, rock) {
    let x = b.x;
    let y = b.y + rock;
    if (b.flying) y += Math.sin(this.time * 1.5 + b.phase) * 3;
    else y += Math.round(Math.sin(this.time * 2 + b.phase));
    if (b.state === 'arrive') {
      const p = 1 - b.t / ARRIVE_TIME;
      x -= p * 60 * b.facing;
      y -= p * 70;
    } else if (b.state === 'leave') {
      const q = b.t / LEAVE_TIME;
      x += q * 80 * b.facing;
      y -= q * q * 120;
    }
    return { x: Math.round(x), y: Math.round(y) };
  }

  draw(ctx) {
    // The boat rocks gently, so the whole sea moves a pixel or two.
    const rock = Math.round(Math.sin(this.time * 1.2) * 1.5);
    drawOcean(ctx, this.time, HORIZON + rock, SEA_BOTTOM, this.drift);
    const { phase, weather } = this.game;
    tintSky(ctx, phase, 0, 0, VIEW_W, HORIZON + rock);

    const visible = this.birds.filter((b) => b.delay <= 0).sort((a, b) => a.y - b.y);
    for (const b of visible) this.drawBird(ctx, b, rock);
    if (this.phase === 'watch' && this.selected) this.drawTarget(ctx, this.selected, rock);

    this.drawRail(ctx);
    drawLighting(ctx, phase, { weather, time: this.time, h: SEA_BOTTOM });

    if (this.phase === 'end') {
      const { pages, page } = this.dialog;
      drawDialog(ctx, pages[page], page < pages.length - 1, this.time);
    } else if (this.phase === 'confirm') {
      drawDialog(ctx, ['Head back to the pier?', 'A:YES  B:NO']);
    } else {
      this.drawPanel(ctx);
    }
  }

  drawBird(ctx, b, rock) {
    const { x, y } = this.screenPos(b, rock);
    const s = b.scale;
    const airborne = b.flying || b.state !== 'here';
    const pose = airborne && Math.floor(this.time * 8 + b.phase) % 2 ? 'flap' : 'perched';
    const sprite = BIRD_SPRITES[b.id][b.facing < 0 ? 'left' : 'right'][pose];
    // The art's feet sit on row 13 of 16.
    const left = x - 8 * s;
    const top = y - 13 * s;
    ctx.drawImage(sprite, left, top, 16 * s, 16 * s);

    // A floating bird sits low in the water: redraw the sea over its feet.
    if (!airborne) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(left, y - 2 * s, 16 * s, 3 * s);
      ctx.clip();
      drawWater(ctx, this.time, HORIZON + rock, SEA_BOTTOM, this.drift);
      ctx.restore();
    }

    if (b.state === 'leave') drawText(ctx, '!', x - 3, top - 4);
    else if (b.state === 'here' && b.stay < RESTLESS) drawText(ctx, '?', x - 3, top - 4);
  }

  /** Viewfinder corners around the selected bird. */
  drawTarget(ctx, b, rock) {
    const { x, y } = this.screenPos(b, rock);
    const s = b.scale;
    const l = x - 6 * s - 2, t = y - 10 * s - 2, r = x + 6 * s + 2, btm = y + 2;
    const len = 2 + 2 * s;
    ctx.fillStyle = '#f8f8f8';
    for (const [cx, cy, sx, sy] of [[l, t, 1, 1], [r, t, -1, 1], [l, btm, 1, -1], [r, btm, -1, -1]]) {
      ctx.fillRect(sx > 0 ? cx : cx - len, sy > 0 ? cy : cy - 1, len, 1);
      ctx.fillRect(sx > 0 ? cx : cx - 1, sy > 0 ? cy : cy - len, 1, len);
    }
  }

  /** The boat's wooden railing across the bottom of the view. */
  drawRail(ctx) {
    ctx.fillStyle = '#5a3818';
    for (let x = 6; x < VIEW_W; x += 28) ctx.fillRect(x, RAIL_Y, 4, SEA_BOTTOM - RAIL_Y);
    ctx.fillRect(0, RAIL_Y, VIEW_W, 4);
    ctx.fillStyle = '#8a5a30';
    ctx.fillRect(0, RAIL_Y, VIEW_W, 2);
  }

  drawPanel(ctx) {
    drawBox(ctx, 0, 116, VIEW_W, 44);
    const { stops } = this.voyage;

    if (this.phase === 'sail') {
      drawText(ctx, this.stop === 0 ? 'Leaving the pier...' : 'Sailing on...', 12, 126);
      drawText(ctx, `Next: stop ${this.stop + 1} of ${stops}`, 12, 142);
      return;
    }

    const where = `STOP ${this.stop + 1}/${stops}`;
    drawText(ctx, where, VIEW_W - 8 - where.length * 8, 125);
    const b = this.selected;
    if (b) {
      const name = BIRDS[b.id].name;
      drawText(ctx, name, 10, 125);
      if (!(b.id in this.game.journal)) drawText(ctx, 'NEW!', 18 + name.length * 8, 125, NEW_COLOR);
    } else {
      drawText(ctx, 'Watching...', 10, 125);
    }
    drawText(ctx, '<>:PICK A:PHOTO B:DOCK', 10, 143);
  }
}
