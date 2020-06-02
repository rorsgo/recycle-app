import express from "express";
import routes from "./routes";

const application = express();

application.use(express.json());
application.use(routes);
application.listen(3333);