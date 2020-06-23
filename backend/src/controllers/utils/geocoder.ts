import NodeGeocoder from "node-geocoder";
import { config } from "dotenv";

config();

const options = {
  provider: process.env.PROVIDER,
  httpAdapter: process.env.HTTPADAPTER,
  apiKey: process.env.APIKEY,
  formatter: null
}

const geocoder = NodeGeocoder(options);

export default geocoder;