import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticate } from 'passport';
import User from '../../models/User';
import validateRegisterInput from '../../validations/register';
import validateLoginInput from '../../validations/login';

const router = Router();

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    return User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            errors.email = 'This email is already taken';
            return res.status(400).json(errors);
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        // Hash user's password
        return bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
                newUser.password = hash;
                newUser.save()
                    .then((userRes) => res.json(userRes))
                    .catch((userErr) => console.log(userErr));
            });
        });
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

    return User.findOne({ email }).then((user) => {
        if (!user) {
            errors.email = 'User with this email doesn\'t exists';
            return res.status(404).json(errors);
        }

        return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                errors.password = 'Incorrect password';
                return res.status(400).json(errors);
            }
            const payload = { id: user.id, name: user.name };

            return jwt.sign(payload,
                process.env.SECRET_KEY,
                { expiresIn: 3600 },
                (err, token) => res.json({
                    success: true,
                    token: `Bearer ${token}`,
                }));
        });
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            // @ts-ignore
            id: req.user.id,
            // @ts-ignore
            name: req.user.name,
            // @ts-ignore
            email: req.user.email,
        });
    },
);

export default router;
