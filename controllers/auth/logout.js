const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index.js");

async function logout(req, res, next) {
  const { _id: owner } = req.user;
  const user = await User.findById(owner);
  if (!user) {
    return next(HttpError(401, "Not authorized"));
  }
  await User.findOneAndUpdate(owner, {
    token: null,
  });
  res.status(204).json({
    message: "No Content",
  });
}
module.exports = { logout };
