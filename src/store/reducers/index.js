import { combineReducers } from "redux";
import userReducer from "./user";
import notificationReducer from "./notifications";

export default combineReducers({
  user: userReducer,
  notifications: notificationReducer,
});
