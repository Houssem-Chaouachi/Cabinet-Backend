const express = require('express');
const router = express.Router();
const mail = require('nodemailer');
const Rdv = require('../models/acceptingRdvMail');
const patient = require('../models/patientScheama');
const secretaire = require('../models/secretaireScheama')
const { route } = require('./secretairesApi');


router.post('', async (req, res) => {
    Rdv.create(req.body).then((listeRdv) => {
        res.send(listeRdv)
    })
    if (!req.body.email) {
        res.status(500).json({ message: 'patient not found' })
    }
    const acceptedPatient = await req.body
    
    res.send(acceptedPatient)
    
    const user = await patient.findOne({
        email: req.body.email
    });
    
    console.log(user);
    
    var transporter = mail.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'houssemm09@gmail.com',
            pass: 'mjgpomjvykjmyahe'
        }
    });
    var mailOptions = {
        to: acceptedPatient.email,
        from: 'houssemm09@gmail.com',
        subject: 'Rendez vous Medecin',
        text: 'Bonjour Mr/Mme ' + user.nom + ', votre rendez vous est le ' + acceptedPatient.day +
        ' à l heure de ' + acceptedPatient.hour
        
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send({ message: "email error" })
            
        } else {        
            secretaire.findOneAndUpdate({ $pull: { patients: user._id} }).then(() => {
                secretaire.findOne().then((removedPatient) => {
                    res.send(removedPatient);
                    console.log('useeeeer iddd',user._id);
                });
            })
        };
    });
    
});


router.get('/listeRdv', (req, res) => {
    Rdv.find().then((listeRdv) => {
        res.send(listeRdv)
    })
});
 router.get('/listeRdv/:id', async(req, res) => {
     await Rdv.findById(req.params.id, (err, resultat) => {
         if (err) res.send(err);
         res.send(resultat)
     });
 })
router.delete('/listeRdv/:id', async(req, res) => {
    await Rdv.findByIdAndRemove(req.params.id, (err, resultat) => {
        if (err) res.send(err);
        res.send(resultat)
    });
});
router.put('/listeRdv/:id',  async (req, res)  => {
    await Rdv.findByIdAndUpdate(req.params.id, req.body);
    const userRdv = await Rdv.findById(req.params.id);
    res.send(userRdv)
});


module.exports = router