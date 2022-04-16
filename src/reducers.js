import { combineReducers } from "redux";
import login from "./reducers/login";
import resourcesReducer from "./reducers/Resources"

const rootReducer = combineReducers({
  login,
  resourcesReducer
});

export default rootReducer;
