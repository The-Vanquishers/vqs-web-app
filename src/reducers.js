import { combineReducers } from "redux";
import login from "./reducers/login";
import resource from "./reducers/Resources";
import signup from "./reducers/signup";

const rootReducer = combineReducers({
  login,
  resource,
  signup
});

export default rootReducer;
