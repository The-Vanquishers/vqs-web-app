import React, { useEffect, useState } from "react";
import "../App.css";
import Grid from "@mui/material/Grid";
import Wall from "../Assets/wall.png";
import Bg from "../Assets/trans.png";
import Buildings from "../Assets/buildings.png";
import axios from "axios";
import { apiUrl } from "../variables";
import { connect } from "react-redux";
import {loginReducer} from "../reducers/login"
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import TownHall from "./TownHall";

const showGrid = false;


 
function Empire({login}) {
  const [showTownHallModal, setShowTownHallModal] = useState(false);
  const [empireDetails, setEmpireDetails] = useState({});


  useEffect(() => {
    const fetchEmpireDetails = async () => {
      const { data } = await axios.get(`${apiUrl}/user/empire/6245eddb033dd431b52544d2`, { headers: { token: login.token } });
      setEmpireDetails(data);
    }
    fetchEmpireDetails();
  }, [])
  
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


      {showTownHallModal && Object.keys(empireDetails).length && <TownHall empireDetails={empireDetails} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: loginReducer(state),
  };
};

export default connect(mapStateToProps) (Empire);
