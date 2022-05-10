import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import logging from "./reducers/logging"
import mine from './reducers/mine';
import stable from "./reducers/stableReducer";
import warehouse from "./reducers/warehouse"
import research from "./reducers/researchReducer"

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  logging,
  mine,
  stable,
  warehouse,
  research
});

export default rootReducer;
