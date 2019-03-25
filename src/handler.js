import { onCreateRepo } from "./events/createRepo";

export const handle = async req => {
  const body = req.body;
  let status;
  let action;

  if (body.action) {
    action = body.action;
  }

  switch (action) {
    case "created":
      await new Promise(resolve => setTimeout(resolve, 10000));
      await onCreateRepo(body);
      status = "on repo created";
      break;
    default:
      status = "no route found";
  }

  return status;
};
