const moment = require("moment");

function isValidTimestamp(_timestamp) {
  const isValid = moment(_timestamp, "YYYY-MM-DD", true).isValid();
  return isValid;
}

module.exports = { isValidTimestamp };
