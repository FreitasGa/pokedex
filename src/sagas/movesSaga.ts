import { call, put, takeEvery } from 'redux-saga/effects';

import { instance } from '../config';
import {
  GetMovesRequestedAction,
  MovesAction,
  MovesActionTypes,
} from '../actionTypes';
import { GetMoveResponse } from '../types';

const fetchMoves = async (movesIds: number[]): Promise<GetMoveResponse[]> => {
  const moveArray = movesIds.map(async (id) => {
    const { data: move } = await instance.get<GetMoveResponse>(`move/${id}`);
    return move;
  });

  const newMoves = await Promise.all(moveArray);
  return newMoves;
};

function* runGetMoves(action: GetMovesRequestedAction) {
  const {
    payload: { movesIds },
  } = action;

  try {
    const moves: GetMoveResponse[] = yield call(fetchMoves, movesIds);

    yield put<MovesAction>({
      type: MovesActionTypes.GET_MOVES_SUCCEEDED,
      payload: {
        moves,
      },
    });
  } catch (error) {
    yield put<MovesAction>({
      type: MovesActionTypes.GET_MOVES_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getMoves() {
  yield takeEvery(MovesActionTypes.GET_MOVES_REQUESTED, runGetMoves);
}
