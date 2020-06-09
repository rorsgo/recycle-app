import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async listItems(request: Request, response: Response) {
    const items = await knex("items").select("*");
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.10.155/uploads/${item.image}`
      }
    });
    return response.json(serializedItems);
  }
}

export default ItemsController;