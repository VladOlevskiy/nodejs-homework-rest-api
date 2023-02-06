const { User } = require("../../models/user");
const { HttpError, sendMail } = require("../../helpers/index.js");
const { schema } = require("../../validation/schema.users");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  const { error } = schema.validate(req.body);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const verificationToken = nanoid();

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      verificationToken,
      verify: false,
    });

    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
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
