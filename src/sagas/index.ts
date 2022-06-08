import { all, fork } from 'redux-saga/effects';

import { getPokemons } from './pokemonsSaga';

export function* rootSaga() {
  yield all([fork(getPokemons)]);
}
