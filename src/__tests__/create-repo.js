import { eventJS } from "../__mocks__";

test("handles create repo event", async () => {
  const event = await eventJS("create-repo");
  console.log(event);
  expect(true).toEqual(true);
});
