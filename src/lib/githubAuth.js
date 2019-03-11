import path from "path";
import { getFile } from "./getFile";

const App = require("@octokit/app");
const Octokit = require("@octokit/rest");

const GITHUB_PEM = process.env.PEM;
const ISSUER_ID = process.env.ISSUER_ID;
const INSTALL_ID = process.env.INSTALL_ID;

const getKey = async () => {
  const file = path.resolve(__dirname, `../../${GITHUB_PEM}`);
  const result = await getFile(file);
  return result;
};

export const authenticate = async (installationId = INSTALL_ID) => {
  const app = new App({
    id: ISSUER_ID,
    privateKey: await getKey()
  });

  const installationAccessToken = await app.getInstallationAccessToken({
    installationId
  });

  const octokit = new Octokit({
    auth: `token ${installationAccessToken}`,
    previews: ["ant-man-preview", "flash-preview"]
  });

  return octokit;
};
