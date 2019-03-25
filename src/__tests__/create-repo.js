import { eventJS } from "../__mocks__";
import { onCreateRepo } from "../events/createRepo";

const numFiles = 5;

const mockGetRef = jest.fn(() => {
  return {
    data: {
      ref: "refs/heads/master",
      object: {
        sha: "9dee4f6a5eab2319866179ed3533edf35f1ed77a"
      }
    }
  };
});

const mockCreateRef = jest.fn(() => {
  return true;
});

const mockCreateFile = jest.fn(() => {
  return true;
});

const mockCreatePull = jest.fn(() => {
  return true;
});

const auth = require("../lib/githubAuth");
auth.authenticate = jest
  .fn(() => "default")
  .mockImplementation(() => {
    return {
      git: {
        getRef: mockGetRef,
        createRef: mockCreateRef
      },
      repos: {
        createFile: mockCreateFile
      },
      pulls: { create: mockCreatePull }
    };
  });

test("handles create repo event", async () => {
  const event = await eventJS("create-repo");
  const result = await onCreateRepo(event);
  expect(auth.authenticate).toHaveBeenCalledTimes(4);
  expect(mockGetRef).toHaveBeenCalledTimes(1);
  expect(mockCreateRef).toHaveBeenCalledTimes(1);
  expect(mockCreatePull).toHaveBeenCalledTimes(1);
  // note this count will change based on the # files in the .github dir
  expect(mockCreateFile).toHaveBeenCalledTimes(numFiles);
  expect(result).toEqual(true);
});
