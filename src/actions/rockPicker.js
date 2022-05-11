const axios = require("axios");
const { apiUrl, buildingNameToId } = require("../variables");
const rockPickerId = buildingNameToId['Rock picker'];

exports.FETCHING_ROCK_PICKER = "FETCHING_ROCK_PICKER";
exports.FETCHED_ROCK_PICKER = "FETCHED_ROCK_PICKER";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.rockPicker = (token, empireId) => dispatch => {
    dispatch({
        type: this.FETCHING_ROCK_PICKER
   
    })
    console.log(rockPickerId);
    return axios
        .get(`${apiUrl}/buildings/${rockPickerId}`, { headers: { token: token, empireid: empireId } })
        .then(data => {
            dispatch({
                type: this.FETCHED_ROCK_PICKER,
                level: data.data.level,
                hp: data.data.hp,
                hourlyProduction: data.data.hourlyProduction,
                constructionTime: data.data.constructionTime,
                constructionCost:data.data.constructionCost

            });
        })

        .catch(() => {
            dispatch({
                type: this.FETCHING_FAILED,
                errMsg: "Error fetching building details"
            });
        });
};
