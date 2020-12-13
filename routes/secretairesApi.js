const express = require('express');
const router = express.Router();
const secretaire = require('../models/secretaireScheama');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('../Config/passport')(passport);
// 7el audio call bel live share
// kifeh 
//  login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email: email }
    secretaire.findOne(query).then((superUser) => {
        if (!superUser) {
            return res.json({ success: false, msg: 'Secretaire not found' });
        }
        console.log(superUser);
        bcrypt.compare(password, superUser.password, (err, isMatch) => {
            if (err) {
                return res.json({ success: false, msg: 'verify your password' });
            }
            console.log(isMatch);
            if (isMatch) {
                const token = jwt.sign(superUser.toJSON(), 'efgh', {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: token,
                    id: superUser.id

                });

            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }

        });

    });
});
//Register
router.post('/register', (req, res) => {
    let newSecretaire = new secretaire({

        email: req.body.email,
        password: req.body.password,
        patients: []
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSecretaire.password, salt, (err, hash) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register secretaire' });
            } else {
                newSecretaire.password = hash;
                newSecretaire.save();
                res.json({ success: true, msg: 'secretaire registered' });
            }
        });
    });
});
router.get('/',   (req, res) => {
    secretaire.find({}).then((listSecretaires) => {
        res.send(listSecretaires),
            console.log(listSecretaires);
    });
});
// heythi hethi fi compte secretaire tkharajli les patient eli ba3thou demande lel secretaire
// ey ou ijiblek tableau ?
// nn yji feregh el tableau ama ken na7i el passport yemshi
// ken nrodou haka yemshi
// il mouchkla fel passport
// 7ata haka chay
// 5aleha bleche
router.get('/request-from-patients', async (req, res) => {
    // async / await   (recommender)
    const sec = await secretaire.findOne({}).populate('patients');
    res.send(sec.patients);
});

router.delete('/:id',  passport.authenticate('jwt', { session: false }),async(req, res)=>{
    await secretaire.findByIdAndRemove(req.params.id, (err, resultat)=>{
        if(err) res.send(err);
      res.send(resultat);
    })
});

// get hethii eli ta7ti!
// hadhiya fe compte patien
// ah le moush hethi hh 
router.post('/affect-patients-to-secretaire/:idpatients', passport.authenticate('jwt', { session: false }), (req, res) => {
    secretaire.findOneAndUpdate({ $push: { patients: req.params.idpatients }}).then(() => {
        secretaire.findOne().then((secretaire) => {            
            res.send(secretaire);
            console.log(secretaire.patients);
        });


    });
});

router.delete('/remove-patients-from-secretaire/:idPatients',  passport.authenticate('jwt', { session: false }), (req, res) => {
    secretaire.findOneAndUpdate({ $pull: { patients: req.params.idPatients } }).then(() => {
        secretaire.findOne().then((removedPatient) => {
            res.send(removedPatient);

        });
    })
})



//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user })

});

module.exports = router

