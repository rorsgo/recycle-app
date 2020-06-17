import express from "express";
import path from "path";
import multer from "multer";
import multerConfig from "./config/multer";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const uploads = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.listItems);

routes.post("/points", uploads.single("image"), pointsController.create);
routes.get("/points", pointsController.listPoints);
routes.get("/points/:id", pointsController.show);

routes.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default routes;