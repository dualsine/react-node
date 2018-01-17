import {
  LOGIN_ACCEPTED,
  LOGIN_REQUEST,
  LOGIN_WITH_PASSWORD,
} from "../actions/user";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACCEPTED:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}
