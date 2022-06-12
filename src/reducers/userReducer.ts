/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import { UserAction, UserActionTypes } from '../actionTypes';

interface State {
  pokemonsIds: number[];
  loading: boolean;
}

const initialState: State = {
  pokemonsIds: [],
  loading: false,
};

const addNewUserPokemons = (state: State, newUserPokemons: string) => {
  const pokemonsIds: number[] = JSON.parse(newUserPokemons);
  state.pokemonsIds = pokemonsIds;
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

      default:
        return state;
    }
  },
  initialState,
);
