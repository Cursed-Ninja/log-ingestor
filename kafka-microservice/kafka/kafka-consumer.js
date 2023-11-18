import kafka from "kafka-node";
import Log from "../../backend/models/log.js";

const init = () => {
  // Configure Kafka consumer
  const consumer = new kafka.Consumer(
    new kafka.KafkaClient({ kafkaHost: "localhost:29092" }),
    [{ topic: "log" }]
  );

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

  consumer.on("error", (err) => {
    console.log("Error: ", err);
  });

  console.log("Kafka consumer running...");
};

export default init;
