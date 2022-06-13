import { RootState } from '../reducers';

export const getRegisterLoading = (state: RootState) => state.register.loading;
export const getRegisterError = (state: RootState) => state.register.error;
export const getRegisterNeedsConfirmation = (state: RootState) => state.register.needsConfirmation;
