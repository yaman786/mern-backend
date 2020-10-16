function verifyToken(req,res,next){
    const bearerToken = req.header('user');
    if(typeof bearerToken !== 'undefined'){
        req.token = bearerToken
        next();
    }else{
        res.sendStatus(402);
    }
}
module.exports = verifyToken