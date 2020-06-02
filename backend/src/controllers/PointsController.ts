import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {

  async listPoints(request: Request, response: Response) {
    const { country, state, city, items } = request.query;
    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));

    const points = await knex("points")
    .join("point_items", "point_id", "=", "point_items.point_id")
    .whereIn("point_items.item_id", parsedItems)
    .where("country", String(country))
    .where("state", String(state))
    .where("city", String(city))
    .distinct()
    .select("points.*")

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({
        message: "Point not found."
      });
    }

    const items = await knex("items")
      .join("point_items", "item_id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({
      point,
      items
    });
  }

  async create(request: Request, response: Response) {
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
    const point = {
      image: "image",
      name,
      email,
      country,
      city,
      state,
      latitude,
      longitude
    }

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    });

    await trx("point_items").insert(pointItems);
    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    });
  }
}

export default PointsController;