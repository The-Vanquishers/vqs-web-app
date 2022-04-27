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
import { buildingPosition, unitSets, stableUnitNames, stableTrainingCost } from "../variables";
import { stableReducer } from '../reducers/stableReducer';
import { trainRequest, getTrainingQueue } from '../actions/stable';
import Countdown from "react-countdown";

function StableComponent({ dispatch, login, stable, building,
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
    const [cavalryAmount, setCavalryAmount] = useState(0);
    const [heavyCavalryAmount, setHeavyCavalryAmount] = useState(0);
    const [archerAmount, setArcherAmount] = useState(0);
    const [heavyArcherAmount, setHeavyArcherAmount] = useState(0);
    const [resourceDemand, setResourceDemand] = useState({ wood: 0, iron: 0, stone: 0 });



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

    const checkResourceAvailability = (currResource, reqResourceUnit, quantity) => {
        if (currResource >= reqResourceUnit * quantity) {
            return 'enoughResource';
        }
        else {
            return 'notEnoughResource';
        }
    }



    const getTrainingUnits = () => {
        const units = [];
        if (cavalryAmount) { units.push({ unitId: unitSets[stableUnitNames.CAVALRY], quantity: cavalryAmount }) }
        if (heavyCavalryAmount) { units.push({ unitId: unitSets[stableUnitNames.HEAVY_CAVALRY], quantity: heavyCavalryAmount }) }
        if (archerAmount) { units.push({ unitId: unitSets[stableUnitNames.CAVALRY_ARCHER], quantity: archerAmount }) }
        if (heavyArcherAmount) { units.push({ unitId: unitSets[stableUnitNames.HEAVY_CAVALRY_ARCHER], quantity: heavyArcherAmount }) }
        return units;
    }

    useEffect(() => {
        dispatch(getTrainingQueue({
            token: login.token,
            'Content-Type': "application/json"
        }, empireId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stable.queueFetched])

    const resourceDemandHandler = () => {
        const wood = (stableTrainingCost[stableUnitNames.CAVALRY].Wood * cavalryAmount) +
            (stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Wood * heavyCavalryAmount) +
            (stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Wood * archerAmount) +
            (stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Wood * heavyArcherAmount);
        const iron = (stableTrainingCost[stableUnitNames.CAVALRY].Iron * cavalryAmount) +
            (stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Iron * heavyCavalryAmount) +
            (stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Iron * archerAmount) +
            (stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Iron * heavyArcherAmount);
        const stone = (stableTrainingCost[stableUnitNames.CAVALRY].Stone * cavalryAmount) +
            (stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Stone * heavyCavalryAmount) +
            (stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Stone * archerAmount) +
            (stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Stone * heavyArcherAmount);

        const resource = {
            wood: wood,
            iron: iron,
            stone: stone
        }
        console.log(resource)
        setResourceDemand(resource);
    }

    const getMinimumUnit = (unitCost) => {
        let withWood = 0;
        if ((resources.wood - resourceDemand.wood) > 0) {
            withWood = Math.floor((resources.wood - resourceDemand.wood) / unitCost.Wood)
        }

        let withIron = 0;
        if ((resources.iron - resourceDemand.iron) > 0) {
            withIron = Math.floor((resources.iron - resourceDemand.iron) / unitCost.Iron)
        }

        let withStone = 0;
        if ((resources.stone - resourceDemand.stone) > 0) {
            withStone = Math.floor((resources.stone - resourceDemand.stone) / unitCost.Stone)
        }

        return Math.min(withWood, (Math.min(withIron, withStone)));

    }

    const [egUnits, setEgUnits] = useState({ CV: 0, HA: 0, AR: 0, HC: 0 })

    useEffect(() => {
        const cv = getMinimumUnit(stableTrainingCost[stableUnitNames.CAVALRY]);
        const ha = getMinimumUnit(stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER]);
        const ar = getMinimumUnit(stableTrainingCost[stableUnitNames.CAVALRY_ARCHER]);
        const hc = getMinimumUnit(stableTrainingCost[stableUnitNames.HEAVY_CAVALRY]);

        setEgUnits({ CV: cv, HA: ha, AR: ar, HC: hc })

    }, [resourceDemand])


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

                    <Typography variant="h6" align='center' color={'#8E3200'}>
                        <strong>Train Units </strong>
                    </Typography>
                    <Table>
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
                                <TableCell align='center'>
                                    <strong>Eligible Amount</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {stableUnitNames.CAVALRY}
                                </TableCell>
                                <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {getAvailableUnitsQuantity(stableUnitNames.CAVALRY)}
                                </TableCell>
                                <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                        <img src={ManIcon} alt="capacity" style={{ width: "18px" }} />
                                        <Typography variant='body1' align='center'>
                                            {stableTrainingCost[stableUnitNames.CAVALRY].housingRequirement}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }} >
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.wood,
                                                    stableTrainingCost[stableUnitNames.CAVALRY].Wood,
                                                    cavalryAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.iron,
                                                    stableTrainingCost[stableUnitNames.CAVALRY].Iron,
                                                    cavalryAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.stone,
                                                    stableTrainingCost[stableUnitNames.CAVALRY].Stone,
                                                    cavalryAmount)
                                            }>
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
                                            const value = parseInt(e.target.value)
                                            if (value >= 0 && value <= 10) {
                                                setCavalryAmount(value);
                                                resourceDemandHandler();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: "pointer" }}
                                    >
                                        {egUnits.CV}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell scope="row" >
                                    {stableUnitNames.CAVALRY_ARCHER}
                                </TableCell>
                                <TableCell scope="row" align='center'>
                                    {getAvailableUnitsQuantity(stableUnitNames.CAVALRY_ARCHER)}
                                </TableCell>
                                <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                        <img src={ManIcon} alt="capacity" style={{ width: "18px" }} />
                                        <Typography variant='body1' align='center'>
                                            {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].housingRequirement}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.wood,
                                                    stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Wood,
                                                    archerAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.iron,
                                                    stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Iron,
                                                    archerAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.stone,
                                                    stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Stone,
                                                    archerAmount)
                                            }>
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
                                            const value = parseInt(e.target.value);

                                            if (value >= 0 && value <= 10) {
                                                setArcherAmount(value);
                                                resourceDemandHandler();
                                            }
                                        }}
                                    />
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: 'pointer' }}
                                        onClick={() => setArcherAmount(egUnits.AR)}>
                                        {egUnits.AR}
                                    </Typography>
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
                                        <img src={ManIcon} alt="capacity" style={{ width: "18px" }} />
                                        <Typography variant='body1' align='center' >
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].housingRequirement}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.wood,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Wood,
                                                    heavyCavalryAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.iron,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Iron,
                                                    heavyCavalryAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.stone,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Stone,
                                                    heavyCavalryAmount)
                                            }>
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
                                            if (e.target.value >= 0 && e.target.value <= 10) {
                                                setHeavyCavalryAmount(parseInt(e.target.value));
                                                resourceDemandHandler();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: 'pointer' }}
                                    >
                                        {egUnits.HC}
                                    </Typography>
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
                                        <img src={ManIcon} alt="capacity" style={{ width: "18px" }} />
                                        <Typography variant='body1' align='center'>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].housingRequirement}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.wood,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Wood,
                                                    heavyArcherAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.iron,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Iron,
                                                    heavyArcherAmount)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                checkResourceAvailability(resources.stone,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Stone,
                                                    heavyArcherAmount)
                                            }>
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
                                            if (e.target.value >= 0 && e.target.value <= 10) {
                                                setHeavyArcherAmount(parseInt(e.target.value));
                                                resourceDemandHandler();
                                            }
                                        }}
                                    />
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: 'pointer' }}>
                                        {egUnits.HA}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

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
                                    if (!stable.queueFetched) {
                                        dispatch(trainRequest({
                                            empireId: empireId,
                                            units: getTrainingUnits()
                                        },
                                            {
                                                token: login.token,
                                                'Content-Type': "application/json"
                                            }
                                        ))
                                    }
                                    else { alert("Training queue is busy!") }
                                } catch (error) {
                                    console.log(error);
                                }

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
        stable: stableReducer(state),
        login: loginReducer(state)
    }
}

export default connect(mapStateToProps)(StableComponent);