const fs = require('fs');
var XLSX = require('xlsx')
const excel4node = require('excel4node');

class Notes {

    constructor(pathToNotesFile) {
        this.pathToNotesFile = pathToNotesFile;
        this.notesList = this.readNotesFile();
    }

    add(newNote) {
        const note = this.notesList.find(el => el.title === newNote.title);
        if (note === undefined) {
            this.notesList.push(newNote);
            this.writeNotesToJSONFile();
            return `The note with title [${newNote.title}] has been added successfully to the notes list.`;
        }
        throw new Error(`The note with title [${newNote.title}] is already in the notes list. You can add notes only with unique titles.`);
    }

    list() {
        return (this.notesList.length > 0) ? this.notesList : 'The notes list is empty.';
    }

    read(title) {
        const note = this.notesList.find(note => note.title === title);
        const result = (note !== undefined) ? note : `There is no note with title [${title}] in the notes list.`;
        return result;
    }

    remove(title) {
        const index = this.notesList.findIndex(note => note.title == title);
        if (index > -1) {
            this.notesList.splice(index, 1);
            this.writeNotesToJSONFile();
            return `The note with title [${title}] has been successfully removed.`;
        } else {
            return `There is no note with title [${title}] in the notes list.`;
        }
    }

    readXLSX(pathXLSX) {
        const workBook = XLSX.readFile(pathXLSX);
        const sheetNameList = workBook.SheetNames;
        this.notesList = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNameList[0]]);
        this.writeNotesToJSONFile();
        return `The notes have been successfully read from xlsx file: [${pathXLSX}].`;
    }

    writeXLSX(pathXLSX) {
        const workBook = new excel4node.Workbook();
        const workSheet = workBook.addWorksheet('Sheet1');
        workSheet.cell(1, 1).string('title');
        workSheet.cell(1, 2).string('body');
        workSheet.cell(1, 3).string('date');
        this.notesList.forEach((note, index) => {
            workSheet.cell(index + 2, 1).string(note.title);
            workSheet.cell(index + 2, 2).string(note.body);
            workSheet.cell(index + 2, 3).string(note.date);
        });
        workBook.write(pathXLSX);
        return `The notes have been successfully written to xlsx file: [${pathXLSX}].`
    }

    sort(sortType, order) {
        if (this.notesList.length === 0) {
            return "The notes list is empty. Add some notes to sort them."
        }
        this.notesList.sort((note1, note2) => {
            switch (sortType) {
                case ('date'):
                    if (order === 'asc')
                        return note1.date > note2.date;
                    if (order === 'desc')
                        return note1.date < note2.date;
                case ('title'):
                    if (order === 'asc')
                        return note1.title > note2.title;
                    if (order === 'desc')
                        return note1.title < note2.title;
                case ('titleLength'):
                    if (order === 'asc')
                        return note1.title.length > note2.title.length;
                    if (order === 'desc')
                        return note1.title.length < note2.title.length;
                case ('bodyLength'):
                    if (order === 'asc')
                        return note1.body.length > note2.body.length;
                    if (order === 'desc')
                        return note1.body.length < note2.body.length;
                default:
                    throw new Error(`[${sortType}] is unsupported sort type. You can sort only by: title, titleLength, bodyLength and date.`);
            }
        })

        this.writeNotesToJSONFile();
        return `The notes have been sorted by ${sortType} in ${order} order.`;
    }

    update(option, title, updateInfo) {
        const index = this.notesList.findIndex(el => el.title == title);
        if (index > -1) {
            switch (option) {
                case 'title':
                    this.notesList[index].title = updateInfo;
                    this.writeNotesToJSONFile();
                    return `The title of [${title}] note has been updated to [${updateInfo}]`;
                case 'body':
                    this.notesList[index].body = updateInfo;
                    this.writeNotesToJSONFile();
                    return `The body of [${title}] note has been updated to [${updateInfo}]`;
            }
        } else {
            return `There is no note with title [${title}] in the notes list.`;
        }
    }

    readNotesFile() {
        try {
            const notes = require(this.pathToNotesFile);
            return notes;
        } catch (err) {
            const emptyNotesFileContent = '[]';
            fs.writeFileSync(this.pathToNotesFile, emptyNotesFileContent);
            return require(this.pathToNotesFile);
        }
    }

    writeNotesToJSONFile() {
        const jsonString = JSON.stringify(this.notesList, null, 2);
        fs.writeFileSync(this.pathToNotesFile, jsonString);
    }
}

module.exports = Notes;
