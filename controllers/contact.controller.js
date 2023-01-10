const db = require("../models/contacts");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(9).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

async function getContacts(req, res, next) {
  const contactsList = await db.listContacts();
  res.json(contactsList);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { name, phone, email } = req.body;

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `missing required name field ${error.message}` });
  }
  const newContact = await db.addContact({ name, phone, email });
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  await db.removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
}

async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  await db.updateContact(contactId, body.name, body.email, body.phone);
  res.status(200).json({
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
}

module.exports = {
  createContact,
  deleteContact,
  getContactById,
  changeContact,
  getContacts,
};
