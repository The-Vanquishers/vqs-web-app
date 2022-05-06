import {
    Box, Modal, Grid, TableHead, TableRow, TableBody, TableCell,
    Button, Table
} from '@mui/material';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import trans from "../Assets/trans.png"
import Buildings from "../Assets/buildings.png";
import WoodIcon from "../Assets/resources/wood.png";
import StoneIcon from "../Assets/resources/stone.png";
import IronIcon from "../Assets/resources/iron.png";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import ClockIcon from "../Assets/clock.png";
import { buildingPosition, researchCost, researchSets, researchNames } from "../variables";
import Countdown from "react-countdown";
import { loginReducer } from '../reducers/login';
import { researchReducer } from '../reducers/researchReducer';
import { getResearchQueue, researchRequest } from "../actions/research"

function Research({ dispatch, login, research, building, onClose, empireId, resources }) {

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

    const [bioButtonStatus, setBioButtonStatus] = useState(true);
    const [branButtonStatus, setBranButtonStatus] = useState(true);
    const [compButtonStatus, setCompButtonStatus] = useState(true);

    const checkResource = (requiredResource, availableResource) => {
        if (availableResource < requiredResource) {
            return 'notEnoughResource';
        }
        return 'enoughResource';
    }

    const setButtonStatus = (availableResources, requiredResources, setButtonStatus) => {
        if (availableResources.wood < requiredResources.Wood ||
            availableResources.iron < requiredResources.Iron ||
            availableResources.stone < requiredResources.Stone ||
            research.queueFetched) {
            setButtonStatus(false);
        }
    }
    useEffect(() => {
        setButtonStatus(resources, researchCost.BIOPHILIC, setBioButtonStatus);
        setButtonStatus(resources, researchCost.BRANCHING, setBranButtonStatus);
        setButtonStatus(resources, researchCost.COMPUTATIONAL, setCompButtonStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resources, research.queueFetched, research.researchStarted])


    //Start research
    const startResearch = (researchId) => {
        dispatch(researchRequest({ empireId: empireId, researchId: researchId },
            {
                token: login.token,
                'Content-Type': "application/json"
            }))
    }

    //fetching research queue
    useEffect(() => {
        dispatch(getResearchQueue({
            token: login.token,
            'Content-Type': "application/json"
        }, empireId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [research.queueFetched, research.researchStarted])

    return (
        <div>
            <Modal open={open} onClose={handleClose} >
                <Box sx={style}>

                    {/* Close Button */}
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
                    {/* Building Image */}
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
                                backgroundPosition: buildingPosition.RESEARCH_CENTER,
                            }}
                        ></Grid>

                        {/* Description */}
                        <Grid item>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h6">
                                    <strong> {building.buildingName} </strong> (Level {building.level})
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="p">
                                    The research center is where you conduct research for your empire.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Research Queue */}
                    {research.queueFetched &&
                        <Box>
                            <Typography variant="h6" align='center' color={'#8E3200'}>
                                <strong>Research Queue </strong>
                            </Typography>
                            < Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Unit Name</strong>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <strong>Time Remaining</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                            {research.researchQueue.researchName}
                                        </TableCell>
                                        <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                            <Countdown daysInHours={true}
                                                date={new Date(research.researchQueue.endTime)}>
                                                <span id='completed'><strong>Completed</strong></span>
                                            </Countdown>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>}

                    {/* //Research */}
                    <Typography variant="h6" align='center' color={'#8E3200'}>
                        <strong>Research</strong>
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Research Name</strong>
                                </TableCell>
                                <TableCell align='center'>
                                    <strong> Status</strong>
                                </TableCell>
                                <TableCell align='center'>
                                    <strong>Research Requirements</strong>
                                </TableCell>
                                <TableCell align='center'>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Table Rows */}
                        <TableBody>
                            {/* Row-1 */}
                            <TableRow >
                                <TableCell scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {researchNames.BIOPHILIC}
                                </TableCell>
                                <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {"Not Done Yet"}
                                </TableCell>
                                <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }} >
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.BIOPHILIC.Wood,
                                                resources.wood)}
                                        >
                                            {researchCost.BIOPHILIC.Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.BIOPHILIC.Iron,
                                                resources.iron)}
                                        >
                                            {researchCost.BIOPHILIC.Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.BIOPHILIC.Stone,
                                                resources.stone)}
                                        >
                                            {researchCost.BIOPHILIC.Stone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                        <Typography variant='body1'>
                                            {new Date(researchCost.BIOPHILIC.time * 1000)
                                                .toISOString().substr(14, 5)}
                                        </Typography>
                                    </TableCell>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                    <Button
                                        disabled={!bioButtonStatus}
                                        size='medium'
                                        sx={{
                                            bgcolor: "#A64B2A",
                                            margin: 2,
                                            color: '#e6e6e6',
                                            fontSize: 12,
                                            ':hover': {
                                                bgcolor: '#8E3200'
                                            },
                                        }}
                                        onClick={() => startResearch(
                                            researchSets[researchNames.BIOPHILIC])
                                        }>
                                        <strong>Start</strong>
                                    </Button>
                                </TableCell>
                            </TableRow>

                            {/* Row-2 */}
                            <TableRow >
                                <TableCell scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {researchNames.BRANCHING}
                                </TableCell>
                                <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {"Not Done Yet"}
                                </TableCell>
                                <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }} >
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.BRANCHING.Wood,
                                                resources.wood)}
                                        >
                                            {researchCost.BRANCHING.Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.BRANCHING.Iron,
                                                resources.iron)}
                                        >
                                            {researchCost.BRANCHING.Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.BRANCHING.Stone,
                                                resources.stone)}
                                        >
                                            {researchCost.BRANCHING.Stone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                        <Typography variant='body1'>
                                            {new Date(researchCost.BRANCHING.time * 1000)
                                                .toISOString().substr(14, 5)}
                                        </Typography>
                                    </TableCell>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Button
                                        disabled={!branButtonStatus}
                                        size='medium'
                                        sx={{
                                            bgcolor: "#A64B2A",
                                            margin: 2,
                                            color: '#e6e6e6',
                                            fontSize: 12,
                                            ':hover': {
                                                bgcolor: '#8E3200'
                                            },
                                        }}
                                        onClick={() => startResearch(
                                            researchSets[researchNames.BRANCHING])
                                        }>
                                        <strong>Start</strong>
                                    </Button>
                                </TableCell>
                            </TableRow>

                            {/* Row-3 */}
                            <TableRow >
                                <TableCell scope="row" style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {researchNames.COMPUTATIONAL}
                                </TableCell>
                                <TableCell scope="row" align='center' style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    {"Not Done Yet"}
                                </TableCell>
                                <TableCell sx={{ "& td": { border: 0 } }} style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>

                                    <TableCell style={{ paddingTop: 1, paddingBottom: 1 }} >
                                        <img src={WoodIcon} alt="Wood" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.COMPUTATIONAL.Wood,
                                                resources.wood)}
                                        >
                                            {researchCost.COMPUTATIONAL.Wood}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={IronIcon} alt="Iron" style={{ width: "18px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.COMPUTATIONAL.Iron,
                                                resources.iron)}
                                        >
                                            {researchCost.COMPUTATIONAL.Iron}
                                        </Typography>
                                    </TableCell>

                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={StoneIcon} alt="Stone" style={{ width: "20px" }} />
                                        <Typography variant='body1'
                                            className={checkResource(researchCost.COMPUTATIONAL.Stone,
                                                resources.stone)}
                                        >
                                            {researchCost.COMPUTATIONAL.Stone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                        <img src={ClockIcon} alt="time" style={{ width: "18px" }} />
                                        <Typography variant='body1'>
                                            {new Date(researchCost.COMPUTATIONAL.time * 1000)
                                                .toISOString().substr(14, 5)}
                                        </Typography>
                                    </TableCell>
                                </TableCell>

                                <TableCell style={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Button
                                        disabled={!compButtonStatus}
                                        size='medium'
                                        sx={{
                                            bgcolor: "#A64B2A",
                                            margin: 2,
                                            color: '#e6e6e6',
                                            fontSize: 12,
                                            ':hover': {
                                                bgcolor: '#8E3200'
                                            },
                                        }}
                                        onClick={() => startResearch(
                                            researchSets[researchNames.COMPUTATIONAL])
                                        }>
                                        <strong>Start</strong>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box >
            </Modal >
        </div >
    );
}

const mapStateToProps = state => {
    return {
        research: researchReducer(state),
        login: loginReducer(state),
    }
}

export default connect(mapStateToProps)(Research);