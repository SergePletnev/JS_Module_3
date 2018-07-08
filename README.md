# JS_Module_3
**TODO app** and **App** for finding a specific character in the database (rickandmortyapi.com)

# Deploy

#### $ npm install

Before running the applications [npm install] command should be run.<br>
It downloads needed modules and environment for apps.

# TODO app
Application for your notes. Using it you can perform the following operations with your notes: 
- Add new note
- Read note by title
- Remove by title
- List all notes
- Read notes from xlsx file
- Write notes to xlsx file
- Update title or body of the selected note
- Sort notes by title, title lengh, body length or date of adding

## Usage
Note: Aplication should be started in directory containing its files (todo-app).
All the commands supports a parameter (--path or -p): path to notes file you want to work with.

#### Add a new note
```
index.js add --title "title" --body "body"
```
Parameters title and body are required.
This command will add a new note to the notes list. Unique title should be used.

#### List all notes
```
index.js list
```
This command will list all the notes. Parameers are not required.

#### Read the note by title
```
index.js read --title "title"
```
This command will read and display the note by its title. Parameter title is required.

#### Read the note by title
```
index.js remove --title "title"
```
This command will remove the note by its title. Parameter title is required.

#### Read notes from xlsx file
```
index.js readXLSX --pathXLSX "pathToXLSXFile"
```
This command will read notes from the specified xlsx file and write to json file (default or specified). Parameter pathXLSX is optional (default: "./resources/notes.xlsx").

#### Write notes to xlsx file
```
index.js writeXLSX --pathXLSX "pathToXLSXFile"
```
This command will write notes to the specified xlsx file and write from json file (default or specified). Parameter pathXLSX is optional (default: "./resources/notes.xlsx").

#### Update title or body of the note
```
index.js update --title "Title" --newTitle "new title" --newBody "new body"
```
This command will update title or body of the specified note. You can update only title or body or both.

#### Sort notes
```
index.js sort --sortType "sort type" --order "sort order"
```
This command will sort the notes by sort types: [title, titleLength, bodyLength and date] and orders: [asc, desc]. This commands sorts notes by title in ascending order if it is launched without parameters.


# Get-R&MCharacters app
Application for finding characters in R&M Characters DB [rickandmortyapi.com](https://rickandmortyapi.com/).

## Usage
Note: Aplication should be started in directory containing its files (get-richandmorty-character-app).

### Available parameters for searh:

* --id, -i         Number of ID
* --name, -n       Name of character
* --status, -u     Status: alive or dead
* --species, -p    Species of character
* --type, -t       Type
* --gender, -g     Gender: male or female
* --origin, -o     Origin name
* --location, -l   Location name

You can use any combination of these parameters for searching.

### Examples:
`node index.js --id 2`<br>
`node index.js --name 'rick sanchez' --status alive`<br>
`node index.js --gender male --specious human`<br>
`node index.js --gender Female --status alive`<br>


# File watcher app
This application watches for changes in csv files in defined directory and exports csv to json files to defined directory.

### Available parameters:

* --pathToWatch        Path of the dir to whatch
* --pathImportTo       Path of the dir to import json files (objects)

Default values of parameters: <br>
pathToWatch = './data'<br>
pathImportTo = './resources'