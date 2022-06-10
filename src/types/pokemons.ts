export type TypeName =
  | 'bug'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water'
  | 'ghost'
  | 'dark';

interface PokemonMove {
  id: number;
  name: string;
  description: string;
  damageClass: string;
  type: TypeName;
}

interface PokemonTypes {
  id: number;
  name: TypeName;
  slot: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypes[];
  image: string;
  moves?: PokemonMove[];
}
