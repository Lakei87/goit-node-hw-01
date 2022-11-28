const fs = require("fs/promises"); 
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve('./db/contacts.json');
 
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        return error;
    }
};

async function getContactById(id) {
    try {
        const contactId = String(id)
        const contacts = await listContacts();
        const result = contacts.find(item => item.id === contactId);

        return result || null;
    } catch (error) {
        return error;
    }
};

async function removeContact(id) {
    try {
        const contactId = String(id);
        const contacts = await listContacts();
        const index = contacts.findIndex(item => item.id === contactId);

        if (index === -1) {
            return null;
        };

        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return result;
    } catch (error) {
        return error;
    }
};

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};