const axios = require("axios");
const { apiUrl, buildingNameToId } = require("../variables");
const loggingBuildingId = buildingNameToId['Logging'];

exports.FETCHING_LOGGING = "FETCHING_LOGGING";
exports.FETCHED_LOGGING = "FETCHED_LOGGING";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.logging = (token,empireId) => dispatch => {
  dispatch({
    type: this.FETCHING_LOGGING
  });
  return axios
    .get(`${apiUrl}/buildings/${loggingBuildingId}`, { headers: { token: token ,empireid:empireId }})
    .then(data => {
      const loggingData = {
        level: data.data.level,
        hp: data.data.HP,
        hourlyProduction: data.data.hourlyProduction,
        constructionTime: data.data.constructionTime,
        constructionCost: data.data.constructionCost
      }
      dispatch({
        type: this.FETCHED_LOGGING,
        loggingData
      });
    })
    .catch(() => {
      dispatch({
        type: this.FETCHING_FAILED,
        errMsg: "Error fetching building details"
      });
    });
};
