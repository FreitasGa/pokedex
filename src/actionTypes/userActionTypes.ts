export enum UserActionTypes {
  GET_USER_POKEMONS_REQUESTED = 'GET_USER_POKEMONS_REQUESTED',
  GET_USER_POKEMONS_FAILED = 'GET_USER_POKEMONS_FAILED',
  GET_USER_POKEMONS_SUCCEEDED = 'GET_USER_POKEMONS_SUCCEEDED',
  TOGGLE_USER_POKEMON_REQUESTED = 'TOGGLE_USER_POKEMON_REQUESTED',
  TOGGLE_USER_POKEMON_FAILED = 'TOGGLE_USER_POKEMON_FAILED',
  TOGGLE_USER_POKEMON_SUCCEEDED = 'TOGGLE_USER_POKEMON_SUCCEEDED',
  LOGIN_REQUESTED = 'LOGIN_REQUESTED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED',
  LOGOUT_REQUESTED = 'LOGOUT_REQUESTED',
  LOGOUT_FAILED = 'LOGOUT_FAILED',
  LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED',
  REGISTER_REQUESTED = 'REGISTER_REQUESTED',
  REGISTER_FAILED = 'REGISTER_FAILED',
  REGISTER_SUCCEEDED = 'REGISTER_SUCCEEDED',
  GET_CURRENT_SESSION_REQUESTED = 'GET_CURRENT_SESSION_REQUESTED',
  GET_CURRENT_SESSION_FAILED = 'GET_CURRENT_SESSION_FAILED',
  GET_CURRENT_SESSION_SUCCEEDED = 'GET_CURRENT_SESSION_SUCCEEDED',
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

export interface LoginRequestedAction {
  type: UserActionTypes.LOGIN_REQUESTED;
  payload: {
    email: string;
    password: string;
  };
}

export interface LoginFailedAction {
  type: UserActionTypes.LOGIN_FAILED;
  payload: {
    error: unknown;
  };
}

export interface LoginSucceededAction {
  type: UserActionTypes.LOGIN_SUCCEEDED;
  payload: {
    user: any;
  };
}

export interface LogoutRequestedAction {
  type: UserActionTypes.LOGOUT_REQUESTED;
}

export interface LogoutFailedAction {
  type: UserActionTypes.LOGOUT_FAILED;
  payload: {
    error: unknown;
  };
}

export interface LogoutSucceededAction {
  type: UserActionTypes.LOGOUT_SUCCEEDED;
}

export interface RegisterRequestedAction {
  type: UserActionTypes.REGISTER_REQUESTED;
  payload: {
    name: string;
    email: string;
    password: string;
  };
}

export interface RegisterFailedAction {
  type: UserActionTypes.REGISTER_FAILED;
  payload: {
    error: unknown;
  };
}

export interface RegisterSucceededAction {
  type: UserActionTypes.REGISTER_SUCCEEDED;
  payload: {
    user: any;
  };
}

export interface GetCurrentSessionRequestedAction {
  type: UserActionTypes.GET_CURRENT_SESSION_REQUESTED;
}

export interface GetCurrentSessionFailedAction {
  type: UserActionTypes.GET_CURRENT_SESSION_FAILED;
  payload: {
    error: unknown;
  };
}

export interface GetCurrentSessionSucceededAction {
  type: UserActionTypes.GET_CURRENT_SESSION_SUCCEEDED;
  payload: {
    user: any;
  };
}

export type UserAction =
  | GetUserPokemonsRequestedAction
  | GetUserPokemonsFailedAction
  | GetUserPokemonsSucceededAction
  | ToggleUserPokemonRequestedAction
  | ToggleUserPokemonFailedAction
  | ToggleUserPokemonSucceededAction
  | LoginRequestedAction
  | LoginFailedAction
  | LoginSucceededAction
  | LogoutRequestedAction
  | LogoutFailedAction
  | LogoutSucceededAction
  | RegisterRequestedAction
  | RegisterFailedAction
  | RegisterSucceededAction
  | GetCurrentSessionRequestedAction
  | GetCurrentSessionFailedAction
  | GetCurrentSessionSucceededAction;
