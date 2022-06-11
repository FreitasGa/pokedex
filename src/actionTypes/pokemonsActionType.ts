import { GetPokemonResponse } from '../types';

export enum PokemonsActionTypes {
  GET_POKEMONS_REQUESTED = 'GET_POKEMONS_REQUESTED',
  GET_POKEMONS_SUCCEEDED = 'GET_POKEMONS_SUCCEEDED',
  GET_POKEMONS_FAILED = 'GET_POKEMONS_FAILED',
}

export interface GetPokemonsRequestedAction {
  type: PokemonsActionTypes.GET_POKEMONS_REQUESTED;
  payload: {
    offset: number;
  };
}

export interface GetPokemonsSucceededAction {
  type: PokemonsActionTypes.GET_POKEMONS_SUCCEEDED;
  payload: {
    pokemons: GetPokemonResponse[];
  };
}

export interface GetPokemonsFailedAction {
  type: PokemonsActionTypes.GET_POKEMONS_FAILED;
  payload: {
    error: unknown;
  };
}

export type PokemonsAction =
  | GetPokemonsRequestedAction
  | GetPokemonsSucceededAction
  | GetPokemonsFailedAction;
