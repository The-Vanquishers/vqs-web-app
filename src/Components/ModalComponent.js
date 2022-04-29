import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import trans from "../Assets/trans.png";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  color: "#332517",
  bg: `url(${trans})`,
  bgcolor: "#ecd7ac",
  border: "2px solid #000",
  boxShadow: 2,
  maxHeight: '95vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  px: 3,
  py: 2,
};


const ModalCompo = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} >
          <Grid container justifyContent="right" style={{position:"absolute",paddingRight:20,paddingTop:3}} >
            <Grid item  >
              <IconButton onClick={handleClose}>
                <CancelIcon color="error"/>
              </IconButton>
            </Grid>
        </Grid>
          {props.children}
        </Box>
      </Modal>
    </>
  );
}

export default ModalCompo;