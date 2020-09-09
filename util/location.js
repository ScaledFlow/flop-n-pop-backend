const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyAbmytcr6OD8_--sDcLaUGogq59ymx0ESg';

async function getCoordsForAddress(address) {
  // return { lat: 40,
  //          lng: -73
  //         };

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address)}&key=${API_KEY}`);
      console.log("made it to axios call");
  
      const data = response.data;
      console.log(data);

      if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('could not find location for the specified address', 422);
        throw error;
      }

      const coordinates = data.results[0].geometry.location;

      return coordinates;
}

module.exports = getCoordsForAddress;