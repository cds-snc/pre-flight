import { authenticate } from "./githubAuth";
import { base64encode } from "nodejs-base64";
import { listFilesSync } from "list-files-in-dir";
import { getFile } from "./getFile";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const createFile = async (body, branch) => {
  const repoOwner = body.repository.owner.login;
  const repoName = body.repository.name;
  const client = await authenticate();

  const files = listFilesSync("./pre-flight-files");

  await asyncForEach(files, async file => {
    const path = file.split("pre-flight-files/")[1];
    const message = `Added ${path}`;

    console.log("Adding ", path);

    const data = await getFile(file);
    const content = base64encode(data.toString());

    const details = {
      owner: repoOwner,
      repo: repoName,
      path,
      message,
      content,
      branch
    };

    await client.repos.createFile(details);
  });

  return true;
};
