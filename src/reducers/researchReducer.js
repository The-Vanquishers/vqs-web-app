import {
    REQUEST_TO_RESEARCH, RESEARCH_FAILED_TO_START,
    RESEARCH_QUEUE_FAILED_TO_FETCH, RESEARCH_QUEUE_FETCHED,
    RESEARCH_SUCCESSFULLY_STARTED
} from "../actions/research"

const initialState = {
    researchRequested: false,
    researchStarted: false,
    researchFailed: false,
    researchTime: null,
    queueFetched: false,
    researchQueue: [],
    errMsgResearch: null,
    errMsgResearchQueue: null,
}

const research = (state = initialState, action) => {
    switch (action.type) {

        case REQUEST_TO_RESEARCH: {
            return {
                ...state,
                researchRequested: true
            }
        }

        case RESEARCH_SUCCESSFULLY_STARTED: {
            return {
                ...state,
                researchStarted: true,
                researchTime: action.timeRequired,
                errMsgResearch: null,
                researchFailed: false
            }
        }

        case RESEARCH_FAILED_TO_START: {
            return {
                ...state,
                researchStarted: false,
                researchTime: null,
                errMsgResearch: action.errMsg,
                researchFailed: true
            }
        }

        case RESEARCH_QUEUE_FETCHED: {
            return {
                ...state,
                queueFetched: true,
                researchQueue: action.researchQueue,
                errMsgResearch: null,
            }
        }

        case RESEARCH_QUEUE_FAILED_TO_FETCH: {
            return {
                ...state,
                queueFetched: false,
                researchQueue: null,
                errMsgResearch: action.errMsgQueue,
                researchStarted: false,
                researchRequested: false
            }
        }

        default: return state;
    }
}

export const researchReducer = state => state.research;
export default research;
