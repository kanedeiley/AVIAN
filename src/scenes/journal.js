// The field journal, in two pages: LEFT/RIGHT flips between them.
//   BIRDS         every species, with your best photo of each. Birds you haven't
//                 photographed show as a silhouette with "???", but the journal
//                 still says where they live as a hint.
//   COLLECTIBLES  the odd things hidden around the world (data/collectibles.js).
//                 Ones you haven't found say which map they're hidden on.
// Up/down picks an entry. J or B closes.
import { VIEW_W, VIEW_H } from '../config.js';
import { BIRDS } from '../data/birds.js';
import { VOYAGES } from '../data/voyages.js';
import { NEMESES } from '../data/nemeses.js';
import { COLLECTIBLES } from '../data/collectibles.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { COLLECTIBLE_SPRITES } from '../assets/collectibles.js';
import { PALETTE } from '../assets/palette.js';
import { makeSprite } from '../gfx/sprite.js';
import { MAP_IDS, getMap } from '../maps/index.js';
import { input } from '../input.js';
import { drawBox, drawText } from '../gfx/ui.js';

const TOP = 24;          // title bar height
const ROW_H = 16;
const LIST_W = 100;      // the list on the left; details on the right
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

/** Names of the maps (and boat trips) where a species can turn up, or a nemesis perches. */
function habitats(birdId) {
  const perches = Object.values(NEMESES).map((n) => n.bird === birdId && n.map);
  const maps = MAP_IDS.map(getMap).filter((m) => m.birds?.table.includes(birdId) || perches.includes(m.id));
  const voyages = Object.values(VOYAGES).filter((v) => v.table.includes(birdId) || v.rare?.includes(birdId));
  return [...maps, ...voyages].map((place) => place.name);
}

/** Word-wrap text into lines of at most `chars` characters. */
function wrap(text, chars) {
  const lines = [''];
  for (const word of text.split(' ')) {
    const line = lines[lines.length - 1];
    if (line && line.length + 1 + word.length > chars) lines.push(word);
    else lines[lines.length - 1] = line ? `${line} ${word}` : word;
  }
  return lines;
}

// Each page: its entries, which ones you have, the name to list, and how to draw the details.
const PAGES = [
  {
    title: 'BIRDS',
    ids: Object.keys(BIRDS),
    has: (game, id) => Boolean(game.journal[id]),
    listName: (id) => BIRDS[id].name,
    drawDetails(ctx, game, id, x0, w) {
      const stars = game.journal[id] ?? 0;
      const sprites = BIRD_SPRITES[id];
      ctx.drawImage(stars ? sprites.right.perched : sprites.silhouette, x0 + (w - 48) / 2, TOP + 6, 48, 48);

      const name = stars ? BIRDS[id].name : '???';
      drawText(ctx, name, x0 + (w - name.length * 8) / 2, TOP + 56);
      for (let i = 0; i < 3; i++) ctx.drawImage(i < stars ? STAR : NO_STAR, x0 + w / 2 - 14 + i * 10, TOP + 70);

      drawText(ctx, 'LIVES IN:', x0 + 8, TOP + 86, MUTED);
      const places = habitats(id);
      const lines = (places.length ? places : ['UNKNOWN']).slice(0, 2).flatMap((place) => wrap(place, Math.floor((w - 16) / 8)));
      lines.slice(0, 3).forEach((line, i) => {
        drawText(ctx, line, x0 + 8, TOP + 100 + i * 12);
      });
    },
  },
  {
    title: 'COLLECTIBLES',
    ids: Object.keys(COLLECTIBLES),
    has: (game, id) => Boolean(game.progress.collectibles[id]),
    listName: (id) => COLLECTIBLES[id].short,
    drawDetails(ctx, game, id, x0, w) {
      const found = this.has(game, id);
      const item = COLLECTIBLES[id];
      const sprites = COLLECTIBLE_SPRITES[id];
      ctx.drawImage(found ? sprites.sprite : sprites.silhouette, x0 + (w - 48) / 2, TOP + 2, 48, 48);

      const name = found ? item.name : '???';
      drawText(ctx, name, x0 + (w - name.length * 8) / 2, TOP + 56);

      if (found) {
        wrap(item.about, Math.floor((w - 16) / 8)).slice(0, 4).forEach((line, i) => {
          drawText(ctx, line, x0 + 8, TOP + 74 + i * 12);
        });
      } else {
        drawText(ctx, 'HIDDEN IN:', x0 + 8, TOP + 86, MUTED);
        wrap(getMap(item.map).name, Math.floor((w - 16) / 8)).slice(0, 2).forEach((line, i) => {
          drawText(ctx, line, x0 + 8, TOP + 100 + i * 12);
        });
      }
    },
  },
];

export class JournalScene {
  constructor(game, returnTo) {
    this.game = game;
    this.returnTo = returnTo;
    this.page = 0;
    this.cursors = PAGES.map(() => ({ selected: 0, scroll: 0 })); // each page remembers its place
  }

  update() {
    if (input.wasPressed('b') || input.wasPressed('journal')) {
      this.game.transition(() => this.game.setScene(this.returnTo));
      return;
    }
    if (input.wasPressed('left')) this.page = (this.page + PAGES.length - 1) % PAGES.length;
    if (input.wasPressed('right')) this.page = (this.page + 1) % PAGES.length;

    const cursor = this.cursors[this.page];
    const n = PAGES[this.page].ids.length;
    if (input.wasPressed('up')) cursor.selected = (cursor.selected + n - 1) % n;
    if (input.wasPressed('down')) cursor.selected = (cursor.selected + 1) % n;
    cursor.scroll = Math.min(Math.max(cursor.scroll, cursor.selected - ROWS + 1), cursor.selected);
  }

  draw(ctx) {
    const { game } = this;
    const page = PAGES[this.page];
    const { selected, scroll } = this.cursors[this.page];
    ctx.fillStyle = '#f0e8d0';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // Title bar: which page, with arrows to flip, and how many of its entries you have.
    drawBox(ctx, 0, 0, VIEW_W, TOP);
    drawText(ctx, `< ${page.title} >`, 8, 8);
    const count = `${page.ids.filter((id) => page.has(game, id)).length}/${page.ids.length}`;
    drawText(ctx, count, VIEW_W - 8 - count.length * 8, 8);

    // The list.
    drawBox(ctx, 0, TOP, LIST_W, VIEW_H - TOP);
    page.ids.slice(scroll, scroll + ROWS).forEach((id, i) => {
      const y = TOP + 8 + i * ROW_H;
      const have = page.has(game, id);
      if (scroll + i === selected) drawText(ctx, '>', 6, y);
      drawText(ctx, have ? page.listName(id) : '???', 16, y, have ? undefined : MUTED);
    });

    // Details for the selected entry.
    const x0 = LIST_W + 4;
    const w = VIEW_W - x0 - 4;
    drawBox(ctx, x0, TOP + 4, w, VIEW_H - TOP - 8);
    page.drawDetails(ctx, game, page.ids[selected], x0, w);
  }
}
