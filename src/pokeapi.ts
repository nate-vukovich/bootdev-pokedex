import { Cache } from './pokecache.js';

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  private cache: Cache;

  constructor(cacheTTL: number = 60_000) {
    this.cache = new Cache(cacheTTL);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    const cached = this.cache.get<ShallowLocations>(url);

    if (cached) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = (await res.json()) as ShallowLocations;

    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}/`;

    const cached = this.cache.get<Location>(url);

    if (cached) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = (await res.json()) as Location;

    this.cache.add(url, data);

    return data;
  }

  async fetchPokemon(pokemonName: string) {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);

    if (cached) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = (await res.json()) as Pokemon;

    this.cache.add(url, data);

    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: any[];
  names: { name: string; language: string }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};
