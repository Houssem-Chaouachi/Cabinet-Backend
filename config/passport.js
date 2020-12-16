const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Patients = require('../models/patientScheama');
const secretaire = require('../models/secretaireScheama')

module.exports = function(passport){
    var opts = {}
    var optsec = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = 'token';
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload._doc);
        Patients.getUserById(jwt_payload._doc._id, (err, user) =>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else {
                return done(null, false);
            }
        });
    }));
    optsec.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    optsec.secretOrKey = 'efgh';
    passport.use(new JwtStrategy(optsec, (payload,done)=> {
        console.log(payload._doc);
        secretaire.getUserById(payload._doc._id, (err, superUser)=>{
            if(err){
                return done(err,false);
            }
            if(superUser){
                return done(null, superUser);
            }else{
                return done(null, false)
            }
        } )
    }))
}
   