const express = require('express');
const bcrypt = require('bcrypt');
const AdminRouter = express.Router();
const jwt = require('jsonwebtoken');
// const {AdminModel} = require ('../models/Admin.cjs');

// Predefined admin credentials
const adminCredentials = {
    username: 'admin',
    // Hashed password: 'password'
    passwordHash: '$2b$10$JmvR9WC7FOGdtrc9kKE1cOKHxXNHkt9CIKgvFY2wsVgQOosyEKtz2'
};

AdminRouter.post('/Adminlogin', async (req, res) => {
    const { username, password } = req.body;
    // const token = req.cookies.token;

    // Check if the provided username matches the admin username
    if (username !== adminCredentials.username) {
        return res.json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed admin password
    const isPasswordValid = await bcrypt.compare(password, adminCredentials.passwordHash);
    if (!isPasswordValid) {
        return res.json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({username: adminCredentials.username}, process.env.KEY)
    // Authentication successful
    //res.json({ message: 'Authentication successful', user: { username: adminCredentials.username } });
    res.cookie('token', token, {httpOnly: true, maxAge: 360000})
    return res.json({status: true, message: "Login Successful"})
});

module.exports = AdminRouter;