import { GetMoveResponse } from '../types';

export enum MovesActionTypes {
  GET_MOVES_REQUESTED = 'GET_MOVES_REQUESTED',
  GET_MOVES_SUCCEEDED = 'GET_MOVES_SUCCEEDED',
  GET_MOVES_FAILED = 'GET_MOVES_FAILED',
}

export interface GetMovesRequestedAction {
  type: MovesActionTypes.GET_MOVES_REQUESTED;
  payload: {
    movesIds: number[];
  };
}

export interface GetMovesSucceededAction {
  type: MovesActionTypes.GET_MOVES_SUCCEEDED;
  payload: {
    moves: GetMoveResponse[];
  };
}

export interface GetMovesFailedAction {
  type: MovesActionTypes.GET_MOVES_FAILED;
  payload: {
    error: unknown;
  };
}

export type MovesAction =
  | GetMovesRequestedAction
  | GetMovesSucceededAction
  | GetMovesFailedAction;
