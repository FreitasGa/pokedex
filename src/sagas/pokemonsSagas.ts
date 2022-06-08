import { call, put, takeEvery } from 'redux-saga/effects';

import { instance } from '../config';
import {
  Action,
  ActionTypes,
  GetPokemonsRequestedAction,
} from '../actionTypes';
import { GetPokemonsResponse, GetPokemonResponse, Pokemon } from '../types';

const fetchPokemons = async (offset: number): Promise<Pokemon[]> => {
  const { data: listResponse } = await instance.get<GetPokemonsResponse>(
    `pokemon?offset=${offset}&limit=20}`
  );

  const getResponseArray = listResponse.results.map(async ({ url }) => {
    const { data: getResponse } = await instance.get<GetPokemonResponse>(url);
    return getResponse;
  });

  const pokemons = await Promise.all(getResponseArray);

  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    moves: pokemon.moves.map(({ move }) => ({
      id: Number(move.url.split('/')[6]),
      name: move.name,
    })),
    types: pokemon.types.map(({ slot, type }) => ({
      slot,
      id: Number(type.url.split('/')[6]),
      name: type.name,
    })),
    image: pokemon.sprites.other['official-artwork'].front_default,
  }));
};

function* runGetPokemons(action: GetPokemonsRequestedAction) {
  const {
    payload: { offset },
  } = action;

  try {
    const pokemons: Pokemon[] = yield call(fetchPokemons, offset);

    yield put<Action>({
      type: ActionTypes.GET_POKEMONS_SUCCEEDED,
      payload: {
        pokemons,
      },
    });
  } catch (error) {
    console.error(error);
    yield put<Action>({
      type: ActionTypes.GET_POKEMONS_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getPokemons() {
  yield takeEvery(ActionTypes.GET_POKEMONS_REQUESTED, runGetPokemons);
}
