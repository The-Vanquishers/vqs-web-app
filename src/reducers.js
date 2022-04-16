import { combineReducers } from "redux";
import login from "./reducers/login";
import signup from "./reducers/signup";

const rootReducer = combineReducers({
  login,
  signup
});

export default rootReducer;
