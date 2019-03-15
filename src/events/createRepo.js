import { createBranch } from "../lib/createBranch";
import { getSha } from "../lib/getSha";

export const onCreateRepo = async body => {
  let result = false;
  try {
    const sha = await getSha(body);
    await createBranch(body, sha);
  } catch (e) {
    console.log(e.message);
  }

  return result;
};
