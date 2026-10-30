// Story flags: things you've done that the game remembers (game.progress.flags).
// An NPC sets one when you talk to it (`sets` on a map's npc), and a nemesis
// can require one before it lets you near. Each flag's text is the hint shown
// while you still need it.
export const FLAGS = {
  metHannah: 'Talk to HANNAH at her house in HANNAHVILLE.',
  metHannahErwinna: 'Find HANNAH by the canal in ERWINNA, east of VAN SANT AIRPORT.',
  metAsa: 'Talk to ASA in the COOPERS\' backyard in UPPER BLACK EDDY, up the towpath north of TINICUM.',
  wyattWentNorth: 'Show WYATT a photo of a PEREGRINE FALCON, by his van on the canal path in FRENCHTOWN.',
  metMilfordAgent: 'Talk to the STATION AGENT at MILFORD STATION.',
  metHannahLudlow: 'Find HANNAH at EIGHT OH BREW, down the cellar stairs by the hotel in LUDLOW.',
  metHannahTinicum: 'Find HANNAH on the ball fields at TINICUM PARK, up the towpath north of ERWINNA.',
  // Vermont: DANIEL, the quiet owl birder who never made it to HANNAH's club meeting.
  danielMissing: 'Show HANNAH what you found up on OKEMO. She\'s at EIGHT OH BREW in LUDLOW.',
  searchBog: 'Tell SKI PATROL at the OKEMO summit where to look for DANIEL.',
  foundDaniel: 'Find DANIEL, out past the ropes on the north side of OKEMO.',
  danielJoined: 'Tell DANIEL about the owl. He\'s resting up at EIGHT OH BREW.',
  // Vermont: WYATT, parked at the bottom of OKEMO, who has never stayed anywhere long enough to join anything.
  metWyattOkemo: 'Find WYATT\'s van, parked at the bottom of OKEMO MOUNTAIN.',
  wyattJoined: 'Beat WYATT\'s record with the PILEATED WOODPECKER behind his van, then tell him.',
  // Vermont: REESE, the ski-team kid at the top of THE CHUTE who thinks birding is for slow people.
  metReese: 'Find REESE at the top of THE CHUTE, on the OKEMO summit.',
  beatReese: 'Beat REESE\'s time down THE CHUTE, through every gate (with skis on).',
  metReeseBase: 'Talk to REESE at the bottom of THE CHUTE, after you beat their time.',
  reeseJoined: 'Photograph the bird that races REESE down THE CHUTE, and show them.',
  // Vermont: the VERMONT CHAPTER's first meeting, a guided walk in BLACK RIVER WOODS, then a party at EIGHT OH BREW.
  clubFormed: 'Get DANIEL, WYATT and REESE into HANNAH\'s club, then tell her at EIGHT OH BREW.',
  clubWalkCalled: 'Hear HANNAH out about the club\'s first meeting, at EIGHT OH BREW.',
  walkBirdsSeen: 'Photograph the bird each club member shows you in BLACK RIVER WOODS, up the footpath north of LUDLOW.',
  clubWalkDone: 'Meet HANNAH at the OVERLOOK at the end of the trail in BLACK RIVER WOODS.',
  busTicket: 'Find HANNAH at the club\'s party at EIGHT OH BREW.',
};
