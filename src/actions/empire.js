const axios = require("axios");
const { apiUrl } = require("../variables");

exports.FETCHING_EMPIRE = "FETCHING_EMPIRE";
exports.FETCHED_EMPIRE = "FETCHED_EMPIRE";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.getEmpireDetails = token => dispatch => {
  dispatch({
    type: this.FETCHING_EMPIRE
  });
  //console.log(token);
  return axios
    .get(`${apiUrl}/user/empire`, { headers: { token: token } })
    .then(data => {
      const resources = { wood: 0, stone: 0, food: 0, iron: 0, gold: 0 };
      for (let i = 0; i < data.data.resources.length; i++) {
        const resource = data.data.resources[i];
        resources[resource.resourceId.resource.toLowerCase()] =
          resource.quantity;
      }
      // console.log(data.data);
      dispatch({
        type: this.FETCHED_EMPIRE,
        resources,
        buildings: data.data.buildings,
        empireId: data.data.empireId,
        empireName: data.data.name,
        strength: data.data.strength,
        units: data.data.units,
        trainings: data.data.trainings,
        researches: data.data.researches
      });
    })
    .catch(() => {
      dispatch({
        type: this.FETCHING_FAILED,
        errMsg: "Error fetching empire details"
      });
    });
};
