import * as actionTypes from '../actions/ActionTypes';

const initialState = {
  isLoggedin: false,
  loading: false,
  error: null,
  token: null,
  userId: null,
  authRedirectPath: '/',
  name: '',
  email: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loginData: action.loginData,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        loading: false,
        data: action.loginData,
        expirationTime: action.loginData.expirationTime,
        error: null,
        token: action.loginData.idToken,
        userId: action.loginData.localId || action.loginData.userId
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedin: false,
        error: action.error
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedin: false,
        token: null,
        loading: false,
        data: null,
        userId: null,
        expirationTime: null
      };
    case actionTypes.AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };

    default:
      return state;
  }
};

export default authReducer;
