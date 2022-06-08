import { Action, ActionTypes } from '../actionTypes/pokemonsActionType';
import { Pokemon } from '../types/pokemons';

interface State {
  byId: {
    [key: string]: Pokemon;
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
  state.allIds = [...state.allIds, ...newPokemons.map((pokemon) => pokemon.id)];
  newPokemons.forEach((pokemon) => {
    state.byId[pokemon.id] = pokemon;
  });
};

export const pokemonsReducer = (
  state = initialState,
  action: Action
): State => {
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
};
