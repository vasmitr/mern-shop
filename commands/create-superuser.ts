/* eslint-disable no-console */
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mongoose from 'mongoose';
import inquirer from 'inquirer';
import chalk from 'chalk';
import Validator from 'validator';
import bcrypt from 'bcryptjs';
import User, { UserSchema } from '../models/User';

const config = dotenv.config();
dotenvExpand(config);

const db = process.env.MONGO_URI;

const schema = [
    {
        type: 'email',
        name: 'email',
        validate: Validator.isEmail,
        message: 'Enter email',
    },
    {
        type: 'password',
        name: 'password',
        validate: (value: string): boolean => !Validator.isEmpty(value),
        message: 'Enter password',
    },
];

// eslint-disable-next-line arrow-body-style
const createUser = (email: string, password: string): Promise<UserSchema> => new Promise(((resolve, reject) => {
    return User.findOne({ email }).then((user) => {
        if (user) {
            throw new Error('This email is already taken');
        }
        const newUser = new User({
            name: 'superuser',
            admin: true,
            email,
            password,
        });

        // Hash user's password
        return bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
                newUser.password = hash;
                newUser.save()
                    .then((userRes) => resolve(userRes));
            });
        });
    }).catch((e) => reject(e));
}));

(async (): Promise<void> => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.info(chalk.blue('Mongo connected'));
    } catch (e) {
        console.error(chalk.red(e));
        process.exit(1);
    }

    const prompt = inquirer.createPromptModule();
    const { email, password } = await prompt(schema);

    try {
        await createUser(email, password);
        console.info(chalk.green(`Superuser with login ${email} successfully created`));
        process.exit(0);
    } catch (e) {
        console.error(chalk.red(e));
        process.exit(1);
    }
})();
