const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
// const { nanoid } = require("nanoid");
// const { constants } = require("buffer");
const dbPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const dbRaw = await fs.readFile(dbPath);
  const dbContacts = JSON.parse(dbRaw);
  return dbContacts;
}

async function writeDbContacts(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

const listContacts = async () => {
  const contactsDb = await readContacts();
  console.log(contactsDb);
  return contactsDb;
};

const getContactById = async (contactId) => {
  const contactsDb = await readContacts();
  const contactById = contactsDb.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contactsDb = await readContacts();
  const updateDb = contactsDb.filter((contact) => contact.id !== contactId);
  await writeDbContacts(updateDb);
};

const addContact = async ({ name, email, phone }) => {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contactsDb = await readContacts();
  contactsDb.push(newContact);
  await writeDbContacts(contactsDb);
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contactsDb = await readContacts();
  contactsDb.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  await writeDbContacts(contactsDb);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
