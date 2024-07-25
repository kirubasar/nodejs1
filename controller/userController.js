const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../utils/config')
// define the controller for the user
const userController = {
    getAllUsers: async (request, response)=>{
        try {
            const {email} = request.query;
            if(email){
                //find the user by email
                const user = await User.findOne({email})
                if(!user){
                    return response.status(404).send({message: 'user not found'})
                }
                return response.status(200).json(user)
            }
            // if no query parameters are provided, return all users
            const users = await User.find();         
            response.status(200).json(users)
        } catch (error){
            response.status(500).send({message: error.message})

        }
    },
    register: async(request, response)=>{
       try{
        //get the user inputs from the req body
        const{name, email, password}= request.body;
        // check if the user already exists in the database with same email
        const user = await User.findOne({email});
        // if the user exists, return an error response
        if(user){
            return response.status(400).send({message:'user already exist'})
        }
        // hash the password
        const hashPassword = await bcrypt.hash(password, 10)
        // create a new user
        const newUser = new User({name, email, password:hashPassword});
        // save the user
        const savedUser = await newUser.save();
        response.status(201).send({
            message: 'user created',
        user: savedUser       
    });   
    }catch(error){
       response.status(500).send({message: error.message})
    }
    },
    getUserById: async(request, response)=>{
       try{
        const userId = request.params.id;
        const user =await User.findById(userId);
        if(!user){
            return response.status(404).send({message: 'User not found'})
        }
        response.status(200).json(user)
       }catch (error){
        response.status(500).send({message: error.message})

       }
    },
    login: async(request, response)=>{
        try{
        // get the user email and password from the request body
         const {email, password}= request.body
         //check if the user exists in the database
         const user = await User.findOne({email})
         // if the user does not exist, return an error response
         if(!user){
            return response.status(404).send({message: 'User not found'}) 
         }
         // if the user exists, compare the password
         const isPasswordValid = await bcrypt.compare(password, user.password)
         // if the password is invalid, return the error message
         if (!isPasswordValid){
            return response.status(404).send({message: 'Invalid password'})
         }
         //genetate a JWT token
         const token  = jwt.sign({id: user._id}, SECRET_KEY)
         // set a cookie with token
         response.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite:'none', 
            expires: new Date(Date.now() + 24 * 3600000)// 24 hours from login
         });
         response.status(200).json({message: "login succesfuly"});
        }catch(error){
            response.status(500).send({message: error.message})
    
           }
    }
    }

module.exports = userController;