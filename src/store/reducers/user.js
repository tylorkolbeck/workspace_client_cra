import { USER_ACTIONS } from "../actions/types";

const initialState = {
  user: null,
  sessionTimeout: null,
  urlAtTimeout: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        sessionTimeout: false,
        urlAtTimeout: null,
        ...action.payload,
      };
    case USER_ACTIONS.LOGOUT_USER:
      return {
        state: initialState,
      };

    default:
      return state;
  }
}
