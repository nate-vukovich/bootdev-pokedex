import { State } from './state.js';

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];

  if (!pokemonName) {
    console.log('Usage: explore <pokemon-name>');
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemonData = await state.pokeApi.fetchPokemon(pokemonName);
  const catchChance = 1 / (1 + pokemonData.base_experience / 50);

  const roll = Math.random();

  if (roll < catchChance) {
    console.log(`${pokemonData.name} was caught!`);
    state.pokedex[pokemonName] = pokemonData;
  } else {
    console.log(`${pokemonData.name} escaped!`);
  }
}
