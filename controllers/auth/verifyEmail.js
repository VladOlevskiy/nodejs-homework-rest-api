const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index.js");

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({
    message: "Verification successful",
  });
}

module.exports = { verifyEmail };
