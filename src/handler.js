import { getRefId } from "./lib/getRefId";
import { onCreateRepo } from "./events/createRepo";
import { checkFiles } from "./lib/checkFiles";

export const handle = async req => {
  const body = req.body;
  let status;
  let action;

  //status = await checkFiles();
  //return status;

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
