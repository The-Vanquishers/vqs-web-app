import {
  FETCHING_EMPIRE,
  FETCHED_EMPIRE,
  FETCHING_FAILED
} from "../actions/empire";

const initialState = {
  isFetching: false,
  isFetched: false,
  fetchingFailed: false,
  empireId: null,
  errMsg: null
};

const empire = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_EMPIRE:
      return {
        ...state,
        isFetching: true
      };
    case FETCHED_EMPIRE:
      const { type, ...empireDetails } = action;
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        ...empireDetails
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

export const empireReducer = state => state.empire;

export default empire;
