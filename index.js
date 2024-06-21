
//1.import express module
const express = require('express')
const mongoose = require('mongoose')

//2.create express App
const app = express();
//5. add middleware
app.use(express.json());
//4.create a route
/*app.get('/posts', (request, response)=>{
    response.json(posts);
})
app.post('/posts', (request, response)=>{
    posts.push({
        ...request.body,
        id: posts.length+1
    })
    response.json({
        ...request.body,
        id: posts.length
    }
);
})
app.put('/posts/:id', (request, response)=>{
    const id = request.params.id;
    let updatedPost= request.body;
    const toUpdatePost=posts.find(post=>post.id==id)
    updatedPost ={
        ...toUpdatePost,
        ...updatedPost
    }
    posts = posts.map(post => post.id == id ? updatedPost : post);
    response.json(updatedPost)
})
app.delete('/posts/:id', (request,response)=>{
  const postToDelete = posts.find(post => post.id == request.params.id)
  if (!postToDelete) {
    response.send({
        message: 'Post not found'
    })
}
  posts=posts.filter(post=> post.id !=request.params.id)
  response.json({
    message: 'post deleted successfully'
  })
})*/
console.log('Connecting to MongoDB...')
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
})
