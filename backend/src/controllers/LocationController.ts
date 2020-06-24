import { Request, Response } from "express";
import geocoder from "./utils/geocoder";

class LocationController {
  async loadLocation(request: Request, response: Response) {
    const { state, city, zipCode } = request.body;

    const geoLocation = await geocoder.geocode({
      address: `${zipCode}, ${city}, ${state}`
    });

    const latitude = geoLocation[0].latitude;
    const longitude = geoLocation[0].longitude;

    return response.json({
      latitude,
      longitude
    });
  }
}

export default LocationController;