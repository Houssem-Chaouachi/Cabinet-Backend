const mongoose = require('mongoose');
const scheama = mongoose.Schema;
const acceptingRdv = new scheama ({
   
    email:{
        type:String,
        required:true,
    },
    day: {
        type: String,
        required:true
    },
    hour: {
        type: String,
        required: true
    }

})
 
const accepteRdvModule = mongoose.model('rdvEmail', acceptingRdv);
module.exports = accepteRdvModule;
