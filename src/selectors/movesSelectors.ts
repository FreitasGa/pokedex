import { createSelector } from 'reselect';

import { RootState } from '../reducers';

export const getMovesObject = (state: RootState) => state.moves.byId;
export const getMovesIds = (state: RootState) => state.moves.allIds;
export const getMovesLoading = (state: RootState) => state.moves.loading;
export const getMovesLength = (state: RootState) => state.moves.allIds.length;
export const getMoveById = (state: RootState, id: number) => state.moves.byId[id];

export const getMovesArray = createSelector(
  getMovesObject,
  (movesObject) => Object.values(movesObject),
);

export const getMovesArrayByIds = (state: RootState, ids: number[]) => (
  Object.values(state.moves.byId).filter((move) => ids.includes(move.id))
);
