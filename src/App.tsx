import React, { useEffect } from 'react';

import { AppRoutes } from './routes';
import { useTypedDispatch } from './hooks';
import { GetUserPokemonsRequestedAction, UserActionTypes } from './actionTypes';

export const App = () => {
  const dispatch = useTypedDispatch();

  const getSelectedPokemons = () => {
    dispatch<GetUserPokemonsRequestedAction>({
      type: UserActionTypes.GET_USER_POKEMONS_REQUESTED,
    });
  };

  useEffect(() => {
    getSelectedPokemons();
  }, []);

  return (
    <AppRoutes />
  );
};
