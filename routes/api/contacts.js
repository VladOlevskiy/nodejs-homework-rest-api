const express = require("express");
const router = express.Router();
// const {
//   createContact,
//   deleteContact,
//   changeContact,
//   getContacts,
//   getContactById,
//   changeStatus,
// } = require("../../controllers/contact.controller");
const { contactsControllers } = require("../../controllers");
const { tryCatchWrapper } = require("../../helpers/index");

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", tryCatchWrapper(contactsControllers.getContactById));

router.post("/", tryCatchWrapper(contactsControllers.createContact));

router.delete(
  "/:contactId",
  tryCatchWrapper(contactsControllers.deleteContact)
);

router.put("/:contactId", tryCatchWrapper(contactsControllers.changeContact));

router.patch(
  "/:contactId/favorite",
  tryCatchWrapper(contactsControllers.changeStatus)
);

module.exports = router;
