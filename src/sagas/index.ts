import { all, fork } from 'redux-saga/effects';

import { getPokemons } from './pokemonsSaga';
import { getMoves } from './movesSaga';
import { getUserPokemons, toggleUserPokemons } from './userSaga';

export function* rootSaga() {
  yield all([
    fork(getPokemons),
    fork(getMoves),
    fork(getUserPokemons),
    fork(toggleUserPokemons),
  ]);
}
