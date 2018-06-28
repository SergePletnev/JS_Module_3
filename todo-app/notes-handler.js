const fs = require('fs');

class Notes {

    constructor(pathToNotesFile) {
        this.pathToNotesFile = pathToNotesFile;
        this.notesList = this.checkAndReadNotesFile();
    }

    add(newNote) {
        const note = this.notesList.find(el => el.title === newNote.title);
        if (note === undefined) {
            this.notesList.push(newNote);
            this.writeNotesToJSONFile();
            return `The note with title [${newNote.title}] has been added successfully to the notes list.`;
        }
        return `The note with title [${newNote.title}] is already in the notes list. You can add notes only with unique titles.`;
    }

    list() {
        return (this.notesList.length > 0) ? this.notesList : 'The notes list is empty.';
    }

    read(title) {
        const note = this.notesList.find(el => el.title === title);
        const result = (note !== undefined) ? note : `There is no note with title [${title}] in the notes list.`;
        return result;
    }

    remove(title) {
        const index = this.notesList.findIndex(el => el.title == title);
        if (index > -1) {
            this.notesList.splice(index, 1);
            this.writeNotesToJSONFile();
            return `The note with title [${title}] has been successfully removed.`;
        } else {
            return `There is no note with title [${title}] in the notes list.`;
        }
    }

    checkAndReadNotesFile() {
        try {
            const notes = require(this.pathToNotesFile);
            return notes;
        } catch(err) {
            const emptyNotesFileContent = '[]';
            fs.writeFileSync(this.pathToNotesFile, emptyNotesFileContent);
            return JSON.parse(emptyNotesFileContent); 
        }
    }

    writeNotesToJSONFile() {
        const jsonString = JSON.stringify(this.notesList, null, 2);
        fs.writeFileSync(this.pathToNotesFile, jsonString);
    }

}

module.exports = Notes;
