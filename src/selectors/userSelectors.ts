import { RootState } from '../reducers';

export const getUserPokemonsIds = (state: RootState) => state.user.pokemonsIds;
export const getUserLoading = (state: RootState) => state.user.loading;

export const getIsPokemonSelected = (state: RootState, id: number) => (
  state.user.pokemonsIds.includes(id)
);
