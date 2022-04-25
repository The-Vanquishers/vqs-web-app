import {
    FETCHING_LOGGING,
    FETCHED_LOGGING,
    FETCHING_FAILED
  } from "../actions/logging";
  
  const initialState = {
    isFetching: false,
    isFetched: false,
    fetchingFailed: false,
    errMsg: null
  };
  
  const logging = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_LOGGING:
        return {
          ...state,
          isFetching: true
        };
      case FETCHED_LOGGING:
        const { type, ...buildingDetails } = action;
        return {
          ...state,
          isFetched: true,
          isFetching: false,
          ...buildingDetails
        };
      case FETCHING_FAILED:
        return {
          ...state,
          fetchingFailed: true,
          errMsg: action.errMsg
        };
      default:
        return state;
    }
  };
  
  export const loggingReducer = state => state.logging;
  
  export default logging;
  