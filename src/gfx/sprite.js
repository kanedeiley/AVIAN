// Turns text pixel art into canvases you can drawImage() like any image.
//
//   makeSprite(['.kk.', 'kppk'], PALETTE)
//
// Each character is one pixel, looked up in the palette ('.' = transparent).
// Later you can swap any of these for a real PNG: drawImage() accepts an
// <img> just as happily as the canvases made here.

export function makeSprite(rows, palette, name = 'sprite') {
  const w = rows[0].length;
  const h = rows.length;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  rows.forEach((row, y) => {
    if (row.length !== w) {
      throw new Error(`${name}: row ${y} is ${row.length} px wide, expected ${w}`);
    }
    for (let x = 0; x < w; x++) {
      const color = palette[row[x]];
      if (color === undefined) throw new Error(`${name}: unknown color '${row[x]}' at ${x},${y}`);
      if (color === null) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  });
  return canvas;
}

/** Flip pixel art horizontally (e.g. make a right-facing sprite from a left one). */
export const mirror = (rows) => rows.map((r) => [...r].reverse().join(''));

/** Flip pixel art upside down. */
export const flipY = (rows) => [...rows].reverse();

/** Swap colors in pixel art, e.g. recolor(ROOF, { r: 'i', R: 'I' }) for a pink roof. */
export const recolor = (rows, swaps) => rows.map((r) => [...r].map((c) => swaps[c] ?? c).join(''));

/** Paint `top` art over `bottom` art; '.' in `top` lets `bottom` show through. */
export const stamp = (bottom, top) => bottom.map((r, y) => [...r].map((c, x) => (top[y][x] === '.' ? c : top[y][x])).join(''));

/** Wrap pixel art sideways by n pixels (handy for cheap water animation). */
export const shiftX = (rows, n) => rows.map((r) => r.slice(-n) + r.slice(0, -n));

/** Paint `top` over `bottom` (both canvases) into a new canvas. */
export function layer(bottom, top) {
  const c = document.createElement('canvas');
  c.width = bottom.width;
  c.height = bottom.height;
  const ctx = c.getContext('2d');
  ctx.drawImage(bottom, 0, 0);
  ctx.drawImage(top, 0, 0);
  return c;
}
