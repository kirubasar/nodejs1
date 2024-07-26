const express = require('express');
const companyRouter = express.Router();
const companyController = require('../controller/companyController')
const auth = require('../middlware/auth')

// define the route for adding a company
// protected route
companyRouter.post('/users/:userId/companies',auth.verifyToken, companyController.addCompany);

// public route
companyRouter.get('/companies', companyController.getAllCompanies);
module.exports = companyRouter;