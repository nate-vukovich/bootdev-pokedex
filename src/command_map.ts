import { State } from './state.js';

export async function commandMap(state: State): Promise<void> {
  const data = await state.pokeApi.fetchLocations(
    state.nextLocationsURL ?? undefined
  );

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const loc of data.results) {
    console.log(loc.name);
  }
}
