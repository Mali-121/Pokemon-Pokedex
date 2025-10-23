const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

export class PokemonAPIError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'PokemonAPIError';
    this.status = status;
  }
}

export const pokemonAPI = {
  async fetchPokemonList(limit: number = 50, offset: number = 0): Promise<PokemonListResponse> {
    try {
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new PokemonAPIError(`Failed to fetch Pokemon list: ${response.statusText}`, response.status);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof PokemonAPIError) {
        throw error;
      }
      throw new PokemonAPIError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async fetchPokemonDetails(name: string): Promise<unknown> {
    try {
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
      
      if (!response.ok) {
        throw new PokemonAPIError(`Failed to fetch Pokemon details: ${response.statusText}`, response.status);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof PokemonAPIError) {
        throw error;
      }
      throw new PokemonAPIError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
