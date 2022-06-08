import { all, fork } from 'redux-saga/effects';

import { getPokemons } from './pokemonsSagas';

export function* rootSaga() {
  yield all([fork(getPokemons)]);
}
