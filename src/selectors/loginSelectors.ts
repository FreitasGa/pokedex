import { RootState } from '../reducers';

export const getLoginLoading = (state: RootState) => state.login.loading;
export const getLoginError = (state: RootState) => state.login.error;
export const getLoginNeedsConfirmation = (state: RootState) => state.login.needsConfirmation;
