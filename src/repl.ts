import * as readline from 'node:readline';

import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

import type { CLICommand } from './command.js';

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
  };
}

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(/\s+/)
    .map((item) => item.toLowerCase());
}

export function startREPL() {
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  readLine.prompt();

  readLine.on('line', (line) => {
    if (line.trim().length === 0) {
      readLine.prompt();
    } else {
      const firstCommand = cleanInput(line);

      const commands = getCommands();
      const selectedCommand = commands[firstCommand[0]];

      if (!selectedCommand) {
        console.log('Unknown command');
      } else {
        selectedCommand.callback(commands);
      }

      readLine.prompt();
    }
  });
}
