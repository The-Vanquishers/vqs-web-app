import {FETCHING_RESOURCE,FETCHED_RESOURCE,FETCHING_FAILED} from "../actions/resources"

const initialState = {
    isFetching: false,
    isFetched: false,
    fetchingFailed:false,
    empireId: null,
    errMsg: null
};

const resources = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_RESOURCE:
            return {
                ...state,
                isFetching:true
            };
        case FETCHED_RESOURCE:
            return {
                ...state,
                isFetched: true,
                isFetching:false,
                empireResource:action.resources
            };
        case FETCHING_FAILED:
            return {
                ...state,
                fetchingFailed: true,
                errMsg: action.errMsg
            }
        default:
             return state
    }
}

export const resourcesReducer = state => state.resources;

export default resources;