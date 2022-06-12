import { put, takeEvery } from 'redux-saga/effects';
import {
  ToggleUserPokemonRequestedAction,
  UserAction,
  UserActionTypes,
} from '../actionTypes';

function* runGetUserPokemons() {
  try {
    const newUserPokemons = localStorage.getItem('selectedPokemons') || '[]';

    yield put<UserAction>({
      type: UserActionTypes.GET_USER_POKEMONS_SUCCEEDED,
      payload: {
        newUserPokemons,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.GET_USER_POKEMONS_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getUserPokemons() {
  yield takeEvery(
    UserActionTypes.GET_USER_POKEMONS_REQUESTED,
    runGetUserPokemons,
  );
}

function* runToggleUserPokemons(action: ToggleUserPokemonRequestedAction) {
  const {
    payload: { pokemonId },
  } = action;

  const oldPokemonsIds: number[] = JSON.parse(
    localStorage.getItem('selectedPokemons') || '[]',
  );

  const newPokemonsIds = oldPokemonsIds.includes(pokemonId)
    ? oldPokemonsIds.filter((id) => id !== pokemonId)
    : [...oldPokemonsIds, pokemonId];

  localStorage.setItem('selectedPokemons', JSON.stringify(newPokemonsIds));
  const newUserPokemons = localStorage.getItem('selectedPokemons') || '[]';

  try {
    yield put<UserAction>({
      type: UserActionTypes.TOGGLE_USER_POKEMON_SUCCEEDED,
      payload: {
        newUserPokemons,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.TOGGLE_USER_POKEMON_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* toggleUserPokemons() {
  yield takeEvery(
    UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED,
    runToggleUserPokemons,
  );
}
