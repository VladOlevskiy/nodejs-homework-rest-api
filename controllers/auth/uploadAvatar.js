const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

async function uploadAvatar(req, res, next) {
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const image = await Jimp.read(`../nodejs-homework-rest-api/tmp/${filename}`);
  image.resize(250, 250);
  image.write(`../nodejs-homework-rest-api/tmp/${filename}`);

  const newPath = path.resolve(__dirname, "../../public/avatars", filename);
  try {
    await fs.rename(tmpPath, newPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
  const { _id: contactId } = req.user;
  const user = await User.findById(contactId);
  user.avatarURL = `http://localhost:3000/public/avatars/${filename}`;
  await user.save();
  return res.json({
    data: {
      avatarURL: user.avatarURL,
    },
  });
}

module.exports = { uploadAvatar };
