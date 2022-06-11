import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { instance } from '../config';
import {
  PokemonsAction,
  PokemonsActionTypes,
  GetPokemonRequestedAction,
} from '../actionTypes';
import { GetPokemonsResponse, GetPokemonResponse } from '../types';
import { RootState } from '../reducers';

interface FetchPokemonsResponse {
  newPokemons: GetPokemonResponse[];
  nextOffset: number;
}

const fetchPokemons = async (offset: number): Promise<FetchPokemonsResponse> => {
  const { data: pokemons } = await instance.get<GetPokemonsResponse>(
    `pokemon?offset=${offset}&limit=20}`,
  );

  const pokemonArray = pokemons.results.map(async ({ url }) => {
    const { data: pokemon } = await instance.get<GetPokemonResponse>(url);
    return pokemon;
  });

  const newPokemons = await Promise.all(pokemonArray);
  const params = new URLSearchParams(pokemons.next.split('?')[1]);
  const nextOffset = Number(params.get('offset')) || 0;

  return { newPokemons, nextOffset };
};

const fetchPokemon = async (query: string | number): Promise<GetPokemonResponse> => {
  const { data: pokemon } = await instance.get<GetPokemonResponse>(
    `pokemon/${query}`,
  );
  return pokemon;
};

function* runGetPokemons() {
  try {
    const offset: number = yield select((state: RootState) => state.pokemons.offset);
    const { newPokemons, nextOffset }: FetchPokemonsResponse = yield call(fetchPokemons, offset);

    yield put<PokemonsAction>({
      type: PokemonsActionTypes.GET_POKEMONS_SUCCEEDED,
      payload: {
        newPokemons,
        nextOffset,
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

function* runGetPokemon(action: GetPokemonRequestedAction) {
  const {
    payload: { query },
  } = action;

  try {
    const newPokemon: GetPokemonResponse = yield call(
      fetchPokemon,
      query.toString().toLowerCase(),
    );

    yield put<PokemonsAction>({
      type: PokemonsActionTypes.GET_POKEMON_SUCCEEDED,
      payload: {
        newPokemon,
      },
    });
  } catch (error) {
    yield put<PokemonsAction>({
      type: PokemonsActionTypes.GET_POKEMON_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getPokemon() {
  yield takeEvery(PokemonsActionTypes.GET_POKEMON_REQUESTED, runGetPokemon);
}
