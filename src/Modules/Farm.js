import React, { useEffect } from 'react'
import { loginReducer } from "../reducers/login";
import { empireReducer } from "../reducers/empire";
import { connect } from 'react-redux';
import { buildingNameToId, buildingPosition,apiUrl } from "../variables";
import { Grid, Typography } from "@mui/material";
import Buildings from "../Assets/buildings.png";
import axios from 'axios';


const Farm = ({login,empire}) => {
  
  const farm = buildingNameToId["Farm"];
  const level = empire.buildings.filter((item) => item.buildingId === farm)[0].leve;

  useEffect(() => {
    const fetchHourProduction = async() => {
      const { data } = await axios.get(`${apiUrl}/building/${farm}/${level+1}`, {
        headers: { token: login.token, empireId: empire.empireId },
      });
      console.log(data);
    }
    fetchHourProduction();
  }, [])
  
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
          <Typography variant="body">
            This is farm that's produce food.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={5}>
          <Typography variant="h6" component="h6">
            Farm (Level {level})
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="h6">
            Units per hour
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" component="h6">
            Units per hour at level {level + 1}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={5}>
          <Typography variant="body2">Base production</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">Units per hour</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">
            Units per hour at level {level + 1}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={5}>
          <Typography variant="body2">Current production</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">Units per hour</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">
            Units per hour at level {level + 1}
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