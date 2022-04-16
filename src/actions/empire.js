import axios from 'axios';
const { apiUrl } = require("../variables");

export const FETCH_EMPIRE_BUILDINGS_REQUEST = "FETCH_EMPIRE_BUILDINGS_REQUEST";
export const FETCH_EMPIRE_BUILDINGS_SUCCESS = "FETCH_EMPIRE_BUILDINGS_SUCCESS";
export const FETCH_EMPIRE_BUILDINGS_ERROR = "FETCH_EMPIRE_BUILDINGS_ERROR";

export const fetchEmpireBuildingsRequest = () => {
    return { type: FETCH_EMPIRE_BUILDINGS_REQUEST }
}


export const fetchEmpireBuildingsSuccess = (buildings) => {
    return { type: FETCH_EMPIRE_BUILDINGS_SUCCESS, payload: buildings }
}


export const fetchEmpireBuildingsError = (errorMsg) => {
    return { type: FETCH_EMPIRE_BUILDINGS_ERROR, payload: errorMsg }
}


export const fetchEmpireBuildings = (token) => {
    return (dispatch) => {
        dispatch(fetchEmpireBuildingsRequest());
        axios.get(`${apiUrl}/building`,
            { headers: { 'token': token } })
            .then(res => {
                const buildings = res.data;
                dispatch(fetchEmpireBuildingsSuccess(buildings));
            })
            .catch(err => {
                const errMsg = err.message;
                dispatch(fetchEmpireBuildingsError(errMsg));
            })
    }
}