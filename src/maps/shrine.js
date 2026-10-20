// A forest clearing north of the village. A ring of carved stones circles
// a sign; the dirt path at the bottom leads back to the village.
export default {
  name: 'OLD SHRINE',
  rows: [
    'TTTTTTTTTTTTTTT',
    'TTT.........TTT',
    'TT...GGGGG...TT',
    'T....G.S.G....T',
    'T....G...G....T',
    'T*............T',
    'T......:......T',
    'TT.*...:...*.TT',
    'TTTT...:...TTTT',
    'TTTTTTT:TTTTTTT',
  ],
  warps: [
    // The path out. Arrive back in the village just below the tree gap.
    { x: 7, y: 9, to: 'village', toX: 12, toY: 1, facing: 'down' },
  ],
  signs: [
    {
      x: 7, y: 3,
      text: [
        'The stones hum softly.',
        'Something old sleeps beneath this clearing.',
      ],
    },
  ],
};
