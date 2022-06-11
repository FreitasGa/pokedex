import { createSelector } from 'reselect';

import { RootState } from '../reducers';

export const getPokemonsObject = (state: RootState) => state.pokemons.byId;
export const getPokemonsIds = (state: RootState) => state.pokemons.allIds;
export const getPokemonsLoading = (state: RootState) => state.pokemons.loading;
export const getPokemonsLength = (state: RootState) => state.pokemons.allIds.length;
export const getPokemonById = (state: RootState, id: number) => state.pokemons.byId[id];

export const getPokemonsArray = createSelector(
  getPokemonsObject,
  (pokemonsObject) => Object.values(pokemonsObject),
);

export const getPokemonMovesIds = createSelector(
  getPokemonById,
  (pokemon) => pokemon.movesIds,
);
