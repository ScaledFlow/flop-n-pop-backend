console.log('users-controllers');

const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Min',
    email: 'test@test.com',
    password: 'tester'
  }
]

const getUsers = (req,res, next) => {
  console.log("getUsers");
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  console.log("signup");
  const { name, email, password } = req.body;

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  console.log(DUMMY_USERS);

  res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  const { email, password, } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  console.log(identifiedUser)
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, invalid credentials.', 401);
  }
  
  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;