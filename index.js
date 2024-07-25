const mongoose = require('mongoose')
const app = require('./app');
const {mongodb} = require('./utils/config')
const {PORT} = require('./utils/config')
console.log('Connecting to MongoDB...');
mongoose.connect(mongodb)
.then(()=>{
  console.log('Connected to MongoDB');
  //after connecting to MongoDB, start the server
  app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});
})
.catch((error)=>{
  console.log("Error connecting to MongoDB", error);
});
