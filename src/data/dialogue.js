// What story characters say. A map's npc with `talk: 'hannah'` calls
// DIALOGUE.hannah(game) each time you talk to it, so the lines can follow your
// progress. Each string is a page or two in the text box.
import { NEMESES } from './nemeses.js';
import { RIVALS } from './rivals.js';
import { VOYAGES } from './voyages.js';
import { REGIONS } from './regions.js';
import { RACES } from './races.js';
import { beatNemesis, beatRival, regionPhotos, playerName, setFlag } from '../progress.js';

// DANIEL's trail (data/collectibles.js): the things he dropped on his way to TAMARACK BOG.
const DANIELS_THINGS = ['danielsMittens', 'danielsNotebook', 'danielsThermos', 'danielsBinoculars'];

// What HANNAH says about DANIEL's thread: it starts when you show her his mittens, and ends with him
// in her club. Nothing until you've found the mittens.
function hannahOnDaniel(game, name) {
  const { flags, collectibles } = game.progress;
  if (flags.danielJoined) {
    return ['HANNAH: Our first VERMONT member! DANIEL signed up the second he saw your owl photo.'];
  }
  if (flags.foundDaniel) {
    return [
      'HANNAH: You FOUND him! Ski patrol brought him down on a toboggan. He\'s in the corner with his ankle up.',
      beatNemesis(game, 'greatGrayOwl')
        ? 'Wait, you got the OWL too?! Go show DANIEL. He\'s going to lose his mind.'
        : 'He won\'t stop talking about some owl out on that bog. Go talk to him!',
    ];
  }
  if (flags.danielMissing) {
    const found = DANIELS_THINGS.filter((id) => collectibles[id]).length;
    return [
      'HANNAH: Any sign of DANIEL? I can\'t stop thinking about those mittens.',
      `You've found ${found} of his things so far. Look for anything else he dropped, then tell SKI PATROL at the top of OKEMO where you think he went.`,
    ];
  }
  if (collectibles.danielsMittens) {
    setFlag(game, 'danielMissing');
    return [
      'HANNAH: Wait, are those MITTENS? Let me see the tag...',
      'DANIEL?! These are DANIEL\'s! Quiet guy, up before dawn every day looking for owls. Best ears in VERMONT.',
      'I\'m starting a VERMONT chapter of the bird club, and he was going to be our very first member.',
      'He promised he\'d come to the first meeting. He never showed. And now his mittens turn up on the mountain...',
      `That's not like him, ${name}. Not at all.`,
      'Go tell SKI PATROL at the top of OKEMO. And keep your eyes open: if he dropped these, he might have dropped other things too.',
    ];
  }
  return [];
}

// What HANNAH says about REESE, the kid on the ski team who laughed at her club flyer. Like
// hannahOnWyatt, it always follows something else she's said.
function hannahOnReese(game) {
  const { flags } = game.progress;
  if (flags.reeseJoined) return ['And REESE joined! The ski team kid! They keep telling me shrikes are "basically tiny raptors". They\'re right.'];
  if (flags.beatReese) return ['You beat REESE down THE CHUTE?! Now they won\'t stop talking about some bird that races them. Go help them out!'];
  if (flags.metReese) return ['REESE challenged you to a race? Of course. That kid laughed at my club flyer. Out loud. In the LODGE.'];
  return [
    'And there\'s a kid on the ski team who hangs out at the top of THE CHUTE. REESE. They laughed at my club flyer.',
    'Think you could change their mind? Bring your SKIS.',
  ];
}

// What HANNAH says about WYATT: she spotted his van at the bottom of OKEMO, and she's been trying to
// get him into the club for years. It always follows something else she's said, so no name tag.
function hannahOnWyatt(game) {
  const { flags } = game.progress;
  if (flags.wyattJoined) {
    return [
      'And WYATT! WYATT signed up! I\'ve been asking him for THREE YEARS. What did you do to him?',
      'Never mind. Don\'t tell me. He\'s wearing a name tag. I\'m not going to ruin it.',
    ];
  }
  if (flags.metWyattOkemo) {
    return [
      'WYATT wants a rematch? Of course he does. He has never once lost gracefully.',
      'Beat his record and he\'ll come around. I know him.',
    ];
  }
  return [
    'Oh! Guess whose van is snowed in at the bottom of OKEMO? WYATT\'s!',
    'I\'d LOVE to get him in the VERMONT chapter. But he\'s never stayed anywhere long enough to join anything.',
    'Go say hi. Maybe he\'ll listen to you.',
  ];
}

export const DIALOGUE = {
  // Hannah runs the bird club and is your guide: she met you in the intro
  // (scenes/intro.js), knows your name, and always has your next assignment.
  // This is her at home; once you've beaten the BALD EAGLE she's in Erwinna (hannahErwinna).
  hannah(game) {
    const name = playerName(game);
    const eagle = NEMESES.baldEagle;
    const need = eagle.requires.species;
    const { have } = regionPhotos(game, eagle.region);
    const region = REGIONS[eagle.region].name;

    if (!game.progress.flags.metHannah) {
      return [
        `HANNAH: ${name}, you made it! Come in, come in. Welcome to the bird club.`,
        'Now, your first real assignment. Every birder has a NEMESIS BIRD: the one that always gets away.',
        'Mine is the BALD EAGLE at the top of EAGLE PEAK, up through ECHO CAVE.',
        `It won't let a beginner near. Photograph ${need} kinds of ${region} birds first.`,
        `You have ${have} so far. Press J to check your journal!`,
        'Then go get my eagle, and come tell me all about it.',
      ];
    }
    if (have < need) {
      return [
        `HANNAH: ${have} of ${need} kinds of ${region} birds, ${name}. Keep going!`,
        `Seabirds count too. The BAY TOUR leaves from the end of the pier, but the fare is $${VOYAGES.bay.price}.`,
        'Every photo you take earns a little money, so save up! Dawn and dusk pay best.',
      ];
    }
    return [
      `HANNAH: ${have} kinds! You're ready for the BALD EAGLE, ${name}.`,
      'Head up through ECHO CAVE to EAGLE PEAK.',
      'Every sharp photo wears it down, but it gets faster each time. Good luck!',
    ];
  },
  // Hannah out painting the canal in Erwinna, after you've beaten her BALD EAGLE.
  // She tells you about the OPEN PLAINS' nemesis bird, the GREAT BLUE HERON.
  // Once you've beaten it she's at Tinicum Park (hannahTinicum).
  hannahErwinna(game) {
    const name = playerName(game);
    const heron = NEMESES.greatBlueHeron;
    const need = heron.requires.species;
    const { have } = regionPhotos(game, heron.region);
    const region = REGIONS[heron.region].name;

    if (beatNemesis(game, 'greatBlueHeron')) {
      // Only until you leave: then she's gone up the towpath.
      return [
        `HANNAH: ${name}! I watched the whole thing from my bench. You got the GREAT BLUE HERON!`,
        'And the towpath\'s open! I\'m packing up my paints. There\'s a pickup ball game at TINICUM PARK, just up the towpath.',
        'Come find me on the ball fields!',
      ];
    }
    if (!game.progress.flags.metHannahErwinna) {
      return [
        `HANNAH: ${name}, you found my note! And you photographed the BALD EAGLE?! My nemesis bird!`,
        'You\'re a real birder now. Welcome to the bird club!',
        'I came out to ERWINNA to paint the canal. Old forges, stone houses, mules on the towpath... and birds everywhere.',
        'But there\'s one bird I just can\'t paint. It won\'t let anyone near.',
        'See it up at the end of the towpath, past the barge? The GREAT BLUE HERON. The NEMESIS BIRD of the OPEN PLAINS.',
        'The lock tender says it\'s been guarding that towpath since the canal was dug.',
        `It won't let a beginner near. Photograph ${need} kinds of ${region} birds first. You have ${have}.`,
        'Then go show that heron who\'s boss. I\'ll be right here.',
      ];
    }
    if (have < need) {
      return [
        `HANNAH: ${have} of ${need} kinds of ${region} birds, ${name}. Keep looking!`,
        'Redwings sing from the cattails, phoebes nest under the bridge, and now and then a kingfisher rattles down the canal.',
        'Out at VAN SANT, kestrels hover over the runway. And LARK MEADOW is named for its meadowlarks!',
      ];
    }
    return [
      `HANNAH: ${have} kinds! You're ready for the heron, ${name}.`,
      'It stands perfectly still for ages... then strikes. Be patient, and be quick when it moves.',
      'It\'s up at the end of the towpath, past the barge. Go get it!',
    ];
  },
  // Hannah playing pickup ball at Tinicum Park, after you've beaten the GREAT BLUE HERON.
  // She welcomes you to the RIVERSHORE, raves about FRENCHTOWN, and has heard of a birder named ASA.
  hannahTinicum(game) {
    const name = playerName(game);
    const region = REGIONS.rivershore.name;
    const { have, total } = regionPhotos(game, 'rivershore');

    if (!game.progress.flags.metHannahTinicum) {
      return [
        `HANNAH: ${name}! Heads up! ...Sorry, that one got away from me.`,
        'You got the GREAT BLUE HERON! Two nemesis birds! I traded my paintbrush for a glove to celebrate.',
        `Welcome to TINICUM PARK, and the ${region}: river country, all along the DELAWARE.`,
        'Have you been to FRENCHTOWN, just across the river? Bakeries, a bike shop, an old iron bridge over the water... it\'s so nice.',
        ...(game.progress.flags.metAsa
          ? ['Wait, you\'ve already met ASA? Up in UPPER BLACK EDDY? They say he knows every bird on this river.', 'Did you get more than three words out of him?']
          : ['Oh, and I keep hearing about a birder named ASA. They say he knows every bird on this river.', 'They also say he\'s a little... terse. Ask him for help and you\'re lucky to get three words out of him.']),
        `In the meantime, there are ${total} kinds of ${region} birds to find. You have ${have}.`,
        'Bluebirds on the backstops, swallows over the outfield, orioles up in the sycamores, sandpipers down on the creek!',
      ];
    }
    if (beatRival(game, 'asa')) {
      return [
        `HANNAH: ${name}! Is it true? You beat ASA at his own osprey?!`,
        'The whole bird club is talking about it. And they\'re finishing the FRENCHTOWN bridge!',
        `You've got ${have} of ${total} kinds of ${region} birds. FRENCHTOWN has a whole riverfront to go look at!`,
      ];
    }
    if (game.progress.flags.metAsa) {
      return [
        `HANNAH: You met ASA? How many words did you get out of him, ${name}?`,
        'An osprey duel, huh. That sounds like him. He won\'t respect you until you beat his record.',
        `You'll want ${RIVALS.asa.requires.species} kinds of ${region} birds before he takes you seriously. You have ${have}.`,
      ];
    }
    if (have < total) {
      return [
        `HANNAH: ${have} of ${total} kinds of ${region} birds, ${name}. Keep looking!`,
        'Walk the creek slowly. A GREEN HERON can stand so still you\'ll walk right past it.',
        'And keep an eye on the sky over the river. Ospreys fish there when it\'s clear.',
        'If you go looking for ASA, they say he lives up the towpath, in UPPER BLACK EDDY.',
      ];
    }
    return [
      `HANNAH: All ${total} kinds of ${region} birds, ${name}! Even ASA would have to be impressed.`,
      'Maybe he\'d even say four words to you.',
      'He lives up the towpath, in UPPER BLACK EDDY. Go find him!',
    ];
  },
  // WYATT in Frenchtown, by his van across the canal path north. He's hunting the
  // RIVERSHORE's nemesis bird, and wants proof he's on the right river: a PEREGRINE.
  // Once you have one, this is his goodbye; his map entry `leaves` (maps/frenchtown.js).
  wyattFrenchtown(game) {
    const name = playerName(game);
    if (game.journal.peregrine) {
      return [
        'WYATT: No way. Is that... a PEREGRINE? Right here in FRENCHTOWN?!',
        'The dark helmet, the barred chest... that\'s a peregrine, all right.',
        'Which means I\'m on the right river. Now I just have to find the thing.',
        `Thanks, ${name}! I'm packing up the van. See you upriver!`,
      ];
    }
    return [
      'WYATT: Hey! You made it across the river! Told you I move around a lot.',
      'I\'m on the trail of the RIVERSHORE\'s NEMESIS BIRD. Nobody will tell me what it is. Birders get funny about their nemesis birds.',
      'But the old-timers all say the same thing: find the PEREGRINES, and you\'re on the right river.',
      'There\'s a pair around FRENCHTOWN. Rooftops, the bridge, the Citgo sign... I\'ve stared at the sky all week and can\'t get one shot.',
      'Get me a photo of a PEREGRINE and I\'ll know I\'m on the right river. Then I\'m heading north!',
      'Till then the van stays put. Sorry about the canal path.',
    ];
  },
  // The STATION AGENT at Milford Station. The first anyone tells you about the RIVERSHORE's
  // nemesis bird: the GYRFALCON on the platform, holding up the trains north.
  stationAgent(game) {
    if (beatNemesis(game, 'gyrfalcon')) {
      return [
        'STATION AGENT: You did it! That falcon took off up the tracks, and the trains are running again.',
        'Head on inside: the train north to LUDLOW, VERMONT leaves from the platform.',
      ];
    }
    if (game.progress.flags.metMilfordAgent) {
      return ['STATION AGENT: Still there. Still staring. Good luck.'];
    }
    return [
      'STATION AGENT: Sorry, no trains north. Nobody can get onto the platform.',
      'There\'s a GYRFALCON sitting on it. A GYRFALCON! Down from the ARCTIC, white as snow, bigger than any hawk.',
      'Birders have come from three states to see it. Nobody\'s gotten a decent photo. It just stares them down.',
      'If you ask me, it\'s the NEMESIS BIRD of this whole river. Think you can get it? Be my guest.',
    ];
  },
  // HANNAH calls right after you beat the GYRFALCON (data/nemeses.js `wonTalk`). She was on
  // the train stuck behind it at Milford Station, and now she's on her way north to VERMONT.
  hannahCall(game) {
    const name = playerName(game);
    return [
      `HANNAH: ${name}!! Was that YOU? The conductor just said the falcon's gone off the platform!`,
      'I\'ve been stuck on this train all morning waiting for it to move. And now we\'re rolling!',
      `Three nemesis birds, ${name}. THREE. The bird club is never going to believe it.`,
      'This train runs north on the railroad out of MILFORD, all the way up to VERMONT.',
      'They say there are birds up in those mountains you\'ll never see down here. I couldn\'t resist!',
      'When the line opens again, catch a train north and come find me. I\'ll save you a seat!',
    ];
  },
  // HANNAH at EIGHT OH BREW in Ludlow, after a day skiing. The first time you come down the
  // stairs she walks right over (npc `greets`): she saved you a seat, like she said on the phone.
  hannahLudlow(game) {
    const name = playerName(game);
    const { flags } = game.progress;
    if (!flags.metHannahLudlow) {
      return [
        `HANNAH: ${name}!! You made it to VERMONT! I told you I'd save you a seat. Well... a barstool.`,
        'Ugh, I\'ve had the LONGEST day on the slopes. First chair up the mountain this morning, last run down at sunset.',
        'My legs are SO weary. When they get like this, there\'s nothing I love more than ending the day down here with a few drinks.',
        'Welcome to EIGHT OH BREW! Grab a BEER at the bar. Fair warning: they pour them strong up here.',
        'Oh, and the birds! CHICKADEES on every chairlift, WOODPECKERS drumming in the pines... I heard an OWL on the way down, too.',
      ];
    }
    // The VERMONT chapter of her club: DANIEL's thread, WYATT's and REESE's, in any order. When all
    // three have joined, it's a club, and she calls its first meeting: a walk in BLACK RIVER WOODS. Her npc
    // `leaves` once clubFormed is set, and DANIEL and WYATT go with her (maps/eightOhBrew.js).
    if (flags.danielJoined && flags.wyattJoined && flags.reeseJoined) {
      setFlag(game, 'clubFormed');
      return [
        `HANNAH: DANIEL, WYATT and REESE, ${name}. The VERMONT chapter is officially a CLUB!`,
        'A guy who got lost, a guy who never stops wandering, and a kid who can\'t slow down. Honestly? Perfect.',
        'And a club needs a first meeting worth showing up for. I know EXACTLY what it is.',
        'A guided walk! Through BLACK RIVER WOODS, up the footpath between the creek and the houses, north of town.',
        'Everybody brings one bird to show you. DANIEL\'s already picked his. WYATT says his is a surprise. REESE says theirs is "the fastest one".',
        'I shoveled out the footpath this morning. We\'ll head up now and get a fire going at the OVERLOOK.',
        'Meet us on the trail! Last one there buys the cocoa!',
      ];
    }
    // Showing her DANIEL's mittens is no time to bring up WYATT.
    const kickoff = !flags.danielMissing;
    const daniel = hannahOnDaniel(game, name);
    if (kickoff && flags.danielMissing) return daniel;
    const pages = [...daniel, ...hannahOnWyatt(game), ...hannahOnReese(game)];
    if (!flags.danielMissing) {
      pages.unshift(
        `HANNAH: My legs are jelly, ${name}. Pull up a stool!`,
        'The bar\'s right there if you want another round. I\'m not going anywhere.',
      );
    }
    return pages;
  },
  // WYATT by his snowed-in van at the bottom of OKEMO. He followed the river north after the
  // GYRFALCON, and he still can't believe you got it first. Beat his record with the PILEATED
  // WOODPECKER on the snag (data/rivals.js) and he'll give HANNAH's club a try: his npc `leaves`
  // once the rival is beaten, and he's at EIGHT OH BREW after (wyattBar).
  wyattOkemo(game) {
    const name = playerName(game);
    const duel = RIVALS.wyatt;
    const need = duel.requires.species;
    const { have } = regionPhotos(game, duel.region);

    if (beatRival(game, 'wyatt')) {
      return [
        `WYATT: Four shots. FOUR, ${name}. And all of them sharper than mine.`,
        'First the GYRFALCON, now my woodpecker. You know what? I\'m not even mad.',
        'Can I tell you something? I\'ve been driving around after birds for three years. New place every week.',
        'And every place I go, I meet somebody cool... and then I leave. The van\'s home. Nowhere else is.',
        'This is the first time I got stuck somewhere. And it\'s kind of the best week I\'ve had.',
        'So yeah. Tell HANNAH I\'m in. Actually, no. I\'ll tell her myself.',
        'The van\'s not going anywhere anyway. See you at EIGHT OH BREW!',
      ];
    }
    if (game.progress.flags.metWyattOkemo) {
      if (have < need) {
        return [
          `WYATT: ${have} kinds of VERMONT birds? I had ${need} before I even unpacked. Go get some more.`,
          'The woodpecker will still be here. So will I. Obviously.',
        ];
      }
      return [
        'WYATT: The snag behind the van. Four sharp shots. Beat that and I\'ll go to one meeting.',
        'ONE meeting.',
      ];
    }
    return [
      `WYATT: ${name}?! No way. Of course it's you.`,
      'I followed those peregrines up the WHOLE river. Then I get to MILFORD and the station agent says somebody already got the GYRFALCON. On the platform. With a crowd watching.',
      'That was you, wasn\'t it.',
      '...Okay, it was a great photo. I saw it on the board in the station.',
      'So I kept driving north. And now the van\'s snowed in up to the axles. Very cool. Very on purpose.',
      'HANNAH\'s up here? And she wants me in her club? Ha. I don\'t do clubs. Clubs have meetings. Meetings mean staying put.',
      'Tell you what, though. Rematch.',
      'There\'s a PILEATED WOODPECKER drumming on that dead snag behind my van every day. Best beat in VERMONT.',
      'I got four sharp shots of it. That\'s the record. Beat it, and I\'ll hear HANNAH out.',
      have < need
        ? `But not with ${have} kinds of VERMONT birds. Come back with ${need}.`
        : 'It\'s right there. Whenever you\'re ready.',
    ];
  },
  // REESE at the top of THE CHUTE, on the ski team, sure birding is for slow people. They'll race you
  // down it (data/races.js chute): an `ask` whose YES starts the race. Win and they're at the finish (reeseBase).
  reeseChute(game) {
    const race = RACES.chute;
    const lines = game.progress.flags.metReese
      ? ['REESE: Back for more? The gates are where I left them.']
      : [
          'REESE: Whoa, hey. You\'re with that BIRD CLUB lady, right? HANNAH?',
          'She put a flyer up in the lodge. I laughed so hard I fell off my chair.',
          'No offense, but birding? You stand in the woods. Not moving. For HOURS. That\'s the slowest thing anyone has ever done.',
          'I\'m on the OKEMO SKI TEAM. This is THE CHUTE. Nine gates, top to bottom.',
          'RED flag, keep LEFT of it. BLUE flag, keep RIGHT. Miss one and you\'re out.',
          `My record is ${race.record} seconds. Beat it, and I'll go to ONE meeting.`,
        ];
    return {
      lines,
      ask: 'REESE: So? Race me?',
      choices: [
        { label: 'RACE!', pick: () => ({ lines: ['REESE: Ha! Get in the start. I\'ll call it on the radio.'], race: 'chute' }) },
        { label: 'NOT YET', pick: () => ['REESE: Figured. Go look at a bird or something.'] },
      ],
    };
  },
  // REESE at the bottom of THE CHUTE, after you beat their time. Something beats them down it every day:
  // a NORTHERN SHRIKE (they don't know what it is). Photograph one and they join HANNAH's club.
  reeseBase(game) {
    const { flags } = game.progress;
    if (flags.reeseJoined) {
      return [
        'REESE: A SHRIKE. A songbird that hunts like a HAWK. And nobody told me?!',
        'Coach says I can do bird club on Tuesdays if I still make practice. I\'ll make practice.',
      ];
    }
    const story = flags.metReeseBase ? [] : [
      'REESE: Okay. OKAY. That was fast. Like, actually fast.',
      'Can I tell you something weird? There\'s a bird that beats me down THE CHUTE. Every single day.',
      'Gray. Black mask, like a bandit. A hooked beak. It shoots down the run ahead of me, hunting.',
      'Everybody on the team says I\'m making it up. Birds don\'t race people.',
    ];
    setFlag(game, 'metReeseBase');
    if (game.journal.northernShrike) {
      setFlag(game, 'reeseJoined');
      return [
        ...story,
        story.length ? 'Wait, you have a photo of it? Let me see.' : 'REESE: You got it? Let me see.',
        '...THAT\'S IT. That\'s the one! What IS it?',
        'A NORTHERN SHRIKE? It hunts other birds? It sticks them on THORNS?! That\'s the most metal thing I\'ve ever heard.',
        'Okay. Fine. I\'m in. Tell HANNAH I\'m joining her slow little club. It\'s not slow. I get it now.',
      ];
    }
    return [
      ...story,
      story.length ? 'You\'re a bird person. Get a picture of it and prove I\'m not crazy.' : 'REESE: Did you get a picture of my bird yet? Gray, black mask. It hunts THE CHUTE.',
      'Ski it slow and keep your eyes open. It\'s always out there somewhere.',
    ];
  },
  // The club's first meeting, a guided walk in BLACK RIVER WOODS (maps/blackRiverWoods.js). Each member waits
  // at a stop with a bird to show you; it's in a zone right around them. HANNAH waits at the OVERLOOK.
  wyattWalk(game) {
    if (game.journal.bohemianWaxwing) {
      return [
        'WYATT: See? BOHEMIAN WAXWINGS. They come down from the north some winters, eat every berry in sight, and move on.',
        'No schedule. No address. The whole flock just wanders.',
        'HANNAH says that\'s why I picked them. She\'s not wrong.',
        'REESE is up at the beaver meadow, north of here. Go on.',
      ];
    }
    return [
      'WYATT: Took you long enough. Okay, my bird. Listen... hear that thin little trill?',
      'WAXWINGS! A whole flock in the mountain ash here, eating frozen berries.',
      'Get a shot before they move on. They always move on.',
    ];
  },
  reeseWalk(game) {
    if (game.journal.merlin) {
      return [
        'REESE: Did you SEE that?! A MERLIN! A falcon the size of a pigeon. It catches other birds IN THE AIR.',
        'I timed it across the meadow. Faster than me down THE CHUTE. Don\'t tell coach.',
        'DANIEL\'s down in the hemlocks by the river. Walk quietly. He\'s very serious about it.',
      ];
    }
    return [
      'REESE: Okay. I didn\'t know birds could be THIS fast.',
      'There\'s a little falcon hunting this meadow, zipping between the snags. A MERLIN. DANIEL told me the name.',
      'Get a picture of it. If you can keep up.',
    ];
  },
  danielWalk(game) {
    if (game.journal.sawWhetOwl) {
      return [
        'DANIEL: (whispering) You found it.',
        'A NORTHERN SAW-WHET OWL. The littlest owl out here. It would fit in your hand.',
        'It sits right there all day, and almost nobody walking by ever knows. That\'s my favorite kind of bird.',
        'HANNAH\'s at the OVERLOOK, past the river. Go on. I\'ll catch up. Ankle\'s fine. Mostly.',
      ];
    }
    return [
      'DANIEL: Shh. Listen.',
      '...toot... toot... toot...',
      'Like a truck backing up, way off. That\'s a SAW-WHET OWL. It roosts in these hemlocks all day, right at eye level.',
      'Go slow. Look for a little brown face looking back at you.',
    ];
  },
  // HANNAH at the OVERLOOK. Once you've seen all three members' birds, the meeting's over: she sets
  // walkBirdsSeen, her npc `leaves` (setting clubWalkDone) and the whole club heads to EIGHT OH BREW.
  hannahWalk(game) {
    const name = playerName(game);
    const stops = [
      ['bohemianWaxwing', 'WYATT\'s, in the mountain ash'],
      ['merlin', 'REESE\'s, up at the beaver meadow'],
      ['sawWhetOwl', 'DANIEL\'s, in the hemlocks by the river'],
    ];
    const missing = stops.filter(([bird]) => !game.journal[bird]).map(([, where]) => where);
    if (missing.length) {
      return [
        `HANNAH: ${name}! Welcome to the first official meeting of the VERMONT CHAPTER!`,
        'Everyone\'s out on the trail with a bird to show you. Don\'t skip anybody. They\'ve been practicing.',
        `Still to see: ${missing.join('; ')}.`,
        'Then come warm up by the fire!',
      ];
    }
    setFlag(game, 'walkBirdsSeen');
    return [
      `HANNAH: There you are, ${name}! So? Let me see.`,
      'WAXWINGS from WYATT... a MERLIN from REESE... and DANIEL\'s SAW-WHET! Oh, look at its little face!',
      'Three birds from three people who didn\'t even know each other a month ago. THAT\'s a bird club.',
      'Now look out there, past the treetops. See those white peaks, way off to the east?',
      'The WHITE MOUNTAINS. Bigger mountains. Wilder birds. Someday, huh?',
      'Okay, everybody! The first meeting of the VERMONT CHAPTER is adjourned!',
      'PARTY at EIGHT OH BREW! WYATT, go get the speakers!',
    ];
  },
  // The club's party at EIGHT OH BREW, after the walk. HANNAH's toast, then her news: she has to go home,
  // and she gives you a BUS TICKET east to the WHITE MOUNTAINS. Her npc `leaves`, setting busTicket.
  hannahParty(game) {
    const name = playerName(game);
    return [
      `HANNAH: ${name}! You made it! Everybody, quiet down! WYATT, turn it down. WYATT.`,
      'Okay. A toast! To the VERMONT CHAPTER!',
      'To DANIEL, who got lost and found the GREAT GRAY OWL. To WYATT, who finally stayed somewhere.',
      'To REESE, who found out birding isn\'t slow. And to you, for bringing every one of them here.',
      'Okay. I have some news. I\'m heading home in the morning. There\'s something at home I need to take care of.',
      'Don\'t make that face! It\'s nothing bad. It just can\'t wait.',
      'But YOU\'re not coming with me. Remember those white peaks from the OVERLOOK?',
      'The plows just cleared ROUTE 103, and there\'s a bus east to the WHITE MOUNTAINS from the end of MAIN STREET. Here. My treat.',
      'HANNAH handed you a BUS TICKET to the WHITE MOUNTAINS!',
      'Go, in honor of the club. Every bird you find out there, you find for all of us.',
      'And send photos! DANIEL wants owls. REESE wants anything fast. WYATT wants to be jealous.',
      `I'm so proud of you, ${name}. Now go! The bus won't wait forever.`,
    ];
  },
  danielParty(game) {
    if (game.progress.flags.busTicket) {
      return [
        'DANIEL: The WHITE MOUNTAINS. There are owls up there I\'ve only read about.',
        'Take good notes. Better than mine. Mine are all over OKEMO.',
      ];
    }
    return ['DANIEL: I don\'t usually do parties. This one\'s alright.', 'Go talk to HANNAH. She\'s been waiting for you.'];
  },
  wyattParty(game) {
    if (game.progress.flags.busTicket) {
      return [
        'WYATT: Look at you, heading off somewhere new. That\'s usually my move.',
        'Go. I\'ll keep your stool warm. The van\'s still not going anywhere.',
      ];
    }
    return ['WYATT: Told you I had speakers!', 'HANNAH\'s got something to say. Better go listen before she makes me turn it down. Again.'];
  },
  reeseParty(game) {
    if (game.progress.flags.busTicket) {
      return [
        'REESE: The WHITE MOUNTAINS have the steepest skiing in the east. Just saying.',
        'Bring me back a picture of something fast. Faster than the merlin. If that exists.',
      ];
    }
    return ['REESE: I\'m on hot cocoa. Coach says I can stay till nine.', 'HANNAH\'s about to do a speech. She has NOTECARDS.'];
  },
  // WYATT at EIGHT OH BREW, once he's joined HANNAH's club.
  wyattBar(game) {
    const lines = [
      'WYATT: HANNAH made me a name tag. I\'ve never had a name tag.',
      'If this club ever throws a party, tell her I\'ve got the speakers. They\'re in the van. Which is not going anywhere.',
    ];
    if (game.progress.flags.danielJoined) lines.push('DANIEL and I are going owling at dusk. He says I talk too much. He is correct.');
    return lines;
  },
  // Okemo's SKI PATROL, by the rope line on the north side of the summit. Once HANNAH has told
  // you DANIEL is missing, they ask where to look (an `ask`: pick a place). TAMARACK BOG is right
  // once you have the clues that point there: the THERMOS (tracks north) and the BINOCULARS (the bog).
  // Any other answer gets a nudge toward a clue you haven't found yet.
  skiPatrol(game) {
    const name = playerName(game);
    const { flags, collectibles } = game.progress;
    if (flags.foundDaniel) {
      return [
        'SKI PATROL: Got DANIEL down on the toboggan. Twisted ankle, cold, very grumpy. He\'ll be fine.',
        `Nice detective work, ${name}. The rope's staying down for you.`,
      ];
    }
    if (flags.searchBog) {
      return [
        'SKI PATROL: The rope\'s down. Follow the boot tracks north to TAMARACK BOG.',
        'He can\'t have gotten far on foot out there. Go!',
      ];
    }
    if (!flags.danielMissing) {
      return [
        'SKI PATROL: Ski patrol. Keep it inside the ropes up here, okay?',
        'Past them it\'s backcountry. Nobody grooms it, and nobody\'s out there to dig you out.',
      ];
    }
    const nudge = () => {
      if (!collectibles.danielsThermos) return 'One of the lifties saw somebody poking around by the rope line, way out on the east end of the summit.';
      if (!collectibles.danielsBinoculars) return 'A skier said something was glinting in the pines, right at the top of THE GLADES.';
      if (!collectibles.danielsNotebook) return 'HANNAH says he always stopped at the frozen pond in town to listen for owls before heading up.';
      return 'Think about what he left behind. Where would the bird he was after go hunting?';
    };
    const wrong = (line) => [line, nudge(), 'Bring me something solid and I\'ll send a team.'];
    return {
      lines: [
        'SKI PATROL: DANIEL? The owl guy? Quiet, always up here before the lifts open?',
        'Missing, huh. I can\'t send a team out on a hunch. There\'s a whole lot of mountain up here.',
      ],
      ask: 'So where do you think he went?',
      choices: [
        { label: 'THE GLADES', pick: () => wrong('SKI PATROL: We swept the glades first thing this morning. Just skiers and a lot of woodpeckers.') },
        { label: 'FROZEN POND', pick: () => wrong('SKI PATROL: The pond in town? Somebody would have seen him down there.') },
        { label: 'BACK IN TOWN', pick: () => wrong('SKI PATROL: HANNAH says nobody in LUDLOW has seen him in days.') },
        {
          label: 'THE BOG, NORTH',
          pick: () => {
            if (!collectibles.danielsThermos || !collectibles.danielsBinoculars) {
              return wrong('SKI PATROL: The bog? Out past the ropes? That\'s a long way to go on a hunch.');
            }
            setFlag(game, 'searchBog');
            return [
              'SKI PATROL: Boot tracks north from his thermos... and "HUNTS THE BOG AT DUSK" on his binoculars...',
              'TAMARACK BOG. Nobody goes out there in winter. Which is exactly where an owl guy would go.',
              'All right. I\'m dropping the rope. Follow the tracks north, and holler if you find him!',
            ];
          },
        },
      ],
    };
  },
  // DANIEL, holed up in his lean-to on TAMARACK BOG with a twisted ankle. Talking to him ends the
  // search (his npc `leaves`: ski patrol takes him down to EIGHT OH BREW, danielBar) and names
  // the bird he came for, VERMONT's nemesis: the first time anyone says what it is.
  danielBog() {
    return [
      'DANIEL: ...Hello? Oh, thank goodness. A person.',
      'I rolled my ankle on a root out here and couldn\'t walk out. I\'ve been keeping this fire going ever since.',
      'Wait... are those my MITTENS? You found my MITTENS!',
      'You give DANIEL his mittens back. He pulls them on like they\'re the best thing that ever happened to him.',
      'HANNAH sent you? Oh no. I missed her meeting, didn\'t I.',
      'I had a good reason, I swear. I came out here because of a bird. A GREAT GRAY OWL.',
      'The tallest owl in North America, and the quietest. Like a ghost made of smoke. Hardly anybody ever sees one.',
      'And it\'s HERE, out on this bog. I saw it. I just couldn\'t get close before I fell.',
      'You\'ve got a camera. Get the photo I couldn\'t. Please.',
      'Oh! That\'s ski patrol with the toboggan. See you at EIGHT OH BREW!',
    ];
  },
  // DANIEL at EIGHT OH BREW, ankle up, once ski patrol has brought him down. Show him the
  // GREAT GRAY OWL and he joins HANNAH's club.
  danielBar(game) {
    if (game.progress.flags.danielJoined) {
      return ['DANIEL: Ankle\'s getting better. Next winter I\'m going owling WITH somebody. Turns out that\'s the smart way to do it.'];
    }
    if (beatNemesis(game, 'greatGrayOwl')) {
      setFlag(game, 'danielJoined');
      return [
        'DANIEL: You... you got it? Let me see.',
        '...',
        'That\'s it. That\'s the GREAT GRAY OWL. Look at that face.',
        'Years I\'ve been looking for that bird, and you got it. Thank you.',
        'Tell HANNAH to put me down for her club. First member. I\'ll even come to the meetings.',
      ];
    }
    return [
      'DANIEL: Ankle\'s up, cocoa\'s hot. I\'m fine, really.',
      'The owl hunts the bog at dusk, mostly. Sit still, keep quiet, and let it come to you.',
      'Get that photo. Please.',
    ];
  },
  // ASA COOPER, your rival, in his backyard in Upper Black Eddy. He's the volunteer
  // monitor for the osprey nest on the Frenchtown bridge, and he talks like every word costs money.
  asa(game) {
    const name = playerName(game);
    const duel = RIVALS.asa;
    const need = duel.requires.species;
    const { have } = regionPhotos(game, duel.region);
    const region = REGIONS[duel.region].name;

    if (beatRival(game, 'asa')) {
      return [
        'ASA: ...',
        `ASA: Good shots. ${name}.`,
        'ASA: The bridge crew\'s been waiting on me. Nest on the truss is empty. Chicks fledged.',
        'ASA: I called it in. The FRENCHTOWN bridge is open.',
        'ASA: Don\'t make it weird.',
      ];
    }
    if (!game.progress.flags.metAsa) {
      return [
        'ASA: Shh.',
        'ASA: ...You\'re standing in my light.',
        'ASA: The Frenchtown bridge? Ospreys are nesting on the truss. I\'m the nest monitor. Nobody works till I say so.',
        game.progress.flags.metHannahTinicum ? 'ASA: HANNAH sent you? Hm.' : 'ASA: Who sent you? ...Doesn\'t matter.',
        'ASA: That osprey on the dock. Four sharp shots before it flies. My record.',
        `ASA: Beat it and we'll talk. But not with ${have} ${region} birds. Come back with ${need}.`,
      ];
    }
    if (have < need) {
      return [`ASA: ${have}. Not ${need}.`, 'ASA: Go.'];
    }
    return [`ASA: ${have}. Fine.`, 'ASA: Dock. Osprey. Four shots. Go.'];
  },
};
