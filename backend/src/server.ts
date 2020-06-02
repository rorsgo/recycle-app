import express from "express";

const application = express();

application.get("/users", (request, response) => {
  response.json({
    "Application": "RecycleApp"
  });
});
application.listen(3333);