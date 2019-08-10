
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const verify = require('./middlewares/verifyToken');
/*const bcrypt = require('bcrypt');
const saltRounds = 10;*/
const app = express();
const PORT = process.env.PORT || 3000;
//const mongoUrl = 'mongodb+srv://devfmicho:Ant0l0g14n0m4s33@devfmongo-qxuf1.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(/*mongoUrl*/process.env.mongourl, {useNewUrlParser: true}, (err)=>{
    if(!err){
        console.log('MONGODB conectado correctamente');
    }
});
//mongodb+srv://devfmicho:<password>@devfmongo-qxuf1.gcp.mongodb.net/test?retryWrites=true&w=majority
//
const { user } = require('./models/user');
const { login, register,  secure} = require('./controllers/auth');


//const { register } = require('./controllers/auth');

//otra forma de declarar al objeto user
//const  user  = require('./models/user').user;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

//app.get('/new/user', (req, res) =>{
app.post('/new/user', verify.verifyTkn, register)

app.post('/login', login)

//app.get('/secure', secure)

app.listen(PORT, ()=> {
   console.log(`INICIANDO SERVER DE DEVF ${PORT}`)
});

