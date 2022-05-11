import {
    FETCHING_HOUSE,
    FETCHED_HOUSE,
    FETCHING_FAILED
} from "../actions/house";

const initialState = {
    isFetching: false,
    isFetched: false,
    fetchingFailed: false,
    errMsg: null

};

const house = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_HOUSE:
            return {
                ...state,
                isFetching: true
            };
        case FETCHED_HOUSE:
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

export const houseReducer = state => state.house;

export default house;