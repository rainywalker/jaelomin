const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const generateToken = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            jwtSecret,
            {
                expireIn : '7d'
            }, (error, token) => {
                if (error) reject(error);
                resolve(token)
            }
        )
    })
};

exports.generateToken = generateToken;


