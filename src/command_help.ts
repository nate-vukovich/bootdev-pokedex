import { CLICommand } from './command.js';

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log('Welcome to the Pokedex!');
  console.log('Usage:');
  console.log('\n');

  for (const [key, cmd] of Object.entries(commands)) {
    console.log(`${key}: ${cmd.description}`);
  }

  console.log('\n');
}
