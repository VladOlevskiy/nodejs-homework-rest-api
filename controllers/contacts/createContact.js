const { Contact } = require("../../models/contacts");
const { schema } = require("../../validation/schemas.contacts");

async function createContact(req, res, next) {
  const { name, phone, email, favorite } = req.body;

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `missing required name field ${error.message}` });
  }
  const newContact = await Contact.create({ name, phone, email, favorite });
  res.status(201).json(newContact);
}

module.exports = createContact;
