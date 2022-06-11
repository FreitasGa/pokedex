/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { PokemonsAction, PokemonsActionTypes } from '../actionTypes';
import { GetPokemonResponse, Pokemon } from '../types';

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

const addNewPokemons = (state: State, newPokemons: GetPokemonResponse[]) => {
  newPokemons.forEach((newPokemon) => {
    const height = newPokemon.height / 10; // dm to m
    const weight = newPokemon.weight / 10; // hg to kg
    const types = newPokemon.types
      .sort((a, b) => a.slot - b.slot)
      .map(({ type }) => ({
        id: Number(type.url.split('/')[6]),
        name: type.name,
      }));
    const image = newPokemon.sprites.other['official-artwork'].front_default;
    const movesIds = newPokemon.moves.map(({ move }) => (
      Number(move.url.split('/')[6])
    ));

    state.byId[newPokemon.id] = {
      id: newPokemon.id,
      name: newPokemon.name,
      height,
      weight,
      types,
      image,
      movesIds,
    };
  });
  state.allIds = Object.keys(state.byId).map((key) => Number(key));
};

export const pokemonsReducer = produce(
  (state = initialState, action: PokemonsAction): State => {
    switch (action.type) {
      case PokemonsActionTypes.GET_POKEMONS_REQUESTED:
        state.loading = true;
        return state;

      case PokemonsActionTypes.GET_POKEMONS_FAILED:
        state.loading = false;
        return state;

      case PokemonsActionTypes.GET_POKEMONS_SUCCEEDED:
        addNewPokemons(state, action.payload.pokemons);
        state.loading = false;
        return state;

      default:
        return state;
    }
  },
  initialState,
);
