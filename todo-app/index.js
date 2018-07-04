const moment = require('moment');

const Notes = require('./notes-handler.js')

function main() {

  const argv = require('yargs')
    .demandCommand(1, 'You need to enter one of the folowing commands: [add, list, read, remove, readXLSX, writeXLSX, sort, update]')
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
    .command('readXLSX', 'Read notes from xlsx file', (yargs) => {
      yargs
        .options('pathXLSX', { demand: false, desc: 'Path to notes xlsx file', default: './resources/notes.xlsx' })
        .example('$0 readXLSX --pathXLSX "pathToXLSXFile"')
    })
    .command('writeXLSX', 'Write notes to xlsx file', (yargs) => {
      yargs
        .options('pathXLSX', { demand: false, desc: 'Path to notes xlsx file', default: './resources/notes.xlsx' })
        .example('$0 writeXLSX --pathXLSX "pathToXLSXFile"')
    })
    .command('sort', 'Sort notes', (yargs) => {
      yargs
        .options('sortType', { demand: false, desc: 'The type of sort (sort by)', default: 'title' })
        .options('order', { demand: false, desc: 'Descending! or ascending order', default: 'asc' })
        .example('$0 sort --sortType "sortType" --order "sortOrder"')
    })
    .command('update', 'Update title or body of the note', (yargs) => {
      yargs
        .example('$0 update --t "title" --newTitle "newTitle" --newBody "newBody" --p "pathToNotesFile"')
        .demandOption(['t'])
    })
    .alias('t', 'title')
    .alias('b', 'body')
    .alias('p', 'path')
    .argv;

  const operation = argv._[0];
  const title = argv.title;
  const body = argv.body;
  const pathToNotesFile = (argv.path) ? argv.path : './resources/notes.json';
  let result = '';

  const notes = new Notes(pathToNotesFile);
  switch (operation) {
    case 'add':
      const date = moment(Date.now()).format('DD/MM/YYYY hh:mm:ss');
      const newNote = {
        title: title,
        body: body,
        date: date
      }
      try{
        result = notes.add(newNote);
        console.log(result);
      } catch(err) {
        console.log(err.message);
      }
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
    case 'readXLSX':
      result = notes.readXLSX(argv.pathXLSX);
      console.log(result);
      break;
    case 'writeXLSX':
      result = notes.writeXLSX(argv.pathXLSX);
      console.log(result);
      break;
    case 'sort':
      try {
        result = notes.sort(argv.sortType, argv.order);
        console.log(result);
      } catch (err) {
        console.log(err.message);
      }
      break;
    case 'update':
      if (argv.newTitle === undefined && argv.newBody === undefined) {
        console.log('You need to enter at least one of the parameters --newTitle or --newBody');
      }
      if (argv.newTitle !== undefined) {
        result = notes.update('title', title, argv.newTitle);
        console.log(result);
      }
      if (argv.newBody !== undefined) {
        result = notes.update('body', title, argv.newBody);
        console.log(result);
      }
      break;
    default:
      console.log(`Only the next commands can be used: [add, list, read, remove, readXLSX, writeXLSX, sort, update]`);
  }
}

main();
