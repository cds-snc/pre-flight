import { eventJS } from "../__mocks__";
import { onCreateRepo } from "../events/createRepo";

const mockCreateIssue = jest.fn(() => {
  return { issue: 2 };
});

const auth = require("../lib/githubAuth");
auth.authenticate = jest
  .fn(() => "default")
  .mockImplementation(() => {
    return {
      issues: {
        create: mockCreateIssue
      }
    };
  });

test("handles create repo event", async () => {
  const event = await eventJS("create-repo");
  const result = await onCreateRepo(event);
  expect(result.issue).toEqual(2);
  expect(auth.authenticate).toHaveBeenCalledTimes(1);
  expect(mockCreateIssue).toHaveBeenCalledTimes(1);
});
