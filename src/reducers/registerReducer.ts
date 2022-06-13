/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import { UserAction, UserActionTypes } from '../actionTypes';

interface State {
  needsConfirmation: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  needsConfirmation: false,
  loading: false,
  error: null,
};

export const registerReducer = produce(
  (state = initialState, action: UserAction): State => {
    switch (action.type) {
      case UserActionTypes.REGISTER_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.REGISTER_FAILED:
        state.error = action.payload.error;
        state.loading = false;
        return state;

      case UserActionTypes.REGISTER_SUCCEEDED:
        state.needsConfirmation = action.payload.needConfirmation;
        state.loading = false;
        return state;

      case UserActionTypes.CONFIRM_REGISTER_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.CONFIRM_REGISTER_FAILED:
        state.error = action.payload.error;
        state.loading = false;
        return state;

      case UserActionTypes.CONFIRM_REGISTER_SUCCEEDED:
        state.loading = false;
        return state;

      case UserActionTypes.LOGIN_REQUESTED:
        state.loading = true;
        return state;

      case UserActionTypes.LOGIN_FAILED:
        state.error = action.payload.error;
        state.loading = false;
        return state;

      case UserActionTypes.LOGIN_SUCCEEDED:
        state.needsConfirmation = false;
        state.error = null;
        state.loading = false;
        return state;

      case UserActionTypes.RESET_CONFIRMATION:
        state.needsConfirmation = false;
        return state;

      default:
        return state;
    }
  },
  initialState,
);
