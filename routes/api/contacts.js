const express = require("express");
const router = express.Router();
const {
  createContact,
  deleteContact,
  changeContact,
  getContacts,
  getContactById,
  changeStatus,
} = require("../../controllers/contact.controller");
const { tryCatchWrapper } = require("../../helpers/index");

router.get("/", getContacts);

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post("/", tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put("/:contactId", tryCatchWrapper(changeContact));

router.patch("/:contactId/favorite", tryCatchWrapper(changeStatus));

module.exports = router;
