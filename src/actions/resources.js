const axios = require("axios");
const { apiUrl } = require("../variables");

exports.FETCHING_RESOURCE = "FETCHING_RESOURCE";
exports.FETCHED_RESOURCE = "FETCHED_RESOURCE";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.resources = (token) => dispatch => {
    dispatch({
        type: this.FETCHING_RESOURCE
    });
    //console.log(token);
    return axios.get(`${apiUrl}/user/empire`, { headers: { token: token } })
        .then(data => {
            //console.log(data.data.empireId);
            axios.get(`${apiUrl}/resources/${data.data.empireId}`,{ headers: { token: token }})
            .then(data =>{
                dispatch({
                    type: this.FETCHED_RESOURCE,
                    empireResource:data.data.resources
                })
            })
           
        }).catch(() => {
            dispatch({
                type: this.FETCHING_FAILED,
                errMsg: "Resources not found!"
            });
        });
}