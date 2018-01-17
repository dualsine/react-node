import feathers from '../services/feathers';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ACCEPTED = 'LOGIN_ACCEPTED';
export const LOGIN_WITH_PASSWORD = 'LOGIN_WITH_PASSWORD';

export function login() {
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
        type: LOGIN_WITH_PASSWORD,
      });
    }
  };
}
