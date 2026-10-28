// Regions: big parts of the world, each with its own birds and nemesis bird.
// Every map (and voyage) says which region it's in with `region`. A region's
// birds are every species found on its maps and voyages, and photographing
// enough of them is how you earn the right to face its nemesis bird.
//   name   shown in dialog, e.g. "Photograph 8 kinds of WILLOW VALLEY birds"
//   snowy  winter all over: outdoors the day's weather comes down as snow, and
//          birds are photographed in the snow (gfx/lighting.js snowyWeather)
export const REGIONS = {
  valley: { name: 'WILLOW VALLEY' },
  plains: { name: 'OPEN PLAINS' },
  rivershore: { name: 'RIVERSHORE' },
  vermont: { name: 'GREEN MOUNTAINS', snowy: true },
};
