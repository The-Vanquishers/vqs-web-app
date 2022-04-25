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
import Farm from "./Farm";
import AlertComponent from "../Components/AlertComponent";
import Logging from "./Logging";
import Mine from "../Modules/Mine";
import StableComponent from "../Components/StableComponent";
import ModalCompo from "../Components/ModalCompo";
import WareHouse from "../Modules/WareHouse";

const showGrid = false;

function Empire(props) {
  const Navigate = useNavigate();
  const { token } = props.login;
  const [resource, setResource] = useState([]);
  const [err, setErr] = useState(null);
  const [showTownHallModal, setShowTownHallModal] = useState(false);
  const [showloggingModal, setShowLoggingMoadl] = useState(false);
  const [showMine, setShowMine] = useState(false);
  const [toggleStableModal, setToggleStableModal] = useState(false);

  const [showFirmModal, setShowFirmModal] = useState(false);
  const [showWareHouseModal, setShowWareHouseModal] = useState(false);

  if (!token) {
    Navigate("/");
  }

  const getGridItemClass = (buildingList, buildingName) => {
    const buildingId = buildingNameToId[buildingName];
    //return ITEM_VISIBLE_CLASS; //to render all buildings
    if (buildingList.filter(e => e.buildingId === buildingId).length > 0) {
      return ITEM_VISIBLE_CLASS;
    }
    return ITEM_HIDDEN_CLASS;
  };

  const getBuildingDetails = name => {
    return props.empire.buildings.filter(
      e => e.buildingId === buildingNameToId[name]
    )[0];
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
  }, [props, token, showloggingModal]);
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
          {err && <AlertComponent type={"error"} text={err} title={"Error"} />}
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
            <Grid container>
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.FARM
                )}
                item
                title={buildingNames.FARM}
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
                  setShowFirmModal(!showFirmModal);
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
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.ROCK_PICKER
                )}
                item
                title={buildingNames.ROCK_PICKER}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.ROCK_PICKER,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Rock picker");
                }}
              ></Grid>
            </Grid>
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

              {/* RESEARCH CENTER */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.RESEARCH_CENTER
                )}
                item
                title={buildingNames.TOWN_HALL}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.RESEARCH_CENTER,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowTownHallModal(!showTownHallModal);
                }}
              ></Grid>
              {/* TOWN HALL */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.TOWN_HALL
                )}
                item
                title={buildingNames.TOWN_HALL}
                xs={2}
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

              {/* COURAGE FARM */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.COURAGE_FARM
                )}
                item
                title={buildingNames.COURAGE_FARM}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.COURAGE_FARM,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowTownHallModal(!showTownHallModal);
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
              {/* BARRACKS */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.BARRACKS
                )}
                item
                title={buildingNames.BARRACKS}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.BARRACKS,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Barracks");
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

              {/* WATCH TOWER */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.WATCH_TOWER
                )}
                item
                title={buildingNames.WATCH_TOWER}
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
            </Grid>
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
                title={buildingNames.STABLE}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.STABLE,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setToggleStableModal(prevState => !prevState);
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

              {/* MARKET */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.MARKET
                )}
                item
                title={buildingNames.MARKET}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.MARKET,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("Market");
                }}
              ></Grid>
            </Grid>
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
              {/* SIEGE WORKSHOP */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.WORKSHOP
                )}
                item
                title={buildingNames.WORKSHOP}
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

              {/* WAREHOUSE */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.WAREHOUSE
                )}
                item
                title={buildingNames.WAREHOUSE}
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
                  setShowWareHouseModal(!showWareHouseModal);
                }}
              ></Grid>

              {/* HOUSE */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.HOUSE
                )}
                item
                title={buildingNames.HOUSE}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.HOUSE,
                  cursor: "pointer"
                }}
                onClick={() => {
                  alert("HOUSE");
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
            <Grid container>
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.LOGGING
                )}
                item
                title={buildingNames.LOGGING}
                xs={2}
                sx={{
                  borderColor: "gray",
                  borderWidth: showGrid ? 1 : 0,
                  borderStyle: "solid",
                  backgroundImage: `url(${Buildings})`,
                  backgroundPosition: buildingPosition.LOGGING,
                  // zoom: "1.25",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowLoggingMoadl(!showloggingModal);
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
              {/* MINE */}
              <Grid
                className={getGridItemClass(
                  props.empire.buildings,
                  buildingNames.MINE
                )}
                item
                title={buildingNames.MINE}
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
                  setShowMine(!showMine);
                }}
              ></Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {showTownHallModal && <TownHall />}
      {showloggingModal && (
        <ModalCompo>
          {" "}
          <Logging />{" "}
        </ModalCompo>
      )}
      {showMine && (
        <ModalCompo>
          <Mine />
        </ModalCompo>
      )}
      {toggleStableModal && (
        <StableComponent
          building={getBuildingDetails(buildingNames.STABLE)}
          units={props.empire.units}
          empireId={props.empire.empireId}
          onClose={() => setToggleStableModal(prevState => !prevState)}
        />
      )}
      {showFirmModal && (
        <ModalCompo>
          {" "}
          <Farm />{" "}
        </ModalCompo>
      )}
      {showWareHouseModal && (
        <ModalCompo>
          {" "}
          <WareHouse />{" "}
        </ModalCompo>
      )}
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
