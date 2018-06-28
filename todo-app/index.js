
function main() {  

    const argv = require('yargs')
      .demandCommand()
      .command('add', 'Add new note to the notes list', (yargs) => {
        yargs
          .example('$0 add --t "title" --b "body" --p "pathToNotesFile"')
          .demandOption(['t', 'b'])
      })
      .command('list', 'List all the notea of the notes list', (yargs) => {
        yargs
          .example('$0 list --p "pathToNotesFile""')
      })
      .command('read', 'Read note by title', (yargs) => {
        yargs
          .example('$0 read --t "title" --p "pathToNotesFile"')
          .demandOption(['t'])
      })
      .command('remove', 'Remove note by title', (yargs) => {
        yargs
          .example('$0 remove --t "title" --p "pathToNotesFile"')
          .demandOption(['t'])
      })
      .alias('t', 'title')
      .alias('b', 'body')
      .alias('p', 'path')
      .argv;

    const Notes = require('./notes-handler.js')

    const operation = argv._[0];
    const title = argv.title;
    const body = argv.body;
    const pathToNotesFile = (argv.path) ? argv.path : './resources/notes.json';
    let result;

    const notes = new Notes(pathToNotesFile);
    switch (operation) {
      case 'add':
        const newNote = {
          'title': title,
          'body': body
        }
        result = notes.add(newNote);
        console.log(result);
        break;
      case 'list':
        result = notes.list();
        console.log(result);
        break;
      case 'read':
        result = notes.read(title);
        console.log(result);
        break;
      case 'remove':
        result = notes.remove(title);
        console.log(result);
        break;
      default:
        console.log(`Only the next commands can be used: [add, list, read, remove]`);
    }
}

main();
