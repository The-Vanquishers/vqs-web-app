import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Grid } from "@mui/material";
import trans80 from "../Assets/trans80.png"
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import { resourceSets } from "../variables";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { buildingIdToName } from "../variables";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  color:"white", 
  // bgcolor: "#888888",
  bg: `url(${trans80})`,
  border: "2px solid #000",
  boxShadow: 2,
  px: 3,
  py: 2,
};

// const styles = (theme) => ({
//   modalStyle1: {
//     position: "absolute",
//     top: "10%",
//     left: "10%",
//     overflow: "scroll",
//     height: "100%",
//     display: "block",
//   },
// });
const  msToTime= (time)=> {
  let seconds = Math.floor((time / 1000) % 60),
  minutes = Math.floor((time / (1000 * 60)) % 60),
  hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
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

const ModalComponent = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          
          <Grid container spacing={2} sx={{ my: 3 }}>
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
                backgroundImage: `url(${props.image})`,
                backgroundPosition: `${props.position}`,
                cursor: "pointer",
              }}
            ></Grid>
            <Grid item xs={9}>
              <Typography variant="h5" component="h6">
                {props.name} (Level {props.level})
              </Typography>
              <Typography variant="body">
                This is town hall. It is heart of your empire from where you can upgrade all of your buildings.
              </Typography>
            </Grid>
          </Grid>
          {props.belowBuildingsHeader && (
            <>
              <Grid container spacing={2} sx={{ my: 1 }}>
                {props.belowBuildingsHeader.map((item, indx) => (
                  <Grid item xs={props.gridSize[indx]} key={indx}>
                    {item}
                  </Grid>
                ))}
              </Grid>
              
              <Grid container spacing={2} sx={{ my: 1 }}>
                {props.belowBuildings.map((item, indx) => (
                  
                  <>  
                    {indx > 0 && (
                      
                      <>
                        <Grid item xs={2} key={item.buildingId+indx+"22"}>
                          {buildingIdToName[item.buildingId]} <br />
                          level: {item.currentLevel}
                        </Grid>
                        <Grid item xs={2} key={item.buildingId + "5"}>
                          <img
                            src={resourceMapper(item.constructionCost[0].resourceId)}
                            alt=""
                            style={{ width: "20px" }}
                          />
                          {item.constructionCost[1].quantity}
                        </Grid>
                        <Grid item xs={2} key={item.buildingId + "6"}>
                          <img
                            src={resourceMapper(item.constructionCost[1].resourceId)}
                            alt=""
                            style={{ width: "20px" }}
                          />
                          {item.constructionCost[1].quantity}
                        </Grid>
                        <Grid item xs={2} key={item.buildingId + "2"}>
                          <img
                            src={resourceMapper(item.constructionCost[2].resourceId)}
                            alt=""
                            style={{ width: "20px" }}
                          />
                          {item.constructionCost[1].quantity}
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          key={item.buildingId + "4"}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <AccessAlarmsIcon sx={{ mx: 1 }} />
                        
                          {msToTime(item.constructionTime)}
                        </Grid>
                        <Grid item xs={2} key={item.buildingId + "111"}>
                          <Button variant="outlined" color="inherit">
                            Level {item.currentLevel + 1}
                          </Button>
                        </Grid>
                      </>
                    )}
                  </>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
