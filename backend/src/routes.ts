import express from "express";
import path from "path";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/items", async (request, response) => {
  const items = await knex("items").select("*");
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image_url}`
    }
  });
  return response.json(serializedItems);
});

routes.post("/points", async (request, response) => {
  const {
    // image,
    name,
    email,
    country,
    city,
    state,
    latitude,
    longitude,
    items
  } = request.body;

  const trx = await knex.transaction();

  const insertedIds = await trx("points").insert({
    image: "image",
    name,
    email,
    country,
    city,
    state,
    latitude,
    longitude
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id
    }
  });

  await trx("point_items").insert(pointItems);
  await trx.commit();

  return response.json(pointItems);
});

routes.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default routes;