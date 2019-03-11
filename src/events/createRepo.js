import { createIssue } from "../lib/githubIssue";
export const onCreateRepo = async body => {
  let result = false;
  try {
    result = await createIssue(body);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
