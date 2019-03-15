import { authenticate } from "../lib/githubAuth";
import { base64encode } from "nodejs-base64";

export const createFile = async body => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const client = await authenticate();
  const path = "pre-flight/the-file";
  const message = "nice this works";
  const content = base64encode("hey there");
  const branch = "test";
  const details = {
    owner: repoOwner,
    repo: repoName,
    path,
    message,
    content,
    branch
  };

  await client.repos.createFile(details);
};
