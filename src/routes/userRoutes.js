const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/users/usersController');
const validateUserInput = require('../middleware/ValidateUserInput');

routes.get('/', usersController.getAllUsers);
routes.post('/register', validateUserInput, usersController.addUser);
routes.post('/login', usersController.loginUser);

module.exports = routes;
