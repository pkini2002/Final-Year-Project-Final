const express = require('express');
const bcrypt = require('bcrypt');
const UserRouter = express.Router();
const jwt = require('jsonwebtoken');
const  UserModel = require('../models/allotmentUsers.cjs');

UserRouter.post('/StudentResultlogin', async (req, res) => {
    try {
        const { application_number, password } = req.body;
        const user = await UserModel.findOne({ application_number });

        // Check if the provided application number matches any user's application number in the database
        if (!user) {
            return res.json({ error: 'User does not exist!' });
        }

        // Compare the provided password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ error: 'Password is incorrect!' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign({ application_number: user.application_number }, process.env.KEY);

        // Authentication successful
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        return res.json({ status: true, message: 'Login Successful', application_number: user.application_number, email: user.email_id, rank: user.rank,name: user.name,surname: user.surname,marks: user.marks,gender: user.gender,allocation: user.allocation,preference1:user.preference1,preference2:user.preference2,preference3:user.preference3});

    } catch (error) {
        console.error('Error during user login:', error);
        return res.json({ error: 'Internal server error' });
    }
});

module.exports = UserRouter;