import { GetMoveResponse, GetPokemonResponse } from '../types';

export enum ActionTypes {
  GET_POKEMONS_REQUESTED = 'GET_POKEMONS_REQUESTED',
  GET_POKEMONS_SUCCEEDED = 'GET_POKEMONS_SUCCEEDED',
  GET_POKEMONS_FAILED = 'GET_POKEMONS_FAILED',
  GET_POKEMON_MOVE_REQUESTED = 'GET_POKEMON_MOVE_REQUESTED',
  GET_POKEMON_MOVE_SUCCEEDED = 'GET_POKEMON_MOVE_SUCCEEDED',
  GET_POKEMON_MOVE_FAILED = 'GET_POKEMON_MOVE_FAILED',
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
    pokemons: GetPokemonResponse[];
  };
}

export interface GetPokemonsFailedAction {
  type: ActionTypes.GET_POKEMONS_FAILED;
  payload: {
    error: unknown;
  };
}

export interface GetPokemonMoveRequestedAction {
  type: ActionTypes.GET_POKEMON_MOVE_REQUESTED;
  payload: {
    id: number;
  };
}

export interface GetPokemonMoveSucceededAction {
  type: ActionTypes.GET_POKEMON_MOVE_SUCCEEDED;
  payload: {
    moves: GetMoveResponse[];
    id: number;
  };
}

export interface GetPokemonMoveFailedAction {
  type: ActionTypes.GET_POKEMON_MOVE_FAILED;
  payload: {
    error: unknown;
  };
}

export type Action =
  | GetPokemonsRequestedAction
  | GetPokemonsSucceededAction
  | GetPokemonsFailedAction
  | GetPokemonMoveRequestedAction
  | GetPokemonMoveSucceededAction
  | GetPokemonMoveFailedAction;
