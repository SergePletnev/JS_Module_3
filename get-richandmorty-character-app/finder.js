const rp = require('request-promise-native');
const fs = require('fs');

function getRMDB(uri) {
    let charactersDB = [];
    const getDB = (uri) => rp(uri, { json: true })
        .then(data => {
            charactersDB = [...charactersDB, ...data.results];
            if (data.info.next)
                return getDB(data.info.next);
            else
                return charactersDB;
        });
    return getDB(uri);
}

function checkCharacter(parameters, character) {
    let flag = true;
    Object.keys(parameters).forEach(el => {
        if (el === 'location' || el === 'origin')
            if (character[el].name.toLowerCase() !== parameters[el].name.toLowerCase()) {
                flag = false;
                return;
            }
        if (character[el].toString().toLowerCase() !== parameters[el].toString().toLowerCase()) {
            flag = false;
            return;
        }
    })

    if (flag)
        return character;
}

function findCharacters(uri, args, filePath) {
    const parameters = getSupportedParameters(args);
    getRMDB(uri)
        .then(data => {
            const characters = data.map(element => {
                return checkCharacter(parameters, element);
            })
            return characters;
        })
        .then(characters => {
            characters = characters.filter(element => element !== undefined);
            console.log(characters);
            writeCharactersToJSONFile(filePath, characters);
        })
        .catch(err => {
            console.log(err);
        })
}

function writeCharactersToJSONFile(filePath, data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString);
}

function getSupportedParameters(args) {
    const allSupportedARGS = ['id', 'name', 'status', 'species', 'type', 'gender', 'origin', 'location'];
    let params = {};
    Object.keys(args).forEach(element => {
        if (allSupportedARGS.includes(element)) {
            params[element] = args[element]
        }
    });
    return  params;
}

exports.findCharacters = findCharacters;
