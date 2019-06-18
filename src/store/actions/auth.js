import * as actionTypes from './ActionTypes';
// import axios from 'axios';

export const authStart = loginData => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = loginData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    loginData: loginData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = loginData => {
  return {
    type: actionTypes.AUTH_USER,
    loginData: loginData
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = loginData => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};
