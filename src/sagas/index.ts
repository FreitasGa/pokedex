import { all, fork } from 'redux-saga/effects';

import { getPokemons, getPokemon, getPokemonsByIds } from './pokemonsSaga';
import { getMoves } from './movesSaga';
import {
  getUserPokemons,
  toggleUserPokemons,
  login,
  logout,
  register,
  getCurrentSession,
} from './userSaga';

export function* rootSaga() {
  yield all([
    fork(getPokemons),
    fork(getPokemon),
    fork(getPokemonsByIds),
    fork(getMoves),
    fork(getUserPokemons),
    fork(toggleUserPokemons),
    fork(login),
    fork(logout),
    fork(register),
    fork(getCurrentSession),
  ]);
}
