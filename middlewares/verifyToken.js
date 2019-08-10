const jwt = require('jsonwebtoken');
const secret = '/.#c1nt4N3gr4M3r1d4,#/';

exports.verifyTkn = (req, res,  next) =>{
    let token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.SECRET/*secret*/, (error, decode) => {
            if(error){
                res.status(500).json({ message : 'Ocurrio un error'});
            }else{
                console.log('Decoded ==>>', decode);
                next();
            }
        })
    }else{
        res.status(403).json({message: 'Sin Token'});
    }
}