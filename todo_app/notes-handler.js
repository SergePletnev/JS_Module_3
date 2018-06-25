const fs = require('fs');

const pathToNotesFile = './resources/notes.json';
const notesList = require(pathToNotesFile);

function addUniqueNote(note) {
    if (isNoteInList(note.title) > -1) {
        throw err;
    }
    notesList.push(note);
    const json = JSON.stringify(notesList, null, 2);
    fs.writeFileSync(pathToNotesFile, json);
    return `The note [${note.title}] has been added successfully`;
}

function listAllNotes() {
    return (notesList.length > 0) ? notesList : 'The notes list is empty.';
}

function readNote(title) {
    const note = notesList.find(el => el.title === title);
    const result = (note !== undefined) ? note : `There is no note with title [${title}] in the notes list`;
    return result;
}

function removeNote(title) {
    const index = notesList.findIndex(el => el.title === title);
    if(index > -1){
        notesList.splice(index, 1);
        const json = JSON.stringify(notesList, null, 2);
        fs.writeFileSync(pathToNotesFile, json);
        return `The note [${title}] has been deleted successfully`;
    } else {
        return `There is no note [${title}] in the notes list`;
    }
}

function isNoteInList(title) {
    // notesList.forEach(element => {
    //     if (element['title'] === title) {
    //         return true;
    //     }
    // });
    // [1, 5, 10, 15].findIndex(function(a) {return a > 9;})
    return notesList.findIndex( (index, element) => {
        if(element.title === title){
            return index;
        }
    });

}

const notes = {
    add: (note) => {
        return addUniqueNote(note);
    },
    list: () => {
        return listAllNotes();
    },
    read: (title) => {
        return readNote(title);
    },
    remove: (title) => {
        return removeNote(title);
    }
};

module.exports = notes;


// notesList.splice(0, 1);
// const json = JSON.stringify(notesList, null, 2);
// fs.writeFileSync('./resources/1.json', json);
