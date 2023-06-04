const {listContacts, getContactById, removeContact, addContact} = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            return console.log(contacts);

        case "get":
            const contact = await getContactById(id);
            return console.log(contact);
    
        case "add":
            const newContact = await addContact({ name, email, phone });
            return console.log(newContact);
            
        case "remove":
            const deleteContact = await removeContact(id);
            return console.log(deleteContact);
    
        default:
            console.warn("Unknown action type!");
        };
};

invokeAction(argv);