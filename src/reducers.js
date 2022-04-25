import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import logging from "./reducers/logging"
import  mineReducer  from './reducers/mine';
import stable from "./reducers/stableReducer"

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  logging,
  mineReducer,
  stable
});

export default rootReducer;
