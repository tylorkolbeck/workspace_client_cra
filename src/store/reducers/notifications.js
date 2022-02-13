import { NOTIFICATION_ACTIONS } from "../actions/types";

const initialState = {
  sessionTimeout: null,
  urlAtTimeout: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.SET_USER_SESSION_EXPIRED_ERROR:
      return {
        ...state,
        sessionTimeout: true,
        urlAtTimeout: action.payload,
      };

    default:
      return state;
  }
}
