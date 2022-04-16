import {
    FETCH_EMPIRE_BUILDINGS_REQUEST,
    FETCH_EMPIRE_BUILDINGS_SUCCESS,
    FETCH_EMPIRE_BUILDINGS_ERROR
} from '../actions/empire'

const initialState = {
    loading: false,
    data: [],
    error: false,
    errorMsg: ""
}

const empireReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPIRE_BUILDINGS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
            }
        }
        case FETCH_EMPIRE_BUILDINGS_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false
            }
        }
        case FETCH_EMPIRE_BUILDINGS_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }
        }

        default: return state;
    }
}

export default empireReducer;