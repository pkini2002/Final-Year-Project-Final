import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Copyright from './Copyright';
import './Studenthome.css';
import SeatMatrixModal from './SeatMatrixModal';
// MUI imports
import { Typography, Select, MenuItem, Card, CardContent, FormControl, InputLabel, Button, Box, List, ListItem, ListItemText, Container, CardActions, Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Studenthome = () => {
    const location = useLocation();
    const { state } = location;
    const { name, surname, email, marks, gender, rank, application_number, password } = state || {};
    const [preference1, setPreference1] = useState('');
    const [preference2, setPreference2] = useState('');
    const [preference3, setPreference3] = useState('');
    const [preferencesLocked, setPreferencesLocked] = useState(false);
    const [seatMatrixOpen, setSeatMatrixOpen] = useState(false); // State for controlling the seat matrix modal
    const [seatMatrix, setSeatMatrix] = useState(''); // State for storing the seat matrix data

    const courses = ['Computer Science and Engineering', 'Information Science and Engineering', 'Artificial Intelligence and Machine Learning', 'Electronics and Communication Engineering', 'Civil Engineering', 'Computer and Communication Engineering', 'Electrical and Electronics Engineering', 'Mechanical Engineering'];

    useEffect(() => {
        // Fetch seat matrix data when the component mounts
        async function fetchSeatMatrix() {
            try {
                const response = await axios.get('http://localhost:3000/matrix/seatmatrix'); // Assuming your backend API endpoint is '/api/seatmatrix'
                setSeatMatrix(response.data);
            } catch (error) {
                console.error('Error fetching seat matrix:', error);
            }
        }

        fetchSeatMatrix();
    }, []);

    const handlePreferenceChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const confirmPreferences = () => {
        const confirm = window.confirm("Are you sure you want to lock in your preferences?");
        if (confirm) {
            setPreferencesLocked(true);
            const userData = { name, surname, email, marks, gender, rank, application_number, password, preference1, preference2, preference3 };

            axios.post('http://localhost:3000/prefer/submit-preferences', userData)
                .then(response => console.log(response.data))
                .catch(error => console.error(error));

            console.log(userData);
        }
    };
    const handleViewSeatMatrix = () => {
        setSeatMatrixOpen(true); // Open the seat matrix modal
    };

    const handleCloseSeatMatrix = () => {
        setSeatMatrixOpen(false); // Close the seat matrix modal
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/Studentlogin');
    };

    return (
        <div className="student-home-container">
            <h1>Welcome, {name}!</h1>
            <div className="background-image"></div>
            <Container>
                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="NUCAT-2024 Allotment Process">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: 'green', color: 'white', textAlign: 'center' }} colSpan={2}>
                                    NUCAT-2024 Allotment Process
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
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell style={{ color: 'black' }}>{email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Marks</TableCell>
                                <TableCell style={{ color: 'black' }}>{marks}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Gender</TableCell>
                                <TableCell style={{ color: 'black' }}>{gender}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Rank</TableCell>
                                <TableCell style={{ color: 'black' }}>{rank}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ color: 'black', fontWeight: 'bold' }}>Application Number</TableCell>
                                <TableCell style={{ color: 'black' }}>{application_number}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {!preferencesLocked ? (
                    <Box>
                        <Grid container spacing={2} justifyContent="center">
                            {['1st', '2nd', '3rd'].map((label, index) => (
                                <Grid item xs={12} sm={4} key={label}>
                                    <FormControl fullWidth>
                                        <InputLabel>{`Select your ${label} preference`}</InputLabel>
                                        <Select
                                            value={index === 0 ? preference1 : index === 1 ? preference2 : preference3}
                                            label={`Select your ${label} preference`}
                                            onChange={handlePreferenceChange(index === 0 ? setPreference1 : index === 1 ? setPreference2 : setPreference3)}
                                            disabled={preferencesLocked}
                                        >
                                            {courses.map((course) => (
                                                <MenuItem key={course} value={course} disabled={[preference1, preference2, preference3].includes(course)}>
                                                    {course}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button variant="contained" onClick={confirmPreferences} disabled={!preference1 || !preference2 || !preference3} >
                                Confirm Preferences
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button variant="contained" onClick={handleViewSeatMatrix}>
                                View Seat Matrix
                            </Button>

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button variant="contained" onClick={handleLogout}>Logout</Button> {/* Logout button */}
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent sx={{ paddingBottom: '8px', overflowY: "auto"}}>
                                <Typography sx={{ fontSize: 20, textAlign: 'center', mb: 2 }} color="text.secondary" gutterBottom>
                                    Preferences Locked
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText primary={`1st Preference: ${preference1}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`2nd Preference: ${preference2}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`3rd Preference: ${preference3}`} />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', marginBottom: '50px'}}>
                                <Button variant="contained" onClick={handleLogout} >Logout</Button> {/* Logout button */}
                            </CardActions>
                        </Card>

                    </Box>
                )}


                <Copyright />
            </Container>
            <SeatMatrixModal open={seatMatrixOpen} onClose={handleCloseSeatMatrix} seatMatrix={seatMatrix} />
        </div>
    );
};

export default Studenthome;
