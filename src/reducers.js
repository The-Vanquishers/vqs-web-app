import { combineReducers } from "redux";
import login from "./reducers/login";
import empireReducer from "./reducers/empire";

const rootReducer = combineReducers({
  login,
  empireReducer
});

export default rootReducer;
