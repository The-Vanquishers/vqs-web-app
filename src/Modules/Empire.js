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
import WorkShop from "../Modules/Workshop";
// import MapIcon from "../Assets/map.png";
import { getEmpireDetails } from "../actions/empire";
import { empireReducer } from "../reducers/empire";
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
import ModalComponent from "../Components/ModalComponent";
import WareHouse from "../Modules/WareHouse";
import RockPicker from './RockPicker';
import { warehouseReducer } from "../reducers/warehouse";
import { warehouse } from "../actions/warehouse";
import TownHall from "./TownHall";
import Barrack from "./Barrack";
import House from "./House";
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
  const [toggleWorkShopModal, setToggleWorkShopModal] = useState(false);
  const [showFirmModal, setShowFirmModal] = useState(false);
  const [showWareHouseModal, setShowWareHouseModal] = useState(false);
  const [showRockPicker, setShowRockPicker] = useState(false);
  const [warehouseCapacity, setWarehouseCapacity] = useState(0);
  const [warehouseLevel, setWarehouseLevel] = useState(null);
  const wareHouseId = buildingNameToId["Warehouse"];
  const [showBarrackModal, setShowBarrackModal] = useState(false);
  const [showHouse, setShowHouse] = useState(false);


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
      setWarehouseLevel(props.empire.buildings.filter((item) => item.buildingId === wareHouseId)[0].level);
      setWarehouseLevel(props.empire.buildings.filter((item) => item.buildingId === wareHouseId)[0].leve);
      return;
    }
    if (props.empire.fetchingFailed) {
      setErr(props.empire.errMsg);
      return;
    }
  }, [props, token, showloggingModal, wareHouseId]);



  useEffect(() => {
    if (props.empire.isFetched && !props.warehouse.isFetched) {
      props.dispatch(warehouse(wareHouseId, warehouseLevel));
      return;
    }
    if (props.warehouse.isFetched) {
      setWarehouseCapacity(props.warehouse.capacity);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseLevel]);


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
                    onClick={() => {
                      setShowFirmModal(!showFirmModal);
                    }}
                  />{" "}
                  {warehouseCapacity > resource.food ? resource.food : <span style={{ color: "red" }}>{resource.food}</span>}

                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={WoodIcon}
                    alt=""
                    title="wood"
                    style={{ width: "20px" }}
                    onClick={() => {
                      setShowLoggingMoadl(!showloggingModal);
                    }}
                  />{" "}
                  {warehouseCapacity > resource.wood ? resource.wood : <span style={{ color: "red" }}>{resource.wood}</span>}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={IronIcon}
                    alt=""
                    title="iron"
                    style={{ width: "20px" }}
                  />{" "}
                  {warehouseCapacity > resource.iron ? resource.iron : <span style={{ color: "red" }}>{resource.iron}</span>}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={StoneIcon}
                    alt=""
                    title="stone"
                    style={{ width: "20px" }}
                  />{" "}
                  {warehouseCapacity > resource.stone ? resource.stone : <span style={{ color: "red" }}>{resource.stone}</span>}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img
                    src={GoldIcon}
                    alt=""
                    title="gold"
                    style={{ width: "20px" }}
                    onClick={() => {
                      setShowMine(!showMine);
                    }}
                  />{" "}
                  {warehouseCapacity > resource.gold ? resource.gold : <span style={{ color: "red" }}>{resource.gold}</span>}
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

              {/* Rock Picker */}
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
                  setShowRockPicker(!showRockPicker);
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
              // onClick={() => {
              //   setShowTownHallModal(!showTownHallModal);
              // }}
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
              // onClick={() => {
              //   setShowTownHallModal(!showTownHallModal);
              // }}
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
                  setShowBarrackModal(!showBarrackModal);
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
              // onClick={() => {
              //   setShowTownHallModal(!showTownHallModal);
              // }}
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
                  setToggleWorkShopModal(prevState => !prevState);
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
                  setShowHouse(!showHouse);
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
      {showTownHallModal && <ModalComponent onClose={() => setShowTownHallModal(prevState=>!prevState)}> <TownHall /> </ModalComponent>}
      {showloggingModal && (
        <ModalComponent onClose={() => setShowLoggingMoadl(prevState=>!prevState)}>
          {" "}
          <Logging />{" "}
        </ModalComponent>
      )}
      {showMine && (
        <ModalComponent onClose={() => setShowMine(prevState=>!prevState)}>
          <Mine />
        </ModalComponent>
      )}
      {toggleStableModal && <StableComponent
        building={getBuildingDetails(buildingNames.STABLE)}
        units={props.empire.units}
        empireId={props.empire.empireId}
        resources={props.empire.resources}
        onClose={() => setToggleStableModal(prevState => !prevState)} />}
      {showFirmModal && (
        <ModalComponent onClose={() => setShowFirmModal(prevState=>!prevState)}>
          <Farm />
        </ModalComponent>
      )}
      {showWareHouseModal && (
        <ModalComponent onClose={() => setShowWareHouseModal(prevState=>!prevState)}>
          {" "}
          <WareHouse />{" "}
        </ModalComponent>
      )}
      {showRockPicker && (
        <ModalComponent  onClose={() => setShowRockPicker(prevState=>!prevState)}>
          <RockPicker />
        </ModalComponent>
      )}

      {showBarrackModal && (
        <ModalComponent onClose={() => setShowBarrackModal(prevState=>!prevState)}>
          {" "}
          <Barrack /> {" "}
        </ModalComponent>
      )}
      {showHouse && (
        <ModalComponent onClose={() => setShowHouse(prevState=>!prevState)}>
          {" "}
          <House /> {" "}
        </ModalComponent>
      )}
      {
        toggleWorkShopModal && <WorkShop
          building={getBuildingDetails(buildingNames.WORKSHOP)}
          units={props.empire.units}
          empireId={props.empire.empireId}
          resources={props.empire.resources}
          onClose={() => setToggleWorkShopModal(prevState => !prevState)} />
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    empire: empireReducer(state),
    login: loginReducer(state),
    warehouse: warehouseReducer(state)
  };
};
export default connect(mapStateToProps)(Empire);
