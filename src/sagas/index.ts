import { all, fork } from 'redux-saga/effects';

import { getPokemon, getPokemons } from './pokemonsSagas';

export function* rootSaga() {
  yield all([fork(getPokemons), fork(getPokemon)]);
}
