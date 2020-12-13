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
        // allllllllllo
// jarrabtou haka melowel w tastitou bel postman mshé yekhi khalitou hh
// trah jareb
// ok
// ch9atlek
// chayy mahous 9a3ed yekheth fel token fel localstorage
// w ki n7el compte secretaire mayjiwej el liste mta3 les patients , tatla3li  inathorazed
// behi jareb bel postman ki ta3mel login b secretair itala3lek token ou nn
// jareb
// behi
// chay 7ata haka chay
// mafhemthach