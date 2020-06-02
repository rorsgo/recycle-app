import express from "express";
import path from "path";

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({});
});

routes.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default routes;