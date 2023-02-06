const { HttpError, sendMail } = require("../../helpers/index.js");
const { User } = require("../../models/user.js");
const {
  schemaVerifyEmail,
} = require("../../validation/schema.users.verifyEmail");

async function repeatedVerifyEmail(req, res, next) {
  const { email } = req.body;
  const { error } = schemaVerifyEmail.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!email) {
    throw HttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  try {
    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
    });

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    throw HttpError(400, error.message);
  }
}

module.exports = { repeatedVerifyEmail };
