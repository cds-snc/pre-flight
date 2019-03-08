import express from "express";
import { Logger, StackDriverNode } from "@cdssnc/logdriver";
import { isMaster } from "../lib/isMaster";
import { getRefId } from "../lib/getRefId";
import { createRepo } from "../events/createRepo";

Logger.subscribe("error", StackDriverNode.log);

// Logger.debug("=> The message from the server...");

const router = express.Router();

router.get("/favicon.ico", (req, res) => res.status(204));

router.get("/", async (req, res) => {
  res.send("hello get request");
});

router.post("/", async (req, res) => {
  const body = req.body;
  let status;
  let action;

  if (body.action) {
    // create
    // close
    // reopen
    action = body.action;
  } else {
    // get action from other type of event
    if (!isMaster() && body.repository) {
      action = "updated";
    }
  }

  const refId = getRefId(body);

  if (!refId) {
    res.send("no refId found");
    return false;
  }

  switch (action) {
    case "created":
      await createRepo(req, refId);
      break;
    default:
      status = "no route found";
  }

  res.send(status);
});

export default router;
