import React from 'react'
import { loginReducer } from "../reducers/login";
import { empireReducer } from "../reducers/empire";
import { connect } from 'react-redux';
import { buildingNameToId, buildingPosition } from "../variables";
import { Grid, Typography } from "@mui/material";
import Buildings from "../Assets/buildings.png";


const Farm = ({login,empire}) => {
  
  const farm = buildingNameToId["Farm"];
  const level = empire.buildings.filter((item) => item.buildingId === farm)[0].leve;

  return (
    <>
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
            backgroundImage: `url(${Buildings})`,
            backgroundPosition: `${buildingPosition.FARM}`,
            cursor: "pointer",
          }}
        ></Grid>
        <Grid item xs={9}>
          <Typography variant="h5" component="h6">
            Farm (Level {level})
          </Typography>
          <Typography>This is farm that's produce food.</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h5" component="h6">
            Farm (Level {level})
          </Typography>
        </Grid>
      </Grid>
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