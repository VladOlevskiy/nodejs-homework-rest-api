const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index.js");
const { schema } = require("../../validation/schema.users");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  const { error } = schema.validate(req.body);
  const urlAvatar = gravatar.url(email, {
    s: "200",
    d: "monsterid",
  });
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL: urlAvatar,
    });

    return res.status(201).json({
      data: {
        user: {
          email,
          subscription: savedUser.subscription,
        },
      },
    });
  } catch (err) {
    if (err.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "Email in use");
    }
    throw err;
  }
}

module.exports = { register };
