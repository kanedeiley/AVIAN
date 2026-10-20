// What story characters say. A map's npc with `talk: 'hannah'` calls
// DIALOGUE.hannah(game) each time you talk to it, so the lines can follow your
// progress. Each string is a page or two in the text box.
import { NEMESES } from './nemeses.js';
import { REGIONS } from './regions.js';
import { beatNemesis, regionPhotos } from '../progress.js';

export const DIALOGUE = {
  // Hannah runs the bird club, and points you at the first nemesis bird.
  hannah(game) {
    const eagle = NEMESES.baldEagle;
    const need = eagle.requires.species;
    const { have } = regionPhotos(game, eagle.region);
    const region = REGIONS[eagle.region].name;

    if (beatNemesis(game, 'baldEagle')) {
      return [
        'HANNAH: You photographed the BALD EAGLE?! My nemesis bird!',
        'You\'re a real birder now. Welcome to the bird club!',
        'They say every region has a nemesis bird of its own...',
      ];
    }
    if (!game.progress.flags.metHannah) {
      return [
        'HANNAH: Oh, hello! You must be the new birder in town. I run the bird club.',
        'Every birder has a NEMESIS BIRD: the one that always gets away.',
        'Mine is the BALD EAGLE at the top of EAGLE PEAK, up through ECHO CAVE.',
        `It won't let a beginner near. Photograph ${need} kinds of ${region} birds first.`,
        `You have ${have} so far. Press J to check your journal!`,
      ];
    }
    if (have < need) {
      return [
        `HANNAH: ${have} of ${need} kinds of ${region} birds. Keep going!`,
        'Seabirds count too. The BAY TOUR leaves from the end of the pier.',
      ];
    }
    return [
      `HANNAH: ${have} kinds! You're ready for the BALD EAGLE.`,
      'Every sharp photo wears it down, but it gets faster each time. Good luck!',
    ];
  },
};
