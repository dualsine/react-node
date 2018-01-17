import {
  LOGIN_ACCEPTED, SIGNUP_ACCEPTED,
  SIGNUP_REJECTED, SIGNUP_REQUEST,
  DELETE_REDIRECT_LOGIN, LOGIN_REQUEST, LOGIN_REJECTED,
} from '../actions/user';

const initialState = {
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_REDIRECT_LOGIN:
      return Object.assign({}, state, { redirectLogin: false });
    case SIGNUP_REQUEST:
      return Object.assign({}, state, { loading: true });
    case SIGNUP_ACCEPTED:
      return Object.assign({}, state, { loading: false, redirectLogin: true });
    case SIGNUP_REJECTED:
      return Object.assign({}, state, { loading: false });
    case LOGIN_REJECTED:
      return Object.assign({}, state, { loading: false });
    case LOGIN_ACCEPTED:
      return Object.assign({}, state, action.user, { loading: false, redirectHome: true });
    case LOGIN_REQUEST:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
}
