import { call, put, takeEvery } from 'redux-saga/effects';

import { instance } from '../config';
import {
  Action,
  ActionTypes,
  GetPokemonMoveRequestedAction,
  GetPokemonsRequestedAction,
} from '../actionTypes';
import {
  GetPokemonsResponse,
  GetPokemonResponse,
  GetMoveResponse,
} from '../types';

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

const fetchMoves = async (id: number): Promise<GetMoveResponse[]> => {
  const { data: pokemon } = await instance.get<GetPokemonResponse>(
    `pokemon/${id}`,
  );

  const moveArray = pokemon.moves.map(async ({ move: { url } }) => {
    const { data: move } = await instance.get<GetMoveResponse>(url);
    return move;
  });

  const newMoves = await Promise.all(moveArray);
  return newMoves;
};

function* runGetPokemons(action: GetPokemonsRequestedAction) {
  const {
    payload: { offset },
  } = action;

  try {
    const pokemons: GetPokemonResponse[] = yield call(fetchPokemons, offset);

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

function* runGetMoves(action: GetPokemonMoveRequestedAction) {
  const {
    payload: { id },
  } = action;

  try {
    const moves: GetMoveResponse[] = yield call(fetchMoves, id);

    yield put<Action>({
      type: ActionTypes.GET_POKEMON_MOVE_SUCCEEDED,
      payload: {
        moves,
        id,
      },
    });
  } catch (error) {
    yield put<Action>({
      type: ActionTypes.GET_POKEMON_MOVE_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getMoves() {
  yield takeEvery(ActionTypes.GET_POKEMON_MOVE_REQUESTED, runGetMoves);
}
