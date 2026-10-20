// Placeholder battle screen. It proves the scene switch works end to end;
// the real battle logic (menus, moves, HP) will be built in here.
import { VIEW_W, VIEW_H } from '../config.js';
import { CREATURES } from '../data/creatures.js';
import { PLAYER } from '../assets/player.js';
import { input } from '../input.js';
import { drawBox, drawText } from '../gfx/ui.js';

export class BattleScene {
  constructor(game, creatureId, returnTo) {
    this.game = game;
    this.returnTo = returnTo;
    this.creature = CREATURES[creatureId];
    this.time = 0;
    this.lines = [`A wild ${this.creature.name} appeared!`, 'Battles coming soon...', 'Got away safely!'];
    this.line = 0;
  }

  update(dt) {
    this.time += dt;
    if (input.wasPressed('a') || input.wasPressed('b')) {
      this.line++;
      if (this.line >= this.lines.length) {
        this.line = this.lines.length - 1;
        this.game.transition(() => this.game.setScene(this.returnTo));
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#f8f0d8';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // Platforms
    ctx.fillStyle = '#c8d898';
    ellipse(ctx, 176, 70, 44, 10);
    ellipse(ctx, 60, 112, 52, 12);

    // Wild creature slides in from the right
    const slide = Math.max(0, 1 - this.time / 0.6);
    const ex = 176 + slide * 120;
    ctx.fillStyle = this.creature.color;
    ellipse(ctx, ex, 54, 20, 18);
    ctx.fillStyle = '#202028';
    ctx.fillRect(ex - 8, 48, 3, 4);
    ctx.fillRect(ex + 5, 48, 3, 4);

    // Player from behind, scaled up 3x
    ctx.drawImage(PLAYER.up.stand, 36 - slide * 120, 66, 48, 48);

    // Wild creature's name + HP
    drawBox(ctx, 8, 8, 104, 30);
    drawText(ctx, this.creature.name, 16, 15);
    ctx.fillStyle = '#58c858';
    ctx.fillRect(16, 27, 88, 4);

    // Message box
    drawBox(ctx, 0, 116, VIEW_W, 44);
    drawText(ctx, this.lines[this.line], 12, 132);
  }
}

function ellipse(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}
