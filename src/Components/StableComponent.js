import { Box, Modal, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import trans from "../Assets/trans.png"
import Buildings from "../Assets/buildings.png";
import { buildingPosition } from "../variables";

function StableComponent(props) {

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

    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(!open);
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
                                backgroundImage: `url(${Buildings})`,
                                backgroundPosition: buildingPosition.STABLE,
                                cursor: "pointer",
                            }}
                        ></Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5" component="h6">
                                {props.name} (Level {props.level})
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default StableComponent;