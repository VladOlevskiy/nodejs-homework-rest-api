const express = require("express");
const router = express.Router();
const { contactsControllers } = require("../../controllers");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/auth");

router.get("/", tryCatchWrapper(auth), contactsControllers.getContacts);

router.get(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(contactsControllers.getContactById)
);

router.post(
  "/",
  tryCatchWrapper(auth),
  tryCatchWrapper(contactsControllers.createContact)
);

router.delete(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(contactsControllers.deleteContact)
);

router.put(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(contactsControllers.changeContact)
);

router.patch(
  "/:contactId/favorite",
  tryCatchWrapper(auth),
  tryCatchWrapper(contactsControllers.changeStatus)
);

module.exports = router;
