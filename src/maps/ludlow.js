// Ludlow, Vermont, where the train north from Milford gets in. Built from
// Kane's sketch, and snowy all over (the VERMONT region is `snowy`: the day's
// weather comes down as snow). MAIN STREET runs east-west across the middle:
// west is the road up to OKEMO MOUNTAIN (maps/okemo.js), east is the road
// to New Hampshire, snowed shut (a gate) until the bus runs. North of it: the LUDLOW INN (a three-story storefront() prop,
// shut) with a fieldstone wing on its east side where the stairs go down to
// EIGHT OH BREW (maps/eightOhBrew.js), where HANNAH is. A creek comes down from
// the north and takes a windy turn east; the road north crosses it on a little
// bridge and turns east past a row of houses. South of Main St: a row of shops
// facing a sidewalk behind them (the SKI SHOP is open, maps/skiShop.js; the
// rest are shut), a frozen pond, and LUDLOW STATION (inside:
// maps/ludlowStation.js) with its platform and the railroad running south from
// a bumper. Tiles are in assets/ludlowTiles.js (snow and snowy pines in
// caveTiles.js, house sidings in farmTiles.js and canalTiles.js); the shops are
// snowy storefront() props (assets/storeTiles.js). The rows were painted with
// a script. Up a footpath between the creek and the houses, north, is
// BLACK RIVER WOODS (maps/blackRiverWoods.js), snowed shut until HANNAH calls her club's first
// meeting; and once she's given you a ticket, the bus east to the WHITE
// MOUNTAINS (maps/pinkhamNotch.js) waits at the stop near the end of Main St,
// where the plows have finally cleared the road east.
const ROWS = [
  'ppppppppppppppppppppps~~,,111h1ssssss111h1ss111h1s111h1s',
  'pspsspssssssspssssspss~~,,22222ssssss22222ss22222s22222s',
  'psssssssspssssssspssss~~,,33333ssssss33333ss33333s33333s',
  'ppssssssssssssssssssss~~,,45454ssssssABABAssGHGHGs45454s',
  'psspsssssssssssssspss~~~,,67876ssssssDEFEDssGHJHGs67876s',
  'pssssssssssssssssssss~~s,,,,,ssss###-------------------b',
  'ppsssssssssssssssssss~~sspss,ssss###-------------------b',
  'pssssssssssssssssssps~~sssss,,,,,###-------------------b',
  'pspssssssssssss^^^sss~~sssspsssss###sssssssspsssssssssss',
  'psssssssssssssswXwsss~~ssssssssss###ss~~~~~~~~sspssspsss',
  'psssslssssssssswZLsss~~~~~~~ss~~[###]~~~~~~~~~~~~~~sssss',
  'pssMssssss,sssss,ssss~~~~~~~~~~~[###]~~~ssss~~~~~~~~~~~~',
  'psssssssss,sssss,sssssssss~~~~~~s###sssssssssssss~~~~~~~',
  'sS,,l,,,,,,,,,l,,,,,,,,,,l,,,,,,,###,,S,,,,,l,S,,,,,l,,S',
  '--------------------------------------------------------',
  '--------------------------------------------------------',
  '--------------------------------------------------------',
  'p,,,,l,,,,,,,,,,,,,,l,,,,,,,,,,,,,,l,,,,,,,,,,,,,,,,,,,p',
  'psssssss,,ssssss,,sssss,,sssss,,sssss,,,sssss,,Ysssssssp',
  'psssssss,,ssssss,,sssss,,sssss,,sssss,,,sssss,,Rsssssssp',
  'psssssss,,ssssss,,sssss,,sssss,,sssss,,,sssss,,Rsssssssp',
  'psssssss,,ssssss,,sssss,,sssss,,sssss,,,sssss,,Rsssssssp',
  'p,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,sssss,,Rsssssssp',
  'pssssssssssssssssssssssssssssssssssssss,sssss,,Rsssssssp',
  'pssssssssssssssssssssssssssssssssssssss,,,,,,,,Rsssssssp',
  'pssssssssiiiiisssssssssssssssssssssssssssssss,,Rsssssssp',
  'psssssssiiiiiiispsssssssspsssssssspssssssssps,,Rsssspssp',
  'psssssssiiiiiiissspsssssssspsssssssspssssssss,,Rsssssspp',
  'pspsssssiiiiiiissssspsssssssspsssssssspssssss,,Rsssssssp',
  'pssspssssiiiiisssssssspsssssssspsssssssspssss,,Rspsssssp',
  'pssssspssssssssssssssssspsssssssspsssssssspss,,Rssspsssp',
  'pssssssspsssssssspsssssssspsssssssspssssssssp,,Rssssspsp',
  'ppsssssssspsssssssspsssssssspsssssssspsssssss,,Rsssssssp',
  'pppppppppppppppppppppppppppppppppppppppppppppppRpppppppp',
];

// The frozen pond: every ice tile gets the same sign.
const ICE = ROWS.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'i' ? [{ x, y }] : [])));

export default {
  name: 'LUDLOW',
  region: 'vermont',
  banks: true, // muddy edges where the creek meets the snow (assets/banks.js)
  legend: {
    's': 'snow',
    'p': 'snowyPine',
    '~': 'water',
    '-': 'plowedRoadEW',
    '#': 'plowedRoad',
    ',': 'shoveled',
    'b': 'snowbank',
    'l': 'lampPostSnow',
    'S': 'signSnow',
    'M': 'snowman',
    'i': 'ice',
    // the inn's fieldstone wing, with the way down to Eight Oh Brew
    '^': 'snowEave',
    'w': 'fieldstone',
    'X': 'cellarSign',
    'Z': 'cellarArch',
    'L': 'cellarLanternStone',
    '[': 'bridgeRailW',
    ']': 'bridgeRailE',
    // the railroad south from the station
    'R': 'snowyRail',
    'Y': 'snowyRailBumper',
    // houses with snowy roofs: yellow, white and fieldstone
    '1': 'snowRidge',
    'h': 'snowChimney',
    '2': 'snowRoof',
    '3': 'snowEave',
    '4': 'yellowSiding',
    '5': 'yellowWindow',
    '6': 'yellowSidingBase',
    '7': 'yellowWindowBase',
    '8': 'cooperDoor',
    'A': 'whiteSiding',
    'B': 'whiteWindow',
    'D': 'whiteSidingBase',
    'E': 'whiteWindowBase',
    'F': 'marshallDoor',
    'G': 'fieldstone',
    'H': 'fieldstoneWindow',
    'J': 'fieldstoneDoor',
  },
  rows: ROWS,
  // Chickadees and juncos everywhere, woodpeckers in the pines, grosbeaks and redpolls (on gray days) at the feeders, owls at night.
  birds: { count: 12, table: ['chickadee', 'chickadee', 'chickadee', 'junco', 'junco', 'downyWoodpecker', 'eveningGrosbeak', 'redpoll', 'snowBunting', 'hermitThrush', 'ruffedGrouse', 'barredOwl', 'raven'], rare: ['pileatedWoodpecker', 'snowyOwl'], rareChance: 0.15 },
  warps: [
    // Into Ludlow Station, for the train back south.
    { x: 42, y: 22, to: 'ludlowStation', toX: 6, toY: 7, facing: 'up' },
    // West: the road up to Okemo.
    ...[14, 15, 16].map((y) => ({ x: 0, y, to: 'okemo', toX: 59, toY: y + 128, facing: 'left' })),
    // Into the ski shop.
    { x: 5, y: 21, to: 'skiShop', toX: 5, toY: 6, facing: 'up' },
    // Through the arch in the inn's stone wing and down the stairs into Eight Oh Brew.
    { x: 16, y: 10, to: 'eightOhBrew', toX: 6, toY: 7, facing: 'up' },
    // North, up the footpath between the creek and the houses: BLACK RIVER WOODS, snowed shut until
    // HANNAH calls the club's first meeting.
    ...[24, 25].map((x) => ({
      x, y: 0, to: 'blackRiverWoods', toX: x - 10, toY: 28, facing: 'up',
      locked: { flag: 'clubWalkCalled', tile: 'snowbank', text: ['Snow is drifted deep over a footpath into the woods.', 'Nobody\'s walked it all winter.'] },
    })),
    // The bus to the WHITE MOUNTAINS, parked at the stop near the east end of Main St once HANNAH has given you a ticket.
    { x: 45, y: 15, to: 'pinkhamNotch', toX: 25, toY: 11, facing: 'down', bus: 'the WHITE MOUNTAINS', after: 'busTicket' },
  ],
  // MAIN STREET east, ROUTE 103 to New Hampshire: snowed shut until the plows clear it for the bus,
  // the night HANNAH gives you a ticket. After that it runs on off the east edge, where the bus goes.
  gates: [14, 15, 16].map((y) => ({
    x: 55, y,
    locked: { flag: 'busTicket', tile: 'snowbank', text: ['A snowbank across MAIN STREET.', 'ROUTE 103 east to NEW HAMPSHIRE. Closed until the plows get through.'] },
  })),
  props: [
    { x: 6, y: 5, id: 'ludlowInnFront' },
    { x: 2, y: 18, id: 'skiShopFront' },
    { x: 10, y: 18, id: 'mapleFront' },
    { x: 18, y: 18, id: 'ludlowBooksFront' },
    { x: 25, y: 18, id: 'ludlowCafeFront' },
    { x: 32, y: 18, id: 'outfitterFront' },
    { x: 40, y: 19, id: 'ludlowStationFront' },
    { x: 42, y: 14, id: 'mountainBus', after: 'busTicket' },
  ],
  signs: [
    { x: 38, y: 13, text: ['LUDLOW, VERMONT', 'North: the bridge over the creek. South: the shops and the station.'] },
    { x: 1, y: 13, text: ['ROAD TO OKEMO', 'West, up to the mountain. Get some skis at the SKI SHOP!'] },
    ...[5, 6, 7].map((y) => ({ x: 55, y, text: ['A snowbank across the road.', 'The houses back here are as far as the plows got.'] })),
    { x: 55, y: 13, text: ['ROUTE 103 EAST', 'To NEW HAMPSHIRE and the WHITE MOUNTAINS. Too far to walk: take the BUS!'] },
    { x: 46, y: 13, text: ['BUS STOP', 'Service east to the WHITE MOUNTAINS is suspended until the roads are clear.'], until: 'busTicket' },
    { x: 46, y: 13, text: ['BUS STOP', 'East to the WHITE MOUNTAINS. The bus is waiting!'], after: 'busTicket' },
    { x: 10, y: 10, text: ['LUDLOW INN', 'A sign on the door: NO VACANCY. IT\'S SKI SEASON!'] },
    ...[[15, 10], [16, 9]].map(([x, y]) => ({ x, y, text: ['A pink neon sign hangs over the stairs: 802.', 'EIGHT OH BREW. DOWN THE STAIRS.'] })),
    { x: 17, y: 10, text: ['An iron lantern, flickering on the stone.'] },
    { x: 3, y: 11, text: ['A snowman with a pinecone smile.', 'Someone gave it a ski pass on a string.'] },
    { x: 5, y: 21, text: ['SKI SHOP', 'Skis, poles and tune-ups. Open!'] },
    { x: 13, y: 21, text: ['MAPLE SUGAR', 'Closed for the day. It smells like pancakes out here anyway.'] },
    { x: 20, y: 21, text: ['BOOKSTORE', 'Closed. A cat is asleep on a stack of field guides in the window.'] },
    { x: 27, y: 21, text: ['COCOA CAFE', 'Closed. A chalkboard: HOT COCOA AND DONUTS. OPEN AT 7.'] },
    { x: 34, y: 21, text: ['OUTFITTER', 'Closed. Mittens, wool socks and snowshoes in the window.'] },
    { x: 42, y: 22, text: ['LUDLOW STATION', 'Trains south to MILFORD, N.J.'] },
    { x: 47, y: 18, text: ['END OF THE LINE', 'The rails run south from here, all the way back to MILFORD.'] },
    { x: 28, y: 4, text: ['Nobody\'s home. A pair of skis leans by the door.'] },
    { x: 39, y: 4, text: ['Nobody\'s home. Somebody shoveled the step, at least.'] },
    { x: 46, y: 4, text: ['Wood smoke from the chimney, but nobody answers.'] },
    { x: 52, y: 4, text: ['A wreath of pine on the door. Nobody\'s home.'] },
    ...ICE.map(({ x, y }) => ({ x, y, text: ['A frozen pond. The ice looks thin.', 'Better not.'] })),
  ],
};
