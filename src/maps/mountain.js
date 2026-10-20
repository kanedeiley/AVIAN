// The mountain above Echo Cave. A trail climbs from the cave mouth (bottom)
// through a pine wood, up a cliff gap to an alpine meadow with a little lake,
// and through one more gap to the snowy summit and its cairn.
export default {
  name: 'EAGLE PEAK',
  legend: {
    'R': 'cliff',
    'C': 'caveMouth',
    'P': 'pine',
    'p': 'snowyPine',
    'o': 'boulder',
    's': 'snow',
    'X': 'cairn',
  },
  rows: [
    'RRRRRRRRRRRRRRRRRRRRRRRRRR',
    'RRRRRRRRRsssssssRRRRRRRRRR',
    'RRRRRRRpsssssXssspRRRRRRRR',
    'RRRRRRsssssss:ssssssRRRRRR',
    'RRRRRpsssssss:sssssspRRRRR',
    'RRRRssspsssss:ssspsssssRRR',
    'RRRRRRRRRRRRR:RRRRRRRRRRRR',
    'RRRRR.*..o...:...*.,,,RRRR',
    'RRRR..,,....::..o..,,,.RRR',
    'RRR*.,,,..:::..~~~..*...RR',
    'RRR..o...::...~~~~~..o..RR',
    'RR..*...::.*..~~~~....*.RR',
    'RR.....:::......*...o...RR',
    'RRRRRRR:RRRRRRRRRRRRRRRRRR',
    'RRPPP..:..PP,,,.PPPPPPPPRR',
    'RPP...::..,,,,,...PP..PPRR',
    'RP..*.:...P,,,..*....*.PRR',
    'RPP...:..PPP...,,,.PP..PRR',
    'RRPP..:.....*..,,,...PPPRR',
    'RRRPP.:::...PP.......PPRRR',
    'RRRRPPP.::.SPPPPPPPPPRRRRR',
    'RRRRRRRRRRCRRRRRRRRRRRRRRR',
  ],
  warps: [
    // Back down into the cave, just below its opening.
    { x: 10, y: 21, to: 'cave', toX: 17, toY: 1, facing: 'down' },
  ],
  signs: [
    { x: 11, y: 20, text: ['EAGLE PEAK TRAIL', 'Summit straight up. Mind the cliffs, and the eagles!'] },
    { x: 13, y: 2, text: ['SUMMIT OF EAGLE PEAK', 'Far below, you can just make out the shrine stones and the village roofs.'] },
  ],
  birds: { count: 6, table: ['raven', 'raven', 'ptarmigan', 'ptarmigan', 'wren', 'eagle'] },
};
