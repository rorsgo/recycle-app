import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {

  async listPoints(request: Request, response: Response) {
    const { state, city, items } = request.query;
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("state", String(state))
      .where("city", String(city))
      .distinct()
      .select("points.*")

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `http://10.0.2.2:3333/uploads/${point.image}` //localhost to android simulator
        }
      });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({
        message: "Point not found."
      });
    }

    const serializedPoint = {
        ...point,
        image_url: `http://10.0.2.2:3333/uploads/${point.image}` //localhost to android simulator
      };

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");


    return response.json({
      point: serializedPoint,
      items
    });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      state,
      city,
      latitude,
      longitude,
      items
    } = request.body;

    const trx = await knex.transaction();
    const point = {
      image: request.file.filename,
      name,
      email,
      state,
      city,
      latitude,
      longitude
    }

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
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