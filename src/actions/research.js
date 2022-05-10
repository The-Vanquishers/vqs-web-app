//Research Action
const axios = require("axios");
const { apiUrl } = require("../variables");

exports.REQUEST_TO_RESEARCH = "REQUEST_TO_RESEARCH";
exports.RESEARCH_SUCCESSFULLY_STARTED = "RESEARCH_SUCCESSFULLY_STARTED";
exports.RESEARCH_FAILED_TO_START = "RESEARCH_FAILED_TO_START";

exports.RESEARCH_QUEUE_FETCHED = "RESEARCH_QUEUE_FETCHED";
exports.RESEARCH_QUEUE_FAILED_TO_FETCH = "RESEARCH_QUEUE_FAILED_TO_FETCH";

exports.researchRequest = (body, headers) => dispatch => {
    dispatch({ type: this.REQUEST_TO_RESEARCH });
    return axios.post(`${apiUrl}/research`, body, { headers: headers })
        .then(res => {
            dispatch({
                type: this.RESEARCH_SUCCESSFULLY_STARTED,
                timeRequired: res.data.completionTime
            })
        })
        .catch(error => {
            dispatch({
                type: this.RESEARCH_FAILED_TO_START,
                errMsg: error.response.data
            })
            //alert(error.response.data);
        })
}

exports.getResearchQueue = (headers, empireId) => dispatch => {
    axios.get(`${apiUrl}/research/queue/${empireId}`,
        { headers: headers })
        .then(res => {
            dispatch({
                type: this.RESEARCH_QUEUE_FETCHED,
                researchQueue: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: this.RESEARCH_QUEUE_FAILED_TO_FETCH,
                errMsgQueue: err.response.data
            })
        })
}