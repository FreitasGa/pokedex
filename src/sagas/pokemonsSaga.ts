import { call, put, takeEvery } from 'redux-saga/effects';

import { instance } from '../config';
import {
  PokemonsAction,
  PokemonsActionTypes,
  GetPokemonsRequestedAction,
} from '../actionTypes';
import { GetPokemonsResponse, GetPokemonResponse } from '../types';

const fetchPokemons = async (offset: number): Promise<GetPokemonResponse[]> => {
  const { data: pokemons } = await instance.get<GetPokemonsResponse>(
    `pokemon?offset=${offset}&limit=20}`,
  );

  const pokemonArray = pokemons.results.map(async ({ url }) => {
    const { data: pokemon } = await instance.get<GetPokemonResponse>(url);
    return pokemon;
  });

  const newPokemons = await Promise.all(pokemonArray);
  return newPokemons;
};

function* runGetPokemons(action: GetPokemonsRequestedAction) {
  const {
    payload: { offset },
  } = action;

  try {
    const pokemons: GetPokemonResponse[] = yield call(fetchPokemons, offset);

    yield put<PokemonsAction>({
      type: PokemonsActionTypes.GET_POKEMONS_SUCCEEDED,
      payload: {
        pokemons,
      },
    });
  } catch (error) {
    yield put<PokemonsAction>({
      type: PokemonsActionTypes.GET_POKEMONS_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getPokemons() {
  yield takeEvery(PokemonsActionTypes.GET_POKEMONS_REQUESTED, runGetPokemons);
}
