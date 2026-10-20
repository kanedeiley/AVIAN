# AVIAN

A tiny bird-watching game in the style of the GBA Pokémon games. Plain JavaScript and an HTML canvas, with no build step.

## Run it

ES modules need a web server (opening the file directly won't work). `serve.py` is a
simple server that turns off browser caching, so a normal refresh always shows your edits:

```sh
python3 serve.py
# then open http://localhost:8000
```

**Controls:** arrows / WASD to walk, Z / Enter / Space = A, X / Esc = B, M / Tab = world map, J = journal.
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
  assets/tiles.js    every tile: art + rules (solid, perch, cover, ...)
  assets/coastTiles.js  the Italian seaside town's tiles (houses, terraces, beach)
  assets/player.js   the player's walk cycle
  assets/birds.js    the bird sprite, recolored per species
  maps/              one file per map, plus the registry (index.js)
  data/birds.js      bird species: colors and how they move
  scenes/overworld.js  walking, collisions, warps, bird sightings
  scenes/photo.js      the photo minigame (keep the bird in frame, snap)
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
| `encounter`  | can start a bird sighting |
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
  encounters: { rate: 0.12, table: ['robin', 'wren'] },
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
overworld hands itself to the photo scene, which returns to it when the
bird flies off. Later you can add menus, a field journal screen, and so on the same way.

## The photo minigame

Stepping in tall grass can start a sighting. A bird lands on a branch and hops
around; hold left/right to keep the viewfinder on it. The FOCUS meter fills
while it's in frame and drains when it isn't. Press A to snap: a full meter is
a 3-star photo. You have 3 shots, each one startles the bird, and it flies off
when its patience runs out. The best photo per species goes in the journal
(`game.journal`, press J to view it), which is saved in the browser's
localStorage so it survives a reload (see `save.js`).

How hard a bird is comes from its numbers in `data/birds.js` (speed, hop
distance, pauses, patience, focus time).
