import { GetPokemonResponse } from '../types';

export enum PokemonsActionTypes {
  GET_POKEMONS_REQUESTED = 'GET_POKEMONS_REQUESTED',
  GET_POKEMONS_FAILED = 'GET_POKEMONS_FAILED',
  GET_POKEMONS_SUCCEEDED = 'GET_POKEMONS_SUCCEEDED',
  GET_POKEMON_REQUESTED = 'GET_POKEMON_REQUESTED',
  GET_POKEMON_FAILED = 'GET_POKEMON_FAILED',
  GET_POKEMON_SUCCEEDED = 'GET_POKEMON_SUCCEEDED',
  GET_POKEMONS_BY_IDS_REQUESTED = 'GET_POKEMONS_BY_IDS_REQUESTED',
  GET_POKEMONS_BY_IDS_FAILED = 'GET_POKEMONS_BY_IDS_FAILED',
  GET_POKEMONS_BY_IDS_SUCCEEDED = 'GET_POKEMONS_BY_IDS_SUCCEEDED',
}

export interface GetPokemonsRequestedAction {
  type: PokemonsActionTypes.GET_POKEMONS_REQUESTED;
}

export interface GetPokemonsFailedAction {
  type: PokemonsActionTypes.GET_POKEMONS_FAILED;
  payload: {
    error: any;
  };
}

export interface GetPokemonsSucceededAction {
  type: PokemonsActionTypes.GET_POKEMONS_SUCCEEDED;
  payload: {
    newPokemons: GetPokemonResponse[];
    nextOffset: number;
  };
}

export interface GetPokemonRequestedAction {
  type: PokemonsActionTypes.GET_POKEMON_REQUESTED;
  payload: {
    query: string | number;
  };
}

export interface GetPokemonFailedAction {
  type: PokemonsActionTypes.GET_POKEMON_FAILED;
  payload: {
    error: any;
  };
}

export interface GetPokemonSucceededAction {
  type: PokemonsActionTypes.GET_POKEMON_SUCCEEDED;
  payload: {
    newPokemon: GetPokemonResponse;
  };
}

export interface GetPokemonsByIdsRequestedAction {
  type: PokemonsActionTypes.GET_POKEMONS_BY_IDS_REQUESTED;
}

export interface GetPokemonsByIdsFailedAction {
  type: PokemonsActionTypes.GET_POKEMONS_BY_IDS_FAILED;
  payload: {
    error: any;
  };
}

export interface GetPokemonsByIdsSucceededAction {
  type: PokemonsActionTypes.GET_POKEMONS_BY_IDS_SUCCEEDED;
  payload: {
    newPokemons: GetPokemonResponse[];
  };
}

export type PokemonsAction =
  | GetPokemonsRequestedAction
  | GetPokemonsFailedAction
  | GetPokemonsSucceededAction
  | GetPokemonRequestedAction
  | GetPokemonFailedAction
  | GetPokemonSucceededAction
  | GetPokemonsByIdsRequestedAction
  | GetPokemonsByIdsFailedAction
  | GetPokemonsByIdsSucceededAction;
