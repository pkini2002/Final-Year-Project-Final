const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
    branch: { type: String, required: true },
    seats: { type: Number, required: true }
});

const SeatModel = mongoose.model("Seatmatrix", SeatSchema); // Corrected model name

const predefinedSeats = [
    {
        branch: "Computer Science and Engineering",
        seats: 50
    },
    {
        branch: "Information Science and Engineering",
        seats: 20
    },
    {
        branch: "Artificial Intelligence and Machine Learning",
        seats: 30
    },
    {
        branch: "Electronics and Communication Engineering",
        seats: 40
    },
    {
        branch: "Civil Engineering",
        seats: 30
    },
    {
        branch: "Computer and Communication Engineering",
        seats: 40
    },
    {
        branch: "Electrical and Electronics Engineering",
        seats: 30
    },
    {
        branch: "Mechanical Engineering",
        seats: 40
    }
];


module.exports = {
    SeatModel,
    initializeSeats: async () => {
        // Check if there are existing documents in the collection
        const existingSeats = await SeatModel.find();
        if (existingSeats.length === 0) {
            try {
                await SeatModel.insertMany(predefinedSeats);
                console.log("Predefined seats inserted successfully");
            } catch (err) {
                console.error("Error inserting predefined seats:", err);
            }
        } else {
            console.log("Seats already exist in the database.");
        }
    }
};