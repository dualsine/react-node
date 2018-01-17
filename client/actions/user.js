import feathers from '../services/feathers';

export const LOGOUT = 'LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ACCEPTED = 'LOGIN_ACCEPTED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';
export const SIGNUP_ACCEPTED = 'SIGNUP_ACCEPTED';
export const REMOVE_REDIRECT = 'REMOVE_REDIRECT';

export function loginFromStorage() {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const user = await feathers.loginFromStorage();

    if (user) {
      dispatch({
        type: LOGIN_ACCEPTED,
        user,
      });
    } else {
      dispatch({
        type: LOGIN_REJECTED,
      });
    }
  };
}

export function loginWithPassword(email, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await feathers.loginWithPassword(email, password);

    if (response.success) {
      dispatch({
        type: LOGIN_ACCEPTED,
        user: response.user,
      });
    } else {
      dispatch({
        type: LOGIN_REJECTED,
        error: response.error,
      });
    }
  };
}

export function signup(email, password) {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP_REQUEST,
    });

    const emailsCount = await feathers.countEmails(email);
    if (emailsCount > 0) {
      return dispatch({
        type: SIGNUP_REJECTED,
        error: 'Email already in use.',
      });
    }

    const response = await feathers.signup(email, password);

    if(response.success) {
      dispatch({
        type: SIGNUP_ACCEPTED,
      });
    } else {
      dispatch({
        type: SIGNUP_REJECTED,
        error: 'Server error.',
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    await feathers.logout();
    dispatch({
      type: LOGOUT,
    });
  };
}

export function removeRedirect() {
  return {
    type: REMOVE_REDIRECT,
  };
}
