// The opening, Professor Oak style: HANNAH welcomes you to the valley, says
// she'll be the one to tell you what to do next, asks your name, and has a look
// at you (pick your hair, hat, clothes and colors). Then she gives you your
// first assignment and the game starts. It runs until progress.player is set
// (see main.js; index.html?intro replays it).
//
// The script is a list of steps: lines Hannah says (with who's standing on
// stage), or one of the two screens, NAME and LOOK (scenes/lookEditor.js).
import { VIEW_W, VIEW_H } from '../config.js';
import { input } from '../input.js';
import { drawBox, drawText, drawTinyText, drawDialog, paginate } from '../gfx/ui.js';
import { PEOPLE_SPRITES } from '../assets/people.js';
import { BIRD_SPRITES } from '../assets/birds.js';
import { DEFAULT_LOOK, lookSprites } from '../assets/player.js';
import { LookEditor, drawPerson } from './lookEditor.js';
import { saveProgress } from '../save.js';

const SKY = '#e8f0f8';
const GROUND = '#c8dcb8';
const PICK = '#f0b030';  // the highlight behind what's selected
const MUTED = '#9898a8';
const INK = '#283050';

const MAX_NAME = 8;
const LETTERS = ['ABCDEFGHI', 'JKLMNOPQR', 'STUVWXYZ-'];
const GRID_X = 30, GRID_Y = 58, CELL_W = 20, CELL_H = 18;
const BUTTONS_Y = 116; // DEL and END, under the letters

export class IntroScene {
  /** `next()` makes the scene to start once you're done (the Overworld). */
  constructor(game, next) {
    this.game = game;
    this.next = next;
    this.time = 0;
    this.name = game.progress.player?.name ?? '';
    this.look = { ...DEFAULT_LOOK, ...game.progress.player?.look };
    this.sprites = lookSprites(this.look);
    this.cursor = { row: 0, col: 0 }; // on the NAME screen
    this.editor = null;               // the LOOK screen, while it's up
    this.onKey = (e) => this.typeKey(e);

    // Someone who was already playing before there was an intro gets a "welcome back".
    const returning = game.progress.flags.metHannah || Object.keys(game.journal).length > 0;
    const name = () => this.name;
    this.steps = [
      { show: ['hannah'], text: [
        'HANNAH: Hello there! Welcome to WILLOW VALLEY!',
        'My name is HANNAH. I run the bird club around here.',
      ] },
      { show: ['hannah', 'robin'], text: [
        'This valley is full of birds! Robins in the hedges, terns over the bay, eagles up on the peaks...',
        'We birders track them down, photograph them, and fill our journals.',
        'And I\'ll be your guide. Whenever you\'re not sure what to do next, come and find me!',
      ] },
      { show: ['hannah'], text: ['But first, tell me about yourself. What\'s your name?'] },
      { screen: 'name' },
      { show: ['hannah'], text: () => [
        `${name()}! What a great name for a birder.`,
        'Now, what do you wear out in the field? Let me get a good look at you.',
      ] },
      { screen: 'look' },
      { show: ['hannah', 'player'], text: () => (returning ? [
        `Looking sharp, ${name()}! Good to finally put a name to the face.`,
        'Remember: whenever you\'re not sure what to do next, come see me at my house in HANNAHVILLE.',
        'Now get back out there. The birds won\'t photograph themselves!',
      ] : [
        `Looking sharp, ${name()}! You look like a real birder already.`,
        'Here\'s your first assignment: come see me at my house in HANNAHVILLE. It\'s just south of WILLOW VILLAGE.',
        'I\'ll have your first real challenge waiting. Your birding adventure starts now!',
      ]) },
    ];
    this.goTo(0);
  }

  goTo(i) {
    this.step = i;
    const step = this.steps[i];
    if (!step) return this.finish();
    if (step.text) {
      this.pages = paginate(typeof step.text === 'function' ? step.text() : step.text);
      this.page = 0;
    }
    if (step.screen === 'look') {
      this.editor = new LookEditor(this.look, this.name, (look) => {
        this.look = look;
        this.sprites = lookSprites(look);
        this.goTo(this.step + 1);
      });
    }
    // On the NAME screen a keyboard can type the name; nothing else should hear those keys.
    if (step.screen === 'name') window.addEventListener('keydown', this.onKey, true);
    else window.removeEventListener('keydown', this.onKey, true);
  }

  finish() {
    this.game.progress.player = { name: this.name, look: { ...this.look } };
    saveProgress(this.game.progress);
    this.game.transition(() => this.game.setScene(this.next()));
  }

  update(dt) {
    this.time += dt;
    const step = this.steps[this.step];
    if (step.screen === 'name') return this.updateName();
    if (step.screen === 'look') return this.editor.update(dt);
    if (input.wasPressed('a') || input.wasPressed('b')) {
      if (++this.page >= this.pages.length) this.goTo(this.step + 1);
    }
  }

  // ---------- NAME: pick letters with the D-pad, or type them ----------

  addLetter(ch) {
    if (this.name.length >= MAX_NAME) return;
    this.name += ch;
    if (this.name.length === MAX_NAME) this.cursor = { row: LETTERS.length, col: LETTERS[0].length - 1 }; // full: jump to END
  }

  confirmName() {
    this.name = this.name.replace(/^-+|-+$/g, '');
    if (this.name) this.goTo(this.step + 1);
  }

  updateName() {
    const c = this.cursor;
    const cols = LETTERS[0].length;
    const onButtons = c.row === LETTERS.length;
    if (input.wasPressed('up')) c.row = (c.row + LETTERS.length) % (LETTERS.length + 1);
    if (input.wasPressed('down')) c.row = (c.row + 1) % (LETTERS.length + 1);
    // On the buttons row, left and right just hop between DEL and END.
    if (input.wasPressed('left')) c.col = onButtons ? 0 : (c.col + cols - 1) % cols;
    if (input.wasPressed('right')) c.col = onButtons ? cols - 1 : (c.col + 1) % cols;
    if (input.wasPressed('b')) this.name = this.name.slice(0, -1);
    if (input.wasPressed('a')) {
      if (c.row < LETTERS.length) this.addLetter(LETTERS[c.row][c.col]);
      else if (this.button() === 'DEL') this.name = this.name.slice(0, -1);
      else this.confirmName();
    }
  }

  /** The button under the cursor on the buttons row: DEL on the left half, END on the right. */
  button() {
    return this.cursor.col < LETTERS[0].length / 2 ? 'DEL' : 'END';
  }

  /** A key typed on a keyboard: letters and - type, Backspace deletes, Enter is done. */
  typeKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || this.game.fadeDir !== 0) return;
    if (/^[a-z-]$/i.test(e.key)) this.addLetter(e.key.toUpperCase());
    else if (e.key === 'Backspace') this.name = this.name.slice(0, -1);
    else if (e.key === 'Enter') this.confirmName();
    else return; // arrows, Space and Escape still work the grid
    e.preventDefault();
    e.stopPropagation();
  }

  drawName(ctx) {
    drawBox(ctx, 4, 4, VIEW_W - 8, 40);
    drawText(ctx, 'YOUR NAME?', 12, 11);
    for (let i = 0; i < MAX_NAME; i++) {
      const ch = this.name[i];
      if (ch) drawText(ctx, ch, 100 + i * 12, 27);
      // The next letter's slot blinks.
      else if (i !== this.name.length || Math.floor(this.time * 3) % 2 === 0) drawText(ctx, '_', 100 + i * 12, 27, MUTED);
    }
    ctx.drawImage(PEOPLE_SPRITES.hannah.sitting, 20, 18);

    drawBox(ctx, 4, 48, VIEW_W - 8, 88);
    const c = this.cursor;
    LETTERS.forEach((row, r) => [...row].forEach((ch, col) => {
      const x = GRID_X + col * CELL_W, y = GRID_Y + r * CELL_H;
      if (c.row === r && c.col === col) {
        ctx.fillStyle = PICK;
        ctx.fillRect(x - 2, y - 3, 16, 14);
      }
      drawText(ctx, ch, x + 2, y);
    }));
    for (const [label, x] of [['DEL', GRID_X + 8], ['END', GRID_X + 128]]) {
      if (c.row === LETTERS.length && this.button() === label) {
        ctx.fillStyle = PICK;
        ctx.fillRect(x - 4, BUTTONS_Y - 3, 32, 14);
      }
      drawText(ctx, label, x, BUTTONS_Y, label === 'END' && !this.name ? MUTED : INK);
    }
    const hint = 'B DELETES, OR TYPE ON A KEYBOARD';
    drawTinyText(ctx, hint, (VIEW_W - hint.length * 4) / 2, 146);
  }

  // ---------- drawing ----------

  draw(ctx) {
    ctx.fillStyle = SKY;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    const step = this.steps[this.step];
    if (!step) return;
    if (step.screen === 'name') return this.drawName(ctx);
    if (step.screen === 'look') return this.editor.draw(ctx);

    // Whoever's on stage stands on a patch of grass, spread out across the screen.
    ctx.fillStyle = GROUND;
    ctx.fillRect(0, 96, VIEW_W, 20);
    step.show.forEach((who, i) => this.drawActor(ctx, who, (VIEW_W * (i + 1)) / (step.show.length + 1)));
    drawDialog(ctx, this.pages[this.page], this.page < this.pages.length - 1, this.time);
  }

  drawActor(ctx, who, cx) {
    if (who === 'robin') {
      // It hops now and then, flapping.
      ctx.fillStyle = 'rgba(40,48,80,0.18)';
      ctx.beginPath();
      ctx.ellipse(cx, 102, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      const hop = this.time % 2 < 0.3;
      const sprite = BIRD_SPRITES.robin.left[hop ? 'flap' : 'perched'];
      ctx.drawImage(sprite, Math.round(cx - 24), hop ? 52 : 58, 48, 48);
      return;
    }
    drawPerson(ctx, who === 'hannah' ? PEOPLE_SPRITES.hannah.sitting : this.sprites.down.stand, cx, 106, 4);
  }
}
