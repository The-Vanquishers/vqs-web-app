import { FETCHING_MINE,FETCHED_MINE,FETCHING_FAILED } from "../actions/mine";

 const initialState = {
    isFetching: false,
    isFetched: false,
    fetchingFailed: false,
    errMsg: null

 };

 const mine = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_MINE:
        return {
          ...state,
          isFetching: true
        };
      case FETCHED_MINE:
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
  
  export const mineReducer = state => state.mine;
  
  export default mine;