import { isMaster } from "../lib/isMaster";
import { getRefId } from "../lib/getRefId";
import { onCreateRepo } from "../events/createRepo";

export const handler = async req => {
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
    console.log("no refId found");
  }

  switch (action) {
    case "created":
      await onCreateRepo(body);
      status = "on repo created";
      break;
    default:
      status = "no route found";
  }

  return status;
};
