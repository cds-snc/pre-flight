import { authenticate } from "./githubAuth";

export const createPr = async (body, head) => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const title = "CDS-SNC pre-flight checks";
  const base = "master";
  const prBody =
    "Please consider merging the following files. If you would like to use our proposed CI/CD solution and a11y scanner rename the `.github/pre-flight.workflow` to `.github/main.workflow`. Also consider using the LICENSE.suggested file for your LICENSE";
  const client = await authenticate();

  await client.pulls.create({
    owner: repoOwner,
    repo: repoName,
    title,
    body: prBody,
    head,
    base
  });

  return true;
};
