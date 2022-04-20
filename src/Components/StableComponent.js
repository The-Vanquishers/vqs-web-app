import { Box, Modal, Grid, TableHead, TableRow, TableBody } from '@mui/material';
import TableCell from '@material-ui/core/TableCell';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import trans from "../Assets/trans.png"
import Buildings from "../Assets/buildings.png";
import { buildingPosition, unitSets } from "../variables";

function StableComponent({ building, units }) {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        color: "#332517",
        bg: `url(${trans})`,
        bgcolor: "#ecd7ac",
        border: "2px solid #000",
        boxShadow: 2,
        px: 3,
        py: 2,
    };

    const getAvailableUnits = (name) => {
        var count = 0;
        const selectedUnits = units.filter(e => e.unitId === unitSets[name]);
        selectedUnits.forEach(element => {
            count += element.quantity;
        });
        return count;
    }

    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(!open);
    return (
        <div>
            <Modal open={open} onClose={handleClose} >
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
                        <Grid item>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h6">
                                    <strong> Stable </strong> (Level {building.level})
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="p">
                                    In the stables you can train and recruit cavalry.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <TableHead>
                        <TableRow>
                            <TableCell>Unit Name</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {unitSets}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Box>
            </Modal>
        </div >
    );
}

export default StableComponent;