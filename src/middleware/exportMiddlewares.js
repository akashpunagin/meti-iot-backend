const authorization = require("./authorization");
const authorizeRefreshToken = require("./authorizeRefreshToken");
const validateInputs = require("./validateInputs");
const authorizeAdmin = require("./authorizeAdmin");
const authorizeAddTweetPermission = require("./authorizeAddTweetPermission");

module.exports = {
  authorization,
  authorizeRefreshToken,
  validateInputs,
  authorizeAdmin,
  authorizeAddTweetPermission,
};
