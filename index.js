require = require("esm")(module); // eslint-disable-line no-global-assign
require("dotenv-safe").config({ allowEmptyValues: true });
const { handler } = require("./src/lib/handler");
module.exports.handleEvent = handler;
