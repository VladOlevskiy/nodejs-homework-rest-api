const Joi = require("joi");
const { Contact } = require("../models/contacts");
const { HttpError } = require("../helpers/index.js");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(9).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaPatch = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, {
    favorite: body.favorite,
  });
};

async function getContacts(req, res, next) {
  const contactsList = await Contact.find({});
  res.json(contactsList);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

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

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);
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

  await Contact.findByIdAndUpdate(contactId, {
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
  res.status(200).json({
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
}

async function changeStatus(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { error } = schemaPatch.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "Contact Not found "));
  }
  updateStatusContact(contactId, body);
  res.status(200).json({
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  });
}

module.exports = {
  createContact,
  deleteContact,
  getContactById,
  changeContact,
  getContacts,
  changeStatus,
};
