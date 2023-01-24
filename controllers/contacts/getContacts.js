const { Contact } = require("../../models/contacts");

async function getContacts(req, res, next) {
  const contactsList = await Contact.find({});
  res.json(contactsList);
}

module.exports = getContacts;
