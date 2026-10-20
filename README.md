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

## Online saves (Supabase)

With Supabase keys in `.env`, the game opens on a sign-in screen (email + password).
Your journal and money are then saved to a Supabase database as well as the browser,
so you can carry on from another device. **Play offline** skips it, and the bar under the
game lets you sign in later. Signing in keeps the best photo of each bird from both
this browser and your account, so nothing you did offline is lost. Without keys (or with a plain
web server instead of `serve.py`) the game runs offline as before.

One-time setup in the Supabase dashboard:

1. **SQL Editor** → New query → paste `supabase/schema.sql` → Run. This makes the `saves`
   table and the security rules that keep each player's save private.
2. **Authentication → Sign In / Providers → Email**: turn **Confirm email** off, so new
   accounts can play right away without a confirmation link.
3. **Project Settings → API**: copy the Project URL and the anon (or publishable) key into
   a `.env` file (`cp .env.example .env`). `serve.py` hands them to the game. For the live
   site, add the same two names, `SUPABASE_URL` and `SUPABASE_KEY`, on GitHub under
   **Settings → Secrets and variables → Actions → Variables**. Both values are safe to
   publish. Never use the `service_role` / secret key.

How it fits together: `cloud.js` talks to Supabase (the library is loaded from a CDN only
when the config is filled in), `signIn.js` is the sign-in form and account bar (the HTML
is in `index.html`), and `save.js` calls a hook after every save that sends it online.

Note: the database trusts what the game sends, so a player could edit their own money in
the browser. That's fine while fares are $0. Once money matters, move fares and rewards
into a Supabase database function.

## Deploying

`.github/workflows/pages.yml` publishes the game to GitHub Pages on every push to `main`
(at https://kanedeiley.github.io/AVIAN/). It copies `index.html` and `src/` as they are,
with no build step. Setup, once: on GitHub, **Settings → Pages → Source: GitHub Actions**.

## Layout

```
src/
  main.js            game loop, scene switching, screen fades, signing in at startup
  cloud.js           online saves with Supabase (keys come from .env, see .env.example)
  signIn.js          the sign-in form and account bar
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
  data/voyages.js    boat trips: fare, stops, which seabirds turn up
  scenes/overworld.js  walking, collisions, warps, bird sightings
  scenes/photo.js      the photo minigame (keep the bird in frame, snap)
  scenes/voyage.js     the bird-watching boat trip (pick one bird per stop)
  gfx/ocean.js         the sea backdrop shared by the voyage and the photo minigame
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
- **NPCs** (for now, Hannah's puppies) are listed in the map's `npcs`:
  `npcs: [{ id: 'macie', x: 1, y: 26, area: [0, 24, 14, 29], text: ['...'] }]`.
  They wander inside `area`, block the player, and talk when you face them and press A.
  Their sprites are in `assets/dogs.js`; the behavior is in `scenes/npcs.js`.
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

## Bird-watching voyages

Moored along the east side of Hannahville's pier is a tour ship (4x3 tiles). Face any
part of it and press A: the captain explains the trip, tells you the fare and asks if you want to board.
The boat makes a few stops. At each one a flock of seabirds gathers around the boat, some
floating and some gliding overhead, and birds keep arriving and leaving. Press left/right
to pick one (the panel shows **NEW!** for species missing from your journal) and A to
photograph it in the usual minigame, this time on the ocean. You only get one bird per
stop, so you have to choose. A bird showing `?` is about to leave and will be jumpy in the
photo. B heads back to the pier early.

Seabirds (tern, puffin, cormorant, pelican and the rare albatross) only turn up on
voyages, and the journal lists the voyage as where they live.

**Money:** `game.money` is saved in the browser next to the journal. Boarding checks it
against the voyage's `price` and takes the fare. The Bay Tour costs $0 for now, and
there's no way to earn money yet. To charge for a trip, set its `price` in `data/voyages.js`.

**Adding a voyage:** add an entry to `data/voyages.js`, then give a prop on a map a
`voyage` field: `props: [{ x: 21, y: 31, id: 'tourShip', voyage: 'bay' }]`.

### Big props

Art bigger than one tile (like the tour ship) is drawn as one piece in
`assets/coastTiles.js` and cut into 16x16 tiles by `bigProp()`. A map places it with
`props: [{ x, y, id }]`, where (x, y) is its top-left tile. This saves using up map
characters, and the loader checks that the prop fits on the map.
