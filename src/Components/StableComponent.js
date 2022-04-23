import {
    Box, Modal, Grid, TableHead, TableRow, TableBody, TableCell, TextField,
    Button
} from '@mui/material';
import { connect } from "react-redux";
import { loginReducer } from "../reducers/login"
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import trans from "../Assets/trans.png"
import Buildings from "../Assets/buildings.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import ClockIcon from "../Assets/clock.png";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { buildingPosition, unitSets, stableUnitNames, stableTrainingCost } from "../variables";
import { stableReducer } from '../reducers/stableReducer';
import { trainRequest } from '../actions/stable';


function StableComponent({ dispatch, login, building,
    units, onClose, empireId }) {

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


    const getAvailableUnitsQuantity = (name) => {
        var count = 0;
        const selectedUnits = units.filter(e => e.unitId === unitSets[name]);
        selectedUnits.forEach(element => {
            count += element.quantity;
        });
        return count;
    }
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        onClose();
        setOpen(!open)
    };

    const [cavalryAmount, setCavalryAmount] = useState(0);
    const [heavyCavalryAmount, setHeavyCavalryAmount] = useState(0);
    const [archerAmount, setArcherAmount] = useState(0);
    const [heavyArcherAmount, setHeavyArcherAmount] = useState(0);

    const getTrainingUnits = () => {
        const units = [];
        if (cavalryAmount) { units.push({ unitId: unitSets[stableUnitNames.CAVALRY], quantity: cavalryAmount }) }
        if (heavyCavalryAmount) { units.push({ unitId: unitSets[stableUnitNames.HEAVY_CAVALRY], quantity: heavyCavalryAmount }) }
        if (archerAmount) { units.push({ unitId: unitSets[stableUnitNames.CAVALRY_ARCHER], quantity: archerAmount }) }
        if (heavyArcherAmount) { units.push({ unitId: unitSets[stableUnitNames.HEAVY_CAVALRY_ARCHER], quantity: heavyArcherAmount }) }
        return units;
    }


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
                            <TableCell>
                                <strong>Unit Name</strong>
                            </TableCell>
                            <TableCell align='center'>
                                <strong> Available Units</strong>
                            </TableCell>
                            <TableCell align='center'>
                                <strong>Unit Requirements</strong>
                            </TableCell>
                            <TableCell align='center'>
                                <strong>Recruit Unit</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell component="th" scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                {stableUnitNames.CAVALRY}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                {getAvailableUnitsQuantity(stableUnitNames.CAVALRY)}
                            </TableCell>
                            <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                    <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.CAVALRY].Wood}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.CAVALRY].Iron}
                                    </Typography>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.CAVALRY].Stone}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {new Date(stableTrainingCost[stableUnitNames.CAVALRY].time * 1000)
                                            .toISOString().substr(14, 5)}
                                    </Typography>
                                </TableCell>
                            </TableCell>
                            <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TextField
                                    inputProps={{
                                        style: {
                                            height: 40,
                                            width: 50,
                                            padding: '0 14px',
                                        },
                                    }}
                                    type="number"
                                    value={cavalryAmount}
                                    onChange={(e) => {
                                        if (e.target.value >= 0 && e.target.value <= 10)
                                            setCavalryAmount(parseInt(e.target.value))
                                    }}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row" >
                                {stableUnitNames.CAVALRY_ARCHER}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {getAvailableUnitsQuantity(stableUnitNames.CAVALRY_ARCHER)}
                            </TableCell>
                            <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                    <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Wood}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Iron}
                                    </Typography>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Stone}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {new Date(stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].time * 1000)
                                            .toISOString().substr(14, 5)}
                                    </Typography>
                                </TableCell>
                            </TableCell>
                            <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TextField
                                    inputProps={{
                                        style: {
                                            height: 40,
                                            width: 50,
                                            padding: '0 14px',
                                        },
                                    }}
                                    type="number"
                                    value={archerAmount}
                                    onChange={(e) => {
                                        if (e.target.value >= 0 && e.target.value <= 10)
                                            setArcherAmount(parseInt(e.target.value))
                                    }}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row">
                                {stableUnitNames.HEAVY_CAVALRY}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {getAvailableUnitsQuantity(stableUnitNames.HEAVY_CAVALRY)}
                            </TableCell>
                            <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                    <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Wood}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Iron}
                                    </Typography>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Stone}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {new Date(stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].time * 1000)
                                            .toISOString().substr(14, 5)}
                                    </Typography>
                                </TableCell>
                            </TableCell>
                            <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TextField
                                    inputProps={{
                                        style: {
                                            height: 40,
                                            width: 50,
                                            padding: '0 14px',
                                        },
                                    }}
                                    type="number"
                                    value={heavyCavalryAmount}
                                    onChange={(e) => {
                                        if (e.target.value >= 0 && e.target.value <= 10)
                                            setHeavyCavalryAmount(parseInt(e.target.value))
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {stableUnitNames.HEAVY_CAVALRY_ARCHER}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {getAvailableUnitsQuantity(stableUnitNames.HEAVY_CAVALRY_ARCHER)}
                            </TableCell>
                            <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                    <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Wood}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Iron}
                                    </Typography>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                    <Typography variant='body1'>
                                        {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Stone}
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                    <Typography variant='body1'>
                                        {new Date(stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].time * 1000)
                                            .toISOString().substr(14, 5)}
                                    </Typography>
                                </TableCell>
                            </TableCell>
                            <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                <TextField
                                    inputProps={{
                                        style: {
                                            height: 40,
                                            width: 50,
                                            padding: '0 14px',
                                        },
                                    }}
                                    type="number"
                                    value={heavyArcherAmount}
                                    onChange={(e) => {
                                        if (e.target.value >= 0 && e.target.value <= 10)
                                            setHeavyArcherAmount(parseInt(e.target.value))
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
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
                            }}
                            onClick={() => {

                                try {
                                    dispatch(trainRequest({
                                        empireId: empireId,
                                        units: getTrainingUnits()
                                    },
                                        {
                                            token: login.token,
                                            'Content-Type': "application/json"
                                        }
                                    ))
                                } catch (error) {
                                    console.log(error);
                                }
                                console.log({
                                    empireId: empireId,
                                    units: getTrainingUnits()
                                })
                            }}>
                            <strong>Train Units</strong>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}

const mapStateToProps = state => {
    return {
        stable: stableReducer(state),
        login: loginReducer(state)
    }
}

export default connect(mapStateToProps)(StableComponent);