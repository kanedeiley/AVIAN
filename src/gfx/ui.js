// Tiny helpers for menus and text boxes.
export const FONT = '8px "Press Start 2P", monospace';
const INK = '#283050';

export function drawBox(ctx, x, y, w, h) {
  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
}

export function drawText(ctx, text, x, y, color = INK) {
  ctx.font = FONT;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
}

// The message box along the bottom of the screen: 2 lines of 27 characters.
const BOX_CHARS = 27;
const BOX_LINES = 2;

/** Word-wrap strings into box-sized pages, each an array of up to 2 lines. */
export function paginate(texts) {
  const pages = [];
  for (const text of [].concat(texts)) {
    const lines = [];
    let line = '';
    for (const word of text.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > BOX_CHARS && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    lines.push(line);
    for (let i = 0; i < lines.length; i += BOX_LINES) pages.push(lines.slice(i, i + BOX_LINES));
  }
  return pages;
}

/** Draw one page from paginate(), with a blinking arrow if more follows. */
export function drawDialog(ctx, lines, more = false, time = 0) {
  drawBox(ctx, 0, 116, 240, 44);
  lines.forEach((line, i) => drawText(ctx, line, 12, 126 + i * 16));
  if (more && Math.floor(time * 3) % 2 === 0) {
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.moveTo(222, 148);
    ctx.lineTo(230, 148);
    ctx.lineTo(226, 153);
    ctx.fill();
  }
}
