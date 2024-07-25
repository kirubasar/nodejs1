require('dotenv').config();
const mongodb= process.env.URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = {
   mongodb,
   PORT,
   SECRET_KEY

};