# JS_Module_3
**TODO app** and **App** for finding a specific character in the database (rickandmortyapi.com)

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
index.js add --title "Title" --body "Body"
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
index.js read --title "Title"
```
This command will read and display the note by its title. Parameter title is required.

#### Read the note by title
```
index.js remove --title "Title"
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
index.js update --title "Title" --newTitle "New Title" --newBody "New Body"
```
This command will update title or body of the specified note. You can update only title or body or both.

#### Sort notes
```
index.js sort --type "Sort Type" --order "Sort Order"
```
This command will sort the notes by sort types: [title, titleLength, bodyLength and date] and orders: [asc, desc]. This commands sorts notes by title in ascending order if it is launched without parameters.








