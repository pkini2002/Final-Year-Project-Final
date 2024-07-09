import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Copyright from './Copyright';
import axios from 'axios'
import './Resultpg.css';
// MUI imports
import { Typography, Select, MenuItem, FormControl, InputLabel, Button, Box, List, ListItem, Container, Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Resultpg = () => {
    const location = useLocation();
    const { state } = location;
    const { name, surname, application_number, preference1, preference2, preference3, allocation } = state || {};

    const handleExit = () => {
        const confirmexit = window.confirm("This will reject your allocated seat, if you have not accepted it, do you want to exit?");
        if (confirmexit) {
            window.location.href = '/Result'; // Navigate to Result.jsx
        }
    };

    const handleGoToPortal = async () => {
        try {
            const confirm = window.confirm("This will reject your allocated seat, if you have not accepted it, do you want to continue?");
            if (confirm) {

                console.log(allocation);
                const response = await axios.post('http://localhost:3000/seats/seats/return', {
                    branchName: allocation, // This is equivalent to { allocation: allocation }
                });

                // Axios automatically parses the JSON response to a JavaScript object, so no need to manually parse it
                console.log('Success:', response.data); // `response.data` contains the parsed data

                // Redirect after success
                window.location.href = '/Studentlogin'; // Navigate to Studentlogin.jsx
            }

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error:', error.response.statusText);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("The request was made but no response was received");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        }
    };

    const handleAcceptSeat = () => {
        const confirmAccept = window.confirm(`Congratulations, you have been allotted to ${allocation} branch.`);
        if (confirmAccept) {
            window.location.href = '/Result'; // Redirect to the Result page
        }
    };

    return (
        <div className="result-home-container">
            <div className="welcomeres-message">
                <Typography variant="h4" style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#333' }}>Welcome, {name}!</Typography>
            </div>
            <Container>
                <TableContainer component={Paper} sx={{ marginTop: 6 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="NUCAT-2024 Allotment Process">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: 'green', color: 'white', textAlign: 'center' }} colSpan={2}>
                                    NUCAT-2024 Allotment Results
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell style={{ color: 'black' }}>{name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Surname</TableCell>
                                <TableCell style={{ color: 'black' }}>{surname}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Application Number</TableCell>
                                <TableCell style={{ color: 'black' }}>{application_number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Preference 1</TableCell>
                                <TableCell style={{ color: 'black' }}>{preference1}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Preference 2</TableCell>
                                <TableCell style={{ color: 'black' }}>{preference2}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Preference 3</TableCell>
                                <TableCell style={{ color: 'black' }}>{preference3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Allotted Branch</TableCell>
                                <TableCell style={{ color: 'black' }}>{allocation}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <div className="button-container">
                <Button variant="contained" onClick={handleAcceptSeat}>Accept Seat</Button>
                <Button variant="contained" onClick={handleGoToPortal}>Re-allocation</Button>
                <Button variant="contained" onClick={handleExit}>Exit</Button>
            </div>
            <Copyright />
        </div>
    );
};

export default Resultpg;

