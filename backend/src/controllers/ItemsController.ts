import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async listItems(request: Request, response: Response) {
    const items = await knex("items").select("*");
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://10.0.2.2:3333/uploads/${item.image}` //localhost to android simulator
      }
    });
    return response.json(serializedItems);
  }
}

export default ItemsController;