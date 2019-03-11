import { eventJS } from "../__mocks__";
import { onCreateRepo } from "../events/createRepo";

// authenticate
// client.issues.create(issueObj);

test("handles create repo event", async () => {
  const event = await eventJS("create-repo");
  console.log(event);
  await onCreateRepo(event);
  // expect(true).toEqual(true);
});
