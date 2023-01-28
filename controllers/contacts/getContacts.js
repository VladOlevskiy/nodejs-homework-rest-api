const { Contact } = require("../../models/contacts");

async function getContacts(req, res, next) {
  const { _id: owner, token } = req.user;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const contactsList = await Contact.find({ owner });
  res.json(contactsList);
}

module.exports = getContacts;
