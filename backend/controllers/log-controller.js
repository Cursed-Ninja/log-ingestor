import Log from "../models/log.js";
import conn from "../scripts/index.js";
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
  const session = await conn.startSession();
  try {
    const query = req.log;

    if (query.metadata) {
      query["metadata.parentResourceId"] = query.metadata.parentResourceId;
      delete query.metadata;
    }

    if (query.message) {
      query.message = { $regex: query.message };
    }

    if (query.startTimestamp && query.endTimestamp) {
      query.timestamp = {
        $gte: query.startTimestamp,
        $lte: query.endTimestamp,
      };
    }

    delete query.startTimestamp;
    delete query.endTimestamp;

    session.startTransaction();

    const logs = await Log.find(query, {
      _id: 1,
      level: 1,
      message: 1,
      timestamp: 1,
      resourceId: 1,
      traceId: 1,
      spanId: 1,
      commit: 1,
      parentResourceId: "$metadata.parentResourceId",
    })
      .sort({ _id: 1 })
      .skip(req.query.page * 1)
      .limit(25);

    const count = await Log.find(query, {}).count();

    await session.commitTransaction();

    const result = {
      logs,
      count,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    res.status(500).json({ message: "Something went wrong" });
  }

  session.endSession();
};
