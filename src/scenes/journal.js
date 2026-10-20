// The field journal: every species, with your best photo of each. Up/down
// picks a bird; birds you haven't photographed show as a silhouette with
// "???", but the journal still says where they live as a hint. J or B closes.
import { VIEW_W, VIEW_H } from '../config.js';
import { BIRDS } from '../data/birds.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { PALETTE } from '../assets/palette.js';
import { makeSprite } from '../gfx/sprite.js';
import { MAP_IDS, getMap } from '../maps/index.js';
import { input } from '../input.js';
import { drawBox, drawText } from '../gfx/ui.js';

const TOP = 24;          // title bar height
const ROW_H = 16;
const LIST_W = 100;      // the species list on the left; details on the right
const ROWS = Math.floor((VIEW_H - TOP - 8) / ROW_H);
const MUTED = '#9898a8';

const STAR_ART = [
  '...k...',
  '..kfk..',
  'kkkfkkk',
  'kfffffk',
  '.kfffk.',
  '.kfkfk.',
  '.kk.kk.',
];
const STAR = makeSprite(STAR_ART, PALETTE, 'star');
const NO_STAR = makeSprite(STAR_ART.map((r) => r.replaceAll('f', 'q')), PALETTE, 'empty star');

/** Names of the maps where a species can turn up. */
function habitats(birdId) {
  return MAP_IDS.map(getMap).filter((m) => m.birds?.table.includes(birdId)).map((m) => m.name);
}

export class JournalScene {
  constructor(game, returnTo) {
    this.game = game;
    this.returnTo = returnTo;
    this.ids = Object.keys(BIRDS);
    this.selected = 0;
    this.scroll = 0;
  }

  update() {
    if (input.wasPressed('b') || input.wasPressed('journal')) {
      this.game.transition(() => this.game.setScene(this.returnTo));
      return;
    }
    const n = this.ids.length;
    if (input.wasPressed('up')) this.selected = (this.selected + n - 1) % n;
    if (input.wasPressed('down')) this.selected = (this.selected + 1) % n;
    this.scroll = Math.min(Math.max(this.scroll, this.selected - ROWS + 1), this.selected);
  }

  draw(ctx) {
    const { journal } = this.game;
    ctx.fillStyle = '#f0e8d0';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // Title bar with how many species you've photographed.
    drawBox(ctx, 0, 0, VIEW_W, TOP);
    drawText(ctx, 'JOURNAL', 8, 8);
    const count = `${this.ids.filter((id) => journal[id]).length}/${this.ids.length}`;
    drawText(ctx, count, VIEW_W - 8 - count.length * 8, 8);

    // Species list.
    drawBox(ctx, 0, TOP, LIST_W, VIEW_H - TOP);
    this.ids.slice(this.scroll, this.scroll + ROWS).forEach((id, i) => {
      const y = TOP + 8 + i * ROW_H;
      const seen = journal[id];
      if (this.scroll + i === this.selected) drawText(ctx, '>', 6, y);
      drawText(ctx, seen ? BIRDS[id].name : '???', 16, y, seen ? undefined : MUTED);
    });

    // Details for the selected bird.
    const id = this.ids[this.selected];
    const stars = journal[id] ?? 0;
    const x0 = LIST_W + 4;
    const w = VIEW_W - x0 - 4;
    drawBox(ctx, x0, TOP + 4, w, VIEW_H - TOP - 8);

    const sprites = BIRD_SPRITES[id];
    ctx.drawImage(stars ? sprites.right.perched : sprites.silhouette, x0 + (w - 48) / 2, TOP + 6, 48, 48);

    const name = stars ? BIRDS[id].name : '???';
    drawText(ctx, name, x0 + (w - name.length * 8) / 2, TOP + 56);
    for (let i = 0; i < 3; i++) ctx.drawImage(i < stars ? STAR : NO_STAR, x0 + w / 2 - 14 + i * 10, TOP + 70);

    drawText(ctx, 'LIVES IN:', x0 + 8, TOP + 86, MUTED);
    const places = habitats(id);
    (places.length ? places : ['UNKNOWN']).slice(0, 2).forEach((place, i) => {
      drawText(ctx, place, x0 + 8, TOP + 100 + i * 12);
    });
  }
}
