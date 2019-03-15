import { createBranch } from "../lib/createBranch";
import { getSha } from "../lib/getSha";
import { createFile } from "../lib/createFile";

export const onCreateRepo = async body => {
  let result = false;
  try {
    const sha = await getSha(body);
    await createBranch(body, sha);
    const result = await createFile(body);
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }

  return result;
};
