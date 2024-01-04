import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Sequelize } from "sequelize";
import AdminGoogle from "../models/adminGoogleModel.js";

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    AdminGoogle.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
}
