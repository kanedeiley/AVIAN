// The first stop past Willow Valley: a quiet meadow pasture on the far side of the
// mountain, through the rockfall in Echo Cave that opens once you've beaten
// the Bald Eagle. A dirt trail runs from the cave mouth (west) past a horse
// paddock and a pond to a gate in the east hedge, and on to Van Sant Airport.
export default {
  name: 'LARK MEADOW',
  region: 'plains',
  legend: {
    'R': 'cliff',
    'C': 'caveMouth',
    'o': 'boulder',
    'h': 'hayBale',
    '=': 'railFence',
    '!': 'railFenceSide',
  },
  rows: [
    'RRRRRTTTTTTTTTTTTTTTTTTT',
    'RRRR..,,,,....*...,,,..T',
    'RRRo.,,,,,,..========..T',
    'RR...S,,*,,..!..h...!..T',
    'C:::::::::...!......!*.T',
    'RR..*....:...!...h..!..T',
    'RRR.,,,..:...!......!..T',
    'RRRo,,,..:...========..T',
    'RRR......::::::::......T',
    'RR..~~~....*.,,,::::::::',
    'RR.~~L~~..,,,,,,..*....T',
    'RRR.~~~..,,,,,,,,......T',
    'RRRR.....*..,,,..TT..*.T',
    'RRRRRTTTTTTTTTTTTTTTTTTT',
  ],
  warps: [
    // Back into Echo Cave, just inside the cleared passage.
    { x: 0, y: 4, to: 'cave', toX: 20, toY: 4, facing: 'left' },
    // Through the gate in the east hedge, onto the airport driveway.
    { x: 23, y: 9, to: 'airport', toX: 1, toY: 13, facing: 'right' },
  ],
  signs: [
    { x: 5, y: 3, text: ['LARK MEADOW', 'West: ECHO CAVE. East: VAN SANT AIRPORT.', 'Please keep to the trail, and mind the horse.'] },
  ],
  // They stay inside the paddock fence.
  npcs: [
    { id: 'horse', x: 15, y: 4, area: [14, 3, 19, 6], text: ['The horse flicks its tail at a fly.', 'It doesn\'t seem to get many visitors out here.'] },
    { id: 'goatBrown', x: 18, y: 6, area: [14, 3, 19, 6], text: ['The goat chews a mouthful of clover and stares at you.'] },
  ],
  birds: { count: 6, table: ['meadowlark', 'meadowlark', 'bobolink', 'killdeer', 'goldfinch'], rare: ['kestrel'], rareChance: 0.12 },
};
