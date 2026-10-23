// A nemesis bird fight: the photo minigame (photo.js) as a boss battle.
// The nemesis has a bar of `hits` along the top of the screen. Every photo of
// at least `hitStars` stars knocks one off, and makes it faster and more
// restless (`rage`). Empty the bar before it runs out of patience, or you run
// out of film, to win: it goes in the journal and in game.progress, and it
// leaves its perch for good. Lose and it's back on its perch to try again.
// A rival's challenge (data/rivals.js) is the same fight, saved as a rival win instead.
import { TILE, VIEW_W } from '../config.js';
import { TILES } from '../assets/tiles.js';
import { drawBox, drawText, paginate } from '../gfx/ui.js';
import { saveJournal } from '../save.js';
import { recordNemesis, recordRival } from '../progress.js';
import { DIALOGUE } from '../data/dialogue.js';
import { PhotoScene } from './photo.js';

const BRANCH_Y = 92;   // must match photo.js
const HIT_FLASH = 0.5; // seconds the bar flashes after a hit
const INK = '#283050';

export class NemesisScene extends PhotoScene {
  /** `nemesis` is the perched nemesis (or rival's bird) from perchOn() in progress.js. */
  constructor(game, nemesis, returnTo) {
    super(game, nemesis.bird, returnTo);
    this.nemesis = nemesis;
    this.species = { ...this.species }; // a copy: it speeds up as the fight goes on
    // A rival's bird can move differently in the fight than it does in the wild (data/rivals.js).
    for (const key of ['speed', 'hop', 'pause', 'focusTime']) if (nemesis[key]) this.species[key] = nemesis[key];
    this.film = this.shots = nemesis.film;
    this.patience = nemesis.patience;
    this.left = nemesis.hits;
    this.won = false;
    this.hitFlash = 0;
  }

  update(dt) {
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    super.update(dt);
  }

  snap() {
    const stars = super.snap();
    if (stars < this.nemesis.hitStars || this.won) return stars;

    this.left--;
    this.hitFlash = HIT_FLASH;
    if (this.left === 0) {
      this.won = true;
      this.popup = { text: 'GOT IT! WHAT A PHOTO!', time: 2 };
      this.startLeaving();
      return stars;
    }
    const { rage } = this.nemesis;
    this.species.speed *= rage;
    this.species.hop *= rage;
    this.species.pause = this.species.pause.map((p) => p / rage);
    this.popup = { text: this.left === 1 ? 'ONE MORE! IT\'S FURIOUS!' : 'HIT! IT\'S GETTING FASTER!', time: 1.5 };
    return stars;
  }

  showResult() {
    const { journal } = this.game;
    const lines = this.won ? [...this.nemesis.won] : [...this.nemesis.lost];
    if (this.won) {
      const previous = journal[this.id] ?? 0;
      if (!(this.id in journal)) lines.push(`New journal entry: ${this.species.name}!`);
      if (this.best > previous) {
        journal[this.id] = this.best;
        saveJournal(journal);
      }
      (this.nemesis.kind === 'rival' ? recordRival : recordNemesis)(this.game, this.nemesis.id, this.best);
      // Someone may have something to say about it right away (a phone call: `wonTalk`, data/dialogue.js).
      if (this.nemesis.wonTalk) lines.push(...DIALOGUE[this.nemesis.wonTalk](this.game));
    }
    this.phase = 'result';
    this.dialog = { pages: paginate(lines), page: 0 };
  }

  // ---------- drawing ----------

  draw(ctx) {
    super.draw(ctx);
    if (this.phase !== 'result') this.drawBossBar(ctx);
  }

  /** The nemesis's name and a bar of the hits still needed, like a boss's health. */
  drawBossBar(ctx) {
    const { hits } = this.nemesis;
    drawBox(ctx, 4, 4, 132, 30);
    drawText(ctx, this.species.name, 12, 10);
    const w = 116;
    ctx.fillStyle = INK;
    ctx.fillRect(10, 22, w + 4, 8);
    ctx.fillStyle = '#d8d8d8';
    ctx.fillRect(12, 24, w, 4);
    const share = this.left / hits;
    const flashing = this.hitFlash > 0 && Math.floor(this.hitFlash * 16) % 2;
    ctx.fillStyle = flashing ? '#f8f8f8' : share > 0.5 ? '#58c858' : share > 0.25 ? '#f0b030' : '#e04040';
    ctx.fillRect(12, 24, Math.round(w * share), 4);
    // Notches between the hits.
    ctx.fillStyle = INK;
    for (let i = 1; i < hits; i++) ctx.fillRect(12 + Math.round((w * i) / hits), 24, 1, 4);
  }

  drawPanel(ctx) {
    if (this.phase !== 'arrive') return super.drawPanel(ctx);
    drawBox(ctx, 0, 116, VIEW_W, 44);
    drawText(ctx, this.nemesis.kind === 'rival' ? `${this.nemesis.name}'s challenge!` : 'Your NEMESIS BIRD appears!', 12, 126);
    drawText(ctx, `The ${this.species.name}!`, 12, 142);
  }

  /** The summit: sky, far-off peaks, snowy pines and a dead branch over the snow. Or the river, for `scene: 'river'`. */
  drawBackground(ctx) {
    if (this.nemesis.scene === 'river') return this.drawRiver(ctx);
    ctx.fillStyle = '#a8d0f0';
    ctx.fillRect(0, 0, VIEW_W, 116);
    for (const [x, h] of [[30, 30], [100, 40], [170, 26], [230, 36]]) {
      ctx.fillStyle = '#787880';
      peak(ctx, x, 56, h);
      ctx.fillStyle = '#f8f8f8';
      peak(ctx, x, 56 - h * 0.6, h * 0.4);
    }
    for (let x = 0; x < VIEW_W; x += TILE) {
      ctx.drawImage(TILES.snowyPine.sprites[0], x, 40);
      for (let y = 56; y < 116; y += TILE) ctx.drawImage(TILES.snow.sprites[0], x, y);
    }
    ctx.fillStyle = '#5a4a40';
    ctx.fillRect(0, BRANCH_Y, VIEW_W, 6);
    ctx.fillStyle = '#8a7a68';
    ctx.fillRect(0, BRANCH_Y, VIEW_W, 2);
  }

  /** The river: sky, the wooded far bank, the water, and a weathered dock rail to perch on. */
  drawRiver(ctx) {
    ctx.fillStyle = '#a8d0f0';
    ctx.fillRect(0, 0, VIEW_W, 116);
    for (let x = 0; x < VIEW_W; x += TILE) ctx.drawImage(TILES.tree.sprites[0], x, 34);
    for (let y = 50; y < 116; y += TILE) {
      for (let x = 0; x < VIEW_W; x += TILE) ctx.drawImage(TILES.water.sprites[0], x, y);
    }
    ctx.fillStyle = '#6a5a48';
    ctx.fillRect(0, BRANCH_Y, VIEW_W, 6);
    ctx.fillStyle = '#9a8a70';
    ctx.fillRect(0, BRANCH_Y, VIEW_W, 2);
  }
}

/** A triangle mountain with its base at y and `h` tall. */
function peak(ctx, x, y, h) {
  ctx.beginPath();
  ctx.moveTo(x - h * 1.4, y);
  ctx.lineTo(x, y - h);
  ctx.lineTo(x + h * 1.4, y);
  ctx.fill();
}
