import { RootState } from '../reducers';

export const getForgotPasswordLoading = (state: RootState) => (
  state.forgotPassword.loading
);
export const getForgotPasswordError = (state: RootState) => (
  state.forgotPassword.error
);
export const getForgotPasswordNeedsConfirmation = (state: RootState) => (
  state.forgotPassword.needsConfirmation
);
