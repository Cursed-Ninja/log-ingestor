import Log from "../models/log.js";
// import ProduceToKafka from "../kafka/kafka-producer.js";

export const AddLog = async (req, res) => {
  try {
    // await ProduceToKafka("log", JSON.stringify(req.log));
    res.status(200).json({ message: "Log added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const FetchLog = async (req, res) => {
  try {
    const query = req.log;

    if (query.metadata) {
      query["metadata.parentResourceId"] = query.metadata.parentResourceId;
      delete query.metadata;
    }

    if (query.message) {
      query.message = { $regex: query.message };
    }

    const result = await Log.find(query);
    const logs = result.map((log) => {
      return {
        _id: log._id,
        level: log.level,
        message: log.message,
        resourceId: log.resourceId,
        timestamp: log.timestamp,
        traceId: log.traceId,
        spanId: log.spanId,
        commit: log.commit,
        parentResourceId: log.metadata.parentResourceId,
      };
    });
    res.status(200).json({logs});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
