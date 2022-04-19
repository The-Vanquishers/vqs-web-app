import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import logging from "./reducers/logging"

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  logging
});

export default rootReducer;
