import kafka from "kafka-node";

const user = new kafka.KafkaClient({
  kafkaHost: "localhost:29092",
});

const producer = new kafka.Producer(user);

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

    producer.on("error", (error) => {
      console.error("Error connecting to Kafka:", error);
      reject(error);
    });
  });
};

export default ProduceToKafka;
