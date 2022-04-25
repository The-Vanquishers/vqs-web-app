import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logging } from "../actions/logging";
import { empireReducer } from "../reducers/empire";
import { loggingReducer } from "../reducers/logging";
import { loginReducer } from "../reducers/login";
import Buildings from "../Assets/buildings.png";
import {
  apiUrl,
  buildingNameToId,
  buildingPosition,
  resourceSets
} from "../variables";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import Divider from "@mui/material/Divider";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

//For calculating remaining time as H:M:S format
const msToTime = time => {
  let seconds = Math.floor((time / 1000) % 60),
    minutes = Math.floor((time / (1000 * 60)) % 60),
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};

//Resource mapper for getting icons
const resourceMapper = id => {
  switch (id) {
    case resourceSets.Food:
      return FoodIcon;
    case resourceSets.Gold:
      return GoldIcon;
    case resourceSets.Stone:
      return StoneIcon;
    case resourceSets.Wood:
      return WoodIcon;
    case resourceSets.Iron:
      return IronIcon;
    default:
      break;
  }
};

const Logging = props => {
  const { token } = props.login;
  const { empireId } = props.empire;
  const [requirements, setRequirements] = useState({});
  const [oneLevelup, setOnelevelUp] = useState(0);

  const loggingId = buildingNameToId["Logging"];

  useEffect(() => {
    if (!props.logging.isFetching && !props.logging.isFetched) {
      props.dispatch(logging(token, empireId));
      return;
    }
    if (props.logging.isFetched) {
      setRequirements({
        level: props.logging.level,
        hourlyProduction: props.logging.hourlyProduction,
        hp: props.logging.hp,
        constructionCost: props.logging.constructionCost,
        constructionTime: props.logging.constructionTime
      });
    }
  }, [props, token, empireId]);

  useEffect(() => {
    const fetchHourlyProduction = async lvl => {
      const { data } = await axios.get(
        `${apiUrl}/building/${loggingId}/${lvl}`
      );
      setOnelevelUp(data);
    };
    fetchHourlyProduction(requirements.level + 1);
  }, [requirements.level, loggingId]);

  return (
    <>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid
          item
          xs={2}
          style={{
            height: "100px"
          }}
          sx={{
            borderColor: "gray",
            borderStyle: "solid",
            borderWidth: 1,
            backgroundImage: `url(${Buildings})`,
            backgroundPosition: `${buildingPosition.LOGGING}`,
            cursor: "pointer"
          }}
        ></Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="h6">
            Logging (Level {requirements.level})
          </Typography>
          <Typography variant="body2">
            Outside of your village in the dark forests your lumberjacks cut
            massive trees to produce wood in the logging, which is needed for
            buildings and weapons. The higher its level the more wood is
            produced.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={6}>
          <Typography variant="h6" component="h6">
            Logging (Level {requirements.level})
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="h6">
            Current Level
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="h6">
            Next Level
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body2">Hourly production</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="body2"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <img src={WoodIcon} alt="" style={{ width: "20px" }} />{" "}
            <Typography sx={{ mx: 2 }}>
              {" "}
              {requirements.hourlyProduction}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="body2"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <img src={WoodIcon} alt="" style={{ width: "20px" }} />{" "}
            <Typography sx={{ mx: 2 }}> {oneLevelup}</Typography>
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {Object.keys(requirements).length && (
        <Grid container spacing={2} sx={{ my: 1 }}>
          <Grid item xs={2}>
            <img
              src={resourceMapper(requirements.constructionCost[0].resourceId)}
              alt=""
              style={{ width: "20px" }}
            />
            {requirements.constructionCost[0].quantity}
          </Grid>
          <Grid item xs={2}>
            <img
              src={resourceMapper(requirements.constructionCost[1].resourceId)}
              alt=""
              style={{ width: "20px" }}
            />
            {requirements.constructionCost[1].quantity}
          </Grid>
          <Grid item xs={2}>
            <img
              src={resourceMapper(requirements.constructionCost[2].resourceId)}
              alt=""
              style={{ width: "20px" }}
            />
            {requirements.constructionCost[2].quantity}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <AccessAlarmsIcon sx={{ mx: 1 }} />
            {msToTime(requirements.constructionTime)}
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" color="inherit">
              Level {requirements.level + 1}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    logging: loggingReducer(state),
    login: loginReducer(state),
    empire: empireReducer(state)
  };
};

export default connect(mapStateToProps)(Logging);
