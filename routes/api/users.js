const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/User');

// Validators
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');


// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then((user) => {
        if (user) {
            const errors = {email: 'This email is already taken'};
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash user's password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });

});

// @route   POST /api/users/login
// @desc    Return JWT-token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    User.findOne({email}).then((user) => {
        if (!user) {
            errors.email = 'User with this email doesn\'t exists';
            return res.status(404).json(errors)
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                errors.password = 'Incorrect password';
                return res.status(400).json(errors);
            } else {
                const payload = {id: user.id, name: user.name};

                jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600}, (err, token) => {
                    return res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            }
        });
    });

});

module.exports = router;