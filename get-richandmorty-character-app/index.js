const fs = require("fs");
const yargs = require("yargs");

const finder = require('./finder.js');

const fileCharactersPath = './resources/characters.json';
const requestURI = 'https://rickandmortyapi.com/api/character/';

function main() {
    let args = yargs
        .usage('Usage: node $0 --id [number] --type [string]')
        .example('$0 --i 1')
        .example('$0 --name "rick sanchez" --status alive')
        .example('$0 --gender male --specious human')
        .options({
            'i': { alias: 'id', nargs: 1, type: 'number' },
            'n': { alias: 'name', nargs: 1, type: 'string' },
            'st': { alias: 'status', nargs: 1, type: 'string' },
            'sp': { alias: 'species', nargs: 1, type: 'string' },
            't': { alias: 'type', nargs: 1, type: 'string' },
            'g': { alias: 'gender', nargs: 1, type: 'string' },
            'o': { alias: 'origin', nargs: 1, type: 'string' },
            'l': { alias: 'location', nargs: 1, type: 'string' }
        })
        .argv;
        finder.findCharacters(requestURI, args, fileCharactersPath);
}

main();