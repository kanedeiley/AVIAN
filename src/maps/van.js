// Inside Wyatt's grey Sprinter van, parked on Hannahville beach. One short
// lane runs between cabinets (a stove along the top, the sink beside the door),
// from the cab seats and dashboard at the front (right) to the bed across the
// back (left). The side door is always open. Tiles are in assets/vanTiles.js.
export default {
  name: "WYATT'S VAN",
  region: 'valley',
  indoor: true, // left off the world map
  legend: {
    'W': 'vanWall',
    'w': 'vanWindow',
    '_': 'vanFloor',
    'C': 'vanCabinet',
    's': 'vanSinkLow',
    'h': 'vanStove',
    'c': 'vanCabinetLow',
    'e': 'vanSeat',
    'D': 'vanDashWheel',
    'd': 'vanDash',
    'm': 'vanStep',
  },
  rows: [
    'WWWwWWwWW',
    '__CChCCeD',
    '________d',
    '__ccs_ced',
    'WWWWWmWWW',
  ],
  // The bed fills the back of the van, wall to wall.
  props: [{ x: 0, y: 1, id: 'vanBed' }],
  warps: [
    // The open side door. Arrive back on the sand just below it, facing down.
    { x: 5, y: 4, to: 'hannahville', toX: 37, toY: 30, facing: 'down' },
  ],
  signs: [
    { x: 3, y: 0, text: ['Through the window: sand, sea, and the end of the Hannahville pier.'] },
    { x: 6, y: 0, text: ['A sun-faded sticker on the glass: NOT ALL WHO WANDER ARE LOST.'] },
    { x: 4, y: 1, text: ['A two-burner stove. The kettle is still warm. Coffee, probably.'] },
    { x: 4, y: 3, text: ['A tiny sink with a foot pump, right by the door. The water jug next to it says FILL ME.'] },
    { x: 1, y: 2, text: ['The bed fills the whole back of the van.', 'A road atlas is tucked under the pillow, every beach on the coast circled.'] },
    { x: 2, y: 3, text: ['Cabinets full of granola, hot sauce, spare fuses and one very old pair of binoculars.'] },
    { x: 8, y: 2, text: ['The dashboard is covered in stickers from every place this van has parked.'] },
  ],
};
