import {
    Box, Modal, Grid, TableHead, TableRow, TableBody, TableCell, TextField,
    Button, Table
} from '@mui/material';
import { connect } from "react-redux";
import { loginReducer } from "../reducers/login"
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import trans from "../Assets/trans.png"
import Buildings from "../Assets/buildings.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import ManIcon from "../Assets/resources/man.png";
import ClockIcon from "../Assets/clock.png";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { buildingPosition, unitSets, workShopUnitNames, workShopUnitTrainingCost } from "../variables";
import { stableReducer } from '../reducers/stableReducer';
import { trainRequest, getTrainingQueue } from '../actions/stable';
import Countdown from "react-countdown";

function Workshop({ dispatch, login, stable, building,
    units, onClose, empireId, resources }) {

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

    const [open, setOpen] = useState(true);
    const handleClose = () => {
        onClose();
        setOpen(!open)
    };


    return (
        <div>
            <Modal open={open} onClose={handleClose} >
                <Box sx={style}>
                    <Grid
                        container
                        justifyContent="right"
                        style={{ position: "absolute", paddingRight: 25, paddingTop: 1 }}
                    >
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CancelIcon color="error" />
                            </IconButton>
                        </Grid>
                    </Grid>
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
                                backgroundPosition: buildingPosition.WORKSHOP,
                            }}
                        ></Grid>
                        <Grid item>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h6">
                                    <strong> Siege Workshop </strong> (Level {building.level})
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="p">
                                    The workshop is where you recruit your siege units.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Training Queue */}
                    {(stable.queue !== null) &&
                        <Box>
                            <Typography variant="h6" align='center' color={'#8E3200'}>
                                <strong>Training Queue </strong>
                            </Typography>
                            < Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Unit Name</strong>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <strong>Quantity</strong>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <strong>Time Remaining</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                            {Object.keys(unitSets).find(k => unitSets[k] === stable.queue.unitId)}
                                        </TableCell>
                                        <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                            {stable.queue.quantity}
                                        </TableCell>
                                        <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                            <Countdown daysInHours={true}
                                                date={new Date(stable.queue.endTime).getTime()}>
                                                <span id='completed'><strong>Completed</strong></span>
                                            </Countdown>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>}

                    {/* Submit */}
                    <div align="center">
                        <Button
                            startIcon={<GroupAddIcon />}
                            size='large'
                            sx={{
                                bgcolor: "#A64B2A",
                                margin: 2,
                                color: '#e6e6e6',
                                fontSize: 14,
                                ':hover': {
                                    bgcolor: '#8E3200'
                                },
                            }}>
                            <strong>Train Units</strong>
                        </Button>
                    </div>
                </Box >
            </Modal >
        </div >
    );
}

const mapStateToProps = state => {
    return {
        login: loginReducer(state),
        stable: stableReducer(state),
    }
}

export default connect(mapStateToProps)(Workshop);