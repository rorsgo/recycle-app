import express from "express";
import path from "path";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.listItems);

routes.post("/points", pointsController.create);

routes.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default routes;