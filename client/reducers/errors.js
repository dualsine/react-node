
import {DELETE_SERVER_ERROR} from "../actions/errors";
import {
  LOGIN_ACCEPTED, LOGIN_REJECTED, LOGIN_REQUEST, SIGNUP_ACCEPTED, SIGNUP_REJECTED,
  SIGNUP_REQUEST
} from "../actions/user";

export default function( state = {}, action ) {
  switch(action.type) {
    case DELETE_SERVER_ERROR:
    case LOGIN_REQUEST:
    case LOGIN_ACCEPTED:
    case SIGNUP_REQUEST:
    case SIGNUP_ACCEPTED:
      return { ...state, servererror: null };
    case LOGIN_REJECTED:
    case SIGNUP_REJECTED:
      return { ...state, servererror: action.error };
    default:
      return state;
  }
}
