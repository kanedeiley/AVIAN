// Things you can buy at a store (a shopkeeper's `shop` list, see scenes/shop.js)
// and use from your BAG (I). What you own is saved in game.progress.items.
//   name     shown in the shop and the bag
//   price    dollars, checked against game.money
//   kind     'tool': you buy one and keep it; 'supply': you buy them by the
//            handful (up to `max`) and each use spends one
//   about    the shop's pitch, shown under the list: keep it to 2 lines (54 characters or so)
//   used     what you're told when you use it
//   lasts    seconds one use works for (the overworld counts it down)
//   wornOff  what you're told when it wears off
//   busy     what you're told if you use another while one is still going
// Their effects:
//   range    binoculars: how many tiles away you can photograph a bird (normally 2)
//   ride     the bike: using it gets on or off; `speed` times faster, `noise`
//            times more noticeable to birds (see scenes/fieldBirds.js)
//   feeds    birdseed: scattered in front of you, it calms birds nearby and draws them in
export const ITEMS = {
  binoculars: {
    name: 'BINOCULARS', price: 15, kind: 'supply', max: 5,
    about: 'Snap birds from 5 tiles off. A pair lasts 45s.',
    used: ['You raise a pair of BINOCULARS. Far-off birds look close enough to touch!'],
    lasts: 45, range: 5,
    wornOff: ['Your BINOCULARS fog up for good. Time for a new pair!'],
    busy: 'You already have BINOCULARS up!',
  },
  bike: {
    name: 'BICYCLE', price: 150, kind: 'tool',
    about: 'Ride 50% faster, but birds hear you coming!',
    ride: true, speed: 1.5, noise: 1.6,
  },
  birdseed: {
    name: 'BIRDSEED', price: 5, kind: 'supply', max: 9,
    about: 'Scatter some: nearby birds calm down and come eat.',
    used: ['You scatter a handful of BIRDSEED. Nearby birds look interested...'],
    lasts: 25, feeds: true,
    busy: 'The birds are still busy with your last handful.',
  },
};
