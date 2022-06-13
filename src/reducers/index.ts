import { combineReducers } from 'redux';

import { pokemonsReducer } from './pokemonsReducer';
import { movesReducer } from './movesReducer';
import { userReducer } from './userReducer';
import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';
import { forgotPasswordReducer } from './forgotPasswordReducer';

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  moves: movesReducer,
  user: userReducer,
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
