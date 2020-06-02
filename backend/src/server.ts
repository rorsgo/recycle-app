import express from "express";

const application = express();
application.use(express.json());
const users = [
  "Rodrigo",
  "Mario",
  "Jonathan"
]

application.get("/users", (request, response) => {
  const search = String(request.query.search);

  const filteredUsers = users.filter(user => user.includes(search));

  return response.json(filteredUsers);
});

application.get("/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const user = users[id];

  return response.json(user);
});

application.post("/users", (request, response) => {
  const data = request.body;

  console.log(data);
  return response.json(data);
});
application.listen(3333);