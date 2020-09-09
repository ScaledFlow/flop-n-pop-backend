console.log("places-routes");
const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

// http://localhost:5000/api/places/1299 mississippi st. new brighton mn 55112

router.get('/:tid', placesControllers.getPlace);

module.exports = router;