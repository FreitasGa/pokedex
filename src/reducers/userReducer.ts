/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import { UserAction, UserActionTypes } from '../actionTypes';

interface State {
  pokemonsIds: number[];
  currentUser: {
    name: string;
    email: string;
  } | null;
  loading: boolean;
}

const initialState: State = {
  pokemonsIds: [],
  currentUser: null,
  loading: false,
};

const addNewUserPokemons = (state: State, newUserPokemons: string) => {
  const pokemonsIds: number[] = JSON.parse(newUserPokemons);
  state.pokemonsIds = pokemonsIds;
};

const addUser = (state: State, user: any) => {
  state.currentUser = {
    email: user.attributes.email,
    name: user.attributes.name,
  };
};

export const userReducer = produce(
  (state = initialState, action: UserAction): State => {
    switch (action.type) {
      case UserActionTypes.GET_USER_POKEMONS_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.GET_USER_POKEMONS_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.GET_USER_POKEMONS_SUCCEEDED:
        addNewUserPokemons(state, action.payload.newUserPokemons);
        state.loading = false;
        return state;

      case UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.TOGGLE_USER_POKEMON_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.TOGGLE_USER_POKEMON_SUCCEEDED:
        addNewUserPokemons(state, action.payload.newUserPokemons);
        state.loading = false;
        return state;

      case UserActionTypes.LOGIN_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.LOGIN_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.LOGIN_SUCCEEDED:
        addUser(state, action.payload.user);
        state.loading = false;
        return state;

      case UserActionTypes.LOGOUT_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.LOGOUT_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.LOGOUT_SUCCEEDED:
        state.currentUser = null;
        state.loading = false;
        return state;

      case UserActionTypes.REGISTER_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.REGISTER_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.REGISTER_SUCCEEDED:
        state.loading = false;
        return state;

      case UserActionTypes.CONFIRM_REGISTER_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.CONFIRM_REGISTER_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.CONFIRM_REGISTER_SUCCEEDED:
        state.loading = false;
        return state;

      case UserActionTypes.RESEND_CONFIRMATION_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.RESEND_CONFIRMATION_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.RESEND_CONFIRMATION_SUCCEEDED:
        state.loading = false;
        return state;

      case UserActionTypes.GET_CURRENT_SESSION_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.GET_CURRENT_SESSION_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.GET_CURRENT_SESSION_SUCCEEDED:
        addUser(state, action.payload.user);
        state.loading = false;
        return state;

      case UserActionTypes.FORGOT_PASSWORD_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.FORGOT_PASSWORD_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.FORGOT_PASSWORD_SUCCEEDED:
        state.loading = false;
        return state;

      case UserActionTypes.CONFIRM_FORGOT_PASSWORD_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.CONFIRM_FORGOT_PASSWORD_FAILED:
        state.loading = false;
        return state;

      case UserActionTypes.CONFIRM_FORGOT_PASSWORD_SUCCEEDED:
        state.loading = false;
        return state;

      default:
        return state;
    }
  },
  initialState,
);
