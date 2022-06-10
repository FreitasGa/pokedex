/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { Action, ActionTypes } from '../actionTypes';
import { GetMoveResponse, GetPokemonResponse, Pokemon } from '../types';

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
    const pokemon = {
      id: newPokemon.id,
      name: newPokemon.name,
      height: newPokemon.height,
      weight: newPokemon.weight,
      types: newPokemon.types
        .sort((a, b) => a.slot - b.slot)
        .map(({ type }) => ({
          id: Number(type.url.split('/')[6]),
          name: type.name,
        })),
      image: newPokemon.sprites.other['official-artwork'].front_default,
    };

    state.byId[newPokemon.id] = pokemon;
  });
  state.allIds = Object.keys(state.byId).map((key) => Number(key));
};

const addNewMoves = (state: State, newMoves: GetMoveResponse[], id: number) => {
  state.byId[id].moves = newMoves.map((move) => ({
    id: move.id,
    name: move.name,
    description: move.effect_entries[0].short_effect,
    damageClass: move.damage_class.name,
    type: move.type.name,
  }));
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

      case ActionTypes.GET_POKEMON_MOVE_REQUESTED:
        state.loading = true;
        return state;

      case ActionTypes.GET_POKEMON_MOVE_FAILED:
        state.loading = false;
        return state;

      case ActionTypes.GET_POKEMON_MOVE_SUCCEEDED:
        state.loading = false;
        addNewMoves(state, action.payload.moves, action.payload.id);
        return state;

      default:
        return state;
    }
  },
  initialState,
);
