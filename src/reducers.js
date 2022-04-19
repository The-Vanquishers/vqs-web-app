import { combineReducers } from "redux";
import login from "./reducers/login";
import empire from "./reducers/empire";
import signup from "./reducers/signup";
import  mineReducer  from './reducers/mine';

const rootReducer = combineReducers({
  login,
  empire,
  signup,
  mineReducer
});

export default rootReducer;
