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
  CONFIRM_REGISTER_REQUESTED = 'CONFIRM_REGISTER_REQUESTED',
  CONFIRM_REGISTER_FAILED = 'CONFIRM_REGISTER_FAILED',
  CONFIRM_REGISTER_SUCCEEDED = 'CONFIRM_REGISTER_SUCCEEDED',
  RESEND_CONFIRMATION_REQUESTED = 'RESEND_CONFIRMATION_REQUESTED',
  RESEND_CONFIRMATION_FAILED = 'RESEND_CONFIRMATION_FAILED',
  RESEND_CONFIRMATION_SUCCEEDED = 'RESEND_CONFIRMATION_SUCCEEDED',
  GET_CURRENT_SESSION_REQUESTED = 'GET_CURRENT_SESSION_REQUESTED',
  GET_CURRENT_SESSION_FAILED = 'GET_CURRENT_SESSION_FAILED',
  GET_CURRENT_SESSION_SUCCEEDED = 'GET_CURRENT_SESSION_SUCCEEDED',
  FORGOT_PASSWORD_REQUESTED = 'FORGOT_PASSWORD_REQUESTED',
  FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED',
  FORGOT_PASSWORD_SUCCEEDED = 'FORGOT_PASSWORD_SUCCEEDED',
  CONFIRM_FORGOT_PASSWORD_REQUESTED = 'CONFIRM_FORGOT_PASSWORD_REQUESTED',
  CONFIRM_FORGOT_PASSWORD_FAILED = 'CONFIRM_FORGOT_PASSWORD_FAILED',
  CONFIRM_FORGOT_PASSWORD_SUCCEEDED = 'CONFIRM_FORGOT_PASSWORD_SUCCEEDED',
  CHANGE_PASSWORD_REQUESTED = 'CHANGE_PASSWORD_REQUESTED',
  CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED',
  CHANGE_PASSWORD_SUCCEEDED = 'CHANGE_PASSWORD_SUCCEEDED',
  RESET_CONFIRMATION = 'RESET_CONFIRMATION',
}

export interface GetUserPokemonsRequestedAction {
  type: UserActionTypes.GET_USER_POKEMONS_REQUESTED;
}

export interface GetUserPokemonsFailedAction {
  type: UserActionTypes.GET_USER_POKEMONS_FAILED;
  payload: {
    error: any;
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
    error: any;
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
    error: any;
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
    error: any;
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
    error: any;
  };
}

export interface RegisterSucceededAction {
  type: UserActionTypes.REGISTER_SUCCEEDED;
  payload: {
    needConfirmation: boolean;
  };
}

export interface ConfirmRegisterRequestedAction {
  type: UserActionTypes.CONFIRM_REGISTER_REQUESTED;
  payload: {
    email: string;
    password: string;
    code: string;
  };
}

export interface ConfirmRegisterFailedAction {
  type: UserActionTypes.CONFIRM_REGISTER_FAILED;
  payload: {
    error: any;
  };
}

export interface ConfirmRegisterSucceededAction {
  type: UserActionTypes.CONFIRM_REGISTER_SUCCEEDED;
  payload: {
    needConfirmation: boolean;
  };
}

export interface ResendConfirmationRequestedAction {
  type: UserActionTypes.RESEND_CONFIRMATION_REQUESTED;
  payload: {
    email: string;
  };
}

export interface ResendConfirmationFailedAction {
  type: UserActionTypes.RESEND_CONFIRMATION_FAILED;
  payload: {
    error: any;
  };
}

export interface ResendConfirmationSucceededAction {
  type: UserActionTypes.RESEND_CONFIRMATION_SUCCEEDED;
  payload: {
    needConfirmation: boolean;
  };
}

export interface GetCurrentSessionRequestedAction {
  type: UserActionTypes.GET_CURRENT_SESSION_REQUESTED;
}

export interface GetCurrentSessionFailedAction {
  type: UserActionTypes.GET_CURRENT_SESSION_FAILED;
  payload: {
    error: any;
  };
}

export interface GetCurrentSessionSucceededAction {
  type: UserActionTypes.GET_CURRENT_SESSION_SUCCEEDED;
  payload: {
    user: any;
  };
}

export interface ForgotPasswordRequestedAction {
  type: UserActionTypes.FORGOT_PASSWORD_REQUESTED;
  payload: {
    email: string;
  };
}

export interface ForgotPasswordFailedAction {
  type: UserActionTypes.FORGOT_PASSWORD_FAILED;
  payload: {
    error: any;
  };
}

export interface ForgotPasswordSucceededAction {
  type: UserActionTypes.FORGOT_PASSWORD_SUCCEEDED;
  payload: {
    needConfirmation: boolean;
  };
}

export interface ConfirmForgotPasswordRequestedAction {
  type: UserActionTypes.CONFIRM_FORGOT_PASSWORD_REQUESTED;
  payload: {
    email: string;
    password: string;
    code: string;
  };
}

export interface ConfirmForgotPasswordFailedAction {
  type: UserActionTypes.CONFIRM_FORGOT_PASSWORD_FAILED;
  payload: {
    error: any;
  };
}

export interface ConfirmForgotPasswordSucceededAction {
  type: UserActionTypes.CONFIRM_FORGOT_PASSWORD_SUCCEEDED;
  payload: {
    needConfirmation: boolean;
  };
}

export interface ChangePasswordRequestedAction {
  type: UserActionTypes.CHANGE_PASSWORD_REQUESTED;
  payload: {
    user: any;
    oldPassword: string;
    newPassword: string;
  };
}

export interface ChangePasswordFailedAction {
  type: UserActionTypes.CHANGE_PASSWORD_FAILED;
  payload: {
    error: any;
  };
}

export interface ChangePasswordSucceededAction {
  type: UserActionTypes.CHANGE_PASSWORD_SUCCEEDED;
  payload: {
    user: any;
  };
}

export interface ResetConfirmation {
  type: UserActionTypes.RESET_CONFIRMATION;
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
  | ConfirmRegisterRequestedAction
  | ConfirmRegisterFailedAction
  | ConfirmRegisterSucceededAction
  | ResendConfirmationRequestedAction
  | ResendConfirmationFailedAction
  | ResendConfirmationSucceededAction
  | GetCurrentSessionRequestedAction
  | GetCurrentSessionFailedAction
  | GetCurrentSessionSucceededAction
  | ForgotPasswordRequestedAction
  | ForgotPasswordFailedAction
  | ForgotPasswordSucceededAction
  | ConfirmForgotPasswordRequestedAction
  | ConfirmForgotPasswordFailedAction
  | ConfirmForgotPasswordSucceededAction
  | ChangePasswordRequestedAction
  | ChangePasswordFailedAction
  | ChangePasswordSucceededAction
  | ResetConfirmation;
