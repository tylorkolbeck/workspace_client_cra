import { USER_ACTIONS } from "../types";

export function setUser(user) {
  return {
    type: USER_ACTIONS.SET_USER,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: USER_ACTIONS.LOGOUT_USER,
  };
}
