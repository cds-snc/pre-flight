import { authenticate } from "./githubAuth";
import { base64decode } from "nodejs-base64";

const owner = "cds-snc";
const repo = "etait-ici";

const checkFile = async (client, file = "LICENSE") => {
  const path = file;
  const result = await client.repos.getContents({ owner, repo, path });

  console.log(base64decode(result.data.content));
};

export const checkFiles = async () => {
  const client = await authenticate();
  const path = "";
  const result = await client.repos.getContents({ owner, repo, path });
  result.data.forEach(element => {
    console.log(element.name);
  });
  console.log("==== check file ====");
  await checkFile(client);

  return "hey";
};
