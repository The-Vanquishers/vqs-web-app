import { Box, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import trans from "../Assets/trans.png"
import { DataGrid } from '@mui/x-data-grid';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    color: "white",
    bg: `url(${trans})`,
    border: "2px solid #000",
    boxShadow: 2,
    px: 3,
    py: 2,
};
const LoggingModal = (props) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
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
                        </Grid>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default LoggingModal;