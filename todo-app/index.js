const notes = require('./notes-handler.js')

const argv = require('yargs')
  .demandCommand()
  .command('add', 'Add new note to the notes list', function (yargs) {
    yargs
      .example('$0 add --t "title" --b "body"')
      .demandOption(['t', 'b'])
  })
  .command('list', 'List all the notea of the notes list', function (yargs) {
    yargs
      .example('$0 list"')
  })
  .command('read', 'Read note by title', function (yargs) {
    yargs
      .example('$0 read --t "title"')
      .demandOption(['t'])
  })
  .command('remove', 'Remove note by title', function (yargs) {
    yargs
      .example('$0 remove --t "title"')
      .demandOption(['t'])
  })
  .alias('t', 'title')
  .alias('b', 'body')
  .argv;


function main() {
  let result;
  const operation = argv._[0];

  const title = argv.title;
  const body = argv.body;
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
