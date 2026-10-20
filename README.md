# Poki

A tiny Pokémon-style game. Plain JavaScript and an HTML canvas, with no build step.

## Run it

ES modules need a web server (opening the file directly won't work). `serve.py` is a
simple server that turns off browser caching, so a normal refresh always shows your edits:

```sh
python3 serve.py
# then open http://localhost:8000
```

**Controls:** arrows / WASD to walk, Z / Enter / Space = A, X / Esc = B.
Tap a direction to turn in place; hold it to walk.

Dev shortcut: `http://localhost:8000/?map=house&x=4&y=6` starts you on any map.

## Layout

```
src/
  main.js            game loop, scene switching, screen fades
  config.js          tile size, screen size, walk speed
  input.js           keys -> actions ('up', 'a', 'b', ...)
  gfx/sprite.js      text pixel art -> images
  gfx/ui.js          text boxes and font
  assets/palette.js  the shared color palette
  assets/tiles.js    every tile: art + rules (solid, encounter, ...)
  assets/player.js   the player's walk cycle
  maps/              one file per map, plus the registry (index.js)
  data/creatures.js  creature species (battle data will grow here)
  scenes/overworld.js  walking, collisions, warps, encounters
  scenes/battle.js     placeholder battle screen
```

## How assets work

### 1. Pixel art is text

Each character is one pixel and maps to a color in `assets/palette.js`
(`.` is transparent):

```js
const TABLE = [
  '................',
  '..kkkkkkkkkkkk..',
  '.knnnnnnnnnnnnk.',   // k = outline, n = wood
  ...                    // 16 rows of 16
];
```

If a row has the wrong width or uses a character that isn't in the palette,
you get a clear error in the browser console.

To use real image files later, load an `<img>` and put it where a sprite
goes. `drawImage()` accepts images and the generated canvases the same way.

### 2. Tiles are art plus rules

In `assets/tiles.js`:

```js
tallGrass: { art: TALL_GRASS, encounter: true, coversFeet: true },
water:     { frames: [WATER, shiftX(WATER, 3)], frameTime: 0.6, solid: true },
table:     { art: TABLE, base: 'floor', solid: true },
```

| property     | meaning |
|--------------|---------|
| `art`        | 16×16 pixel art |
| `frames` + `frameTime` | animated tile |
| `base`       | tile drawn underneath (fills `.` holes) |
| `solid`      | can't walk onto it |
| `encounter`  | can start a wild battle |
| `coversFeet` | drawn over the player's feet |

Then give it a map character in `LEGEND` at the bottom of the file.

**Adding a tile:** draw the art, add a `DEFS` entry, add a `LEGEND` character.

### 3. Maps are text plus data

```js
export default {
  name: 'WILLOW VILLAGE',
  rows: [
    'TTTTTTTT',
    'T..RRRR.',
    'T..WHDW.',   // D = door
    ...
  ],
  warps: [{ x: 5, y: 4, to: 'house', toX: 4, toY: 6, facing: 'up' }],
  encounters: { rate: 0.12, table: ['sproutle', 'puddlefin'] },
};
```

- **Warps** connect maps. Stepping on (x, y) fades out and puts you on map
  `to` at (`toX`, `toY`). The house door and the doormat inside point at each other.
- **Signs** are a `sign` tile (`S`) plus text in the map's `signs` list:
  `signs: [{ x: 11, y: 2, text: ['First box', 'Second box'] }]`.
  Face the sign and press A. Long text wraps and pages by itself.
- A map can add its own characters with a `legend: { 'X': 'someTile' }` field.
- The loader checks warps and signs: one placed outside the map, a warp on a
  solid tile, or a warp that lands off its target map shows an error in the
  browser console instead of failing silently.

**Adding a map:** create `maps/whatever.js`, register it in `maps/index.js`,
and add a warp to it from an existing map.

### 4. Scenes

A scene is any object with `update(dt)` and `draw(ctx)`. `game.transition(fn)`
fades to black, runs `fn` (change map or scene), then fades back in. The
overworld hands itself to the battle scene, which returns to it when the
battle ends. Later you can add menus, a bag, and so on the same way.

## Next steps toward battles

1. Give creatures stats and moves in `data/creatures.js`.
2. Add a party to the player (`game.party = [...]`).
3. Grow `scenes/battle.js` into a state machine:
   intro → choose action → resolve turn → win/lose → return.
