import express from "express";
import { Logger, StackDriverNode } from "@cdssnc/logdriver";
import { handler } from "../lib/handler";

Logger.subscribe("error", StackDriverNode.log);

const router = express.Router();

router.get("/favicon.ico", (req, res) => res.status(204));

router.post("/", async (req, res) => {
  const status = await handler(req);
  res.send(status);
});

export default router;
