import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "../routes/route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors({ origin: "*" }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello to Dyte API");
});

const CONNECTION_URL = `mongodb+srv://${
  process.env.DB_USERNAME
}:${encodeURIComponent(
  process.env.DB_PSWD
)}@cluster.lczmihh.mongodb.net/dyte?retryWrites=true&w=majority`;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err.message));

const connection = mongoose.connection;
export default connection;
