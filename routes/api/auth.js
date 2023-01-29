const express = require("express");
const usersRouter = express.Router();
const { authControllers } = require("../../controllers");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/avatar");

usersRouter.post("/register", tryCatchWrapper(authControllers.register));
usersRouter.post("/login", tryCatchWrapper(authControllers.login));
usersRouter.patch(
  "/logout",
  tryCatchWrapper(auth),
  tryCatchWrapper(authControllers.logout)
);
usersRouter.get(
  "/current",
  tryCatchWrapper(auth),
  tryCatchWrapper(authControllers.current)
);
usersRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  tryCatchWrapper(upload.single("avatar")),
  tryCatchWrapper(authControllers.uploadAvatar)
);

module.exports = { usersRouter };
