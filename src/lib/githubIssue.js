import { authenticate } from "../lib/githubAuth";

export const createIssue = async (
  body,
  issue = { title: "Oh no", body: "We found an issue" }
) => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const client = await authenticate();

  const issueObj = {
    owner: repoOwner,
    repo: repoName,
    title: issue.title,
    body: issue.body
  };

  const result = await client.issues.create(issueObj);
  return result;
};
