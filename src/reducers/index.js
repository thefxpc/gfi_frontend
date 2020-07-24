import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  ui: uiReducer,
  notifications: notificationReducer,
});

export default rootReducer;
