import { authenticate } from "./githubAuth";
export const getSha = async body => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const ref = "heads/master";
  const client = await authenticate();
  const result = await client.git.getRef({
    owner: repoOwner,
    repo: repoName,
    ref
  });

  if (result && result.data && result.data.object && result.data.object.sha) {
    return result.data.object.sha;
  }

  return false;
};
