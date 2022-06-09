/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { Action, ActionTypes } from '../actionTypes';
import { Pokemon } from '../types';

interface State {
  byId: {
    [key: number]: Pokemon;
  };
  allIds: number[];
  loading: boolean;
}

const initialState: State = {
  byId: {},
  allIds: [],
  loading: false,
};

const addNewPokemons = (state: State, newPokemons: Pokemon[]) => {
  newPokemons.forEach((pokemon) => {
    state.byId[pokemon.id] = pokemon;
  });
  state.allIds = Object.keys(state.byId).map((key) => parseInt(key, 10));
};

export const pokemonsReducer = produce(
  (state = initialState, action: Action): State => {
    switch (action.type) {
      case ActionTypes.GET_POKEMONS_REQUESTED:
        state.loading = true;
        return state;

      case ActionTypes.GET_POKEMONS_FAILED:
        state.loading = false;
        return state;

      case ActionTypes.GET_POKEMONS_SUCCEEDED:
        state.loading = false;
        addNewPokemons(state, action.payload.pokemons);
        return state;

      case ActionTypes.GET_POKEMON_REQUESTED:
        state.loading = true;
        return state;

      case ActionTypes.GET_POKEMON_FAILED:
        state.loading = false;
        return state;

      case ActionTypes.GET_POKEMON_SUCCEEDED:
        state.loading = false;
        addNewPokemons(state, [action.payload.pokemon]);
        return state;

      default:
        return state;
    }
  },
  initialState,
);
