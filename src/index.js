require = require("esm")(module); // eslint-disable-line no-global-assign
require("dotenv-safe").config({ allowEmptyValues: true });
const handle = require("./handler").handle;

exports.http = async (request, response) => {
  const result = await handle(request);
  response.status(200).send(`Hello World! ${result}`);
};
