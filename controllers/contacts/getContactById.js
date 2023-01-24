const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers/index.js");

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

module.exports = getContactById;
