import LocalStrategy from 'passport-local';
import passport from "passport";
import { Person } from "../models/personSchema.js";

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },  async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (error) {
      return done(error);
    }
  }));

export default passport;
