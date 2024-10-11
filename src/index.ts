import express from "express";
import petsRouter from "./routes/petsRoutes";

const app = express();
const port = 3000;

app.use(petsRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));