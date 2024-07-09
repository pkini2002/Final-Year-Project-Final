import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AllotmentModal = ({ open, onClose, allocation }) => {
    const [filterBranch, setFilterBranch] = useState('All'); // Default to show all branches

    // Extract unique branch names from the allocation data
    //const branchNames = ['All', ...new Set(allocation.map(student => student.allocation))];

    const branchNames = ['All','Information Science and Engineering',
                            'Electronics and Communication Engineering',
                            'Mechanical Engineering',
                            'Civil Engineering',
                            'Computer and Communication Engineering',
                            'Electrical and Electronics Engineering',
                            'Computer Science and Engineering',
                            'Artificial Intelligence and Machine Learning'];
    

    const filteredAllocation = Array.isArray(allocation) ? (filterBranch === 'All' ? allocation : allocation.filter(student => student.allocation === filterBranch)) : [];

    const handleChangeFilter = (event) => {
        setFilterBranch(event.target.value);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Seat Allotment
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="filter-criteria-label">Filter By Branch</InputLabel>
                    <Select
                        labelId="filter-criteria-label"
                        id="filter-criteria"
                        value={filterBranch}
                        onChange={handleChangeFilter}
                    >
                        {branchNames.map(branch => (
                            <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Course Allotted</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAllocation.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.surname}</TableCell>
                                        <TableCell>{student.allocation}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default AllotmentModal;

