const express = require('express');
const router = express.Router();

// Models
const User = require('../../models/User');

//Validators
const validateRegisterInput = require('../../validations/register');

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
            newUser.save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
        }
    });

});

module.exports = router;