const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers/index.js");

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: "contact deleted" });
}

module.exports = deleteContact;
