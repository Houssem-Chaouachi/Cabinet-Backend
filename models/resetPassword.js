const mongoose = require('mongoose');
const scheama = mongoose.Schema

const resettokenSchema = new scheama({

    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'patients'
    },

    resettoken: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    },
});




const resetModule = mongoose.model('passwordResetToken', resettokenSchema);
module.exports = resetModule;