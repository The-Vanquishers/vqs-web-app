import React, { useEffect, useState } from 'react'
import { loginReducer } from "../reducers/login";
import { empireReducer } from "../reducers/empire";
import { connect } from 'react-redux';
import { buildingNameToId, buildingPosition,apiUrl,resourceSets } from "../variables";
import { Grid, Typography , Button} from "@mui/material";
import Buildings from "../Assets/buildings.png";
import axios from 'axios';
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import Divider from '@mui/material/Divider';
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

const msToTime = (time) => {
  let seconds = Math.floor((time / 1000) % 60),
    minutes = Math.floor((time / (1000 * 60)) % 60),
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds
}

const resourceMapper = (id) => {
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
}

const Farm = ({login,empire}) => {
  const [oneLevelup, setOnelevelUp] = useState(0);
  const [current, setCurrent] = useState(0);
  const [requirements, setRequirements] = useState({});

  const farm = buildingNameToId["Farm"];
  const level = empire.buildings.filter((item) => item.buildingId === farm)[0].leve;

  useEffect(() => {
    const fetchHourProduction = async(lvl) => {
      const { data } = await axios.get(`${apiUrl}/building/${farm}/${lvl}`);
      lvl === level ? setCurrent(data) : setOnelevelUp(data);
    }
    fetchHourProduction(level);
    fetchHourProduction(level+1);
  }, [level,farm])

  useEffect(() => {
    const fetchRequirements = async () => {
      const { data } = await axios.get(`${apiUrl}/buildings/${farm}`, {
        headers: { token: login.token, empireId: empire.empireId },
      });
      setRequirements(
        {
          buildingId: data.buildingId,
          constructionCost: data.constructionCost,
          constructionTime: data.constructionTime,
          currentLevel: data.level,
        },
      );
    }
    fetchRequirements();
},[empire.empireId,farm,login.token])

  
  return (
    <>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid
          item
          xs={2}
          style={{
            height: "100px",
          }}
          sx={{
            borderColor: "gray",
            borderStyle: "solid",
            borderWidth: 1,
            backgroundImage: `url(${Buildings})`,
            backgroundPosition: `${buildingPosition.FARM}`,
            cursor: "pointer",
          }}
        ></Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="h6">
            Farm (Level {level})
          </Typography>
          <Typography variant="body">
            This is farm that's produce food.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={6}>
          <Typography variant="h6" component="h6">
            Farm (Level {level})
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
          <Typography variant="body2" style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            }}>
            < img
              src = {FoodIcon}
              alt = ""
              style = {{width: "20px"}}
            /> <Typography sx={{mx:2}}> {current}</Typography >
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            }}>
            < img
              src = {FoodIcon}
              alt = ""
              style = {{width: "20px"}}
          /> <Typography sx={{mx:2}}> {oneLevelup}</Typography >
          </Typography>
        </Grid>
      </Grid>
      <Divider/>
      { Object.keys(requirements).length &&
        <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={2}>
          < img
          src = {resourceMapper(requirements.constructionCost[0].resourceId)}
          alt = ""
          style = {{width: "20px"}}
          />
          { requirements.constructionCost[0].quantity}
        </Grid>
        <Grid item xs={2}>
          < img
          src = {resourceMapper(requirements.constructionCost[1].resourceId)}
          alt = ""
          style = {{width: "20px"}}
          />
          { requirements.constructionCost[1].quantity}
        </Grid>
        <Grid item xs={2}>
          < img
          src = {resourceMapper(requirements.constructionCost[2].resourceId)}
          alt = ""
          style = {{width: "20px"}}
          />
          { requirements.constructionCost[2].quantity}
        </Grid>
        < Grid item
            xs={4}
            style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            }}
          >
         <AccessAlarmsIcon sx={{ mx: 1 }} />
          {msToTime(requirements.constructionTime)}
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" color="inherit">
            Level {level+1}
          </Button>
        </Grid>
      </Grid>
      }
      
      
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    login: loginReducer(state),
    empire: empireReducer(state),
  };
};
export default connect(mapStateToProps) (Farm);