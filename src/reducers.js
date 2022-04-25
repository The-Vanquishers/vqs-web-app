import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import  mineReducer  from './reducers/mine';
import stable from "./reducers/stableReducer"

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  mineReducer,
  stable
});

export default rootReducer;
