require = require("esm")(module); // eslint-disable-line no-global-assign
// require("dotenv-safe").config({ allowEmptyValues: true });
const { handler } = require("./src/lib/handler");

const handleEvent = async (request, response) => {
  await handler(request);
  response.status(200).send("Done!");
};

module.exports.handleEvent = handleEvent;
