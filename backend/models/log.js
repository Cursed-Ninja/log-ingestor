import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
  parentResourceId: {
    type: String,
    required: true,
  },
});

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  traceId: {
    type: String,
    required: true,
  },
  spanId: {
    type: String,
    required: true,
  },
  commit: {
    type: String,
    required: true,
  },
  metadata: {
    type: metadataSchema,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);
export default Log;
