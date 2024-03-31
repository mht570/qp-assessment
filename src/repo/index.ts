import config from "config";
import { Dialect, Sequelize } from "sequelize";
import Grocery from "./grocery.repo";
import { initModel } from "../models/groceryArticle";

const dbName = config.get("db.name") as string;
const dbUser = config.get("db.user") as string;
const dbHost = config.get("db.host") as string;
const dbDriver = config.get("db.driver") as Dialect;
const dbPassword = config.get("db.password") as string;

const database = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: 3306,
  pool: {
    max: 100,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

database
  .authenticate()
  .then((p) => {
    console.info("database has been successfully connected");
  })
  .catch((error) => {
    console.log("error in db", error);
  });

initModel(database);

export const GroceryRepo = new Grocery(database);
