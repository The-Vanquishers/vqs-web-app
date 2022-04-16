const axios = require("axios");
const { apiUrl } = require("../variables");

exports.SIGNING_UP = "SIGNING_UP";
exports.SIGNED_UP = "SIGNED_UP";
exports.SIGNUP_FAILED = "SIGNUP_FAILED";

exports.signup = (name,email, password) => dispatch => {
    dispatch({
      type: this.SIGNING_UP
    });
    return axios.post(`${apiUrl}/user`, { name, email, password }).then(data => {
      dispatch({
        type: this.SIGNED_UP,
        userId: data.data.userId,
        message: data.data.message
      });
    }).catch(()=>{
      dispatch({
        type: this.SIGNUP_FAILED,
        errMsg: "singup failed! try again"
      });
    });
  
  };