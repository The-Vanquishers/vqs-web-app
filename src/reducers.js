import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import logging from "./reducers/logging"
import  mineReducer  from './reducers/mine';
import stable from "./reducers/stableReducer";
import warehouse from "./reducers/warehouse"

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  logging,
  mineReducer,
  stable,
  warehouse
});

export default rootReducer;
