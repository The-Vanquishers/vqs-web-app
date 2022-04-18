import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Wall from "../Assets/wall.png";
import Bg from "../Assets/trans.png";
import Buildings from "../Assets/buildings.png";
import { connect } from "react-redux";
import { loginReducer } from "../reducers/login"
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import { getEmpireDetails } from "../actions/empire";
import { empireReducer } from "../reducers/empire";
import TownHall from "./TownHall";
import Spinner from "../Components/Spinner";
const showGrid = true;
import {
  buildingNameToId,
  ITEM_HIDDEN_CLASS,
  ITEM_VISIBLE_CLASS,
  buildingNames
} from "../variables";

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
    // return ITEM_VISIBLE_CLASS; //to render all buildings
    if (buildingList.filter(e => e.buildingId === buildingId).length > 0) {
      return ITEM_VISIBLE_CLASS;
    }
    return ITEM_HIDDEN_CLASS;
  }

  useEffect(() => {
    if (!props.empire.isFetching && !props.empire.isFetched) {
      if (props.empire.fetchingFailed) {
        setTimeout(() => {
          props.dispatch(getEmpireDetails(token));
        }, 2000);
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
                  <img src={FoodIcon} alt="" style={{ width: "20px" }} />{" "}
                  {resource.food}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={WoodIcon} alt="" style={{ width: "20px" }} />{" "}
                  {resource.wood}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={IronIcon} alt="" style={{ width: "20px" }} />{" "}
                  {resource.iron}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={StoneIcon} alt="" style={{ width: "20px" }} />{" "}
                  {resource.stone}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={GoldIcon} alt="" style={{ width: "20px" }} />{" "}
                  {resource.gold}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Empire grid container */}
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
              className={getGridItemClass(props.empire.data, buildingNames.TOWN_HALL)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `0% 0%`,
                cursor: "pointer"
              }}
              onClick={() => {
                setShowTownHallModal(!showTownHallModal);
              }}
            ></Grid>
            {/* WATCH TOWER */}
            <Grid
              className={getGridItemClass(props.empire.data, buildingNames.WATCH_TOWER)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `66% 14%`,
                cursor: "pointer"
              }}
              onClick={() => {
                alert("Watch Tower");
              }}
            ></Grid>
            {/* MINE */}
            <Grid
              className={getGridItemClass(props.empire.data, buildingNames.MINE)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `68% 95%`,
                zoom: 1.50,
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
              className={getGridItemClass(props.empire.data, buildingNames.FARM)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `68% -4%`,
                cursor: 'pointer'
              }}
              onClick={() => {
                alert("Firm");
              }}
            ></Grid>
            {/* WAREHOUSE */}
            <Grid
              className={getGridItemClass(props.empire.data, buildingNames.WAREHOUSE)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `36% 64%`,
                cursor: 'pointer'
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
              className={getGridItemClass(props.empire.data, buildingNames.MARKET)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `93% -1%`,
                cursor: 'pointer'
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
              className={getGridItemClass(props.empire.data, buildingNames.STABLE)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `-2% 19%`,
                zoom: 1.18,
                cursor: 'pointer'
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
              className={getGridItemClass(props.empire.data, buildingNames.BARRACKS)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `59% 80%`,
                zoom: 1.35,
                cursor: 'pointer'
              }}
              onClick={() => {
                alert("Barracks");
              }}
            ></Grid>
            {/* SIEGE WORKSHOP */}
            <Grid
              className={getGridItemClass(props.empire.data, buildingNames.WORKSHOP)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `-2% 34%`,
                cursor: 'pointer'
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
              className={getGridItemClass(props.empire.data, buildingNames.ROCK_PICKER)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `11.8% 85%`,
                zoom: '1.28',
                cursor: 'pointer'
              }}
              onClick={() => {
                alert("Rock picker");
              }}
            ></Grid>
            {/* Logging */}
            <Grid
              className={getGridItemClass(props.empire.data, buildingNames.LOGGING)}
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `45% 82%`,
                zoom: '1.25',
                cursor: 'pointer'
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
        </Grid>
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
