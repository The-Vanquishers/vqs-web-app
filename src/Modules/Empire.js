import React, { useEffect, useState } from "react";
import "../App.css";
import Grid from "@mui/material/Grid";
import Wall from "../Assets/wall.png";
import Buildings from "../Assets/buildings.png";
import axios from "axios";
import { apiUrl } from "../variables";
import { connect } from "react-redux";
import {loginReducer} from "../reducers/login"

import TownHall from "./TownHall";

const showGrid = false;

function Empire({login}) {

  const [showTownHallModal, setShowTownHallModal] = useState(false);
  const [empireDetails, setEmpireDetails] = useState({});


  useEffect(() => {
    const fetchEmpireDetails = async() => {
      const { data } = await axios.get(`${apiUrl}/user/empire/6245eddb033dd431b52544d2`,{headers:{token:login.token}});
      setEmpireDetails(data);
    }
    fetchEmpireDetails();
  }, [])
  
  return (
    <div className="empire">
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid
              xs={6}
              item
              container
              sx={{
                marginTop: 10,
                height: 600,
                width: 800,
                backgroundImage: `url(${Wall})`,
                backgroundSize: "cover",
                borderColor: "gray",
                borderWidth: showGrid ? 1 : 0,
                borderStyle: "solid",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    cursor: "pointer",
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
                    borderStyle: "solid",
                    backgroundImage: `url(${Buildings})`,
                    backgroundPosition: `65% 16%`,
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    borderStyle: "solid",
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
                    backgroundPosition: `68% -4%`,
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    backgroundPosition: `93% -1%`,
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    borderStyle: "solid",
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
                    backgroundPosition: `0% 20%`,
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    backgroundPosition: `-2% 34%`,
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    backgroundPosition: `42% 36%`,
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
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
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    borderColor: "gray",
                    borderWidth: showGrid ? 1 : 0,
                    borderStyle: "solid",
                  }}
                ></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showTownHallModal && Object.keys(empireDetails).length && <TownHall empireDetails={empireDetails}/>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    login: loginReducer(state),
  };
};

export default connect(mapStateToProps) (Empire);
