import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { logging } from '../actions/logging';
import { empireReducer } from '../reducers/empire';
import { loggingReducer } from '../reducers/logging';
import { loginReducer } from '../reducers/login';
import trans from "../Assets/trans.png"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Grid } from "@mui/material";
import ModalComponent from '../Components/ModalComponent'
import Buildings from "../Assets/buildings.png";
import LoggingModal from '../Components/LoggingModal';
import { buildingPosition } from '../variables';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  color:"white", 
  // bgcolor: "#888888",
  bg: `url(${trans})`,
  border: "2px solid #000",
  boxShadow: 2,
  px: 3,
  py: 2,
};
const Logging = (props) => {
  const { token } = props.login;
  const {empireId} = props.empire;
  const [loggingBuilding, setLoggingBuilding] = useState({});
  const gridSize = [2, 6, 2, 2];

  useEffect(() => {
    if(!props.logging.isFetching && !props.logging.isFetched){
      props.dispatch(logging(token,empireId));
      return;
    }
    if(props.logging.isFetched){
      setLoggingBuilding({
        level:props.logging.level
      })
    }
  },[props, token,empireId]);
  console.log("level",loggingBuilding.level);
   
    return (
        <>
        <LoggingModal
          name="Logging"
          level={loggingBuilding.level}
          image={Buildings}
          position={buildingPosition.LOGGING}
          gridSize={gridSize}
        />
          
        </>
    );
};

const mapStateToProps = state => {
  return {
    logging:loggingReducer(state),
    login:loginReducer(state),
    empire:empireReducer(state)
  }
}

export default connect(mapStateToProps)(Logging);