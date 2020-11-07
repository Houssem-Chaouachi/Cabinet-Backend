const mongoose = require('mongoose');
const Scheama = mongoose.Schema;

const patientScheama = new Scheama ({
    nom: {
        type: String,
        required: [true,'nom is requiered']
    },
    prenom: {
        type: String,
        required:[true, 'prenom is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    adresse: {
        type: String,
        required:[true, 'Adresse is required']
    },
    CNSS: {
        type: Number,
        required:[false,]
    },
    tel: {
        type: Number,
        required: [true, 'phone number is required']
    },
    dateDeNaissance: {
        type:String,
        required:[false]
    },
    sexe: {
        type:String,
        required:[true, 'Male or Female ?']
    },
    password: {
        type: String,
        required: [ true, 'password is required']
    },
    confirmPassword: {
        type: String,
        required: [ true, 'confirm your password']
    },
    

});

const patientModel = mongoose.model('patients',patientScheama)

module.exports = patientModel