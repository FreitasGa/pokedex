export enum UserActionTypes {
  GET_USER_POKEMONS_REQUESTED = 'GET_USER_POKEMONS_REQUESTED',
  GET_USER_POKEMONS_FAILED = 'GET_USER_POKEMONS_FAILED',
  GET_USER_POKEMONS_SUCCEEDED = 'GET_USER_POKEMONS_SUCCEEDED',
  TOGGLE_USER_POKEMON_REQUESTED = 'TOGGLE_USER_POKEMON_REQUESTED',
  TOGGLE_USER_POKEMON_FAILED = 'TOGGLE_USER_POKEMON_FAILED',
  TOGGLE_USER_POKEMON_SUCCEEDED = 'TOGGLE_USER_POKEMON_SUCCEEDED',
}

export interface GetUserPokemonsRequestedAction {
  type: UserActionTypes.GET_USER_POKEMONS_REQUESTED;
}

export interface GetUserPokemonsFailedAction {
  type: UserActionTypes.GET_USER_POKEMONS_FAILED;
  payload: {
    error: unknown;
  };
}

export interface GetUserPokemonsSucceededAction {
  type: UserActionTypes.GET_USER_POKEMONS_SUCCEEDED;
  payload: {
    newUserPokemons: string;
  };
}

export interface ToggleUserPokemonRequestedAction {
  type: UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED;
  payload: {
    pokemonId: number;
  };
}

export interface ToggleUserPokemonFailedAction {
  type: UserActionTypes.TOGGLE_USER_POKEMON_FAILED;
  payload: {
    error: unknown;
  };
}

export interface ToggleUserPokemonSucceededAction {
  type: UserActionTypes.TOGGLE_USER_POKEMON_SUCCEEDED;
  payload: {
    newUserPokemons: string;
  };
}

export type UserAction =
  | GetUserPokemonsRequestedAction
  | GetUserPokemonsFailedAction
  | GetUserPokemonsSucceededAction
  | ToggleUserPokemonRequestedAction
  | ToggleUserPokemonFailedAction
  | ToggleUserPokemonSucceededAction;
