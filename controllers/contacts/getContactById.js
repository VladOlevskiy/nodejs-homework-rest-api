const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers/index.js");

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const { _id: owner, token } = req.user;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const contact = await Contact.findOne({ owner, _id: contactId });
  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

module.exports = getContactById;
