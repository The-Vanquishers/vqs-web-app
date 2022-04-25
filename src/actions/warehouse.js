const axios = require("axios");
const { apiUrl, buildingNameToId } = require("../variables");
const warehouseId = buildingNameToId['Warehouse'];

exports.FETCHING_WAREHOUSE = "FETCHING_WAREHOUS";
exports.FETCHED_WAREHOUS = "FETCHED_WAREHOUS";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.logging = (token,empireId) => dispatch => {
  dispatch({
    type: this.FETCHING_LOGGING
  });
  return axios
    .get(`${apiUrl}/building/${wareHouse}/${lvl}`)
    .then(data => {
      dispatch({
        type: this.FETCHED_LOGGING,
        level: data.data.level,
        hp: data.data.HP,
        hourlyProduction: data.data.hourlyProduction,
        constructionTime: data.data.constructionTime,
        constructionCost: data.data.constructionCost
      });
    })
    .catch(() => {
      dispatch({
        type: this.FETCHING_FAILED,
        errMsg: "Error fetching building details"
      });
    });
};
