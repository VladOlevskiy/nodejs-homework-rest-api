const { login } = require("./login");
const { register } = require("./register");
const { current } = require("./current");
const { logout } = require("./logout");
const { uploadAvatar } = require("./uploadAvatar");

module.exports = {
  register,
  login,
  current,
  logout,
  uploadAvatar,
};
