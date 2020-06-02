import express from "express";
import cors from "cors";
import routes from "./routes";

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);
application.listen(3333);