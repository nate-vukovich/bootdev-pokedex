import { createInterface, type Interface } from 'readline';

import { getCommands } from './repl.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  const commands = getCommands();
  const pokeApi = new PokeAPI();

  return {
    rl,
    commands,
    pokeApi,
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}
