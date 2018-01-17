import {
  LOGIN_ACCEPTED, SIGNUP_ACCEPTED,
  SIGNUP_REJECTED, SIGNUP_REQUEST,
  LOGIN_REQUEST, LOGIN_REJECTED,
  REMOVE_REDIRECT, LOGOUT
} from '../actions/user';

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, { loading: true });
    case SIGNUP_ACCEPTED:
      return Object.assign({}, state, { loading: false, redirect: '/login' });
    case SIGNUP_REJECTED:
      return Object.assign({}, state, { loading: false });
    case LOGIN_REJECTED:
      return Object.assign({}, state, { loading: false });
    case LOGIN_ACCEPTED:
      return Object.assign({}, state, action.user, { loading: false, redirect: '/' });
    case LOGIN_REQUEST:
      return Object.assign({}, state, { loading: true });
    case REMOVE_REDIRECT:
      return Object.assign({}, state, { redirect: null });
    case LOGOUT:
      return Object.assign({}, { redirect: '/' });
    default:
      return state;
  }
}
