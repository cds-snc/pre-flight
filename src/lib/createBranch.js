import { authenticate } from "./githubAuth";

export const createBranch = async (
  body,
  sha,
  name = `pre-flight-${Date.now()}`
) => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const ref = `refs/heads/${name}`;
  const client = await authenticate();
  await client.git.createRef({
    owner: repoOwner,
    repo: repoName,
    ref,
    sha
  });

  return name;
};
