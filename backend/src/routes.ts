import express from "express";
import path from "path";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import LocationController from "./controllers/LocationController";

const routes = express.Router();
const uploads = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const locationController = new LocationController();

routes.post("/location", locationController.loadLocation)

routes.get("/items", itemsController.listItems);

routes.post("/points",
  uploads.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      state: Joi.string().max(2).required(),
      city: Joi.string().required(),
      items: Joi.string().required()
    }),
  },
    {
      abortEarly: false
    }),
  pointsController.create);
routes.get("/points", pointsController.listPoints);
routes.get("/points/:id", pointsController.show);

routes.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default routes;