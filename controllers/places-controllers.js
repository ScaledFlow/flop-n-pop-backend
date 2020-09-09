console.log("places-controllers");
const { v4: uuidv4 } = require('uuid');
const { validationResults } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddresses = require('../util/location');


const getPlace = async (req, res, next) => {
  console.log("getPlace");
  const place = req.params.tid;
  console.log(place);
  const address = req.params.tid;

  let coordinates;
  try {
    const coordinates = getCoordsForAddresses(address);
  } catch (error) {
    return next(error);
  }
  res.json({place: coordinates});
};

exports.getPlace = getPlace;