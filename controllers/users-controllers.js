console.log('users-controllers');

const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

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

// http://localhost:5000/api/users/signup

// {
//   "name": "John",
//   "email": "johnleintz@gmail.com",
//   "password": "test"
// }

const signup = async (req, res, next) => {
  console.log('signup');
  console.log(req.body);

  const errors = validationResult(req);

  // console.log('value of validation: ' + errors);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data: ', 422)
    )
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
    console.log('existing user: ' + existingUser);
  } catch (err) {
    const error = new HttpError('Sign up failed, please try again later', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User already exists', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https',
    password
  });

  console.log('created user: ' + createdUser);

  try {
    console.log("user does not exist")
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Sign up failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
}


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
