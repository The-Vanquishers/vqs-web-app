const axios = require("axios");
const { apiUrl, buildingNameToId } = require("../variables");
const mineId = buildingNameToId['Mine'];

exports.FETCHING_MINE = "FETCHING_MINE";
exports.FETCHED_MINE = "FETCHED_MINE";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.mine = (token, empireId) => dispatch => {
    dispatch({
        type: this.FETCHING_MINE
    })
    return axios
        .get(`${apiUrl}/buildings/${mineId}`, { headers: { token: token, empireid: empireId } })
        .then(data => {
            dispatch({
                type: this.FETCHED_MINE,
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
