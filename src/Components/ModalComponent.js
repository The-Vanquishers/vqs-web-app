import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Grid } from "@mui/material";
import trans from "../Assets/trans.png"
import FoodIcon from "../Assets/resources/food.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import GoldIcon from "../Assets/resources/gold.png";
import { resourceSets } from "../variables";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  color:"white",
  // bgcolor: "#888888",
  bg: `url(${trans})`,
  border: "2px solid #000",
  boxShadow: 2,
  px: 3,
  py: 2,
};

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

const ModalComponent = ({ name, image, position, level,resources,resourceRequirements,constructionTime }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

 
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            {resourceRequirements.map(item => (
              <Grid
                item
                xs={2}
                key={item.resourceId}
              >
                <img src={resourceMapper(item.resourceId)} alt="" style={{ width: "20px" }} /> {item.quantity}
            </Grid>
            ))}
            <Grid
              item
              xs={4}
              sx={{
                my: 1,
              }}
            >
              Construction Time: {constructionTime}
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                my: 1,
              }}
            >
              <Button size="small" variant="contained" color="success">
                upgrade
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{my:3}}>
            <Grid
              item
              xs={3}
              style={{
                height: "100px",
              }}
              sx={{
                borderColor: "gray",
                borderStyle: "solid",
                borderWidth: 1,
                backgroundImage: `url(${image})`,
                backgroundPosition: `${position}`,
                cursor: "pointer",
              }}
            ></Grid>
            <Grid item xs={9}>
              <Typography variant="h5" component="h6">
                {name} (Level {level})
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
