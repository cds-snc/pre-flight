import { authenticate } from "./githubAuth";
export const checkFiles = async () => {
  const client = await authenticate();
  const owner = "cds-snc";
  const repo = "etait-ici";
  const path = "";
  const result = await client.repos.getContents({ owner, repo, path });
  result.data.forEach(element => {
    console.log(element.name);
  });

  return "hey";
};
