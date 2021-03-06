const axios = require("axios");
const { apiUrl } = require("../variables");

exports.FETCHING_WAREHOUSE = "FETCHING_WAREHOUSE";
exports.FETCHED_WAREHOUSE = "FETCHED_WAREHOUSE";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.warehouse = (wareHouse,lvl) => dispatch => {
  dispatch({
    type: this.FETCHING_WAREHOUSE
  });
  return axios
    .get(`${apiUrl}/building/${wareHouse}/${lvl}`)
    .then(data => {
      dispatch({
        type: this.FETCHED_WAREHOUSE,
        capacity: data.data.capacity
      });
    })
    .catch(() => {
      dispatch({
        type: this.FETCHING_FAILED,
        errMsg: "Error fetching warehouse capacity"
      });
    });
};
