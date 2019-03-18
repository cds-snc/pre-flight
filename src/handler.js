import { onCreateRepo } from "./events/createRepo";

// const nock = require('nock');
// nock.recorder.rec();

export const handle = async req => {
  const body = req.body;
  let status;
  let action;

  // status = await checkFiles();
  // return status;

  if (body.action) {
    action = body.action;
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
