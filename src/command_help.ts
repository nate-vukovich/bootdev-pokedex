import { State } from './state.js';

export async function commandHelp(state: State): Promise<void> {
  console.log('Welcome to the Pokedex!');
  console.log('Usage:');
  console.log('\n');

  for (const [key, cmd] of Object.entries(state.commands)) {
    console.log(`${key}: ${cmd.description}`);
  }

  console.log('\n');
}
