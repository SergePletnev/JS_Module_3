const fs = require('fs');

const pathToNotesFile = './resources/notes.json';
const notesList = require(pathToNotesFile);

function addUniqueNote(newNote) {
    const note = notesList.find(el => el.title === newNote.title);
    if (note === undefined){
        return `The note with title [${newNote.title}] is already in the notes list. You can add notes only with unique titles.`;
    }
    notesList.push(newNote);
    const json = JSON.stringify(notesList, null, 2);
    fs.writeFileSync(pathToNotesFile, json);
    return `The note with title [${newNote.title}] has been added successfully to the notes list`;
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
    const index = notesList.findIndex(el => el.title == title);
    if (index > -1) {
        notesList.splice(index, 1);
        const json = JSON.stringify(notesList, null, 2);
        fs.writeFileSync(pathToNotesFile, json);
        return `The note with title [${title}] has been deleted successfully`;
    } else {
        return `There is no note with title [${title}] in the notes list`;
    }
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
