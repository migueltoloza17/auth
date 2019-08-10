const bcrypt = require('bcrypt');
const saltRounds = 10;
//const jwt = require('jsonwebtoken');
const  jwt  = require('../services/jwt');
const { user } = require('../models/user');

exports.login = (req, resp)=>{
    let params = req.body;
    console.log('entrando 1');
    if (params.email && params.password)   {
        console.log('entrando');
        user.findOne({email:params.email}, (err, respuesta)=>{
        if (err){
            resp.status(500).json({message: 'Ocurrio un Error'});
        }else if (respuesta == null){
            resp.status(200).json({message: `El correo ${params.email} no existe`});
        }else{
         
            console.log(respuesta.password)
            bcrypt.compare(params.password, respuesta.password, function(err, rest) {
                console.log(rest);
                if(err){
                    resp.status(500).json({message: 'Ocurrio un error', err});
                }else{
                   if(rest){                   
                    resp.status(200).json({status : 'Ok', data: user, token : jwt.createToken(user) })//{message: `El password es correcto`})
                }else{
                    resp.status(400).json({message:'El password no es correcto'});
                }
            }
            });
       
        }
    });
    }else{
        resp.status(400).json({message : 'Favor de ingresar un email y password'});
   }
}

exports.register = (req, res) =>{
    // res.send('hola mundo');
    let params = req.body;
 
    if (params.email && params.password && params.name)   {
         user.findOne({email:params.email}, (err, respuesta)=>{
             if (err){
                 res.status(500).json({message: 'Ocurrio un Error'});
             }else if (respuesta !== null){
                 res.status(200).json({message: `El correo ${params.email} ya existe`});
             }else{
                 bcrypt.genSalt(saltRounds, function(err, salt) {
                     bcrypt.hash(params.password, salt, function(err, hash) {
                         // Store hash in your password DB.
                         let newUser = user({
                             name: params.name,
                             email: params.email,
                             password: hash
                         });
                         newUser.save((err, resp) =>{
                             if(err){
                                 res.status(500).json({message: 'Ocurrio un error', err});
                             }else if(resp){
                                 newUser.password = ':(';
                                 res.status(201).json({status: 'Ok', data: resp})
                             }else{
                                 res.status(400).json({message:'No se creo el usuario'});
                             }
                         });
                     });
                 })                
             }
         })       
    }else{
         res.status(400).json({message : 'Sin datos'});
    }
 }

 /*exports.secure = ( req, res ) => {
    var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }
 
    token = token.replace('Bearer ', '')
 
    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        res.send({
          message: 'Awwwww yeah!!!!'
        })
      }
    })
 }*/