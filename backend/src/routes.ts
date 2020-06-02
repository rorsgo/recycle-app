import express from "express";
import path from "path";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/items", async (request, response) => {
  const items = await knex("items").select("*");
  const serializedItems = items.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image_url}`
    }
  });
  return response.json(serializedItems);
});

routes.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default routes;