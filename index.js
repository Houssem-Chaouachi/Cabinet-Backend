const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport =require('passport')
const patientApi = require('./routes/patientsApi');
const secretaireApi = require('./routes/secretairesApi');
const resetPassApi = require ('./routes/resetPassApi')
const db = require('./database/database');
const cors = require('cors');
require('./Config/passport')(passport);
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use('/secretaires', secretaireApi);
app.use('/patients', patientApi);
app.use('/email', resetPassApi)

app.listen(port,() => {
    console.log( `listen to http://localhost:${port}`);
})