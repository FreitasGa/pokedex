import React, { useEffect, useLayoutEffect } from 'react';

import { AppRoutes } from './routes';
import { useTypedDispatch } from './hooks';
import {
  GetCurrentSessionRequestedAction,
  GetUserPokemonsRequestedAction,
  UserActionTypes,
} from './actionTypes';

export const App = () => {
  const dispatch = useTypedDispatch();

  const getCurrentSession = () => {
    dispatch<GetCurrentSessionRequestedAction>({
      type: UserActionTypes.GET_CURRENT_SESSION_REQUESTED,
    });
  };

  const getSelectedPokemons = () => {
    dispatch<GetUserPokemonsRequestedAction>({
      type: UserActionTypes.GET_USER_POKEMONS_REQUESTED,
    });
  };

  useLayoutEffect(() => getCurrentSession(), []);
  useEffect(() => getSelectedPokemons(), []);

  return <AppRoutes />;
};
