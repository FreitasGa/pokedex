import { Pokemon } from '../types';

export enum ActionTypes {
  GET_POKEMONS_REQUESTED = 'GET_POKEMONS_REQUESTED',
  GET_POKEMONS_SUCCEEDED = 'GET_POKEMONS_SUCCEEDED',
  GET_POKEMONS_FAILED = 'GET_POKEMONS_FAILED',
  GET_POKEMON_REQUESTED = 'GET_POKEMON_REQUESTED',
  GET_POKEMON_SUCCEEDED = 'GET_POKEMON_SUCCEEDED',
  GET_POKEMON_FAILED = 'GET_POKEMON_FAILED',
}

export interface GetPokemonsRequestedAction {
  type: ActionTypes.GET_POKEMONS_REQUESTED;
  payload: {
    offset: number;
  };
}

export interface GetPokemonsSucceededAction {
  type: ActionTypes.GET_POKEMONS_SUCCEEDED;
  payload: {
    pokemons: Pokemon[];
  };
}

export interface GetPokemonsFailedAction {
  type: ActionTypes.GET_POKEMONS_FAILED;
  payload: {
    error: unknown;
  };
}

export interface GetPokemonRequestedAction {
  type: ActionTypes.GET_POKEMON_REQUESTED;
  payload: {
    id: number;
  };
}

export interface GetPokemonSucceededAction {
  type: ActionTypes.GET_POKEMON_SUCCEEDED;
  payload: {
    pokemon: Pokemon;
  };
}

export interface GetPokemonFailedAction {
  type: ActionTypes.GET_POKEMON_FAILED;
  payload: {
    error: unknown;
  };
}

export type Action =
  | GetPokemonsRequestedAction
  | GetPokemonsSucceededAction
  | GetPokemonsFailedAction
  | GetPokemonRequestedAction
  | GetPokemonSucceededAction
  | GetPokemonFailedAction;
