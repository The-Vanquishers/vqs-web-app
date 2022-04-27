import {
    Grid, TableCell, TextField,
    Button
} from '@mui/material';
import { connect } from "react-redux";
import { loginReducer } from "../reducers/login"
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Buildings from "../Assets/buildings.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import ClockIcon from "../Assets/clock.png";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { buildingPosition } from "../variables";

import { buildingNameToId, apiUrl } from "../variables";
import axios from 'axios';
import { empireReducer } from "../reducers/empire";
import Divider from '@mui/material/Divider';
import ManIcon from "../Assets/resources/man.png";

let allUnits;
let availableUnits = [], unAvailableUnits = [];

const Barrack = ({ login, empire, resources }) => {

    const barrack = buildingNameToId['Barracks'];
    const [buildings, setBuildings] = useState([{}]);
    const [unitOneQty, setunitOneQty] = useState(0);
    const [unitTwoQty, setunitTwoQty] = useState(0);
    const [unitThreeQty, setunitThreeQty] = useState(0);

    const level = empire.buildings.filter((item) => item.buildingId === barrack)[0].level;
    const checkResourceAvailability = (currResource, reqResourceUnit, unitOneQty , unitTwoQty, unitThreeQty) => {
        if (currResource < reqResourceUnit * unitOneQty) {
            return 'notEnoughResource';
        }
        if (currResource < reqResourceUnit * unitTwoQty) {
            return 'notEnoughResource';
        }
        if (currResource < reqResourceUnit * unitThreeQty) {
            return 'notEnoughResource';
        }
        else {
            return 'enoughResource';
        }
    }

    const checkHousingCapacity = (housingCapacity, unitOneQty , unitTwoQty, unitThreeQty) => {
        if (housingCapacity <unitOneQty) {
            return 'notEnoughResource';
        }
        if (housingCapacity <unitTwoQty) {
            return 'notEnoughResource';
        }
        if (housingCapacity <unitThreeQty) {
            return 'notEnoughResource';
        }
        else {
            return 'enoughResource';
        }
    }
    useEffect(() => {
        availableUnits = [];

        const fetchRequirements = async () => {
            const { data } = await axios.get(`${apiUrl}/unit`, {
                headers: { token: login.token, empireId: empire.empireId },
            });

            setBuildings((oldArray) => [
                ...oldArray,
                {
                    units: data.units,
                },
            ]);
        };

        fetchRequirements();


    }, [empire.empireId, login.token]);


    if (buildings.length > 1) {
        allUnits = buildings[1].units;
        availableUnits = [];
        unAvailableUnits = [];
        allUnits.map((item, indx) => (
            item.housingRequirement === level && (
                availableUnits.push(item)
            )))

        allUnits.map((item, indx) => (
            item.housingRequirement !== level && (
                unAvailableUnits.push(item)
            )))
    }


    return (buildings.length > 1 &&
        <>

            <Grid container spacing={2} sx={{ my: 2 }}>
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
                        backgroundPosition: `${buildingPosition.BARRACKS}`,
                        cursor: "pointer",
                    }}
                ></Grid>
                <Grid item xs={8}>
                    <Typography variant="h5" component="h6">
                        Barrack (Level {level})
                    </Typography>
                    <Typography variant="body">
                        In the barracks you can recruit infantry. The higher its level the faster the recruitment of troops will be finished.
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="h6" align='center' color={'#8E3200'}>
                <strong>Recruit Units </strong>
            </Typography >
            <Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={4}>
                    <Typography sx={{ my: 0, fontSize: 15, fontWeight: 600 }}>
                        Unit
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ my: 0, fontSize: 15, fontWeight: 600 }}>
                        Requirements
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ my: 0, fontSize: 15, fontWeight: 600 }}>
                        Time
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ my: 0, fontSize: 15, fontWeight: 600 }}>
                        Recruit
                    </Typography>
                </Grid>
            </Grid>

            <Divider />

            {
                <Grid container spacing={0} sx={{ my: 0 }}>

                    {availableUnits.map((item, indx) => (

                        <>
                            <Grid item xs={4} sx={{ my: 2, fontSize: 15 }}>
                                {item.name}

                            </Grid>
                            <Grid item xs={4}>
                                <TableCell style={{ paddingTop: 1, paddingBottom: 1 }}>
                                    <img src={ManIcon} alt="capacity" style={{ width: "18px" }} />
                                    <Typography variant='body1' align='center' sx={{ my: 0, fontSize: 12 }} className={
                                        checkHousingCapacity(item.housingRequirement,
                                            unitOneQty, unitTwoQty, unitThreeQty)
                                    }>
                                        {item.housingRequirement}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                    <Typography variant='body1' sx={{ my: 0, fontSize: 12 }} className={
                                        checkResourceAvailability(empire.resources.wood,
                                            item.RecuitingCost[0].quantity,
                                            unitOneQty , unitTwoQty, unitThreeQty)
                                    }>
                                        {item.RecuitingCost[0].quantity}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                    <Typography variant='body1' sx={{ my: 0, fontSize: 12 }} className={
                                        checkResourceAvailability(empire.resources.iron,
                                            item.RecuitingCost[1].quantity,
                                            unitOneQty , unitTwoQty, unitThreeQty)
                                    }>
                                        {item.RecuitingCost[1].quantity}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                    <Typography variant='body1' sx={{ my: 0, fontSize: 12 }} className={
                                        checkResourceAvailability(empire.resources.stone,
                                            item.RecuitingCost[2].quantity,
                                            unitOneQty , unitTwoQty, unitThreeQty)
                                    }>
                                        {item.RecuitingCost[2].quantity}
                                    </Typography>
                                </TableCell>
                            </Grid>


                            <Grid item xs={2}>
                                <TableCell>
                                    <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                    <Typography variant='body1' sx={{ my: 0, fontSize: 12 }}>
                                        {new Date(item.RecruitingTime * 1000)
                                            .toISOString().substr(14, 5)}
                                    </Typography>
                                </TableCell>

                            </Grid>

                            <Grid item xs={2} sx={{ my: 2 }}>
                                {indx === 0 &&
                                    <TextField
                                        inputProps={{
                                            style: {
                                                height: 30,
                                                width: 40,
                                                padding: '0 14px',
                                            },
                                        }}
                                        type="number"
                                        value={unitOneQty}
                                        onChange={(e) => {
                                            if (e.target.value >= 0 && e.target.value <= 100)
                                                setunitOneQty(parseInt(e.target.value))
                                        }}
                                    />}

                                {indx === 1 &&
                                    <TextField
                                        inputProps={{
                                            style: {
                                                height: 30,
                                                width: 40,
                                                padding: '0 14px',
                                            },
                                        }}
                                        type="number"
                                        value={unitTwoQty}
                                        onChange={(e) => {
                                            if (e.target.value >= 0 && e.target.value <= 100)
                                                setunitTwoQty(parseInt(e.target.value))
                                        }}
                                    />}

                                {indx === 2 &&
                                    <TextField
                                        inputProps={{
                                            style: {
                                                height: 30,
                                                width: 40,
                                                padding: '0 14px',
                                            },
                                        }}
                                        type="number"
                                        value={unitThreeQty}
                                        onChange={(e) => {
                                            if (e.target.value >= 0 && e.target.value <= 100)
                                                setunitThreeQty(parseInt(e.target.value))
                                        }}
                                    />}
                            </Grid>
                        </>
                    ))}
                </Grid>
            }

            <div align="center" >
                <Button id="myBtn"
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
                    }}>
                    <strong>Recruit Units</strong>
                </Button>

            </div>


            <Divider />


            <Grid container spacing={0} sx={{ my: 0 }}>
                <Grid item xs={4}>
                    <Typography sx={{ my: 0, fontSize: 15, fontWeight: 600 }} >
                        Not yet available
                    </Typography>
                </Grid>
                <Grid item xs={8} >
                    <Typography sx={{ my: 0, fontSize: 15, fontWeight: 600 }} >
                        Requirements
                    </Typography>
                </Grid>
            </Grid>
            <Divider />

            {
                <Grid container spacing={0} sx={{ my: 0 }}>
                    {unAvailableUnits.map((item, indx) => (
                        <>
                            <Grid item xs={4} sx={{ my: 2, fontSize: 15 }}>
                                {item.name}
                            </Grid>
                            <Grid item xs={8}>
                                <TableCell  >
                                    <Typography variant='body1' sx={{ my: 0, fontSize: 12 }}>
                                        Barrack ({item.housingRequirement})
                                    </Typography>
                                </TableCell>
                            </Grid>
                        </>
                    ))}
                </Grid>

            }

            {/* {availableUnits = []}
          {unAvailableUnits = []} */}

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        login: loginReducer(state),
        empire: empireReducer(state),
    };
};

export default connect(mapStateToProps)(Barrack);