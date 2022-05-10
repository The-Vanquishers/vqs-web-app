const axios = require("axios");
const { apiUrl, buildingNameToId } = require("../variables");
const houseId = buildingNameToId['House'];

exports.FETCHING_HOUSE = "FETCHING_HOUSE";
exports.FETCHED_HOUSE = "FETCHED_HOUSE";
exports.FETCHING_FAILED = "FETCHING_FAILED";

exports.house = (token, empireId) => dispatch => {
    dispatch({
        type: this.FETCHING_HOUSE
    })
    return axios
        .get(`${apiUrl}/buildings/${houseId}`, { headers: { token: token, empireid: empireId } })
        .then(data => {
            dispatch({
                type: this.FETCHED_HOUSE,
                level: data.data.level,
                hp: data.data.hp,
                capacity: data.data.capacity,
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
