const { login } = require("./login");
const { register } = require("./register");
const { current } = require("./current");
const { logout } = require("./logout");
const { verifyEmail } = require("./verifyEmail");
const { repeatedVerifyEmail } = require("./repeatedVerifyEmail");

module.exports = {
  register,
  login,
  current,
  logout,
  verifyEmail,
  repeatedVerifyEmail,
};
