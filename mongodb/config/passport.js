const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Applicant = mongoose.model("Applicant");
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Applicant.findById(jwt_payload.id)
        .then(applicant => {
          if (applicant) {
            return done(null, applicant);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};