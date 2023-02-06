const { User } = require("../../models/user");
const { schema } = require("../../validation/schema.users");
const { HttpError } = require("../../helpers/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  const { email, password } = req.body;
  const { error } = schema.validate(req.body);
  const storedUser = await User.findOne({ email });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!storedUser) {
    throw new HttpError(401, "Email or password is wrong");
  }
  if (!storedUser.verify) {
    throw new HttpError(
      401,
      "Email is not verified, please check your email box."
    );
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET);

  await User.findByIdAndUpdate(storedUser._id, { token: token });

  res.json({
    token,
  });
}
module.exports = { login };
