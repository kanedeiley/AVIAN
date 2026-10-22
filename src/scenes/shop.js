// Buying and using items (data/items.js). Both are menus drawn over the
// overworld, which stays on screen (but paused) behind them:
//   ShopScene  a shopkeeper's counter: up/down picks, A buys, B leaves.
//   BagScene   your bag (I, or BAG on touch screens): A uses, B or I closes.
// The box along the bottom says about the item you're on, or what just happened
// (one page of it: keep messages to 2 lines).
import { VIEW_W } from '../config.js';
import { ITEMS } from '../data/items.js';
import { ITEM_SPRITES } from '../assets/items.js';
import { input } from '../input.js';
import { drawBox, drawText, drawDialog, paginate } from '../gfx/ui.js';
import { itemCount, cantBuy, buyItem } from '../progress.js';

const TOP = 28;      // where the list starts, under the title
const ROW_H = 20;
const ROWS = 4;      // rows that fit before the list scrolls
const PANEL_H = 112; // the menu's box; the text box is below it
const MUTED = '#9898a8';

/** A list of items over the overworld; subclasses say what's listed and what A does. */
class ItemMenu {
  constructor(game, world, title, ids) {
    this.game = game;
    this.world = world;
    this.title = title;
    this.ids = ids;
    this.selected = 0;
    this.scroll = 0;
    this.message = null; // lines to show instead of the item's `about`, until you move
  }

  update() {
    if (this.closes()) return this.close();
    const n = this.ids.length;
    if (n && input.wasPressed('up')) this.move((this.selected + n - 1) % n);
    if (n && input.wasPressed('down')) this.move((this.selected + 1) % n);
    if (n && input.wasPressed('a')) this.choose(this.ids[this.selected]);
  }

  move(i) {
    this.selected = i;
    this.scroll = Math.min(Math.max(this.scroll, i - ROWS + 1), i);
    this.message = null;
  }

  closes() {
    return input.wasPressed('b');
  }

  close(lines) {
    if (lines) this.world.dialog = { pages: paginate(lines), page: 0 };
    this.game.setScene(this.world);
  }

  draw(ctx) {
    this.world.draw(ctx);
    drawBox(ctx, 4, 4, VIEW_W - 8, PANEL_H);
    drawText(ctx, this.title, 14, 12);
    const money = `$${this.game.money}`;
    drawText(ctx, money, VIEW_W - 14 - money.length * 8, 12);

    this.ids.slice(this.scroll, this.scroll + ROWS).forEach((id, i) => {
      const y = TOP + i * ROW_H;
      if (this.scroll + i === this.selected) drawText(ctx, '>', 12, y + 4);
      ctx.drawImage(ITEM_SPRITES[id], 24, y);
      drawText(ctx, ITEMS[id].name, 44, y + 4);
      const [note, muted] = this.note(id);
      if (note) drawText(ctx, note, VIEW_W - 14 - note.length * 8, y + 4, muted ? MUTED : undefined);
    });
    if (!this.ids.length) drawText(ctx, 'NOTHING YET', 44, TOP + 4, MUTED);

    const id = this.ids[this.selected];
    const lines = this.message ?? (id ? [ITEMS[id].about] : this.empty);
    drawDialog(ctx, paginate(lines)[0]);
  }
}

export class ShopScene extends ItemMenu {
  /** `stock` is the shopkeeper's `shop` list; `greeting` is shown until you move. */
  constructor(game, world, stock, greeting) {
    super(game, world, 'SHOP', stock);
    this.message = greeting;
  }

  /** The price, or OWNED for a tool you have. */
  note(id) {
    const item = ITEMS[id];
    if (item.kind === 'tool' && itemCount(this.game, id)) return ['OWNED', true];
    return [`$${item.price}`];
  }

  choose(id) {
    const why = cantBuy(this.game, id);
    if (why) {
      this.message = [why];
      return;
    }
    buyItem(this.game, id);
    const { name, kind } = ITEMS[id];
    this.message = [kind === 'supply' ? `Bought ${name}! You have ${itemCount(this.game, id)} now.` : `Bought ${name}! Press I to open your BAG.`];
  }

  close() {
    super.close(['Thanks for stopping by! Happy birding!']);
  }
}

export class BagScene extends ItemMenu {
  constructor(game, world) {
    super(game, world, 'BAG', Object.keys(ITEMS).filter((id) => itemCount(game, id)));
    this.empty = ['Your bag is empty. Stores sell gear for birders!'];
  }

  closes() {
    return input.wasPressed('b') || input.wasPressed('bag');
  }

  /** How many you have, or what it's doing now. */
  note(id) {
    const { world } = this;
    if (ITEMS[id].ride) return world.riding ? ['RIDING'] : [''];
    if (world.inUse[id]) return [`${Math.ceil(world.inUse[id])}S x${itemCount(this.game, id)}`];
    return ITEMS[id].kind === 'supply' ? [`x${itemCount(this.game, id)}`] : [''];
  }

  choose(id) {
    this.close(this.world.useItem(id));
  }
}
