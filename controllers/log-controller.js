import Log from "../models/log.js";

export const AddLog = async (req, res) => {
  try {
    const result = await Log.create(req.log);
    res.status(200).json(result);
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
