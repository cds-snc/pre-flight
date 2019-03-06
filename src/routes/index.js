import express from "express";
import { Logger, StackDriverNode } from "@cdssnc/logdriver";

Logger.subscribe("error", StackDriverNode.log);

// Logger.debug("=> The message from the server...");

const router = express.Router();

router.get("/favicon.ico", (req, res) => res.status(204));

router.get("/", async (req, res) => {
  res.send("hello");
});

export default router;
