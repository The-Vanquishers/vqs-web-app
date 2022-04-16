import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";

const rootReducer = combineReducers({
  login,
  empire,
  signup
});

export default rootReducer;
