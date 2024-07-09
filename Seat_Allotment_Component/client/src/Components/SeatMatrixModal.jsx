// SeatMatrixModal.jsx
import React from 'react';
import { Modal, Box, Typography, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from '@mui/material';

const SeatMatrixModal = ({ open, onClose, seatMatrix }) => {
    // Split the seat matrix data into an array of lines
    // const seatMatrixLines = seatMatrix.trim().split('\n');

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Seat Matrix
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course</TableCell>
                                <TableCell>Seats Available</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {seatMatrix && seatMatrix.map((sm) => (
                                <TableRow key={sm._id}>
                                    <TableCell>{sm.branch}</TableCell>
                                    <TableCell>{sm.seats}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default SeatMatrixModal;

