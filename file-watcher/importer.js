const csvtojson = require('csvtojson');
const DirWatcher = require("./dirwatcher.js");
const path = require('path');
const fs = require('fs');

const delay = 200;

class Importer {
    constructor(pathWatch, pathImport) {
        this.pathWatch = pathWatch;
        this.pathImport = pathImport;
        this.watchFunc = new DirWatcher().watch(this.pathWatch, delay);
    }

    import() {
        return new Promise(resolve => {
            this.watchFunc.on('change', file => {
                if (file.endsWith('.csv')) {
                    console.log(`File ${file} has been changed`)
                    csvtojson()
                        .fromFile(file)
                        .then(jsonArrayObj => {
                            this.writeToJSONFile(file, jsonArrayObj);
                            resolve(jsonArrayObj);
                        })
                }
            })
        })
    }

    importSync() {
        this.watchFunc.on('change', file => {
            if (file.endsWith('.csv')) {
                console.log(`File ${file} has been changed`)
                csvtojson()
                    .fromFile(file)
                    .then(jsonArrayObj => {
                        this.writeToJSONFile(file, jsonArrayObj);
                        return jsonArrayObj;
                    })
            }
        })
    }

    writeToJSONFile(file, data) {
        let pathJSON = this.pathImport + path.basename(file, '.csv') + '.json';
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(pathJSON, jsonString);
    }
}

module.exports = Importer;