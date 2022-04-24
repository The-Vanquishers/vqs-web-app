import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import stable from "./reducers/stableReducer"

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  stable
});

export default rootReducer;
