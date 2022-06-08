interface PokemonMove {
  id: number;
  name: string;
  description?: string;
}

interface PokemonTypes {
  id: number;
  name: string;
  slot: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  moves: PokemonMove[];
  types: PokemonTypes[];
  image: string;
}
