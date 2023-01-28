const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers/index.js");

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const { _id: owner, token } = req.user;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await Contact.findOneAndRemove({ _id: contactId, owner });
  res.status(200).json({ message: "contact deleted" });
}

module.exports = deleteContact;
