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
//   walk     coffee: you walk this many times faster while it lasts (not on the bike)
//   wear     clothes: using it puts it on, over that part of your look (assets/player.js)
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
  // Sold at Homestead Coffee Roasters in Upper Black Eddy.
  coffee: {
    name: 'COFFEE', price: 8, kind: 'supply', max: 5,
    about: 'Walk 40% faster for 45s. Does nothing on a bike!',
    used: ['You gulp down a hot COFFEE. Your feet feel quicker already!'],
    lasts: 45, walk: 1.4,
    wornOff: ['Your COFFEE wears off. You could go for another cup...'],
    busy: 'Easy! One COFFEE at a time.',
  },
  // Clothes from SunBeam in Frenchtown. Buy one and wear it from your BAG whenever you like.
  beret: {
    name: 'BERET', price: 25, kind: 'tool',
    about: 'A maroon beret. Very Frenchtown.',
    wear: { hat: 'beret', hatColor: 'maroon' },
  },
  bucketHat: {
    name: 'BUCKET HAT', price: 20, kind: 'tool',
    about: 'A floppy khaki bucket hat. Keeps the sun off.',
    wear: { hat: 'bucket', hatColor: 'khaki' },
  },
  sunbeamTee: {
    name: 'SUNBEAM TEE', price: 15, kind: 'tool',
    about: 'A golden SunBeam T-shirt. Bright as the name.',
    wear: { top: 'sunbeam' },
  },
  flannel: {
    name: 'FLANNEL', price: 30, kind: 'tool',
    about: 'Red plaid, for cool mornings on the river.',
    wear: { top: 'flannel' },
  },
  breton: {
    name: 'BRETON SHIRT', price: 30, kind: 'tool',
    about: 'Navy stripes, like a French sailor. Ooh la la.',
    wear: { top: 'breton' },
  },
};
