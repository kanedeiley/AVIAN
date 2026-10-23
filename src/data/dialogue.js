// What story characters say. A map's npc with `talk: 'hannah'` calls
// DIALOGUE.hannah(game) each time you talk to it, so the lines can follow your
// progress. Each string is a page or two in the text box.
import { NEMESES } from './nemeses.js';
import { VOYAGES } from './voyages.js';
import { REGIONS } from './regions.js';
import { beatNemesis, regionPhotos, playerName } from '../progress.js';

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
        'Oh, and I keep hearing about a birder named ASA. They say he knows every bird on this river.',
        'They also say he\'s a little... terse. Ask him for help and you\'re lucky to get three words out of him.',
        `In the meantime, there are ${total} kinds of ${region} birds to find. You have ${have}.`,
        'Bluebirds on the backstops, swallows over the outfield, orioles up in the sycamores, sandpipers down on the creek!',
      ];
    }
    if (have < total) {
      return [
        `HANNAH: ${have} of ${total} kinds of ${region} birds, ${name}. Keep looking!`,
        'Walk the creek slowly. A GREEN HERON can stand so still you\'ll walk right past it.',
        'And keep an eye on the sky over the river. Ospreys fish there when it\'s clear.',
      ];
    }
    return [
      `HANNAH: All ${total} kinds of ${region} birds, ${name}! Even ASA would have to be impressed.`,
      'Maybe he\'d even say four words to you.',
    ];
  },
};
