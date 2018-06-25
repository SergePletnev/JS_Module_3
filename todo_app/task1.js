const notes = require('./notes-handler.js')

const argv = require('yargs')
  .usage('Usage: $0 [operation: (add, list, read, remove)] --title [str] [optional] --body [str] [optional]')
  .argv;

function main() {
  const operation = argv._[0];

  const title = argv.title;
  const body = argv.body;
  switch (operation) {
    case 'add':
      const newNote = {
        'title': title,
        'body': body
      }
      try {
        console.log(notes.add(newNote));
      } catch (err) {
        console.log(err);
      }
      break;
    case 'list':
      console.log(notes.list());
      break;
    case 'read':
      console.log(notes.read(title));
      break;
    case 'remove':
      console.log(notes.remove(title));
      break;
    default:
      console.log('Usage: node task1 [operation: (add, list, read, remove)] --title [str] [optional] --body [str] [optional]');
  }
}

main();
