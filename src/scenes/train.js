// A train ride between stations (a map warp with `train`: see Overworld.onStep),
// or a bus ride between bus stops (a warp with `bus`). You sit by the windows while the train pulls out, the hills, trees and
// telegraph poles slide by, and a box says where you're headed. A (or B) reads
// on; after the last page the train slows into the station and you get off on
// the map at the other end of the warp. A `snowy` ride (to or from a snowy
// region) goes through white hills and snow-capped pines, with snow falling.
import { VIEW_W, VIEW_H } from '../config.js';
import { input } from '../input.js';
import { drawDialog, paginate } from '../gfx/ui.js';
import { drawLighting, tintSky, snowyWeather } from '../gfx/lighting.js';

const TOP_SPEED = 160;  // px/s the nearest scenery slides by at full speed
const PULL_OUT = 1.5;   // seconds to get up to speed
const PULL_IN = 1.2;    // seconds to slow down into the station
const WALL_TOP = 100;   // where the car's wall starts under the windows
const WINDOWS = [[12, 108], [132, 228]]; // left and right edges of each window
const SILL = 12;        // the windows' top edge
// The scenery's colors: sky, far mountains, hills, tree crowns, a crown's snowy top (or none), the ground.
const GREEN = { sky: '#90c8f0', far: '#7890b0', hills: '#58a840', crown: '#307830', cap: null, ground: '#4a8a38' };
const WINTER = { sky: '#b8cce0', far: '#a8b4cc', hills: '#e8eef4', crown: '#2a5a3a', cap: '#f8f8f8', ground: '#f0f4f8' };
// What you ride in: the color of its wall and seats, and what you're told as it pulls out.
const VEHICLES = {
  train: { wall: '#a03830', seat: '#283c80', seatTop: '#4060b0', pullOut: 'The doors slide shut, and the train pulls out of the station.' },
  bus: { wall: '#3a7a48', seat: '#5a3818', seatTop: '#8a5a30', pullOut: 'The doors hiss shut, and the bus pulls out onto the road.' },
};

export class TrainScene {
  /** `dest` is the station's (or stop's) name; `arrive` puts you on its map once you're back in `returnTo`. */
  constructor(game, dest, returnTo, arrive, snowy = false, vehicle = 'train') {
    this.game = game;
    this.vehicle = VEHICLES[vehicle];
    this.colors = snowy ? WINTER : GREEN;
    this.snowy = snowy;
    this.returnTo = returnTo;
    this.arrive = arrive;
    this.time = 0;
    this.drift = 0;     // how far the scenery has slid, in nearest-layer px
    this.stopping = null; // seconds since the train started slowing down
    this.pages = paginate([
      this.vehicle.pullOut,
      `Next stop: ${dest}!`,
    ]);
    this.page = 0;
  }

  speed() {
    if (this.stopping !== null) return TOP_SPEED * Math.max(0, 1 - this.stopping / PULL_IN);
    return TOP_SPEED * Math.min(1, this.time / PULL_OUT);
  }

  update(dt) {
    this.time += dt;
    this.drift += this.speed() * dt;
    if (this.stopping !== null) {
      this.stopping += dt;
      if (this.stopping >= PULL_IN) {
        this.game.transition(() => {
          this.arrive();
          this.game.setScene(this.returnTo);
        });
      }
      return;
    }
    if (input.wasPressed('a') || input.wasPressed('b')) {
      this.page++;
      if (this.page >= this.pages.length) this.stopping = 0;
    }
  }

  // ---------- drawing ----------

  draw(ctx) {
    const { phase } = this.game;
    const weather = this.snowy ? snowyWeather(this.game.weather) : this.game.weather;
    this.drawScenery(ctx);
    tintSky(ctx, phase, 0, 0, VIEW_W, WALL_TOP);
    this.drawCar(ctx);
    drawLighting(ctx, phase, { weather, time: this.time });
    if (this.stopping === null) drawDialog(ctx, this.pages[this.page], this.page < this.pages.length - 1, this.time);
  }

  /** Out the windows: sky, far mountains, near hills with trees, and poles strung with wire. */
  drawScenery(ctx) {
    const c = this.colors;
    ctx.fillStyle = c.sky;
    ctx.fillRect(0, 0, VIEW_W, WALL_TOP);

    // Far mountains creep by.
    const far = this.drift * 0.1;
    ctx.fillStyle = c.far;
    for (let x = 0; x < VIEW_W; x += 2) {
      const u = x + far;
      const top = 44 - 14 * Math.sin(u / 41) - 7 * Math.sin(u / 17);
      ctx.fillRect(x, Math.round(top), 2, WALL_TOP);
    }

    // Rolling green hills.
    const mid = this.drift * 0.35;
    ctx.fillStyle = c.hills;
    for (let x = 0; x < VIEW_W; x += 2) {
      const top = 70 - 6 * Math.sin((x + mid) / 29);
      ctx.fillRect(x, Math.round(top), 2, WALL_TOP);
    }

    // Trees along the line: a round dark crown on a trunk, every so often.
    const near = this.drift * 0.7;
    const GAP = 26;
    for (let i = Math.floor(near / GAP) - 1; i * GAP - near < VIEW_W + GAP; i++) {
      if ((i * 7) % 5 === 0) continue; // a few gaps between trees
      const x = Math.round(i * GAP - near);
      const tall = 6 + ((i * 13) % 4) * 2;
      ctx.fillStyle = '#5a3818';
      ctx.fillRect(x + 4, 88 - 4, 2, 6);
      ctx.fillStyle = c.crown;
      ctx.fillRect(x, 88 - 4 - tall, 10, tall);
      ctx.fillRect(x + 1, 88 - 6 - tall, 8, 2);
      if (c.cap) {
        ctx.fillStyle = c.cap;
        ctx.fillRect(x + 1, 88 - 6 - tall, 8, 2);
        ctx.fillRect(x, 88 - 4 - tall, 10, 1);
      }
    }
    ctx.fillStyle = c.ground;
    ctx.fillRect(0, 88, VIEW_W, WALL_TOP - 88);

    // Telegraph poles whip past, with the wire sagging between them.
    const POLE_GAP = 140;
    const pole = this.drift * 1.5;
    for (let i = Math.floor(pole / POLE_GAP) - 1; i * POLE_GAP - pole < VIEW_W + POLE_GAP; i++) {
      const x = Math.round(i * POLE_GAP - pole);
      ctx.fillStyle = '#5a3818';
      ctx.fillRect(x, 18, 3, WALL_TOP - 18);
      ctx.fillRect(x - 5, 22, 13, 2);
      ctx.fillStyle = '#202028';
      for (let dx = 0; dx < POLE_GAP; dx += 2) {
        const sag = Math.round(10 * Math.sin((dx / POLE_GAP) * Math.PI));
        ctx.fillRect(x + 1 + dx, 22 + sag, 2, 1);
      }
    }
  }

  /** The inside of the car around the windows, rocking a pixel now and then. */
  drawCar(ctx) {
    const rock = this.speed() > 0 && Math.floor(this.drift / 40) % 7 === 0 ? 1 : 0;
    ctx.save();
    ctx.translate(0, rock);
    ctx.fillStyle = this.vehicle.wall;
    ctx.beginPath();
    ctx.rect(0, -2, VIEW_W, VIEW_H + 4);
    for (const [l, r] of WINDOWS) ctx.rect(l, SILL, r - l, WALL_TOP - SILL); // the windows: holes, by evenodd
    ctx.fill('evenodd');

    // Window frames and the luggage rack above them.
    ctx.fillStyle = '#5a3818';
    for (const [l, r] of WINDOWS) {
      ctx.fillRect(l - 2, SILL - 2, r - l + 4, 2);
      ctx.fillRect(l - 2, WALL_TOP, r - l + 4, 3);
      ctx.fillRect(l - 2, SILL, 2, WALL_TOP - SILL);
      ctx.fillRect(r, SILL, 2, WALL_TOP - SILL);
    }
    ctx.fillStyle = '#787880';
    ctx.fillRect(0, 2, VIEW_W, 2);

    // Seat backs under the windows.
    ctx.fillStyle = this.vehicle.seat;
    for (const [l, r] of WINDOWS) ctx.fillRect(l + 8, WALL_TOP + 5, r - l - 16, VIEW_H - WALL_TOP);
    ctx.fillStyle = this.vehicle.seatTop;
    for (const [l, r] of WINDOWS) ctx.fillRect(l + 10, WALL_TOP + 7, r - l - 20, 4);
    ctx.restore();
  }
}
