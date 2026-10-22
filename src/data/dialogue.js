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
  hannahErwinna(game) {
    const name = playerName(game);
    const heron = NEMESES.greatBlueHeron;
    const need = heron.requires.species;
    const { have } = regionPhotos(game, heron.region);
    const region = REGIONS[heron.region].name;

    if (beatNemesis(game, 'greatBlueHeron')) {
      return [
        `HANNAH: ${name}! I watched the whole thing from my bench. You got the GREAT BLUE HERON!`,
        'Two nemesis birds. Not many birders can say that.',
        'The lock tender says that towpath runs all the way south, once they fix the bank.',
        'Wherever it goes, I bet there\'s another nemesis bird waiting at the end of it.',
      ];
    }
    if (!game.progress.flags.metHannahErwinna) {
      return [
        `HANNAH: ${name}, you found my note! And you photographed the BALD EAGLE?! My nemesis bird!`,
        'You\'re a real birder now. Welcome to the bird club!',
        'I came out to ERWINNA to paint the canal. Old forges, stone houses, mules on the towpath... and birds everywhere.',
        'But there\'s one bird I just can\'t paint. It won\'t let anyone near.',
        'See it down on the towpath by the lock? The GREAT BLUE HERON. The NEMESIS BIRD of the OPEN PLAINS.',
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
      'It\'s on the towpath by the lock. Go get it!',
    ];
  },
};
