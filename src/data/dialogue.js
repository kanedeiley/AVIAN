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
  hannah(game) {
    const name = playerName(game);
    const eagle = NEMESES.baldEagle;
    const need = eagle.requires.species;
    const { have } = regionPhotos(game, eagle.region);
    const region = REGIONS[eagle.region].name;

    if (beatNemesis(game, 'baldEagle')) {
      return [
        `HANNAH: ${name}! You photographed the BALD EAGLE?! My nemesis bird!`,
        'You\'re a real birder now. Welcome to the bird club!',
        'They say every region has a nemesis bird of its own...',
      ];
    }
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
};
