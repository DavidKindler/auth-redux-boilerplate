import { put, select, delay } from 'redux-saga/effects';
// import * as actionTypes from '../actions/ActionTypes';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
  yield localStorage.removeItem('loginData');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = { ...action.loginData, returnSecureToken: true };

  let url =
    'https://auth.url';
  if (!authData.isSignup) {
    url =
      'https://signup.url';
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    const localData = { ...response.data, expirationTime };
    yield localStorage.setItem('loginData', JSON.stringify(localData));

    yield put(actions.authSuccess(localData));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}


export function* authCheckStateSaga(action) {
  if (!localStorage['loginData']) {
    yield put(actions.logout());
  } else {
    const currentTime = new Date();
    const localStore = JSON.parse(localStorage.getItem('loginData'));
    const expirationTime = new Date(localStore.expirationTime);
    const idToken = localStore.idToken;
    const userId = localStore.localId;
    const loginData = yield select();
    console.log('loginData', loginData);
    console.log('localStore', localStore);
    console.log('current time', new Date(currentTime));
    console.log('storage time', new Date(expirationTime));
    if (expirationTime > currentTime) {
      console.log('you should still be logged in');
      // return false;

      // console.log('current state', loginData, localStorage);
      const dispatchData = {
        ...loginData.auth,
        idToken: idToken,
        isLoggedin: true,
        expirationTime: expirationTime,
        userId: userId,
        localStore: localStore
      };
      yield put(actions.authSuccess(dispatchData));
      console.log('dispatch authSuccess with ', dispatchData);
      var secondsLeft = (expirationTime.getTime() - new Date().getTime()) / 1000;
      yield put(actions.checkAuthTimeout(secondsLeft));
      console.log('expirationTime.getSeconds()', expirationTime.getTime());
      console.log('new Date().getSeconds()', new Date().getTime());
      console.log('seconds left is', secondsLeft);
    } else {
      console.log('first time logging in?');
      yield put(actions.logout());
    }
  }
}
