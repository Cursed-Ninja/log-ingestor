import kafka from "kafka-node";

let producer = new kafka.Producer(
  new kafka.KafkaClient({ kafkaHost: "kafka:29092" })
);

producer.on("ready", () => {
  console.log("Connected to Kafka!");
});

producer.on("error", (error) => {
  console.log("Error connecting to Kafka:", error);
});

const ProduceToKafka = (topic, message) => {
  return new Promise((resolve, reject) => {
    const payload = [
      {
        topic: topic,
        messages: message,
      },
    ];

    if (producer.ready) {
      producer.send(payload, (error, data) => {
        if (error) {
          console.error("Error in publishing message:", error);
          reject(error);
        } else {
          console.log("Message successfully published:", data);
          resolve(data);
        }
      });
    } else {
      reject(new Error("Producer is not ready"));
    }
  });
};

export default ProduceToKafka;
