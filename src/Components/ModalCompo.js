import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import trans from "../Assets/trans.png";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  color: "white",
  // bgcolor: "#888888",
  bg: `url(${trans})`,
  border: "2px solid #000",
  boxShadow: 2,
  px: 3,
  py: 2,
};


const ModalCompo = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}

export default ModalCompo;