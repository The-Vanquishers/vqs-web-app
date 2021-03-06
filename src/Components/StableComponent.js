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
    const [submit, setSubmit] = useState(false);

    //modal open-close handler
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        onClose();
        setOpen(!open)
    };

    //fetching training queue
    useEffect(() => {
        dispatch(getTrainingQueue({
            token: login.token,
            'Content-Type': "application/json"
        }, empireId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stable.queueFetched])

    //resource flag
    const getAvailableUnitsQuantity = (name) => {
        var count = 0;
        const selectedUnits = units.filter(e => e.unitId === unitSets[name]);
        selectedUnits.forEach(element => {
            count += element.quantity;
        });
        return count;
    }

    const flagResource = (resDemand, reqResource, availableRes) => {
        if (availableRes >= resDemand) {
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

    //Eligible unit count
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
        setResourceDemand(resource);

        if (resources.wood < resource.wood || resources.stone < resource.stone ||
            resources.iron < resource.iron ||
            (cavalryAmount === 0 && archerAmount === 0 && heavyArcherAmount === 0 &&
                heavyCavalryAmount === 0)) {
            setSubmit(false);
        } else {
            setSubmit(true);
        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourceDemand])

    //handling state callbacks
    useEffect(() => {
        resourceDemandHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cavalryAmount, archerAmount, heavyArcherAmount, heavyCavalryAmount])

    return (
        <div>
            <Modal open={open} onClose={handleClose} >
                <Box sx={style}>
                    <Grid
                        container
                        justifyContent="right"
                        style={{ position: "absolute", paddingRight: 25, paddingTop: 1 }}>
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
                                    <strong>Max Unit</strong>
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
                                                flagResource(resourceDemand.wood,
                                                    stableTrainingCost[stableUnitNames.CAVALRY].Wood, resources.wood)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.iron,
                                                    stableTrainingCost[stableUnitNames.CAVALRY].Iron,
                                                    resources.iron)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.stone,
                                                    stableTrainingCost[stableUnitNames.CAVALRY].Stone,
                                                    resources.stone)
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
                                                setCavalryAmount(value)
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: "pointer" }}
                                        onClick={() => setCavalryAmount(egUnits.CV)}>
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
                                                flagResource(resourceDemand.wood,
                                                    stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Wood, resources.wood)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.iron,
                                                    stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Iron,
                                                    resources.iron)
                                            }>
                                            {stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.stone,
                                                    stableTrainingCost[stableUnitNames.CAVALRY_ARCHER].Stone,
                                                    resources.stone)
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
                                                flagResource(resourceDemand.wood,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Wood, resources.wood)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.iron,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Iron,
                                                    resources.iron)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.stone,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY].Stone,
                                                    resources.stone)
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
                                            const value = parseInt(e.target.value);
                                            if (value >= 0 && value <= 10) {
                                                setHeavyCavalryAmount(value)
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: 'pointer' }}
                                        onClick={() => setHeavyCavalryAmount(egUnits.HC)}>
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
                                                flagResource(resourceDemand.wood,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Wood, resources.wood)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.iron,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Iron,
                                                    resources.iron)
                                            }>
                                            {stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={
                                                flagResource(resourceDemand.stone,
                                                    stableTrainingCost[stableUnitNames.HEAVY_CAVALRY_ARCHER].Stone,
                                                    resources.stone)
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
                                            const value = parseInt(e.target.value);
                                            if (value >= 0 && value <= 10) {
                                                setHeavyArcherAmount(value)
                                            }
                                        }}
                                    />
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Typography align='center' sx={{ cursor: 'pointer' }}
                                        onClick={() => setHeavyArcherAmount(egUnits.HA)}>
                                        {egUnits.HA}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div align="center">
                        <Button
                            disabled={!submit}
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
                                        setArcherAmount(0);
                                        setCavalryAmount(0);
                                        setHeavyArcherAmount(0);
                                        setHeavyCavalryAmount(0);
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