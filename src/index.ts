require("dotenv").config();
import Config from "config";
import express, { Application } from "express";
import router from "./routes";

const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/grocery", router);

try {
  app.listen(Config.get("port"), () => {
    console.log(`Server running on http://localhost:${Config.get("port")}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
