import { type CLICommand, initState } from './state.js';

import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';
import { commandMapB } from './command_mapb.js';

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

  state.rl.prompt();

  state.rl.on('line', async (line) => {
    if (line.trim().length === 0) {
      state.rl.prompt();
    } else {
      const firstCommand = cleanInput(line);
      const selectedCommand = state.commands[firstCommand[0]];

      if (!selectedCommand) {
        console.log('Unknown command');
      } else {
        try {
          await selectedCommand.callback(state);
        } catch (err) {
          console.error('Network error:', (err as Error).message);
        }
      }

      state.rl.prompt();
    }
  });
}
