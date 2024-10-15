import express from "express";
import petsRouter from "./routes/petsRoutes";
import sequelize from "./config/database";

const app = express();
const port = 3000;

app.use(json())
app.use(petsRouter)

sequelize
  .sync({force: true})
  .then(() => {
    console.log("Database")
    app.listen(port, () => console.log("Listening"))
  })