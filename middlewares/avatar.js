const multer = require("multer");
const path = require("path");
const { uid } = require("uid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, uid() + "_" + file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = {
  upload,
};
