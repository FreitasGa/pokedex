/* eslint-disable camelcase */
import { TypeName } from './pokemons';

export interface GetPokemonsResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface GetPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: TypeName;
      url: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface GetMoveResponse {
  id: number;
  name: string;
  effect_chance: number;
  effect_entries: {
    short_effect: string;
  }[];
  damage_class: {
    name: string;
  };
  type: {
    name: TypeName;
  };
}
