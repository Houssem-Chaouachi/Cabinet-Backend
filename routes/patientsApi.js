const express = require('express');
const router = express.Router();
const Patient = require('../models/patientScheama');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../Config/passport')(passport);

router.get('/',  (req, res) => {
    Patient.find({}).then((listPatient) => {
        res.send(listPatient);
    }
    );
});

router.get('/:id', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const patient = await Patient.findById(req.params.id)
    res.send(patient);
} )

router.post('/', (req, res) => {
    // les promisse (then)  (recommender)
    Patient.create(req.body).then((createdUser) => {
        res.send(createdUser);
    });
});
//  login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email: email }
    Patient.findOne(query).then((user) => {
        if (!user) {
            return res.json({ success: false, msg: 'Patient not found' });
        }
        console.log(user);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.json({ success: false, msg: 'verify your password' });
            }
            console.log(isMatch);
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), 'abcd', {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: token,
                    id: user.id

                });

            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }

        });

    });
});
//Register
router.post('/register', (req, res) => {
    let newPatient = new Patient({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        adresse: req.body.adresse,
        CNSS: req.body.CNSS,
        tel: req.body.tel,
        dateDeNaissance: req.body.dateDeNaissance,
        sexe: req.body.sexe,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        patients: []
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPatient.password, salt, (err, hash) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register patient' });
            } else {
                newPatient.password = hash;
                newPatient.save();
                res.json({ success: true, msg: 'Patient registered' });
            }
        });
    });
});

//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user })

});

// reset Password

module.exports = router;