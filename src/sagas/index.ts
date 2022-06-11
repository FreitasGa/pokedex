import { all, fork } from 'redux-saga/effects';

import { getPokemons } from './pokemonsSaga';
import { getMoves } from './movesSaga';

export function* rootSaga() {
  yield all([fork(getPokemons), fork(getMoves)]);
}
