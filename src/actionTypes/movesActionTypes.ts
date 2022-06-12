import { GetMoveResponse } from '../types';

export enum MovesActionTypes {
  GET_MOVES_REQUESTED = 'GET_MOVES_REQUESTED',
  GET_MOVES_FAILED = 'GET_MOVES_FAILED',
  GET_MOVES_SUCCEEDED = 'GET_MOVES_SUCCEEDED',
}

export interface GetMovesRequestedAction {
  type: MovesActionTypes.GET_MOVES_REQUESTED;
  payload: {
    movesIds: number[];
  };
}

export interface GetMovesFailedAction {
  type: MovesActionTypes.GET_MOVES_FAILED;
  payload: {
    error: unknown;
  };
}

export interface GetMovesSucceededAction {
  type: MovesActionTypes.GET_MOVES_SUCCEEDED;
  payload: {
    newMoves: GetMoveResponse[];
  };
}

export type MovesAction =
  | GetMovesRequestedAction
  | GetMovesFailedAction
  | GetMovesSucceededAction;
