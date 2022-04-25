const axios = require("axios");
const { apiUrl } = require("../variables");

exports.REQUEST_TO_TRAIN = "REQUEST_TO_TRAIN";
exports.TRAINING_SUCCESSFULLY_STARTED = "TRAINING_SUCCESSFULLY_STARTED";
exports.TRAINING_FAILED_TO_START = "TRAINING_FAILED_TO_START";
exports.TRAINING_QUEUE_FETCHED = "TRAINING_QUEUE_FETCHED";
exports.TRAINING_QUEUE_FAILED_TO_FETCHED = "TRAINING_QUEUE_FAILED_TO_FETCHED";

exports.trainRequest = (body, headers) => dispatch => {
    dispatch({ type: this.REQUEST_TO_TRAIN });
    return axios.post(`${apiUrl}/train`, body, { headers: headers })
        .then(res => {
            dispatch({
                type: this.TRAINING_SUCCESSFULLY_STARTED,
                timeRequired: res.data.timeRequired
            });
        })
        .catch(error => {
            dispatch({
                type: this.TRAINING_FAILED_TO_START,
                errMsg: error.response.data
            })
            alert(error.response.data);
        })
}



exports.getTrainingQueue = (headers, empireId) => dispatch => {
    axios.get(`${apiUrl}/train/queue/${empireId}`,
        { headers: headers })
        .then(res => {
            dispatch({
                type: this.TRAINING_QUEUE_FETCHED,
                trainingQueue: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: this.TRAINING_QUEUE_FAILED_TO_FETCHED,
                errMsgQueue: err.response.data
            })
        })
}


