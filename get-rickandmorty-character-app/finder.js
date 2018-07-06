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
        switch(el) {
            case ('id'):
                if (character[el] !== parameters[el]) {
                    flag = false;
                }
                break;
            case('location'):
            case('origin'):
                if (character[el]['name'].toLowerCase().indexOf(parameters[el].toLowerCase()) !== 0) {
                    flag = false;
                }
                break;
            default:
                if (character[el].toString().toLowerCase().indexOf(parameters[el].toString().toLowerCase()) !== 0) {
                    flag = false;
                }
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
            console.log(`Nuumber of found characters: ${characters.length}`);
            if (characters.length > 0) {
                writeCharactersToJSONFile(filePath, characters);
            } else {
                throw new Error('No characters with such parameters');
            }
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
    return params;
}

exports.findCharacters = findCharacters;
