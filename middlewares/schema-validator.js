import Joi from "joi";

const logsSchema = Joi.object({
  level: Joi.string().required(),
  message: Joi.string().required(),
  resourceId: Joi.string().required(),
  timestamp: Joi.date().required(),
  traceId: Joi.string().required(),
  spanId: Joi.string().required(),
  commit: Joi.string().required(),
  metadata: Joi.object({
    parentResourceId: Joi.string().required(),
  }),
});

const fetchLogSchema = Joi.object({
  level: Joi.string(),
  message: Joi.string(),
  resourceId: Joi.string(),
  timestamp: Joi.date(),
  traceId: Joi.string(),
  spanId: Joi.string(),
  commit: Joi.string(),
  metadata: Joi.object({
    parentResourceId: Joi.string(),
  }),
});

const validateSchema = (obj, schema) => {
  const res = schema.validate(obj);
  if (res.error) {
    throw new Error(res.error);
  }
};

export const LogSchemaValidator = (req, res, next) => {
  try {
    const log = req.body;
    validateSchema(log, logsSchema);
    req.log = log;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Schema Error" });
  }
};

export const FetchLogValidator = (req, res, next) => {
  try {
    const filters = req.query;

    const log = Object.fromEntries(
      Object.entries(filters)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => {
          if (key == "parentResourceId") {
            return ["metadata", { parentResourceId: value }];
          }
          return [key, value];
        })
    );

    validateSchema(log, fetchLogSchema);
    req.log = log;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Schema Error" });
  }
};
