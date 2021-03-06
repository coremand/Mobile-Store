const Jwt = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    return Jwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    }).unless({
        path: [{url: /\/photos\/uploads(.*)/ , methods: ["GET", "OPTIONS"]},
               {url: /\/api\/v1\/products(.*)/ , methods: ["GET", "OPTIONS"]},
               {url: /\/api\/v1\/categories(.*)/ , methods: ["GET", "OPTIONS"]} ,
            "/api/v1/users/login",
            "/api/v1/users/register"
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        done(null, true)
    }else{
        done();
    }
}

module.exports = authJwt;