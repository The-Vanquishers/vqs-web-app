import { Avatar, Box, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import trans from "../Assets/trans.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import wood from "../Assets/resources/wood.png"
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';



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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
// const columns = [

//     {
//         field: 'image',
//         headerName: 'Image',
//         width: 150,
//         editable: true,
//         renderCell: (params) => <img src={wood} alt="wood" />
//     },
//     {
//         field: 'name',
//         headerName: 'Name',
//         width: 150,
//         editable: true,
//     },


// ];
const LoggingModal = (props) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);


    function tableData(title, units) {
        return { title, units };
    };
    const woodImage = {
        field: 'image',
        headerName: 'Image',
        width: 150,
        editable: true,
        renderCell: (params) => <img src={wood} alt="wood" />
    }
    const row = [
        tableData(woodImage, "Hourly Production", props.hourlyProduction),
        tableData(woodImage, "HP", props.hp)
    ]
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
                        {/* <div style={{ height: 300, width: '100%' }} className="mt-7">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                
                                
                                
                            />
                        </div> */}
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead>
                                    <TableRow >
                                        <StyledTableCell>Production</StyledTableCell>
                                        <StyledTableCell align="right">Units</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow key={row.title}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.title}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.units}</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default LoggingModal;