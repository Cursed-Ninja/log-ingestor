import express from "express";
import {
  LogSchemaValidator,
  FetchLogValidator,
} from "../middlewares/schema-validator.js";
import { AddLog, FetchLog } from "../controllers/log-controller.js";

const router = express.Router();

router.get("/log", FetchLogValidator, FetchLog);
router.post("/log", LogSchemaValidator, AddLog);

export default router;
