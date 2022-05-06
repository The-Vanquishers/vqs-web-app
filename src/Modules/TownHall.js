import  { useEffect, useState } from 'react'
import * as React from 'react';
import { loginReducer } from "../reducers/login";
import { empireReducer } from "../reducers/empire";
import { connect } from 'react-redux';
import { buildingNameToId, buildingPosition,apiUrl,resourceSets,buildingIdToName,buildingSets,building1,building2,building3 } from "../variables";
import { Grid, Typography, Box, Tabs, Tab, Container, Button,styled } from "@mui/material";
import Buildings from "../Assets/buildings.png";
import axios from 'axios';
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import Divider from '@mui/material/Divider';
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";


const StyledButton = styled(Button)({
  '&.Mui-disabled': {
    backgroundColor: 'red', 
  }
});

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

const isBuidlingAvailable = (id, allBuildings) => {
  let ok = false;
  allBuildings.forEach(element => {
    if (element.buildingId === id) ok = true;
  });
  return ok;
}

const TownHall = ({login,empire}) => {
const [buildings, setBuildings] = useState([{}]);
const [ok, setOk] = useState(false);
const [value, setValue] = useState('one');

const Town_Hall = buildingNameToId['Town Hall'];
const level = empire.buildings.filter((item) => item.buildingId === Town_Hall)[0].level;

  useEffect(() => {
    const fetchRequirements = async id => {
      const { data } = await axios.get(`${apiUrl}/buildings/${id}`, {
        headers: { token: login.token, empireId: empire.empireId }
      });
      
      setBuildings(oldArray => [
        ...oldArray,
        {
          buildingId: data.buildingId,
          constructionCost: data.constructionCost,
          constructionTime: data.constructionTime,
          currentLevel: data.level,
          isAvailable:true
        }
      ]);
    };
    const fetchRequirementsByLevel = async (id,lvl) => {
      const { data } = await axios.get(`${apiUrl}/building/${id}/${lvl}`);
      setBuildings(oldArray => [
        ...oldArray,
        {
          buildingId: data.buildingId,
          constructionCost: data.constructionCost,
          constructionTime: data.constructionTime,
          currentLevel: data.level,
          isAvailable:false
        }
      ]);
    };
    
    setOk(false);
    for (let i in buildingSets) {
      isBuidlingAvailable(buildingSets[i], empire.buildings) ? fetchRequirements(buildingSets[i]) : fetchRequirementsByLevel(buildingSets[i],1);
    }
    setOk(true)
  }, [login.token, empire.empireId,empire.buildings]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleUpgrade = (buildingId) => {
    axios.post(`${apiUrl}/build/${empire.empireId}/${buildingId}`,{headers: { token: login.token}})
      .then(data => {
    
        console.log(data);
      })
      .catch(e => {
        console.log("error");
      })
    
  }
  return (
    <Box >
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={2} style={{ height: "100px"}}
          sx={{
            borderColor: "gray",
            borderStyle: "solid",
            borderWidth: 1,
            backgroundImage: `url(${Buildings})`,
            backgroundPosition: `${buildingPosition.TOWN_HALL}`,
            cursor: "pointer",
            }}
          >
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" component="h6">
              Town Hall (Level {level})
          </Typography>
          <Typography variant="body">
              This is town hall. It is heart of your empire from where you can upgrade all of your buildings.
          </Typography>
        </Grid>
      </Grid>
      <Container maxWidth="sm" >
        <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          centered="true"
          
        >
          <Tab value="one" label="Building 1" />
          <Tab value="two" label="Building 2" />
          <Tab value="three" label="Building 3" />
        </Tabs>
      </Box>
      </Container>
      


      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={2}>
          <Typography variant="h6" component="h6">
            Buildings
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" component="h6">
            Requirements
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" component="h6">
            Time 
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" component="h6">
            Upgrade
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {ok &&
        <Grid container spacing={2} sx={{ my: 1 }}>
          {buildings.map((item, indx) => (
            <>
              {indx > 0 && reduceBuilding(value,item.buildingId) &&(
                <>
                  <Grid item xs={2} key={item.buildingId + Math.random()}>
                    {buildingIdToName[item.buildingId]} <br/>
                    level: {item.currentLevel}
                  </Grid>
                  <Grid item xs={2} key={item.buildingId + Math.random()}>
                    <img src={resourceMapper(item.constructionCost? item.constructionCost[0].resourceId : null)} alt="" style={{ width: "20px" }}/> <br/>
                    {item.constructionCost[0].quantity}
                  </Grid>
                  <Grid item xs={2} key={item.buildingId + Math.random()}>
                    <img src={resourceMapper(item.constructionCost[1].resourceId)}  alt=""  style={{ width: "20px" }} /> <br/>
                    {item.constructionCost[1].quantity}
                  </Grid>
                  <Grid item xs={2} key={item.buildingId + Math.random()}>
                    <img src={resourceMapper(item.constructionCost[2].resourceId)} alt="" style={{ width: "20px" }} /> <br/>
                    {item.constructionCost[2].quantity}
                  </Grid>
                  <Grid item xs={2} key={item.buildingId + Math.random()}> 
                    <AccessAlarmsIcon sx={{ mx: 1 }} /> <br/>
                    {msToTime(item.constructionTime)}
                  </Grid>
                  <Grid item xs={2} key={item.buildingId + Math.random()}>
                    <Button
                      variant="outlined"
                      color={isUpgradeAble(item.constructionCost, empire.resources) ? "error" : "success"}
                      disabled={isUpgradeAble(item.constructionCost, empire.resources)}
                      classes={StyledButton}
                      onClick={()=>handleUpgrade(item.buildingId)}
                    >
                      {item.isAvailable ? <>Level {item.currentLevel + 1}</> : "Build"}
        
                    </Button>
                  </Grid>  
                </>
              )}
            </>
          ))}
        </Grid>
      }
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    login: loginReducer(state),
    empire: empireReducer(state),
  };
};
export default connect(mapStateToProps)(TownHall);

const reduceBuilding = (value, buildingId) => {
  switch (value) {
    case 'one':
      return building1.includes(buildingId);
    case 'two':
      return building2.includes(buildingId);
    default:
      return building3.includes(buildingId);
  }
}

const isUpgradeAble = (constructionCost, resources) => {
  
  let ok = false;
  constructionCost.forEach(element => {
    if (element.resourceId === '6231728ff10faea791509fac' && element.quantity > resources.iron) {
      ok = true;
    }
    else if (element.resourceId === '623172adf10faea791509fae' && element.quantity > resources.wood) {
      ok = true
    }
    else if (element.resourceId === '623172a5f10faea791509fad' && element.quantity > resources.stone) {
      ok = true
    }
  });
  return ok;
}