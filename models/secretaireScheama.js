const mongoose = require('mongoose');
const scheama = mongoose.Schema;

const secretaireScheama = new scheama ({
   email:{
       type: String,
       required:[true, 'email ???']
   },
   password:
   { type:String,
    required:[true, 'password']
   },
   patients:[{type: scheama.Types.ObjectId, ref: 'patients'}],
});

const secretaireModule = mongoose.model('secretaires', secretaireScheama)
module.exports = secretaireModule