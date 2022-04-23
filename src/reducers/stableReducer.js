import {
    REQUEST_TO_TRAIN,
    TRAINING_QUEUE_FAILED_TO_FETCHED, TRAINING_FAILED_TO_START,
    TRAINING_QUEUE_FETCHED, TRAINING_SUCCESSFULLY_STARTED
} from '../actions/stable'

const initialState = {
    trainingRequested: false,
    trainingStarted: false,
    trainingFailed: false,
    trainingTime: null,
    queueFetched: false,
    queue: null,
    errMsgTraining: null,
    errMsgQueue: null,
};

const stable = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TO_TRAIN: {
            return {
                ...state,
                trainingRequested: true
            }
        }
        case TRAINING_SUCCESSFULLY_STARTED: {
            return {
                ...state,
                trainingStarted: true,
                trainingTime: action.timeRequired,
                errMsgTraining: null,
                trainingFailed: false,
            }
        }
        case TRAINING_FAILED_TO_START: {
            return {
                ...state,
                trainingStarted: false,
                trainingFailed: true,
                errMsgTraining: action.errMsg,
                trainingTime: null
            }
        }
        case TRAINING_QUEUE_FETCHED: {
            return {
                ...state,
                queueFetched: true,
                queue: action.trainingQueue,
                errMsgQueue: null,
            }
        }

        case TRAINING_QUEUE_FAILED_TO_FETCHED: {
            return {
                ...state,
                queueFetched: false,
                errMsgQueue: action.errMsgQueue
            }
        }

        default: return state;
    }
}

export const stableReducer = state => state.stable;
export default stable;