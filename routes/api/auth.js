const express = require("express");
const usersRouter = express.Router();
const { authControllers } = require("../../controllers");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/auth");

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
usersRouter.get(
  "/verify/:verificationToken",
  tryCatchWrapper(authControllers.verifyEmail)
);
usersRouter.post(
  "/verify",
  tryCatchWrapper(authControllers.repeatedVerifyEmail)
);

module.exports = { usersRouter };
