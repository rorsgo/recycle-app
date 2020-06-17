import express from "express";
import cors from "cors";
import routes from "./routes";
import { errors } from "celebrate";

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);
application.use(errors());
application.listen(3333);