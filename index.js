const {
    listContacts,
    getContactById,
    removeContact,
    addContact } = require('./contacts');

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            console.table(allContacts);
            break;
        
        case "get":
            const oneContact = await getContactById(id);
            if (!oneContact) {
                return console.log(`Contact with id:${id} wasn't found`);
            };
            console.table(oneContact);
            break;
        
        case "add":
            const newContact = await addContact(name, email, phone);
            console.table(newContact);
            break;

        case "remove":
            const deleteContact = await removeContact(id);
            if (!deleteContact) {
                return console.log(`Contact with id:${id} wasn't found`);
            };
            console.table(deleteContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    };
};

invokeAction(argv);