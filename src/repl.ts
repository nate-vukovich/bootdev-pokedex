import { type CLICommand, initState } from './state.js';

import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';
import { commandMapB } from './command_mapb.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: 'exit',
      description: 'Exit the Pokedex',
      callback: commandExit,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    map: {
      name: 'map',
      description: 'Get the first 20 Map locations',
      callback: commandMap,
    },
    mapb: {
      name: 'mapb',
      description: 'Get previous locations',
      callback: commandMapB,
    },
    explore: {
      name: 'explore',
      description: 'Explore a location area',
      callback: commandExplore,
    },
    catch: {
      name: 'catch',
      description: 'Attempt to catch a Pokemon',
      callback: commandCatch,
    },
  };
}

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(/\s+/)
    .map((item) => item.toLowerCase());
}

export async function startREPL(): Promise<void> {
  const state = initState();
  const { rl } = state;

  rl.prompt();

  rl.on('line', async (line) => {
    const inputs = cleanInput(line);
    const command = state.commands[inputs[0]];

    if (!command) {
      console.log('Unknown command');
    } else {
      try {
        await command.callback(state, ...inputs.slice(1));
      } catch (err) {
        console.error('Network error:', (err as Error).message);
      }
    }

    rl.prompt();
  });
}
