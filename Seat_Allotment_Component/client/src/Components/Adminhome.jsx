import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
import './Adminhome.css';
import { Typography, Button, Box, Container } from '@mui/material';
import AllotmentModal from './AllotmentModal';

const AdminHome = () => {
    const [allocation, setAllocation] = useState('');
    const [allocationOpen, setAllocationOpen] = useState(false);
    // const [allocationRun, setAllocationRun] = useState(false); // State to track if allocation has been run
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllotment() {
            try {
                const response = await axios.get('http://localhost:3000/allot/studentallotment');
                setAllocation(response.data);
            } catch (error) {
                console.error('Error fetching allotment', error);
            }
        }

        fetchAllotment();
    }, []);
    // }, [allocationRun]); // Fetch allotment whenever allocationRun changes

    const runAllocation = () => {
        axios.post('http://localhost:3000/api/run-allocation', {})
            .then(response => {
                console.log(response.data);
                alert('Allocation run successfully.');
                // setAllocationRun(true); // Set allocationRun to true after successful allocation
            })
            .catch(error => {
                console.error("Error:", error.response ? error.response.data : error.message);
                alert('Failed to run allocation.');
            });
    };

    const handleViewAllotmentModal = () => {
        setAllocationOpen(true);
    };

    const handleCloseAllotmentModal = () => {
        setAllocationOpen(false);
    };

    const handleLogout = () => {
        navigate('/Adminlogin');
    };

    return (
        <div className="admin-home">
            <div className="welcome-message">
                <h1>Welcome Admin!</h1>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" onClick={runAllocation}>
                            Run Allocation Algorithm
                        </Button>
                    </Box>
                
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button variant="contained" onClick={handleViewAllotmentModal}>
                                View Allotment
                            </Button>
                        </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                    <AllotmentModal open={allocationOpen} onClose={handleCloseAllotmentModal} allocation={allocation} />
                </Container>
                <Copyright />
            </div>
        </div>
    );
};

export default AdminHome;

