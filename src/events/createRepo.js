import { createBranch } from "../lib/createBranch";
import { getSha } from "../lib/getSha";
import { createFile } from "../lib/createFile";
import { createPr } from "../lib/createPr";

export const onCreateRepo = async body => {
  let result = false;
  try {
    const sha = await getSha(body);

    console.log("Creating branch ...");
    const branchName = await createBranch(body, sha);

    console.log("Adding files ...");
    result = await createFile(body, branchName);

    console.log("Creating PR ...");
    result = await createPr(body, branchName);
  } catch (e) {
    console.log(e.message);
  }

  return result;
};
