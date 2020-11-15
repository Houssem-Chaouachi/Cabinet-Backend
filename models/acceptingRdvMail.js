const mongoose = require('mongoose');
const scheama = mongoose.Schema;
const acceptingRdv = new scheama ({
   
    emailPatient:{
        type:String,
        required:true,
    },
    day: {
        type: Date,
        required:true
    },
    hour: {
        type: Date,
        required: true
    }

})
 
const accepteRdvModule = mongoose.model('rdvEmail', acceptingRdv);
module.exports = accepteRdvModule;
