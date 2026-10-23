// What story characters say. A map's npc with `talk: 'hannah'` calls
// DIALOGUE.hannah(game) each time you talk to it, so the lines can follow your
// progress. Each string is a page or two in the text box.
import { NEMESES } from './nemeses.js';
import { RIVALS } from './rivals.js';
import { VOYAGES } from './voyages.js';
import { REGIONS } from './regions.js';
import { beatNemesis, beatRival, regionPhotos, playerName } from '../progress.js';

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
        'STATION AGENT: You did it! That falcon took off up the tracks, and the last train north pulled out right behind it.',
        'There\'s track work up the line now, so no more trains to VERMONT for a while. Check back soon!',
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
