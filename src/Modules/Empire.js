import React, { useEffect, useState } from "react";
import "../App.css";
import Grid from "@mui/material/Grid";
import Wall from "../Assets/wall.png";
import Bg from "../Assets/trans.png";
import Buildings from "../Assets/buildings.png";
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import { connect } from "react-redux";
import { loginReducer } from "../reducers/login";
const { resources } = require("../actions/resources");
const {resourcesReducer} = require("../reducers/Resources");
const showGrid = true;

function Empire(props) {
  const {token} = props.login;
  const [resource, setResource] = useState([]);
  const [err, setErr] = useState(null);
  if(token){
    props.dispatch(resources(token));
  }
  useEffect(() => {
    if (props.resources.isFetched) {
      setResource(props.resources.empireResource);
      return;
    }
    if (props.resources.fetchingFailed) {
      setErr(props.resources.errMsg);
      return;
    }
  }, [props.resources]);
  console.log(props);
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
                  float: "left",
                  backgroundImage: `url(${Bg})`,
                  marginTop: "30px",
                  padding: "5px",
                  borderRadius: "5px"
                }}
              >
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={FoodIcon} alt="" style={{ width: "20px" }} /> 1500
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={WoodIcon} alt="" style={{ width: "20px" }} /> 168
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={IronIcon} alt="" style={{ width: "20px" }} /> 1107
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={StoneIcon} alt="" style={{ width: "20px" }} /> 450
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <img src={GoldIcon} alt="" style={{ width: "20px" }} /> 10
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
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
            <Grid
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
                alert("Townhall");
              }}
            ></Grid>
            <Grid
              item
              xs={2}
              sx={{
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `65% 16%`
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
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `68% -4%`
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
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `93% -1%`
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
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `0% 20%`
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
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `-2% 34%`
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
                borderStyle: "solid",
                backgroundImage: `url(${Buildings})`,
                backgroundPosition: `42% 36%`
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
    </div>
  );
}

const mapStateToProps = state => {
  return {
    resources: resourcesReducer(state),
    login: loginReducer(state)
  };
};
export default connect(mapStateToProps)(Empire);
