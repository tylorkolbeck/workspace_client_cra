import { NOTIFICATION_ACTIONS } from "../types";

export function setUserSessionExpiredError(pathAtTimeout) {
  return {
    type: NOTIFICATION_ACTIONS.SET_USER_SESSION_EXPIRED_ERROR,
    payload: pathAtTimeout,
  };
}
