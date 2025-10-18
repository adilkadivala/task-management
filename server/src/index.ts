import env from "dotenv";
env.config();

import express from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import router from "./routes";

const SERVER_PORT = process.env.server_port;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

connectDB
  .then(() => {
    console.log("database connected successfully");
    app.listen(SERVER_PORT, () => {
      console.log(`server is running at http://localhost:${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
