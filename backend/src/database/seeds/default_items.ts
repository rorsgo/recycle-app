import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    {title: "Lamps", image: "lamps.svg"},
    {title: "Batteries", image: "batteries.svg"},
    {title: "Paper", image: "paper.svg"},
    {title: "Eletronics", image: "eletronics.svg"},
    {title: "Organic Waste", image: "organic.svg"},
    {title: "Kitchen Oil", image: "oil.svg"}
  ]);
}