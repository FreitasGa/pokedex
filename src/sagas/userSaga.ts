import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';

import {
  LoginRequestedAction,
  RegisterRequestedAction,
  ToggleUserPokemonRequestedAction,
  UserAction,
  UserActionTypes,
} from '../actionTypes';
import { history } from '../config';

const loginUser = async (email: string, password: string) => {
  const user = await Auth.signIn({
    username: email,
    password,
  });

  return user;
};

const registerUser = async (name: string, email: string, password: string) => {
  const user = await Auth.signUp({
    username: email,
    password,
    attributes: {
      name,
    },
  });

  return user;
};

const logoutUser = async () => {
  await Auth.signOut();
};

const currentSession = async () => {
  const user = await Auth.currentAuthenticatedUser();
  return user;
};

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

export function* getUserPokemons() {
  yield takeEvery(
    UserActionTypes.GET_USER_POKEMONS_REQUESTED,
    runGetUserPokemons,
  );
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

export function* toggleUserPokemons() {
  yield takeEvery(
    UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED,
    runToggleUserPokemons,
  );
}

function* runLogin(action: LoginRequestedAction): Generator<any> {
  const {
    payload: { email, password },
  } = action;

  try {
    const user = yield call(loginUser, email, password);

    yield put<UserAction>({
      type: UserActionTypes.LOGIN_SUCCEEDED,
      payload: {
        user,
      },
    });
    yield call(history.push, '/');
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.LOGIN_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* login() {
  yield takeEvery(UserActionTypes.LOGIN_REQUESTED, runLogin);
}

function* runRegister(action: RegisterRequestedAction): Generator<any> {
  const {
    payload: { name, email, password },
  } = action;

  try {
    const user = yield call(registerUser, name, email, password);

    yield put<UserAction>({
      type: UserActionTypes.REGISTER_SUCCEEDED,
      payload: {
        user,
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

export function* register() {
  yield takeEvery(UserActionTypes.REGISTER_REQUESTED, runRegister);
}

function* runLogout(): Generator<any> {
  try {
    yield call(logoutUser);

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

export function* logout() {
  yield takeEvery(UserActionTypes.LOGOUT_REQUESTED, runLogout);
}

function* runGetCurrentSession(): Generator<any> {
  try {
    const user = yield call(currentSession);

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

export function* getCurrentSession() {
  yield takeEvery(
    UserActionTypes.GET_CURRENT_SESSION_REQUESTED,
    runGetCurrentSession,
  );
}
