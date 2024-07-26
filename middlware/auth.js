const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../utils/config')
const auth = {
  verifyToken: (request, response, next) =>{
    try {
        // get the token from the cookie
        const token = request.cookies.token

        // if the token does not exists, return an error
        if (!token){
            return response.status(200).send({message:'Access Denied'})
        }
        // verify the token
        try{
            const decodedToken = jwt.verify(token, SECRET_KEY)  
            // set the user id in the request object
            request.userId = decodedToken.id
            
            // call the next middlware
            next();
        } catch(error){
            return response.status(500).send({message: 'Invalid Token'})
        }
        
    } catch(error) {
        response.status(500).send({message: error.message})
    }
  }
}

module.exports = auth;