import "dotenv/config";
import express, { json } from "express";
import "express-async-errors";
import { petsRouter } from "./routes/petsRoutes";
import sequelize from "./config/database";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
const port = 3000;

app.use(json());
app.use(petsRouter);
app.use(errorHandler)

sequelize.sync({ force: true }).then(() => {
  console.log("Database is synced");
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});