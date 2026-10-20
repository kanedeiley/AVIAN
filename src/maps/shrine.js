// A forest clearing north of the village. A ring of carved stones circles
// a sign; the dirt path at the bottom leads back to the village. A trail
// east leads to a cave mouth in the cliff (Echo Cave, then Eagle Peak).
export default {
  name: 'OLD SHRINE',
  legend: { R: 'cliff', C: 'caveMouth' },
  rows: [
    'TTTTTTTTTTTTTTT',
    'TTT.........RRR',
    'TT...GGGGG..RRR',
    'T....G.S.G..RRR',
    'T....G...G.:::C',
    'T*........S:RRR',
    'T......:::::RRR',
    'TT.*...:...*RRR',
    'TTTT...:...TTTT',
    'TTTTTTT:TTTTTTT',
  ],
  warps: [
    // The path out. Arrive back in the village just below the tree gap.
    { x: 7, y: 9, to: 'village', toX: 12, toY: 1, facing: 'down' },
    // The cave mouth in the cliff. Arrive just inside, facing into the dark.
    { x: 14, y: 4, to: 'cave', toX: 1, toY: 9, facing: 'right' },
  ],
  signs: [
    { x: 10, y: 5, text: ['A cold draft breathes out of the rock.', 'Scratched into the sign: THE PEAK IS THROUGH HERE.'] },
    {
      x: 7, y: 3,
      text: [
        'The stones hum softly.',
        'Something old sleeps beneath this clearing.',
      ],
    },
  ],
};
