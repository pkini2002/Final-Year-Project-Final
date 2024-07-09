const express = require('express');
const AdminRouter = require('./routes/admin.cjs');
const UserRouter = require('./routes/user.cjs');
const preferencesRouter = require('./routes/preference.cjs');
const allocationRoutes = require('./routes/allocationRoutes.cjs');
const ResultRouter=require('./routes/result.cjs')
const seatRoutes = require('./routes/branch.cjs');
const SeatmatrixRoutes = require('./routes/seat.cjs');
const AllotRouter = require('./routes/allotedSeats.cjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initializeAdmins } = require('./models/Admin.cjs');
const { initializeSeats } = require('./models/Seatmatrix.cjs');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth',UserRouter)
app.use('/authenticate',AdminRouter)
app.use('/prefer', preferencesRouter);
app.use('/api', allocationRoutes);
app.use('/result',ResultRouter)
app.use('/seats', seatRoutes);
app.use('/matrix', SeatmatrixRoutes);
app.use('/allot', AllotRouter);
// app.use('/api',details)
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://shettyn2109:vrgkvMBWAAXvn1pi@db.1hg9gqn.mongodb.net/?retryWrites=true&w=majority&appName=db")

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    await initializeAdmins();
    await initializeSeats();
    console.log('Database initialized successfully');
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});
