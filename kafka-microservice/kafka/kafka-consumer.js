import kafka from "kafka-node";
import Log from "../models/log.js";

const init = () => {
  // Configure Kafka consumer
  let consumer = new kafka.Consumer(
    new kafka.KafkaClient({ kafkaHost: "kafka:29092" }),
    [{ topic: "log" }]
  );

  consumer.on("ready", () => {
    console.log("Connected to Kafka!");
  });

  consumer.on("error", (error) => {
    console.log("Error connecting to Kafka:", error);
  });

  // Consume messages from Kafka broker
  consumer.on("message", async (message) => {
    // Display the message
    try {
      const log = JSON.parse(message.value);
      await Log.create(log);
      console.log("Message received: ", log);
    } catch (err) {
      console.log(err);
    }
  });

  console.log("Kafka consumer running...");
};

export default init;
