//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/database';
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});

//Get the default connection
var db = mongoose.connection;

module.exports = {
    mongoose
}