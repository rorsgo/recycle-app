import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async listItems(request: Request, response: Response) {
    const items = await knex("items").select("*");
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        // If you are using Android Studio Emulator check the valid IP adresses to localhost
        image_url: `http://127.0.0.1:3333/uploads/${item.image}` 
      }
    });
    return response.json(serializedItems);
  }
}

export default ItemsController;