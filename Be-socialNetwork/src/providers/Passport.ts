import { Application } from "express";
import passport from "passport";
import session from "express-session";
import GoogleAuth20 from "passport-google-oauth20";
import Locals from "./Local";
import User from "../models/User.model";
import { UserTypeAuth } from "../interfaces/Models/IUser";
const GoogleStrategy = GoogleAuth20.Strategy;
class PassPort {
  public init(_express: Application): Application {
    console.log("connect PassPort success !");
    //thiet lap phien
    _express = _express.use(passport.initialize());
    _express = _express.use(passport.session());

    //nguoi dung dang nhap
    passport.serializeUser((user: any, done) => {
      done(null, user);
    });

    //return info Users successfully
    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });

    //thiet lap thuoc tinh dang nhap
    passport.use(
      new GoogleStrategy(
        {
          clientID: Locals.config().clientId,
          clientSecret: Locals.config().clietSecret,
          callbackURL: Locals.config().callbackUrl,
        },
        async (accessToken, refreshToken, profile: any, done) => {
          console.log(profile);
          //check người dùng tồn tại hay chưa
          const checkUser = await User.findOne({
            user_email: profile.emails[0].value,
            user_auth_type: UserTypeAuth.google,
          });
          if (!checkUser) {
            const newUser = await User.create({
              user_email: profile.emails[0].value,
              user_name: profile.displayName,
              user_auth_type: UserTypeAuth.google,
              user_avatar: profile.photos[0].value,
            });
            return done(null, newUser);
          }
          return done(null, checkUser);
        }
      )
    );
    return _express;
  }
}
export default new PassPort;
