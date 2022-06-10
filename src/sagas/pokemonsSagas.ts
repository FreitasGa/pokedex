import { call, put, takeEvery } from 'redux-saga/effects';

import { instance } from '../config';
import {
  Action,
  ActionTypes,
  GetPokemonRequestedAction,
  GetPokemonsRequestedAction,
} from '../actionTypes';
import {
  GetPokemonsResponse,
  GetPokemonResponse,
  Pokemon,
  GetMoveResponse,
} from '../types';

const fetchPokemons = async (offset: number): Promise<Pokemon[]> => {
  const { data: listResponse } = await instance.get<GetPokemonsResponse>(
    `pokemon?offset=${offset}&limit=20}`,
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
    types: pokemon.types.map(({ slot, type }) => ({
      slot,
      id: Number(type.url.split('/')[6]),
      name: type.name,
    })),
    image: pokemon.sprites.other['official-artwork'].front_default,
  }));
};

const fetchPokemon = async (id: number): Promise<Pokemon> => {
  const { data: getResponse } = await instance.get<GetPokemonResponse>(
    `pokemon/${id}`,
  );

  const getMoveArray = getResponse.moves.map(async ({ move: { url } }) => {
    const { data: getMove } = await instance.get<GetMoveResponse>(url);
    return getMove;
  });

  const moves = await Promise.all(getMoveArray);

  return {
    id: getResponse.id,
    name: getResponse.name,
    height: getResponse.height,
    weight: getResponse.weight,
    types: getResponse.types.map(({ slot, type }) => ({
      slot,
      id: Number(type.url.split('/')[6]),
      name: type.name,
    })),
    image: getResponse.sprites.other['official-artwork'].front_default,
    moves: moves.map((move) => ({
      id: move.id,
      name: move.name,
      description: move.effect_entries[0].short_effect,
      damageClass: move.damage_class.name,
      type: move.type.name,
    })),
  };
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

function* runGetPokemon(action: GetPokemonRequestedAction) {
  const {
    payload: { id },
  } = action;

  try {
    const pokemon: Pokemon = yield call(fetchPokemon, id);

    yield put<Action>({
      type: ActionTypes.GET_POKEMON_SUCCEEDED,
      payload: {
        pokemon,
      },
    });
  } catch (error) {
    yield put<Action>({
      type: ActionTypes.GET_POKEMON_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getPokemon() {
  yield takeEvery(ActionTypes.GET_POKEMON_REQUESTED, runGetPokemon);
}
