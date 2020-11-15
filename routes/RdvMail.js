const express = require('express');
const router = express.Router();
const mail = require('nodemailer');
const Rdv = require('../models/acceptingRdvMail');
const patient = require('../models/patientScheama')

router.post('', async (req,res)=>{
  if(!req.body.email){
      res.status(500).json({message:'patient not found'})
  }
    const acceptedPatient = await req.body

       res.send(acceptedPatient)
       console.log(acceptedPatient); 

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
            text: 'Bonjour ' + user.nom + ', votre rendez vous est le '+ acceptedPatient.day + ' à l heure de ' + acceptedPatient.hour
               
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.send({ message: "email error" })

            } else {
                res.send({ message: "email send succesfully" })

            };
        });
    });

module.exports = router