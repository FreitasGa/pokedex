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

export interface PokemonMove {
  id: number;
  name: string;
  description: string;
  damageCategory: string;
  type: TypeName;
}

export interface PokemonTypes {
  id: number;
  name: TypeName;
}

export interface Pokemon {
  id: number;
  formattedId: string;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypes[];
  image: string;
  movesIds: number[];
}
