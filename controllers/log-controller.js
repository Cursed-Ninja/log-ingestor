import Log from "../models/log.js";
import ProduceToKafka from "../kafka/kafka-producer.js";

export const AddLog = async (req, res) => {
  try {
    await ProduceToKafka("log", JSON.stringify(req.log));
    res.status(200).json({ message: "Log added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const FetchLog = async (req, res) => {
  try {
    if (req.log.metadata) {
      req.log["metadata.parentResourceId"] = req.log.metadata.parentResourceId;
      delete req.log.metadata;
    }
    console.log(req.log);
    const result = await Log.find(req.log);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
