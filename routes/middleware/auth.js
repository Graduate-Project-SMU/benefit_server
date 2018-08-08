const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {

    const token = req.headers['x-access-token'] || req.query.token

    if (!token) {
        return res.status(403).send({
            stat: "fail",
            msgs: "jwt needed"
        });
    }

    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded)=>{
        if(err){
            return res.status(403).send({
                stat: "fail",
                msgs: "can't auth"
            });
        }else{
            if(decoded){
                req.decoded = decoded
                next();
            }
            else{
                res.status(403).send({
                    stat: "fail",
                    msgs: "can't auth"
                });
            }
        }
    });
}

module.exports = authMiddleware;
