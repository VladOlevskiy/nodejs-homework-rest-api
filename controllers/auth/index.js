const { login } = require("./login");
const { register } = require("./register");
const { current } = require("./current");
const { logout } = require("./logout");

module.exports = {
  register,
  login,
  current,
  logout,
};
