import { all, fork } from 'redux-saga/effects';

import { getMoves, getPokemons } from './pokemonsSagas';

export function* rootSaga() {
  yield all([fork(getPokemons), fork(getMoves)]);
}
