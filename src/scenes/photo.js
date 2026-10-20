// Photographing a bird. It hops along a branch; hold left/right to keep the
// viewfinder on it. The focus meter fills while it's in frame and drains when
// it isn't. Press A to snap: the fuller the meter, the better the photo.
// You get a few shots before you run out of film or the bird gets bored and
// flies off. The best shot is saved in game.journal (and in the browser).
//
// `alert` (0-1) is how nervous the bird already was when you raised the
// camera; a nervous bird runs out of patience up to twice as fast.
import { TILE, VIEW_W } from '../config.js';
import { BIRDS } from '../data/birds.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { TILES } from '../assets/tiles.js';
import { input } from '../input.js';
import { drawBox, drawText, drawDialog, paginate } from '../gfx/ui.js';
import { saveJournal } from '../save.js';

const BRANCH_Y = 92;      // top edge of the branch the bird stands on
const FRAME_W = 48;       // viewfinder size
const FRAME_H = 44;
const ON_TARGET = 10;     // how far the bird can be from the viewfinder's center and still be in frame
const LENS_SPEED = 100;   // px/s
const MIN_X = 24;         // range of the bird's center along the branch
const MAX_X = VIEW_W - 24;
const SHOTS = 3;
const FLASH_TIME = 0.25;
const FOCUS_DRAIN = 1.5;  // focus lost per second while the bird is out of frame
const NERVOUS_TIME = 2.5; // show '!' when the bird has this little patience left
const INK = '#283050';

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class PhotoScene {
  constructor(game, birdId, returnTo, alert = 0) {
    this.game = game;
    this.returnTo = returnTo;
    this.id = birdId;
    this.species = BIRDS[birdId];
    this.sprites = BIRD_SPRITES[birdId];
    this.time = 0;

    // phase: 'arrive' -> 'aim' -> 'leave' -> 'result'
    this.phase = 'arrive';
    this.bird = { x: VIEW_W + 20, air: 48, targetX: rand(90, 180), facing: -1, pause: 0, hop: 0 };
    this.lens = VIEW_W / 2;
    this.focus = 0;
    this.patience = this.species.patience * (1 - alert / 2);
    this.shots = SHOTS;
    this.best = 0;
    this.flash = 0;
    this.popup = null;
  }

  update(dt) {
    this.time += dt;
    this.flash = Math.max(0, this.flash - dt);
    if (this.popup && (this.popup.time -= dt) <= 0) this.popup = null;

    if (this.phase === 'arrive') this.updateArrive(dt);
    else if (this.phase === 'aim') this.updateAim(dt);
    else if (this.phase === 'leave') this.updateLeave(dt);
    else if (this.phase === 'result') this.updateResult();
  }

  updateArrive(dt) {
    const b = this.bird;
    const startX = VIEW_W + 20;
    b.x = Math.max(b.targetX, b.x - 140 * dt);
    b.air = 48 * ((b.x - b.targetX) / (startX - b.targetX));
    if (b.x === b.targetX) {
      b.pause = rand(...this.species.pause);
      b.targetX = this.pickTarget();
      this.phase = 'aim';
    }
  }

  updateAim(dt) {
    if (input.wasPressed('b')) return this.startLeaving();

    if (input.isDown('left')) this.lens -= LENS_SPEED * dt;
    if (input.isDown('right')) this.lens += LENS_SPEED * dt;
    this.lens = clamp(this.lens, FRAME_W / 2, VIEW_W - FRAME_W / 2);

    this.moveBird(dt);

    if (this.inFrame()) this.focus = Math.min(1, this.focus + dt / this.species.focusTime);
    else this.focus = Math.max(0, this.focus - dt * FOCUS_DRAIN);

    if (input.wasPressed('a') && this.shots > 0 && this.flash === 0) this.snap();

    this.patience -= dt;
    if (this.patience <= 0 || (this.shots === 0 && this.flash === 0)) this.startLeaving();
  }

  /** Hop toward a target, sit for a moment, pick a new target. */
  moveBird(dt) {
    const b = this.bird;
    if (b.pause > 0) {
      b.pause -= dt;
      return;
    }
    const step = this.species.speed * dt;
    const dx = b.targetX - b.x;
    if (Math.abs(dx) <= step) {
      b.x = b.targetX;
      b.hop = 0;
      b.pause = rand(...this.species.pause);
      b.targetX = this.pickTarget();
    } else {
      b.x += Math.sign(dx) * step;
      b.facing = Math.sign(dx);
      b.hop += step;
    }
    b.air = Math.abs(Math.sin(b.hop / 7)) * 5;
  }

  pickTarget() {
    const { x } = this.bird;
    const reach = this.species.hop;
    let target;
    do target = clamp(x + rand(-reach, reach), MIN_X, MAX_X);
    while (Math.abs(target - x) < 12);
    return target;
  }

  inFrame() {
    return Math.abs(this.bird.x - this.lens) <= ON_TARGET;
  }

  snap() {
    const stars = this.focus >= 1 ? 3 : this.focus >= 0.6 ? 2 : this.focus >= 0.25 ? 1 : 0;
    this.best = Math.max(this.best, stars);
    this.shots--;
    this.flash = FLASH_TIME;
    this.popup = { text: ['BLURRY...', 'OKAY SHOT', 'GOOD SHOT!', 'PERFECT!'][stars], time: 1 };
    // The shutter startles the bird: it loses focus, moves right away and loses some patience.
    this.focus *= 0.3;
    this.bird.pause = 0;
    this.bird.targetX = this.pickTarget();
    this.patience -= 1.5;
  }

  startLeaving() {
    this.phase = 'leave';
    this.bird.facing = this.bird.x < VIEW_W / 2 ? -1 : 1;
  }

  updateLeave(dt) {
    const b = this.bird;
    b.x += 120 * b.facing * dt;
    b.air += 80 * dt;
    if (b.air > BRANCH_Y + 20) this.showResult();
  }

  showResult() {
    const { name } = this.species;
    const journal = this.game.journal;
    const previous = journal[this.id] ?? 0;
    const lines = [];
    if (this.best === 0) {
      lines.push(`The ${name} got away without a clear photo.`);
    } else {
      lines.push(`You got a ${this.best}-star photo of the ${name}!`);
      if (!Object.keys(journal).length) lines.push(`New journal entry: ${name}!`, 'Press J any time to open your journal.');
      else if (!(this.id in journal)) lines.push(`New journal entry: ${name}!`);
      else if (this.best > previous) lines.push(`Your best ${name} photo yet!`);
    }
    if (this.best > previous) {
      journal[this.id] = this.best;
      saveJournal(journal);
    }
    this.phase = 'result';
    this.dialog = { pages: paginate(lines), page: 0 };
  }

  updateResult() {
    if (!input.wasPressed('a') && !input.wasPressed('b')) return;
    this.dialog.page++;
    if (this.dialog.page >= this.dialog.pages.length) {
      this.dialog.page = this.dialog.pages.length - 1;
      this.game.transition(() => this.game.setScene(this.returnTo));
    }
  }

  // ---------- drawing ----------

  draw(ctx) {
    this.drawBackground(ctx);
    if (this.phase !== 'result') this.drawBird(ctx);
    if (this.phase === 'aim') this.drawViewfinder(ctx);

    if (this.phase === 'result') {
      const { pages, page } = this.dialog;
      drawDialog(ctx, pages[page], page < pages.length - 1, this.time);
    } else {
      this.drawPanel(ctx);
    }

    if (this.flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${this.flash / FLASH_TIME})`;
      ctx.fillRect(0, 0, VIEW_W, 116);
    }
  }

  drawBackground(ctx) {
    ctx.fillStyle = '#b8e0f8';
    ctx.fillRect(0, 0, VIEW_W, 116);
    for (let x = 0; x < VIEW_W; x += TILE) {
      ctx.drawImage(TILES.tree.sprites[0], x, 24);
      for (let y = 40; y < 116; y += TILE) ctx.drawImage(TILES.grass.sprites[0], x, y);
    }
    // The branch
    ctx.fillStyle = '#5a3818';
    ctx.fillRect(0, BRANCH_Y, VIEW_W, 6);
    ctx.fillStyle = '#8a5a30';
    ctx.fillRect(0, BRANCH_Y, VIEW_W, 2);
  }

  drawBird(ctx) {
    const b = this.bird;
    const flying = this.phase !== 'aim' || b.air > 3;
    const pose = flying && Math.floor(this.time * 10) % 2 ? 'flap' : 'perched';
    const sprite = this.sprites[b.facing < 0 ? 'left' : 'right'][pose];
    // Sprites are 16x16 drawn at 2x; the feet sit 26px below the top.
    const x = Math.round(b.x - 16);
    const y = Math.round(BRANCH_Y - 26 - b.air);
    ctx.drawImage(sprite, x, y, 32, 32);
    if (this.phase === 'aim' && this.patience < NERVOUS_TIME) drawText(ctx, '!', x + 12, y);
  }

  drawViewfinder(ctx) {
    const x = Math.round(this.lens - FRAME_W / 2);
    const y = BRANCH_Y - 14 - FRAME_H / 2;
    const color = this.focus >= 1 ? '#58c858' : this.inFrame() ? '#f8f8f8' : INK;
    const len = 8;
    ctx.fillStyle = color;
    for (const [cx, sx] of [[x, 1], [x + FRAME_W, -1]]) {
      for (const [cy, sy] of [[y, 1], [y + FRAME_H, -1]]) {
        ctx.fillRect(sx > 0 ? cx : cx - len, sy > 0 ? cy : cy - 2, len, 2);
        ctx.fillRect(sx > 0 ? cx : cx - 2, sy > 0 ? cy : cy - len, 2, len);
      }
    }
    ctx.fillRect(x + FRAME_W / 2 - 1, y + FRAME_H / 2 - 1, 2, 2);
  }

  drawPanel(ctx) {
    drawBox(ctx, 0, 116, VIEW_W, 44);

    if (this.phase === 'arrive') {
      drawText(ctx, `A ${this.species.name} landed nearby!`, 12, 132);
      return;
    }

    drawText(ctx, 'FOCUS', 10, 125);
    ctx.fillStyle = INK;
    ctx.fillRect(58, 124, 100, 10);
    ctx.fillStyle = '#d8d8d8';
    ctx.fillRect(60, 126, 96, 6);
    ctx.fillStyle = this.focus >= 1 ? '#58c858' : '#f0b030';
    ctx.fillRect(60, 126, Math.round(96 * this.focus), 6);

    drawText(ctx, 'FILM', 168, 125);
    for (let i = 0; i < SHOTS; i++) {
      ctx.fillStyle = INK;
      ctx.fillRect(204 + i * 10, 124, 8, 9);
      if (i >= this.shots) {
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(206 + i * 10, 126, 4, 5);
      }
    }

    drawText(ctx, this.popup ? this.popup.text : 'A:SNAP  B:LEAVE', 10, 143);
  }
}
