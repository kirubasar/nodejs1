const mongoose = require('mongoose')
const app = require('./app');

console.log('Connecting to MongoDB...');
mongoose.connect(`mongodb+srv://srikiruba999:kiruba143@cluster0.lk7blbu.mongodb.net/`)
.then(()=>{
  console.log('Connected to MongoDB');
  //after connecting to MongoDB, start the server
  app.listen(3002, ()=>{
    console.log(`server is running on http://localhost:3002`)
});
})
.catch((error)=>{
  console.log("Error connecting to MongoDB", error);
});
