import { authenticate } from "./githubAuth";

export const createBranch = async (body, sha, name = "pre-flight") => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const ref = `refs/heads/${name}`;
  const client = await authenticate();
  const result = await client.git.createRef({
    owner: repoOwner,
    repo: repoName,
    ref,
    sha
  });

  return result;
};
