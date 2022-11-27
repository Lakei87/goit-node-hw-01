const fs = require("fs/promises"); 
const path = require("path");
const contactsPath = path.resolve('./db/contacts copy.json');
 
async function listContacts() {
    try {
        const contactList = await fs.readFile(contactsPath, 'utf8');
        return contactList;
    } catch (error) {
        return error;
    }
};

async function getContactById(contactId) {
    try {
        const contactList = await fs.readFile(contactsPath, 'utf8');
        const contactListParsed = JSON.parse(contactList);
        const findedContact = contactListParsed.find(({ id }) => {
            return +id === contactId;
        });
        if (!findedContact) {
            return "Contact wasn't finded";
        };
        return findedContact;
    } catch (error) {
        return error;
    }
};

async function removeContact(contactId) {
    try {
        const contactList = await fs.readFile(contactsPath, 'utf8');
        const contactListParsed = JSON.parse(contactList);
        const newContactList = contactListParsed.filter(({ id }) => {
            return +id !== contactId;
        });

        await fs.writeFile(contactsPath, JSON.stringify(newContactList));
        
    } catch (error) {
        return error;
    }
};

function addContact(name, email, phone) {

};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};