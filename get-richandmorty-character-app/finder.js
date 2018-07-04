const rp = require('request-promise-native');
const fs = require('fs');

const requestURI = 'https://rickandmortyapi.com/api/character/';

function getRichAndMortyCharacters(uri) {

    rp(uri, { json: true })
        .then(data => {
            charactersDB = [...charactersDB, ...data.results];
            if (data.info.next) {
                return getRichAndMortyCharacters(data.info.next);
            } else {
                return charactersDB;
            }
        })
        .then((charactersDB) => {
            console.log(charactersDB.length);
            writeCharactersToJSONFile(charactersDB);
        })
        .catch((error) => {
            return error;
        });
}

function writeCharactersToJSONFile(data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync('./resources/characters.json', jsonString);
}

// let result = [];
// const getchars = (url) => request(url, { json: true })  //recursive function for getting characters from all pages
//     .then((body) => {
//         result = result.concat(body.results);           //saving results from current page
//         if (body.info.next !== "") {                    //checking if it is the last page
//             return getchars(body.info.next);            //if not, get characters from the next page
//         } else return result;
//     }).catch((err) => { return err; })

// return getchars(url);

// let charactersDB = [];
getRichAndMortyCharacters(requestURI);

// writeCharactersToJSONFile();

// writeCharactersToJSONFile(allCharacters);
// console.log(allCharacters.length);