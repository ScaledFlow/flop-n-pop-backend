console.log('users-routes');

const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

const getApiTest = require('../util/stocksApi');

router.post('/signup', [
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 })
],
usersControllers.signup);

router.post('/login',  usersControllers.login);

module.exports = router;
