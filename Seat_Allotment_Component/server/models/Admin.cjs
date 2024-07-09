const bcrypt = require('bcrypt');
const mongoose = require("mongoose")

// Admin Schema
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const AdminModel = mongoose.model("Admin", AdminSchema);

const predefinedAdmins = [
    {
        username: "admin",
        email: "admin@example.com",
        password: "password"
    }
];

// Hash passwords for admin users
bcrypt.hash(predefinedAdmins[0].password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        predefinedAdmins[0].password = hashedPassword;

        // Insert predefined admin into the database
        AdminModel.insertMany(predefinedAdmins)
            .then(() => {
                console.log("Predefined admins inserted successfully");
            })
            .catch(err => {
                console.error("Error inserting predefined admins:", err);
            });
    }
});

module.exports = {
    AdminModel,
    initializeAdmins: async () => {
        // Check if there are existing admin documents in the collection
        const existingAdmins = await AdminModel.find();
        if (existingAdmins.length === 0) {
            // Hash passwords for admin users
            const hashedPasswords = await Promise.all(predefinedAdmins.map(async (admin) => {
                try {
                    const hashedPassword = await bcrypt.hash(admin.password, 10);
                    return { ...admin, password: hashedPassword };
                } catch (err) {
                    console.error(`Error hashing password for ${admin.username}:`, err);
                    return null;
                }
            }));

            // Insert predefined admins into the database
            const validAdmins = hashedPasswords.filter(admin => admin !== null);
            if (validAdmins.length > 0) {
                try {
                    await AdminModel.insertMany(validAdmins);
                    console.log("Predefined admins inserted successfully");
                } catch (err) {
                    console.error("Error inserting predefined admins:", err);
                }
            }
        } else {
            console.log("Admins already exist in the database.");
        }
    }
};