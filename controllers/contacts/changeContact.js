const { Contact } = require("../../models/contacts");
const { schema } = require("../../validation/schemas.contacts");

async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const { _id: owner, token } = req.user;
  const body = req.body;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      name: body.name,
      email: body.email,
      phone: body.phone,
      favorite: body.favorite,
    }
  );
  res.status(200).json({
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  });
}

module.exports = changeContact;
