const NodeGeocoder = require("node-geocoder");
require("dotenv").config();

const options = {
  provider: process.env.PROVIDER,
  httpAdapter: process.env.HTTPADAPTER,
  apiKey: process.env.APIKEY,
  formatter: null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;