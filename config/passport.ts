import { Strategy, ExtractJwt } from 'passport-jwt';
import * as mongoose from 'mongoose';

const User = mongoose.model('users');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

export default (passport) => {
    passport.use(
        new Strategy(opts, (jwtPayload, done) => {
            User.findById(jwtPayload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        }),
    );
};
