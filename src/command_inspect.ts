import { State } from './state.js';

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args[0];

  if (!pokemonName) {
    console.log('Usage: inspect <pokemon-name>');
    return;
  }

  const pokemonData = state.pokedex[pokemonName];

  console.log('state.pokedex: ', state.pokedex);

  if (!pokemonData) {
    console.log(`Pokemon ${pokemonName} not in Pokedex!`);
  } else {
    console.log(`Name: ${pokemonName}`);
    console.log(`Height: ${pokemonData.height}`);
    console.log(`Weight: ${pokemonData.weight}`);

    console.log(`Stats: \n`);

    pokemonData.stats.forEach((stat) => {
      console.log(`\t- ${stat.stat.name}: ${stat.base_stat}`);
    });

    console.log('Types:\n');
    pokemonData.types.forEach((stat) => {
      console.log(`\t- ${stat.type.name}`);
    });
  }
}
