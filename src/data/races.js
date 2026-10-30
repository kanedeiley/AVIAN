// Races: a run down a ski slope through slalom gates, against someone's time. A racer's DIALOGUE
// starts one from a `choices` pick that returns { lines, race } (scenes/overworld.js startRace):
// with skis on, you're put at the start, the clock counts you down, and it runs until you cross
// the finish. Go the wrong side of a gate, or stop, and you're out.
//   name     who you're racing, shown on the clock
//   map      the map it's on
//   start    where you stand for the countdown (just above the slope), facing down
//   finish   the row you cross to finish
//   record   their time, in seconds: beat it to win
//   gates    poles on the run, top to bottom: `pass` 'left' of it (a red pennant, tile gateLeft)
//            or 'right' of it (blue, gateRight)
//   flag     set when you win (data/flags.js)
//   noSkis, missed, quit, slow, won   what you're told (after the time, for slow and won)
export const RACES = {
  // REESE's race down THE CHUTE on Okemo, from the top of the run to the base.
  chute: {
    name: 'REESE',
    map: 'okemo',
    start: { x: 45, y: 7 },
    finish: 137,
    record: 22,
    gates: [
      { x: 45, y: 10, pass: 'left' },
      { x: 41, y: 21, pass: 'right' },
      { x: 42, y: 29, pass: 'left' },
      { x: 45, y: 50, pass: 'right' },
      { x: 45, y: 55, pass: 'left' },
      { x: 41, y: 75, pass: 'right' },
      { x: 46, y: 91, pass: 'left' },
      { x: 41, y: 118, pass: 'right' },
      { x: 46, y: 134, pass: 'left' },
    ],
    flag: 'beatReese',
    noSkis: ['REESE: Uh. Where are your SKIS?', 'REESE: SKI SHOP, Main Street, LUDLOW. I\'ll wait. Slowly. Like a birder.'],
    missed: ['REESE (on the radio): DQ! You went the wrong side of a gate!', 'REESE: RED, keep LEFT of it. BLUE, keep RIGHT. Ride the lift back up and try again.'],
    quit: ['REESE (on the radio): Did you just STOP? In a RACE?', 'REESE: Come back up when you\'re serious.'],
    slow: ['REESE (on the radio): Too slow! The record stands.', 'REESE: Ride the lift back up. I\'ve got all day.'],
    won: ['REESE (on the radio): NO WAY. NO WAY!', 'REESE: Stay right there. I\'m coming down.'],
  },
};
