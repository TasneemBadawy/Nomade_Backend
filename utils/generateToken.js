import jwt from 'jsonwebtoken';


// the function that generates the token

const generateToken = (email) =>{

    return jwt.sign({
        id = email
    },
    process.env.jwt,
    {expiresIn: '1d'}  
    );
};

module.exports = generateToken;