const fs = require("fs");
const yargs = require("yargs");

function main() {

    const args = yargs
        .usage('Usage: node $0 --id [number] --type [string]')
        .example('$0 -i 1')
        .example('$0 -n Varrix')
        .example('$0 -i 22 -n Varrix')
        .options({
            'i': { alias: 'id', type: "number" },
            'n': { alias: 'name', type: 'string' },
            'st': { alias: 'status', type: 'string' },
            'sp': { alias: 'species', type: 'string' },
            't': { alias: 'type', type: 'string' },
            'g': { alias: 'gender', type: 'string' },
            'o': { alias: 'origin', type: 'string' },
            'l': { alias: 'location', type: 'string' }
        })
        .argv;
        console.log(args.name);
}

main();