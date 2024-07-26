const express = require('express')
const userRouter = express.Router();
const userController= require('../controller/userController')
const auth = require('../middlware/auth')

// define the route for getting all users
// public routes
userRouter.post('/', userController.register);
userRouter.post('/login', userController.login);

// protected routes
userRouter.get('/', auth.verifyToken, userController.getAllUsers);
userRouter.get('/logout',auth.verifyToken, userController.logout);
userRouter.get('/:id',auth.verifyToken, userController.getUserById);
module.exports = userRouter;