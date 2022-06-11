import { combineReducers } from 'redux';

import { pokemonsReducer } from './pokemonsReducer';
import { movesReducer } from './movesReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  moves: movesReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
