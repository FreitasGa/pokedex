import { combineReducers } from 'redux';

import { pokemonsReducer } from './pokemonsReducer';
import { movesReducer } from './movesReducer';

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  moves: movesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
