const express = require("express");
const router = express.Router();
const {
  createContact,
  deleteContact,
  changeContact,
  getContacts,
  getContactById,
} = require("../../controllers/contact.controller");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
