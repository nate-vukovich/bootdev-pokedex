export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;

    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json() as Promise<ShallowLocations>;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const res = await fetch(
      `${PokeAPI.baseURL}/location-area/${locationName}/`
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return res.json() as Promise<Location>;
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
  name: string;
  url: string;
};
