import { State } from './state.js';

export async function commandExplore(state: State, ...args: string[]) {
  const locationName = args[0];

  if (!locationName) {
    console.log('Usage: explore <location-area-name>');
    return;
  }

  const data = await state.pokeApi.fetchLocation(locationName);

  for (const encounter of data.pokemon_encounters) {
    console.log(`- ${encounter.pokemon.name}`);
  }
}
