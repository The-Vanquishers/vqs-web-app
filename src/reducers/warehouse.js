import {
    FETCHING_WAREHOUSE,
    FETCHED_WAREHOUSE,
    FETCHING_FAILED
  } from "../actions/warehouse";
  
  const initialState = {
    isFetching: false,
    isFetched: false,
    fetchingFailed: false,
    errMsg: null
  };
  
  const warehouse = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_WAREHOUSE:
        return {
          ...state,
          isFetching: true
        };
      case FETCHED_WAREHOUSE:
        const { type, ...wareHouseDetails } = action;
        return {
          ...state,
          isFetched: true,
          isFetching: false,
          ...wareHouseDetails
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
  
  export const warehouseReducer = state => state.warehouse;
  
  export default warehouse;
  