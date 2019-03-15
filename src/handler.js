import { getRefId } from "./lib/getRefId";
import { onCreateRepo } from "./events/createRepo";

export const handle = async req => {
  const body = req.body;
  let status;
  let action;

  if (body.action) {
    action = body.action;
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
