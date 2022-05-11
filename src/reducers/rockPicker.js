import {
  FETCHING_ROCK_PICKER,
  FETCHED_ROCK_PICKER,
  FETCHING_FAILED
} from "../actions/rockPicker";


const initialState = {
  isFetching: false,
  isFetched: false,
  fetchingFailed: false,
  errMsg: null

};

const rockPicker = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ROCK_PICKER:
      return {
        ...state,
        isFetching: true
      };
    case FETCHED_ROCK_PICKER:
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

export const rockPickerReducer = state => state.RockPicker;

export default rockPicker;