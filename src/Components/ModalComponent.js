import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import trans from "../Assets/trans.png"
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

const ModalComponent = ({ name, image, position, level,resources,resourceRequirements,constructionTime }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  console.log(resources);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                my:1,
              }}

            >
            
            </Grid>
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
