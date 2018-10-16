const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (request, response, next) => {
    let newUser = new User({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    User.addUser(newUser, (error, user) => {
        if (error) {
            response.json({ success: false, msg: 'Failed to register user' });
        } else {
            response.json({ success: true, msg: 'User registered' });
        }
    });
});
router.post('/authenticate', (request, response, next) => {
    const username = request.body.username;
    const password = request.body.password;

    User.getUserByUsername(username, (error, user) => {
        if (error) throw error;
        if (!user)
            return response.json({ success: false, msg: 'User not found' });

        User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {

                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800
                });

                response.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return response.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});
module.exports = router;