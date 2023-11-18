import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import kafkaConsumer from "../kafka/kafka-consumer.js";

dotenv.config();

const app = express();

const CONNECTION_URL = `mongodb+srv://${
  process.env.DB_USERNAME
}:${encodeURIComponent(process.env.DB_PSWD)}@${process.env.DB_CLUSTER}/${
  process.env.DB_DATABASE
}?retryWrites=true&w=majority`;
const PORT = process.env.KAFKA_PORT;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    kafkaConsumer();
  })
  .catch((err) => console.log(err.message));
