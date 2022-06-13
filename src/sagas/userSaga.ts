import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';

import {
  ConfirmForgotPasswordRequestedAction,
  ConfirmRegisterRequestedAction,
  ForgotPasswordRequestedAction,
  LoginRequestedAction,
  RegisterRequestedAction,
  ResendConfirmationRequestedAction,
  ToggleUserPokemonRequestedAction,
  UserAction,
  UserActionTypes,
} from '../actionTypes';
import { history } from '../config';

function* runGetUserPokemons() {
  try {
    const newUserPokemons = localStorage.getItem('selectedPokemons') || '[]';

    yield put<UserAction>({
      type: UserActionTypes.GET_USER_POKEMONS_SUCCEEDED,
      payload: {
        newUserPokemons,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.GET_USER_POKEMONS_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runToggleUserPokemons(action: ToggleUserPokemonRequestedAction) {
  const {
    payload: { pokemonId },
  } = action;

  const oldPokemonsIds: number[] = JSON.parse(
    localStorage.getItem('selectedPokemons') || '[]',
  );

  const newPokemonsIds = oldPokemonsIds.includes(pokemonId)
    ? oldPokemonsIds.filter((id) => id !== pokemonId)
    : [...oldPokemonsIds, pokemonId];

  localStorage.setItem('selectedPokemons', JSON.stringify(newPokemonsIds));
  const newUserPokemons = localStorage.getItem('selectedPokemons') || '[]';

  try {
    yield put<UserAction>({
      type: UserActionTypes.TOGGLE_USER_POKEMON_SUCCEEDED,
      payload: {
        newUserPokemons,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.TOGGLE_USER_POKEMON_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runLogin(action: LoginRequestedAction): Generator<any> {
  const {
    payload: { email, password },
  } = action;

  try {
    const user = yield call([Auth, 'signIn'], { username: email, password });

    yield put<UserAction>({
      type: UserActionTypes.LOGIN_SUCCEEDED,
      payload: {
        user,
      },
    });
    yield call(history.push, '/');
  } catch (error: any) {
    yield put<UserAction>({
      type: UserActionTypes.LOGIN_FAILED,
      payload: {
        error,
      },
    });

    if (error?.code === 'UserNotConfirmedException') {
      yield put<UserAction>({
        type: UserActionTypes.RESEND_CONFIRMATION_REQUESTED,
        payload: {
          email,
        },
      });
    }
  }
}

function* runRegister(action: RegisterRequestedAction): Generator<any> {
  const {
    payload: { name, email, password },
  } = action;

  try {
    yield call([Auth, 'signUp'], {
      username: email,
      password,
      attributes: { name },
    });

    yield put<UserAction>({
      type: UserActionTypes.REGISTER_SUCCEEDED,
      payload: {
        needConfirmation: true,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.REGISTER_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runConfirmRegister(
  action: ConfirmRegisterRequestedAction,
): Generator<any> {
  const {
    payload: { email, password, code },
  } = action;

  try {
    yield call([Auth, 'confirmSignUp'], email, code);

    yield put<UserAction>({
      type: UserActionTypes.CONFIRM_REGISTER_SUCCEEDED,
      payload: {
        needConfirmation: false,
      },
    });
    yield put<UserAction>({
      type: UserActionTypes.LOGIN_REQUESTED,
      payload: {
        email,
        password,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.CONFIRM_REGISTER_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runResendConfirmation(
  action: ResendConfirmationRequestedAction,
): Generator<any> {
  const {
    payload: { email },
  } = action;

  try {
    yield call([Auth, 'resendSignUp'], email);

    yield put<UserAction>({
      type: UserActionTypes.RESEND_CONFIRMATION_SUCCEEDED,
      payload: {
        needConfirmation: false,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.RESEND_CONFIRMATION_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runLogout(): Generator<any> {
  try {
    yield call([Auth, 'signOut']);

    yield put<UserAction>({
      type: UserActionTypes.LOGOUT_SUCCEEDED,
    });
    yield call(history.push, '/');
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.LOGOUT_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runGetCurrentSession(): Generator<any> {
  try {
    const user = yield call([Auth, 'currentAuthenticatedUser']);

    yield put<UserAction>({
      type: UserActionTypes.GET_CURRENT_SESSION_SUCCEEDED,
      payload: {
        user,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.GET_CURRENT_SESSION_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runForgotPassword(
  action: ForgotPasswordRequestedAction,
): Generator<any> {
  const {
    payload: { email },
  } = action;

  try {
    yield call([Auth, 'forgotPassword'], email);

    yield put<UserAction>({
      type: UserActionTypes.FORGOT_PASSWORD_SUCCEEDED,
      payload: {
        needConfirmation: true,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.FORGOT_PASSWORD_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* runConfirmForgotPassword(
  action: ConfirmForgotPasswordRequestedAction,
): Generator<any> {
  const {
    payload: { email, code, password },
  } = action;

  try {
    yield call([Auth, 'forgotPasswordSubmit'], email, code, password);

    yield put<UserAction>({
      type: UserActionTypes.CONFIRM_FORGOT_PASSWORD_SUCCEEDED,
      payload: {
        needConfirmation: false,
      },
    });
    yield put<UserAction>({
      type: UserActionTypes.LOGIN_REQUESTED,
      payload: {
        email,
        password,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.CONFIRM_FORGOT_PASSWORD_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* getUserPokemons() {
  yield takeEvery(
    UserActionTypes.GET_USER_POKEMONS_REQUESTED,
    runGetUserPokemons,
  );
}

export function* toggleUserPokemons() {
  yield takeEvery(
    UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED,
    runToggleUserPokemons,
  );
}

export function* login() {
  yield takeEvery(UserActionTypes.LOGIN_REQUESTED, runLogin);
}

export function* register() {
  yield takeEvery(UserActionTypes.REGISTER_REQUESTED, runRegister);
}

export function* confirmRegister() {
  yield takeEvery(
    UserActionTypes.CONFIRM_REGISTER_REQUESTED,
    runConfirmRegister,
  );
}

export function* resendConfirmation() {
  yield takeEvery(
    UserActionTypes.RESEND_CONFIRMATION_REQUESTED,
    runResendConfirmation,
  );
}

export function* logout() {
  yield takeEvery(UserActionTypes.LOGOUT_REQUESTED, runLogout);
}

export function* getCurrentSession() {
  yield takeEvery(
    UserActionTypes.GET_CURRENT_SESSION_REQUESTED,
    runGetCurrentSession,
  );
}

export function* forgotPassword() {
  yield takeEvery(UserActionTypes.FORGOT_PASSWORD_REQUESTED, runForgotPassword);
}

export function* confirmForgotPassword() {
  yield takeEvery(
    UserActionTypes.CONFIRM_FORGOT_PASSWORD_REQUESTED,
    runConfirmForgotPassword,
  );
}
