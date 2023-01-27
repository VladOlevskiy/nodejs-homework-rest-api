const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers/index.js");
const { schemaForChangeStatus } = require("../../validation/schemas.contacts");

const updateStatusContact = async (contactId, body, owner) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      favorite: body.favorite,
    }
  );
};

async function changeStatus(req, res, next) {
  const { contactId } = req.params;
  const { _id: owner, token } = req.user;
  const body = req.body;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { error } = schemaForChangeStatus.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const contact = await Contact.findOne({ owner, _id: contactId });

  if (!contact) {
    return next(HttpError(404, "Contact Not found "));
  }
  await updateStatusContact(contactId, body, owner);
  res.status(200).json({
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  });
}

module.exports = changeStatus;
