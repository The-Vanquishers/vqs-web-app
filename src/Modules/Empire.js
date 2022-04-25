import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Wall from "../Assets/wall.png";
import Bg from "../Assets/trans.png";
import Buildings from "../Assets/buildings.png";
import { connect } from "react-redux";
import { loginReducer } from "../reducers/login";
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import MapIcon from "../Assets/map.png";
import { getEmpireDetails } from "../actions/empire";
import { empireReducer } from "../reducers/empire";
import TownHall from "./TownHall";
import Spinner from "../Components/Spinner";
import {
  buildingNameToId,
  ITEM_HIDDEN_CLASS,
  ITEM_VISIBLE_CLASS,
  buildingNames,
  buildingPosition
} from "../variables";

const showGrid = false;

function Empire(props) {
  const Navigate = useNavigate();
  const { token } = props.login;
  const [resource, setResource] = useState([]);
  const [err, setErr] = useState(null);
  const [showTownHallModal, setShowTownHallModal] = useState(false);

  if (!token) {
    Navigate("/");
  }

  const getGridItemClass = (buildingList, buildingName) => {
    const buildingId = buildingNameToId[buildingName];
    //return ITEM_VISIBLE_CLASS; //to render all buildings
    if (buildingList.filter(e => e.buildingId === buildingId).length > 0) {
      console.log("yes");
      return ITEM_VISIBLE_CLASS;
    }
    return ITEM_HIDDEN_CLASS;
  };

  useEffect(() => {
    if (!props.empire.isFetching && !props.empire.isFetched) {
      if (props.empire.fetchingFailed) {
        setTimeout(() => {
          props.dispatch(getEmpireDetails(token));
        }, 500);
        return;
      }
      props.dispatch(getEmpireDetails(token));
    }
    if (props.empire.isFetched) {
      setResource(props.empire.resources);
      return;
    }
    if (props.empire.fetchingFailed) {
      setErr(props.empire.errMsg);
      return;
    }
  }, [props, token]);

  return (
    <div>
      {props.empire.isFetching && !props.empire.fetchingFailed && <Spinner />}
      <Grid item xs={12} container justifyContent="center" className="empire">
        <Grid
          item
          container
          xs={12}
          sx={{
            borderColor: "gray",
            borderWidth: showGrid ? 1 : 0,
            borderStyle: "solid",
            height: "100px"
          }}
          justifyContent="center"
        >
          {err}
          <Grid
            item
            xs={6}
            container
            sx={{
              borderColor: "gray",
              borderWidth: showGrid ? 1 : 0,
              borderStyle: "solid",
              height: "100px"
            }}
          >
            <Grid
              item
              xs={4}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                height: "100px"
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                height: "100px"
              }}
            ></Grid>
            <Grid
              item
              xs={5}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                height: "100px"
              }}
            >
              <div
                style={{
                  width: "auto%",
                  height: "auto",
                  float: "right",
                  backgroundImage: `url(${Bg})`,
                  marginTop: "30px",
                  padding: "5px",
                  borderRadius: "5px"
                }}
              >
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={FoodIcon}
                    alt=""
                    title="food"
                    style={{ width: "20px" }}
                  />{" "}
                  {resource.food}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={WoodIcon}
                    alt=""
                    title="wood"
                    style={{ width: "20px" }}
                  />{" "}
                  {resource.wood}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={IronIcon}
                    alt=""
                    title="iron"
                    style={{ width: "20px" }}
                  />{" "}
                  {resource.iron}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={StoneIcon}
                    alt=""
                    title="stone"
                    style={{ width: "20px" }}
                  />{" "}
                  {resource.stone}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={GoldIcon}
                    alt=""
                    title="gold"
                    style={{ width: "20px" }}
                  />{" "}
                  {resource.gold}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Empire grid container */}
        {props.empire.isFetched && (
          <Grid
            xs={6}
            item
            container
            sx={{
              // marginTop: 10,
              height: 600,
              width: 800,
              backgroundImage: `url(${Wall})`,
              backgroundSize: "cover",
              borderColor: "gray",
              borderWidth: showGrid ? 1 : 0,
              borderStyle: "solid"
            }}
          >
            {/* empty */}
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
            </Grid>
            {/* empty, empty, townhall, watchtower, mine */}
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              {/* TOWN HALL */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.TOWN_HALL
                )}
                item
                xs={2}
                title=""
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.TOWN_HALL,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowTownHallModal(!showTownHallModal);
                }}
              ></Grid>
              {/* WATCH TOWER */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.WATCH_TOWER
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.WATCH_TOWER,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowTownHallModal(!showTownHallModal);
                }}
              ></Grid>
              {/* MINE */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.MINE
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.MINE,

                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Mine");
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
            </Grid>
            {/* empty */}
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              {/* FIRM */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.FARM
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.FARM,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Firm");
                }}
              ></Grid>
              {/* WAREHOUSE */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.WAREHOUSE
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.WAREHOUSE,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Warehouse");
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              {/* MARKET */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.MARKET
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.MARKET,
                  cursor: "pointer",
                  zoom: 0.8
                }}
                onClick={() => {
                  alert("Market");
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
            </Grid>
            {/* empty */}
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              {/* STABLE */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.STABLE
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.STABLE,
                  zoom: 1.18,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Stable");
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              {/* BARRACKS */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.BARRACKS
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.BARRACKS,
                  zoom: 1.35,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Barracks");
                }}
              ></Grid>
              {/* SIEGE WORKSHOP */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.WORKSHOP
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.WORKSHOP,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Siege Workshop");
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
            </Grid>
            {/* empty */}
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              {/* ROCK PICKER */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.ROCK_PICKER
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.ROCK_PICKER,
                  zoom: "1.28",
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Rock picker");
                }}
              ></Grid>
              {/* Logging */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.LOGGING
                )}
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.LOGGING,
                  zoom: "1.25",
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Logging");
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
            </Grid>
            {/* empty */}
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid"
                }}
              ></Grid>
              <Grid
                item
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  textAlign: "right",
                  flexGrow: "revert"
                }}
              >
                <img
                  src={MapIcon}
                  alt="map"
                  title="World map"
                  onClick={() => {
                    Navigate("/map");
                  }}
                  style={{
                    width: "80px",
                    position: "fixed",
                    bottom: 0,
                    marginLeft: "-80px",
                    cursor: "pointer"
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {showTownHallModal && <TownHall />}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    empire: empireReducer(state),
    login: loginReducer(state)
  };
};
export default connect(mapStateToProps)(Empire);
