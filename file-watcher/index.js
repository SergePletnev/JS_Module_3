const yargs = require("yargs");
const Importer = require("./importer.js");

function main() {

    const args = yargs
        .option('pathToWatch', { alias: 'w', nargs: 1, type: 'string', default: './data/', describe: 'Path of the dir to whatch' })
        .option('pathImportTo', { alias: 'i', nargs: 1, type: 'string', default: './resources/', describe: 'Path of the dir to import json files (objects)' })
        .argv;

    const pathWatch = args.pathToWatch;
    const pathImport = args.pathImportTo;

    const importer = new Importer(pathWatch, pathImport);

    importer.import()
        .then((data) => {
            console.log(data[0]);
        })
        .catch(err => {
            console.log(err);
        });

    // importer.importSync();
}

main();