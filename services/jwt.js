const jwt = require('jsonwebtoken');
//const secret = '/.#c1nt4N3gr4M3r1d4,#/';

exports.createToken = (user) =>{
    return jwt.sign({user}, /*secret*/process.env.SECRET, {expiresIn: '1hr'})
}